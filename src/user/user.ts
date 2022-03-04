import { DateRange, Filter, Model, Repository, Service } from 'onecore';

export interface UserFilter extends Filter {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date | DateRange;
  interests: string[];
  skills: Skill[];
  achievements: Achievement[];
  settings: UserSettings;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  interests: string[];
  skills: Skill[];
  achievements: Achievement[];
  settings: UserSettings;
}

export interface Skill {
  skill: string;
  hirable: boolean;
}

export interface UserSettings {
  userId: string;
  language: string;
  dateFormat: string;
  dateTimeFormat: string;
  timeFormat: string;
  notification: boolean;
}

export interface Achievement {
  subject: string;
  description: string;
}

export interface Appreciation {
  id: string;
  userId: string;
  appreciator: string;
  appreciatedAt: string;
  subject: string;
  description: string;
}
export interface UserRepository extends Repository<User, string> {
}
export interface UserService extends Service<User, string, UserFilter> {
}

export const skillsModel: Model = {
  name: 'skills',
  attributes: {
    skill: {
      required: true
    },
    hirable: {
      type: 'boolean',
    },
  }
};

export const userSettingsModel: Model = {
  name: 'settings',
  attributes: {
    userId: {},
    language: {},
    dateFormat: {},
    dateTimeFormat: {},
    timeFormat: {},
    notification: {
      type: 'boolean',
    }
  }
};

export const achievements: Model = {
  name: 'achievements',
  attributes: {
    subject: {},
    description: {},
  }
};

export const userModel: Model = {
  name: 'users',
  attributes: {
    id: {
      key: true,
      match: 'equal'
    },
    username: {
      match: 'contain'
    },
    email: {
      format: 'email',
      required: true
    },
    phone: {
      format: 'phone',
      required: true
    },
    dateOfBirth: {
      type: 'datetime',
      field: 'date_of_birth'
    },
    interests: {
      type: 'primitives',
    },
    skills: {
      type: 'primitives',
      typeof: skillsModel.attributes,
    },
    achievements: {
      type: 'primitives',
      typeof: achievements.attributes,
    },
    settings: {
      type: 'object',
      typeof: userSettingsModel.attributes,
    }
  }
};
