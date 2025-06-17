'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Pets';
    return queryInterface.bulkInsert(options, [
  {
    name: "Rambo",
    species: "Dog",
    breed: "Doberman",
    age: "6",
    gender: "male",
    size: "large",
    color: 'black and brown',
    fee: 65,
    status: "protective custody",
    description: "For a limited time, when you adopt Rambo, you get the entire box set of Rambo movies on VHS and your own cutout of Sylvestor Stallone",
    userId: 1,
    shelterId: 3
  },
  {
    name: "Oliver",
    species: "Dog",
    breed: "Husky",
    age: "5",
    gender: "male",
    color: 'brown',
    size: "large",
    fee: 65,
    status: "available",
    description: "Oliver is the sassiest of sassy. It's not quite a bark, and it's definitely not a bite, but Oliver talks in kind of lazy 'no.'",
    userId: 1,
    shelterId: 1
  },
  {
    name: "Goliath",
    species: "Cat",
    breed: "Tabby",
    age: "2",
    gender: "female",
    color: 'orange',
    size: "extremely large",
    fee: 65,
    status: "found",
    description: "Goliath was found at a nuclear waste facility. She does what she wants, when she wants, and never answers by her name, unless you have food.",
    userId: 1,
    shelterId: 2
  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Pets';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
