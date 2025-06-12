"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    return queryInterface.createTable("Shelters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING(30)
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING(30)
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      zip: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      lat: {
        type: Sequelize.INTEGER,
      },
      lon: {
        type: Sequelize.INTEGER,
      },
      phone: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING(30),
        allowNull: false,
      }, 
      description: {
        allowNull: false,
        type: Sequelize.TEXT(500),    
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = "Shelters";
    return queryInterface.dropTable(options);
  }
};
