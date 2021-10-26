import {DateRange, SearchModel} from 'express-ext';

export interface UserSM extends SearchModel {
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: DateRange;
  interests?: string[];
  skills?: Skill[];
  achievements?:Achievement[];
  settings?:Settings;
}
export interface Skill {
  skill: string, 
  hirable: boolean
} 
export interface Achievement{
  subject:string,
  description: string
} 
export interface Settings {
  language: string, 
  dateFormat: string, 
  dateTimeFormat : string, 
  timeFormat: string, 
  notification: boolean 
}
