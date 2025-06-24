"use strict";

import { OptionsInterface } from "../../typings/seeders";


let options: OptionsInterface = {};
if ( process.env.NODE_ENV === 'production') 
{
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async ( queryInterface: any, Sequelize: any ) =>
  {
    return queryInterface.createTable( "Pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(40)
      },
      species: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      breed: {
        allowNull: false,
        type: Sequelize.STRING(40),
      },
      age: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      size: {
        type: Sequelize.STRING(20),
      },
      color: {
        type: Sequelize.STRING(40)
      },
      fee: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('adopted', 'missing', 'found', 'available', 'protective custody', 'not available', 'expired'),
        allowNull: false,
        defaultValue: 'not available'
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      lastSeenLocation: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      lastSeenDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      expireDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      shelterId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Shelters',
          key: 'id'
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal( 'CURRENT_TIMESTAMP' )
      }
    }, options );
  },
  down: async ( queryInterface: any, Sequelize: any ) =>
  {
    options.tableName = "Pets";
    return queryInterface.dropTable( options );
  }
};
