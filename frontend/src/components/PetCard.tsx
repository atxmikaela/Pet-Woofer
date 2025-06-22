import type {Pet} from "../redux/types/pets";





interface PetProps {
    pet: Pet;
    }

function PetCard({pet}: PetProps): JSX.Element {

return (
	<>
        {pet.images && pet.images.length > 0 && (
            <img
                src={pet.images[0].url}
                alt={pet.name}
                style={{ width: '300px', height: 'auto' }}
            />
        )}
		<h2>{pet.name}</h2>

		<h2>{pet.shelter?.name || 'Unknown'}</h2>
	</>
);
      }


//  {pet.images && pet.images.length > 0 && (

                //     <img
                //         src={pet.images[0].url}
                //         alt={pet.name}
                //         style={{ width: '300px', height: 'auto' }}
                // />
                // pet.images[0].url
export default PetCard;