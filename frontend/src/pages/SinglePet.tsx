import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useParams } from "react-router-dom";
import { getPetsThunk } from "../redux/pets";



const SinglePet: React.FC = () => {

    const params = useParams();
    const id: any = params.id;
    console.log(id);
    const dispatch = useAppDispatch();
    const pet: any = useAppSelector((state) => state.pets.byId[id])
    
    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    
    useEffect(() => {

        if (!pet || Object.keys(pet).length === 0) {
        const getAdopts = async () => {
             await dispatch(getPetsThunk())
             setIsLoaded(true)
        };
        getAdopts();
    } else {
        setIsLoaded(true);
        }
    }, [dispatch, pet])



    if (!isLoaded) {
       return <h1>Site is loaded...</h1>
    }   
    return (
        <>
        <div className="single-pet-wrapper">
            <h1>Single Pet Page</h1>

                <h1>Name: { pet.name }</h1>
                <h2>Species: { pet.species }</h2>
                <h2>Breed: { pet.breed }</h2>
                <h2>Age: { pet.age }</h2>
                <h2>Gender: { pet.gender }</h2>
                <h2>Size: { pet.size }</h2>
                <h2>Fee: { pet.fee }</h2>
                <h2>Status: { pet.status }</h2>
                <h2>Description: { pet.description }</h2>
                <h2>Shelter Id: { pet.shelterId }</h2>
                



 


      
        </div>
        </>
    )
};


export default SinglePet;