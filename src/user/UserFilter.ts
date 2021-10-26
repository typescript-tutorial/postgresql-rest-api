import { DateRange, Filter } from 'onecore';
import { Achievement, Skill, UserSettings } from 'user';

export interface UserFilter extends Filter {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date|DateRange;
  interests:string[];
  skills:Skill[];
  achievements:Achievement[];
  settings:UserSettings;
}
