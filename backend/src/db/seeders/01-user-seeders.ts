'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
  {
    firstName: "Public",
    lastName: "User",
    email: "public@wolfer.com",
    username: "public",
    role: "Public",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
  {
    firstName: "KPA",
    lastName: "Volunteer",
    email: "kpavolunteer@wolfer.com",
    username: "kpavolunteer",
    role: "KPA Volunteer",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
  {
    firstName: "Shelter",
    lastName: "Volunteer",
    email: "sheltervolunteer@wolfer.com",
    username: "sheltervolunteer",
    role: "Shelter Volunteer",
    shelterId: "1",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
    {
    firstName: "KPA",
    lastName: "Staff",
    email: "kpastaff@wolfer.com",
    username: "kpastaff",
    role: "KPA Staff",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
    {
    firstName: "Shelter",
    lastName: "Staff",
    email: "shelterstaff@wolfer.com",
    username: "shelterstaff",
    role: "Shelter Staff",
    shelterId: "2",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
    {
    firstName: "Wolfer",
    lastName: "Admin",
    email: "admin@wolfer.com",
    username: "admin",
    role: "Admin",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6"
  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
