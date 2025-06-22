import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getPetsThunk } from "../redux/pets";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";










const Splash = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const pets = useAppSelector((state) => state.pets.byId);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    useEffect(() => {
        const getPets = async () => {
             await dispatch(getPetsThunk())
             setIsLoaded(true)
        };
        getPets();
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


    if (!isLoaded) {
       return <h1>Site is loading...</h1>
    }   
return (
	<>
	
			{atRiskPets.slice(0, 5).map((pet) => (
				
				<div key={pet.id}
					onClick={(e) => viewPet(e, pet.id)}>
					<PetCard pet={pet} />
				</div>
			))}
	

		<h2>For Adoption</h2>

		<div>
			{pets
				? Object.values(pets)
						.reverse()
						.map((pet) => (
							<div
								className='pet-container'
								key={pet.id}
								onClick={(e) => viewPet(e, pet.id)}>
								<PetCard pet={pet} />
							</div>
						))
				: null}
		</div>
	</>
);
};

export default Splash;