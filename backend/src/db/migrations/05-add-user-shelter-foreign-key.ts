"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.addConstraint('Users', {
      fields: ['shelterId'],
      type: 'foreign key',
      name: 'fk_users_shelter_id',
      references: {
        table: 'Shelters',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.removeConstraint('Users', 'fk_users_shelter_id');
  }
};
