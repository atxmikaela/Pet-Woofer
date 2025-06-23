/** @format */

import type { Pet } from '../redux/types/pets';

interface PetProps {
	pet: Pet;
}

function PetCard({ pet }: PetProps): JSX.Element {
const eDate = pet.expireDate ? new Date(pet.expireDate).toDateString() : null;
const lastSeen = pet.lastSeenLocation ? pet.lastSeenLocation : null;
return (
	<div className='pet-card-wrapper'>
		{pet.images && pet.images.length > 0 && (
			<img className='card-image' src={pet.images[0].url} alt={pet.name} />
		)}
		<h2>{pet.name}</h2>

		{eDate ? (
			<>
				<h2>Euthanasia Date</h2>
				<h2>{eDate}</h2>
			</>
		) : lastSeen ? (
			<>
				<h2>{pet.status === 'found' ? 'Found at ' : 'Last Seen Location'}</h2>
				<h2>{lastSeen}</h2>
			</>
		) : (
      <h2>{pet.shelter?.name || ''}</h2>
    )}
	</div>
);
}

export default PetCard;


