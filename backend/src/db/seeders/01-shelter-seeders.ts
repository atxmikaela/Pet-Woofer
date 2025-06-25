'use strict';

import { OptionsInterface } from "../../typings/seeders";

let options:OptionsInterface = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Shelters';
    return queryInterface.bulkInsert(
			options,
			[
				{
					name: 'Kerrville Pets Alive!',
					address: '2102 Memorial Blvd',
					city: 'Kerrville',
					state: 'TX',
					zip: '78028', 
					phone: '(830) 200-0539',
					email: 'info@kerrvillepetsalive.org',
					website: 'https://kerrvillepetsalive.com',
					description: 'Kerrville Pets Alive! mission is to save adoptable cats and dogs impounded at Kerr County Animal Services from euthanasia. We have substantially decreased the number of cat and dog euthanasias by providing resources and support to save lives. We facilitate adoptions and work with the community to educate about responsible pet ownership.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Animal Welfare Society of Kerr County (Freeman-Fritts)',
					address: '515 Spur 100',
					city: 'Kerrville',
					state: 'TX',
					zip: '78028', 
					phone: '(830) 257-4144',
					email: 'info@freemanfritts.com',
					website: 'https://www.freemanfritts.com',
					description: 'Freeman-Fritts is a no-kill animal shelter that opened in 1986 as a 501(c)(3) non-profit organization. Situated on 5 acres, we promote adoptions of homeless animals and provide low-cost veterinary services, spay/neuter programs, boarding, and grooming. We coordinate with Kerr County Animal Control and rescue organizations across Texas.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Kathleen C. Cailloux Humane Society of Kerrville',
					address: '2900 Junction Highway',
					city: 'Kerrville',
					state: 'TX',
					zip: '78028', 
					phone: '(830) 367-7722',
					email: 'hsk@hctc.net',
					website: 'https://humanesocietyofkerrville.org',
					description: 'Founded in 1985, the Humane Society of Kerrville is dedicated to placing as many animals as possible in quality homes. We are a no-kill facility that moved to our current location in 2002 through the generosity of the Kathleen C. Cailloux Family Trust. We also operate a resale shop on property to support our mission.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Kerr County Animal Services',
					address: '3600 Loop 534',
					city: 'Kerrville',
					state: 'TX',
					zip: '78028',  
					phone: '(830) 257-3100',
					email: 'animalcontrol@co.kerr.tx.us',
					website: 'https://kerrcountytx.gov/kerr-county-all-departments/kerr-county-animal-services',
					description: 'Kerr County Animal Services is the official animal control for Kerr County. We provide adoption and rescue programs for animals in need of good homes, serve as the local rabies control authority, and assist with wildlife situations. We work closely with local rescue organizations to save as many animals as possible.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Texas Round Up Animal Alliance (TRUAA)',
					address: '530 McDonald Loop',
					city: 'Center Point',
					state: 'TX',
					zip: '78010', 
					phone: '(830) 955-2670',
					email: 'ronni@truaa.org',
					website: 'https://www.texasroundupanimalalliance.com',
					description: 'Texas Round Up Animal Alliance (TRUAA) is a nonprofit dog rescue dedicated to stopping the euthanasia of healthy, adoptable and treatable homeless dogs. We are a small facility housing 20-25 dogs at a time, providing one-on-one attention, veterinary care, full vaccinations and training. We help Kerr County residents with their pets and save dogs from Kerr County Animal Services before euthanasia. We also offer spay/neuter assistance, pet food, and supplies to families in need.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Buck Wild Rescue & Wildlife Rehabilitation',
					address: '285 Lazy Creek Road',
					city: 'Ingram',
					state: 'TX',
					zip: '78025',  
					phone: '(830) 990-9085',
					email: 'info@buckwildrescue.org',
					website: 'https://buckwildrescue.org',
					description: 'Buck Wild Rescue is a 501(c)(3) wildlife and animal rescue organization established in 2016. We are licensed to rehabilitate most types of wildlife serving Kerr, Bandera, Medina, Bexar, Kendall, Gillespie, Real, and Edwards counties. We provide individualized care for orphaned, sick, and injured wildlife with the goal of releasing them back to their natural habitat.',
					createdAt: new Date(),
					updatedAt: new Date()
				},
				{
					name: 'Hill Country SPCA',
					address: '2981 S State Hwy 16',
					city: 'Fredericksburg',
					state: 'TX',
					zip: '78624', 
					phone: '(830) 990-9085',
					email: 'info@hillcountryspca.com',
					website: 'https://www.hillcountryspca.com',
					description: 'The Hill Country SPCA is a private, non-profit, no-kill animal shelter servicing the Texas Hill Country including Kerr County. We are not affiliated with any other shelter and receive no government funding. We take in animals from partner shelters at risk of euthanasia, owner surrenders, and animals from hoarding and cruelty situations. Our vision is safety, community and a home for every pet in the Hill Country.',
					createdAt: new Date(),
					updatedAt: new Date()
				}
			],
			{},
		);
  },

  down: async (queryInterface:any, Sequelize:any) => {
    options.tableName = 'Shelters';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Kerrville Pets Alive!', 'Animal Welfare Society of Kerr County (Freeman-Fritts)', 'Kathleen C. Cailloux Humane Society of Kerrville', 'Kerr County Animal Services', 'Texas Round Up Animal Alliance (TRUAA)', 'Buck Wild Rescue & Wildlife Rehabilitation', 'Hill Country SPCA'] }
    }, {});
  }
};
