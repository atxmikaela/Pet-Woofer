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
    firstName: "SpongeBob",
    lastName: "Squarepants",
    email: "spongebob@aa.io",
    phone: "8302857377",
    username: "Spongebob",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6",
    role: "Admin",
    isActive: "true",
    emailVerified: "true",
  },
  {
    firstName: "Patrick",
    lastName: "Star",
    phone: "8302857378",
    email: "Patrick@Star.com",
    username: "PatrickStar",
    hashedPassword: "$2a$10$3LIv4Lvl2vpNWiQceaGh0uabDJomSvSetIJanpEzualAkKd9Nbbmm",
    role: "Admin",
    isActive: "true",
    emailVerified: "true",
  },
  {
    firstName: "Joe",
    lastName: "Smith",
    email: "demo@aa.io",
    phone: "8302857379",
    username: "demo",
    hashedPassword: "$2a$10$RWA3t0FVaTYW1AOKNz5La.3jZDoe0RRqfZ3GFIIrmuNxnjHS0bxu6",
    role: "Admin",
    isActive: "true",
    emailVerified: "true",
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
