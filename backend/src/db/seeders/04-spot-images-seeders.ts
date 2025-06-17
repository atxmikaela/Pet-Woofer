'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options: OptionsInterface = {};
if ( process.env.NODE_ENV === 'production' )
{
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    up: async ( queryInterface: any, Sequelize: any ) =>
    {
        options.tableName = 'PetImages';
        return queryInterface.bulkInsert( options, [
            {
                petId: 1,
                url: "https://flic.kr/p/XcdYtY",
                preview: true,
            },
            {
                petId: 2,
                url: "https://firebnbbucket.s3.us-east-2.amazonaws.com/1710025358515.jpg",
                preview: true,
            },
            

        ], {} );
    },

    down: async ( queryInterface: any, Sequelize: any ) =>
    {
        options.tableName = 'PetImages';
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete( options,
            {
            }, {} );
    }
};
