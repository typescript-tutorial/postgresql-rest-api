import {HealthController} from 'express-ext';
import {Pool} from 'pg';
import {PoolManager, PostgreSQLChecker, param, Statement} from 'postgre';
import {postgre, SearchBuilder} from 'query-core';
import {ApplicationContext} from './context';
import {UserController} from './user/UserController';
import {userModel} from './user/UserModel';
import {User} from './user/User';
import {UserSM} from './user/UserSM';
import {SqlUserService} from './user/SqlUserService';

export function log(msg: any, ctx?: any): void {
  console.log(msg);
}
export function createContext(pool: Pool): ApplicationContext {
  const sqlChecker = new PostgreSQLChecker(pool);
  const health = new HealthController([sqlChecker]);
  const manager = new PoolManager(pool);
  const builder = new SearchBuilder<User, UserSM>(manager.query, 'users', userModel.attributes, postgre, buildQuery);
  const userService = new SqlUserService(pool);
  const user = new UserController(builder.search, userService, log);
  const ctx: ApplicationContext = {health, user};
  return ctx;
}
// search trong mảng skills , interests 
export function buildQuery(s: UserSM ):Statement {
  let query = `select * from users`;
  let where=[];
  let params= [];
  let orWhereAchievements = [];
  let orWhereSkills = [];
  let i = 1;
  if(s.interests &&  s.interests.length > 0) {
    // search character[]
    params.push(s.interests);
    where.push(` interests && $${i}`);
    i++;
  }
  if(s.settings) {
    // search jsonb
    // select * from users where interests && $1 and settings @> $2 and $3 <@ ANY(skills) or $4 <@ ANY(skills)
    params.push(s.settings);
    where.push(` settings @> $${i}`);
    i++;
  }
  if(s.achievements && s.achievements.length > 0) {
    // search jsonb[]
    // select * from users where interests && $1 and settings @> $2 and $3 <@ ANY(skills) or $4 <@ ANY(skills)
    for(let achievement of s.achievements) {
      orWhereAchievements.push(` $${i} <@ ANY(achievements)`);
      params.push(achievement)
      i ++
    }
  }
  if(s.skills && s.skills.length > 0) {
    // search jsonb[]
    for(let skill of s.skills) {
      orWhereSkills.push(` $${i} <@ ANY(skills)`);
      params.push(skill)
      i ++
    }
  }
  if(orWhereAchievements.length > 0) {
    where.push(`(${orWhereAchievements.join(" or")})`);
  }
  if(orWhereSkills.length > 0) {
    where.push(`(${orWhereSkills.join(" or")})`);
  }
  if(where.length > 0) {
    query = query + ` where` + where.join(" and");
  }

  // console.log(query);
  const f : Statement = {
    query,
    params,
  }
  // console.log(f.params);
  return f;
}


// CREATE INDEX interests_index ON users (interests);
// db.Query(`select interests from users where interests && $1 and skills && $2`, [ 'Basketball', 'Kapp' ])