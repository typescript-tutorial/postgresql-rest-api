import { Statement } from "postgre";
import { UserFilter } from "user";

// search trong mảng skills , interests 
export function buildQuery(s: UserFilter ):Statement {
    let query = `select * from users`;
    let where=[];
    let params= [];
    let orWhereAchievements = [];
    let orWhereSkills = [];
    let i = 1;
    if(s.interests &&  s.interests.length > 0) {
      params.push(s.interests);
      where.push(` interests && $${i}`);
      i++;
    }
    if(s.settings) {
      params.push(s.settings);
      where.push(` settings @> $${i}`);
      i++;
    }
    if(s.achievements && s.achievements.length > 0) {
      for(let achievement of s.achievements) {
        orWhereAchievements.push(` $${i} <@ ANY(achievements)`);
        params.push(achievement)
        i ++
      }
    }
    if(s.skills && s.skills.length > 0) {
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

    if(s.limit && s.limit > 0) {
      query = query + ` limit ${s.limit}`;
    }
   
    const f : Statement = {
      query,
      params,
    }
    return f;
  }
  
  
  // CREATE INDEX interests_index ON users (interests);
  // db.Query(`select interests from users where interests && $1 and skills && $2`, [ 'Basketball', 'Kapp' ])