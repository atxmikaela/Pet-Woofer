'use strict';

import { OptionsInterface } from "../../typings/seeders";

const catImageUrl = 'https://api.thecatapi.com/v1/images/search';
const dogImageUrl = 'https://api.thedogapi.com/v1/images/search';



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
                url: "https://images.dog.ceo/breeds/otterhound/n02091635_920.jpg",
                preview: true,
            },
            {
                id: 2,
                petId: 1,
                url: "https://images.dog.ceo/breeds/hound-walker/n02089867_1062.jpg",
                preview: false,
            },

            {
                id: 3,
                petId: 2,
                url: "https://cdn2.thecatapi.com/images/Wi9RoSlCM.jpg",
                preview: true,
            },
            {
                id: 4,
                petId: 2,
                url: "https://cdn2.thecatapi.com/images/c7s.jpg",
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
                url: "https://images.dog.ceo/breeds/chippiparai-indian/Indian-Chippiparai.jpg",
                preview: false,
            },

            {
                id: 7,
                petId: 4,
                url: "https://cdn2.thecatapi.com/images/MTY0NTU4OA.jpg",
                preview: true,
            },

            {
                id: 8,
                petId: 5,
                url: "https://images.dog.ceo/breeds/mountain-bernese/n02107683_7196.jpg",
                preview: true,
            },
            {
                id: 9,
                petId: 5,
                url: "https://images.dog.ceo/breeds/weimaraner/n02092339_3306.jpg",
                preview: false,
            },

                {
                id: 10,
                petId: 6,
                url: "https://cdn2.thecatapi.com/images/d6t.png",
                preview: true,
            },
            {
                id: 11,
                petId: 6,
                url: "https://cdn2.thecatapi.com/images/tt01SNoSH.png",
                preview: false,
            },

            {
                id: 12,
                petId: 7,
                url: "https://images.dog.ceo/breeds/cockapoo/Guri9.jpg",
                preview: true,
            },

            {
                id: 13,
                petId: 8,
                url: "https://images.dog.ceo/breeds/australian-kelpie/IMG_2599.jpg",
                preview: true,
            },
            {
                id: 14,
                petId: 8,
                url: "https://images.dog.ceo/breeds/rajapalayam-indian/Rajapalayam-dog.jpg",
                preview: false,
            },

            {
                id: 15,
                petId: 9,
                url: "https://cdn2.thecatapi.com/images/MjAyMjUwMw.jpg",
                preview: true,
            },

            {
                id: 16,
                petId: 10,
                url: "https://images.dog.ceo/breeds/basenji/n02110806_5389.jpg",
                preview: true,
            },
            {
                id: 17,
                petId: 10,
                url: "https://images.dog.ceo/breeds/borzoi/n02090622_3958.jpg",
                preview: false,
            },

            {
                id: 18,
                petId: 11,
                url: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_1874.jpg",
                preview: true,
            },
            {
                id: 19,
                petId: 11,
                url: "https://images.dog.ceo/breeds/labrador/Toblerone_4.jpg",
                preview: false,
            },

            {
                id: 20,
                petId: 12,
                url: "https://cdn2.thecatapi.com/images/2gn.jpg",
                preview: true,
            },
            {
                id: 21,
                petId: 12,
                url: "https://cdn2.thecatapi.com/images/klJJYDl2B.jpg",
                preview: false,
            },

            {
                id: 22,
                petId: 13,
                url: "https://images.dog.ceo/breeds/setter-irish/n02100877_2741.jpg",
                preview: true,
            },

            {
                id: 23,
                petId: 14,
                url: "https://images.dog.ceo/breeds/kombai/Kombai-indian-Dog.jpg",
                preview: true,
            },
            {
                id: 24,
                petId: 14,
                url: "https://images.dog.ceo/breeds/terrier-norwich/n02094258_230.jpg",
                preview: false,
            },

            {
                id: 25,
                petId: 15,
                url: "https://images.dog.ceo/breeds/terrier-norwich/n02094258_2032.jpg",
                preview: true,
            },
            {
                id: 26,
                petId: 15,
                url: "https://images.dog.ceo/breeds/kuvasz/n02104029_409.jpg",
                preview: false,
            },

            {
                id: 27,
                petId: 16,
                url: "https://images.dog.ceo/breeds/eskimo/n02109961_2584.jpg",
                preview: true,
            },

            {
                id: 28,
                petId: 17,
                url: "https://cdn2.thecatapi.com/images/82r.gif",
                preview: true,
            },
            {
                id: 29,
                petId: 17,
                url: "https://cdn2.thecatapi.com/images/bbg.jpg",
                preview: false,
            },

            {
                id: 30,
                petId: 18,
                url: "https://images.dog.ceo/breeds/ridgeback-rhodesian/n02087394_3275.jpg",
                preview: true,
            },
            {
                id: 31,
                petId: 18,
                url: "https://images.dog.ceo/breeds/keeshond/n02112350_10283.jpg",
                preview: false,
            },

            {
                id: 32,
                petId: 19,
                url: "https://cdn2.thecatapi.com/images/9q5.jpg",
                preview: true,
            },

            {
                id: 33,
                petId: 20,
                url: "https://cdn2.thecatapi.com/images/b50.gif",
                preview: true,
            },
            {
                id: 34,
                petId: 20,
                url: "https://cdn2.thecatapi.com/images/Ak9enJjbC.jpg",
                preview: false,
            },

            {
                id: 35,
                petId: 21,
                url: "https://images.dog.ceo/breeds/kuvasz/n02104029_4672.jpg",
                preview: true,
            },

            {
                id: 36,
                petId: 22,
                url: "https://images.dog.ceo/breeds/terrier-norwich/n02094258_773.jpg",
                preview: true,
            },

            {
                id: 37,
                petId: 23,
                url: "https://cdn2.thecatapi.com/images/18l.gif",
                preview: true,
            },

            {
                id: 38,
                petId: 24,
                url: "https://images.dog.ceo/breeds/pointer-germanlonghair/hans2.jpg",
                preview: true,
            },
            {
                id: 39,
                petId: 24,
                url: "https://images.dog.ceo/breeds/buhund-norwegian/hakon2.jpg",
                preview: false,
            },

            {
                id: 40,
                petId: 25,
                url: "https://cdn2.thecatapi.com/images/43o.jpg",
                preview: true,
            },

            {
                id: 41,
                petId: 26,
                url: "https://images.dog.ceo/breeds/cockapoo/big-eye-ginger.jpg",
                preview: true,
            },
            {
                id: 42,
                petId: 26,
                url: "https://images.dog.ceo/breeds/doberman/n02107142_5395.jpg",
                preview: false,
            },

            {
                id: 43,
                petId: 27,
                url: "https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg",
                preview: true,
            },

            {
                id: 44,
                petId: 28,
                url: "https://cdn2.thecatapi.com/images/ySzdVwyb1.jpg",
                preview: true,
            },
            {
                id: 45,
                petId: 28,
                url: "https://cdn2.thecatapi.com/images/a2c.jpg",
                preview: false,
            },

            {
                id: 46,
                petId: 29,
                url: "https://images.dog.ceo/breeds/lhasa/n02098413_17895.jpg",
                preview: true,
            },
            {
                id: 47,
                petId: 29,
                url: "https://images.dog.ceo/breeds/cotondetulear/100_2397.jpg",
                preview: false,
            },

            {
                id: 48,
                petId: 30,
                url: "https://cdn2.thecatapi.com/images/Dm0H1zSK1.jpg",
                preview: true,
            },
            {
                id: 49,
                petId: 30,
                url: "https://cdn2.thecatapi.com/images/s4wQfYoEk.jpg",
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
