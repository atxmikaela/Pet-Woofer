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
                id: 1,
                petId: 1,
                url: "https://images.dog.ceo/breeds/labrador/n02099712_1953.jpg",
                preview: true,
            },
            {
                id: 2,
                petId: 1,
                url: "https://images.dog.ceo/breeds/labrador/n02099712_2147.jpg",
                preview: false,
            },

            {
                id: 3,
                petId: 2,
                url: "https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg",
                preview: true,
            },
            {
                id: 4,
                petId: 2,
                url: "https://cdn2.thecatapi.com/images/1D4.jpg",
                preview: false,
            },

            {
                id: 5,
                petId: 3,
                url: "https://images.dog.ceo/breeds/germanshepherd/n02106662_10339.jpg",
                preview: true,
            },
            {
                id: 6,
                petId: 3,
                url: "https://images.dog.ceo/breeds/germanshepherd/n02106662_12027.jpg",
                preview: false,
            },

            {
                id: 7,
                petId: 4,
                url: "https://cdn2.thecatapi.com/images/2R4.jpg",
                preview: true,
            },

            {
                id: 8,
                petId: 5,
                url: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg",
                preview: true,
            },
            {
                id: 9,
                petId: 5,
                url: "https://images.dog.ceo/breeds/retriever-golden/n02099601_1552.jpg",
                preview: false,
            },

                {
                id: 10,
                petId: 6,
                url: "https://cdn2.thecatapi.com/images/3T9.jpg",
                preview: true,
            },
            {
                id: 11,
                petId: 6,
                url: "https://cdn2.thecatapi.com/images/4Mh.jpg",
                preview: false,
            },

            {
                id: 12,
                petId: 7,
                url: "https://images.dog.ceo/breeds/collie-border/n02106166_355.jpg",
                preview: true,
            },

            {
                id: 13,
                petId: 8,
                url: "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_10263.jpg",
                preview: true,
            },
            {
                id: 14,
                petId: 8,
                url: "https://images.dog.ceo/breeds/spaniel-cocker/n02102318_1131.jpg",
                preview: false,
            },

            {
                id: 15,
                petId: 9,
                url: "https://cdn2.thecatapi.com/images/5V6.jpg",
                preview: true,
            },

            {
                id: 16,
                petId: 10,
                url: "https://images.dog.ceo/breeds/dachshund/dog-2518.jpg",
                preview: true,
            },
            {
                id: 17,
                petId: 10,
                url: "https://images.dog.ceo/breeds/dachshund/dog-7048.jpg",
                preview: false,
            },

            {
                id: 18,
                petId: 11,
                url: "https://images.dog.ceo/breeds/dane-great/n02109047_11654.jpg",
                preview: true,
            },
            {
                id: 19,
                petId: 11,
                url: "https://images.dog.ceo/breeds/dane-great/n02109047_14242.jpg",
                preview: false,
            },

            {
                id: 20,
                petId: 12,
                url: "https://cdn2.thecatapi.com/images/6N1.jpg",
                preview: true,
            },
            {
                id: 21,
                petId: 12,
                url: "https://cdn2.thecatapi.com/images/7CC.jpg",
                preview: false,
            },

            {
                id: 22,
                petId: 13,
                url: "https://images.dog.ceo/breeds/cattledog-australian/IMG_1042.jpg",
                preview: true,
            },

            {
                id: 23,
                petId: 14,
                url: "https://images.dog.ceo/breeds/beagle/n02088364_10108.jpg",
                preview: true,
            },
            {
                id: 24,
                petId: 14,
                url: "https://images.dog.ceo/breeds/beagle/n02088364_11006.jpg",
                preview: false,
            },

            {
                id: 25,
                petId: 15,
                url: "https://images.dog.ceo/breeds/mix/170809-IMG_1865.jpg",
                preview: true,
            },
            {
                id: 26,
                petId: 15,
                url: "https://images.dog.ceo/breeds/mix/170819-IMG_2045.jpg",
                preview: false,
            },

            {
                id: 27,
                petId: 16,
                url: "https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg",
                preview: true,
            },

            {
                id: 28,
                petId: 17,
                url: "https://cdn2.thecatapi.com/images/8N3.jpg",
                preview: true,
            },
            {
                id: 29,
                petId: 17,
                url: "https://cdn2.thecatapi.com/images/9DH.jpg",
                preview: false,
            },

            {
                id: 30,
                petId: 18,
                url: "https://images.dog.ceo/breeds/labrador/n02099712_2641.jpg",
                preview: true,
            },
            {
                id: 31,
                petId: 18,
                url: "https://images.dog.ceo/breeds/labrador/n02099712_3004.jpg",
                preview: false,
            },

            {
                id: 32,
                petId: 19,
                url: "https://cdn2.thecatapi.com/images/Ac2.jpg",
                preview: true,
            },

            {
                id: 33,
                petId: 20,
                url: "https://cdn2.thecatapi.com/images/Bd4.jpg",
                preview: true,
            },
            {
                id: 34,
                petId: 20,
                url: "https://cdn2.thecatapi.com/images/Ce7.jpg",
                preview: false,
            },

            {
                id: 35,
                petId: 21,
                url: "https://images.dog.ceo/breeds/germanshepherd/n02106662_4500.jpg",
                preview: true,
            },

            {
                id: 36,
                petId: 22,
                url: "https://images.dog.ceo/breeds/beagle/n02088364_17329.jpg",
                preview: true,
            },

            {
                id: 37,
                petId: 23,
                url: "https://cdn2.thecatapi.com/images/Df8.jpg",
                preview: true,
            },

            {
                id: 38,
                petId: 24,
                url: "https://images.dog.ceo/breeds/heeler-blue/n02088632_1205.jpg",
                preview: true,
            },
            {
                id: 39,
                petId: 24,
                url: "https://images.dog.ceo/breeds/heeler-blue/n02088632_2270.jpg",
                preview: false,
            },

            {
                id: 40,
                petId: 25,
                url: "https://cdn2.thecatapi.com/images/Eg9.jpg",
                preview: true,
            },

            {
                id: 41,
                petId: 26,
                url: "https://images.dog.ceo/breeds/cattledog-australian/IMG_5177.jpg",
                preview: true,
            },
            {
                id: 42,
                petId: 26,
                url: "https://images.dog.ceo/breeds/cattledog-australian/IMG_1023.jpg",
                preview: false,
            },

            {
                id: 43,
                petId: 27,
                url: "https://images.dog.ceo/breeds/retriever-golden/n02099601_2209.jpg",
                preview: true,
            },

            {
                id: 44,
                petId: 28,
                url: "https://cdn2.thecatapi.com/images/Fh0.jpg",
                preview: true,
            },
            {
                id: 45,
                petId: 28,
                url: "https://cdn2.thecatapi.com/images/Gi1.jpg",
                preview: false,
            },

            {
                id: 46,
                petId: 29,
                url: "https://images.dog.ceo/breeds/husky/n02110185_10047.jpg",
                preview: true,
            },
            {
                id: 47,
                petId: 29,
                url: "https://images.dog.ceo/breeds/husky/n02110185_1469.jpg",
                preview: false,
            },

            {
                id: 48,
                petId: 30,
                url: "https://cdn2.thecatapi.com/images/Hj2.jpg",
                preview: true,
            },
            {
                id: 49,
                petId: 30,
                url: "https://cdn2.thecatapi.com/images/Ik3.jpg",
                preview: false,
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
