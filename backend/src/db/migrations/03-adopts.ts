"use strict";

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    return queryInterface.createTable("Adopts", {
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
      species: {
        allowNull:false,
        type: Sequelize.STRING(20)
      },
      breed: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      size: {
        type: Sequelize.STRING(10),
      },
      fee: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT(500),    
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
       shelterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Shelters',
          key: 'id'
        }
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
    options.tableName = "Adopts";
    return queryInterface.dropTable(options);
  }
};
