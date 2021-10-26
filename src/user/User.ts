export interface User {
  	id: string;
  	username: string;
  	email?: string;
  	phone?: string;
  	dateOfBirth?: Date;
  	interests:string[];
	skills:Skill[];
  	achievements:Achievement[];
	settings:UserSettings;
}

export interface Skill {
	skill: string;
	hirable: boolean;
}

export interface UserSettings {
	userId:string; 
	language:string;
	dateFormat:string;
	dateTimeFormat:string; 
	timeFormat:string; 
	notification:boolean; 
}

export interface Achievement {
	subject:     string;
	description: string; 
}

export interface Appreciation {
	id:            string;
	userId:        string;
	appreciator:   string;
	appreciatedAt: string;
	subject:       string;
	description:   string; 
}