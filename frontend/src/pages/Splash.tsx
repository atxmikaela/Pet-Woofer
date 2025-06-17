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

    const viewAdopt = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | any, petId: number) => {
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
        {pets ? Object.values(pets).map((pet, idx) => (
            <div className="pet-container" key={idx} onClick={(e) => viewAdopt(e, pet.id)}>
                <h1>{`Pet Name - ${pet.name}`}</h1>
            </div>
        )) : null}
    </div>

    <ImageSubmit />
    </>
);
};


export default Splash;