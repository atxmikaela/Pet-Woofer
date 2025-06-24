import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getPetsThunk } from "../redux/pets";
import { useNavigate, useSearchParams } from "react-router-dom";
import PetCard from "../components/PetCard";
import {getSheltersThunk} from "../redux/shelters";
import type {IShelter} from "../redux/types/shelters";




const Splash = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const pets = useAppSelector((state) => state.pets.byId);
    const shelters = useAppSelector((state) => (state.shelters as { byId: Record<number, IShelter> }).byId);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const filterParam = searchParams.get('filter');

 
    
    useEffect(() => {
        const getData = async () => {
             await dispatch(getPetsThunk())
             await dispatch(getSheltersThunk())
             setIsLoaded(true)
        };
        getData();
    }, [dispatch])

    const atRiskPets = Object.values(pets)
        .filter(pet => pet.expireDate)
        .sort((a, b) => {
            if (!a.expireDate || !b.expireDate) return 0;
           return new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime();
        });

    const viewPet = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | any, petId: number) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/pet/${petId}`)
    }
    const viewShelter = (
			e: React.MouseEvent<HTMLDivElement, MouseEvent> | any, shelterId: number) => {
			e.preventDefault();
			e.stopPropagation();
			navigate(`/shelter/${shelterId}`);
		};

    const getFilteredPets = () => {
        const allPets = Object.values(pets);

        switch(filterParam) {
            case 'available':
                return allPets.filter(pet => pet.status === 'available');
            case 'missing':
                return allPets.filter(pet => pet.status === 'missing');
            case 'found':
                return allPets.filter(pet => pet.status === 'found');
            default:
                return null;
        }
    };

    const filteredPets = getFilteredPets();

    if (!isLoaded) {
       return <h1>Site is loading...</h1>
    }

    if (filterParam === 'shelters') {
        return (
            <div className='splash-wrapper'>
                <div className='section-wrapper'>
                    <h2 className='section-header'>Area Shelters and Pet Rescue Organizations</h2>
                    <div className='shelter-wrapper'>
                        {Object.values(shelters).map((shelter) => (
                            <button
                                className='shelter-button'
                                key={shelter?.id}
                                onClick={(e) => viewShelter(e, shelter?.id)}>
                                <h3>{shelter?.name}</h3>
                                <p>{shelter?.address}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (filteredPets) {
        return (
            <div className="splash-wrapper">
            <div className='section-wrapper'>
            <h2 className='section-header'>

            {filterParam === 'missing' && 'Missing Pets'}
            {filterParam === 'available' && 'Available Pets'}
            {filterParam === 'found' && 'Found Pets'}

            </h2>
            <div className="row-wrapper">
                {filteredPets?.map((pet) => (
                    <div
                    className="pet-container"
                    key={pet.id}
                    onClick={(e) => viewPet(e, pet.id)}>
                    <PetCard pet={pet} />
                    </div>
                ))}
            </div>
            </div>
            </div>
        )
    } else {

return (
	<div className='page-wrapper'>
		<div className='section-wrapper'>
			<div className='risk-wrapper'>
				<h2 className='section-header'>
					These amazing pets are at risk of being euthanized
				</h2>
				<div className='row-wrapper'>
					{atRiskPets.slice(0, 4).map((pet) => (
						<div key={pet.id} onClick={(e) => viewPet(e, pet.id)}>
							<PetCard pet={pet} />
						</div>
					))}
				</div>
			</div>
		</div>
		<div className='page-wrapper'>
			<div className='section-wrapper'>
				<div className='missing-wrapper'>
					<h2 className='section-header'>Lost and Found pets in our area</h2>
					<div className='row-wrapper'>
						{Object.values(pets)
							.filter((pet) => ['missing', 'found'].includes(pet.status))
							.slice(0, 8)
							.map((pet) => (
								<div
									className='pet-container'
									key={pet.id}
									onClick={(e) => viewPet(e, pet.id)}>
									<PetCard pet={pet} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
		<div className='page-wrapper'>
			<div className='section-wrapper'>
				<div className='adopt-wrapper'>
					<h2 className='section-header'>
						Pets For Adoption - Randomized because they all matter!
					</h2>
					<div className='row-wrapper'>
						{Object.values(pets)
							.filter((pet) => !pet.expireDate && pet.shelterId)
							.sort(() => Math.random() - 0.5)
							.slice(0, 8)
							.map((pet) => (
								<div
									className='pet-container'
									key={pet.id}
									onClick={(e) => viewPet(e, pet.id)}>
									<PetCard pet={pet} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
		<h2>Area Shelters and Pet Rescue Organizations</h2>
		<div className='shelter-wrapper'>
			{Object.values(shelters).map((shelter) => (
				<button
					className='shelter-button'
					key={shelter?.id}
					onClick={(e) => viewShelter(e, shelter?.id)}>
					<h3>{shelter?.name}</h3>
					<p>{shelter?.address}</p>
				</button>
			))}
		</div>
	</div>
);

}
}

export default Splash;