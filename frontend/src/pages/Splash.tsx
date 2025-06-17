import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getPetsThunk } from "../redux/pets";
import { useNavigate } from "react-router-dom";
import ImageSubmit from "../components/ImageSubmit";

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
    <div className='main-contain'>

        <h2>At risk of euthanasia!!</h2>
        {atRiskPets.slice(0, 5).map(pet => (
            <div className="pet-container" key={pet.id} onClick={(e) => viewPet(e, pet.id)}>
                <h1>{`Pet Name - ${pet.name}`}</h1>
            </div>
        ))}
    </div>

        <h2>For Adoption</h2>
        {pets ? Object.values(pets).map((pet) => (
            <div className="pet-container" key={pet.id} onClick={(e) => viewPet(e, pet.id)}>
                <h1>{`Pet Name - ${pet.name}`}</h1>
            </div>
        )) : null}
    
    <ImageSubmit />
    </>
);
};

export default Splash;