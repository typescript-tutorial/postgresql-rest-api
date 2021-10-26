import {Model} from 'query-core';

export const skillsModel: Model = {
  name:'skills',
  attributes:{
    skill: {
      required: true
    },
    hirable: {
      type: 'boolean',
    },
  }
};

export const userSettingsModel: Model = {
  name:"settings",
  attributes:{
    userId: {},
    language: {},
    dateFormat: {},
    dateTimeFormat:{},
    timeFormat:{},
    notification:{
      type:'boolean',
    }
  }
};

export const achievements: Model = {
  name:"achievements",
  attributes:{
    subject: {},
    description: {},
  }
}

export const userModel: Model = {
  name: 'user',
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
    interests:{
      type: 'primitives',
    },
    skills:{
      type: 'primitives',
      typeof: skillsModel.attributes,
    },
    achievements:{
      type: 'primitives',
      typeof: achievements.attributes,
    },
    settings:{
      type: 'object',
      typeof: userSettingsModel.attributes,
    }
  }
};