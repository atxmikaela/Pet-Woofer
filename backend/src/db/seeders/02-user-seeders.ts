'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    
    const userData = [
      {
        firstName: 'Public',
        lastName: 'gser',
        email: 'public@wolfer.com',
        username: 'public',
        role: 'Public',
        shelterId: 1,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'KPA',
        lastName: 'Volunteer',
        email: 'kpavolunteer@wolfer.com',
        username: 'kpavolunteer',
        role: 'KPA Volunteer',
        shelterId: 1,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Shelter',
        lastName: 'Volunteer',
        email: 'sheltervolunteer@wolfer.com',
        username: 'sheltervolunteer',
        role: 'Shelter Volunteer',
        shelterId: 2,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'KPA',
        lastName: 'Staff',
        email: 'kpastaff@wolfer.com',
        username: 'kpastaff',
        role: 'Admin',
        shelterId: 1,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Shelter',
        lastName: 'Staff',
        email: 'shelterstaff@wolfer.com',
        username: 'shelterstaff',
        role: 'Shelter Staff',
        shelterId: 2,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Wolfer',
        lastName: 'Admin',
        email: 'admin@wolfer.com',
        username: 'admin',
        role: 'Admin',
        shelterId: 1,
        hashedPassword: '$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    
    return queryInterface.bulkInsert(
      options,
      userData,
      {
        ignoreDuplicates: true  
      }
    );
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { 
        [Op.in]: ['public', 'kpavolunteer', 'sheltervolunteer', 'kpastaff', 'shelterstaff', 'admin'] 
      }
    }, {});
  }
};
