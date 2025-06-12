'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}



module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Shelters';
    return queryInterface.bulkInsert(options, [
  {
    name: "Kerrville Pets Alive",
    address: "550 Earl Garrett Ste 204",
    city: "Kerrville",
    state: "TX",
    zip: "78028",
    lat: 0,
    lon: 0,
    phone: "17138556291",
    email: "info@kerrvillepetsalive.com",
    website: "https://kerrvillepetsalive.com/",
    description: "The place that keeps pets alive"
  },
  {
    name: "Pet Seminary",
    address: "520 Benson Dr",
    city: "Kerrville",
    state: "TX",
    zip: "78028",
    lat: 0,
    lon: 0,
    phone: "18308951112",
    email: "pets@petseminary.com",
    website: "https://petseminary.com",
    description: "A spiritual shelter for cats and dogs"
  },
  {
    name: "Kerr County Animal Services",
    address: "3600 Loop 534",
    city: "Kerrville",
    state: "TX",
    zip: "78028",
    lat: 0,
    lon: 0,
    phone: "18302576963",
    email: "animalcontrol@co.kerr.tx.us ",
    website: "https://kerrcountytx.gov",
    description: "Kerr County Animal Services enforces ordinances, such as restraint laws, laws concerning rabies vaccinations and city/county registrations, rabies control, cruelty investigations, bite investigations and animal quarantines. We also educate the public about rabies control and local laws."
  },
], {});
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Shelters';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [''] }
    }, {});
  }
};
