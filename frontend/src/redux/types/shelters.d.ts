import { Pet } from './pets';

export interface IShelter {
	id: number;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	lat: number;
	lon: number;
	phone: string;
	email: string;
	website: string;
	description: string;
	userId: number;
	createdAt: string;
	updatedAt: string;
}

export interface IShelterById {
	[id: number | string]: IShelter;
}


export interface IShelterState {
	byId: {
		[id: number | string]: IShelter;
	};
}

export interface IActionCreator {
	type: string;
	payload: any;
}