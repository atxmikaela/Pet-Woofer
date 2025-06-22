import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getPetsThunk } from "../redux/pets";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';









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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: (theme.vars ?? theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));

    if (!isLoaded) {
       return <h1>Site is loading...</h1>
    }   
return (
    <>
             
            <Stack direction="row" 
            sx={{ 
                flexWrap: 'wrap', 
                alignItems: 'flex-start',
                paddingTop: '5px',
                gap: 1,
                 }}>
            
            {atRiskPets.slice(0, 5).map(pet => (
            <Item sx={{
                width: '290px',
                height: '350px',
                padding: 2,
                backgroundColor: 'rgb(255, 255, 255)',
            }}
            
            
            key={pet.id} onClick={(e) => viewPet(e, pet.id)}>
                <PetCard pet={pet} />
                
                </Item>            
        ))}
        </Stack>
        
        <h2>For Adoption</h2>

        <Stack direction='row' sx={{
            marginTop: '100px',
        }}>
       
            

            <Stack direction="row" 
            sx={{ 
                flexWrap: 'wrap', 
                alignItems: 'flex-start',
                paddingTop: '5px',
                gap: 1,
                }}>
            
            {pets ? Object.values(pets).map(pet => (
            <Item sx={{
                width: '290px',
                height: '350px',
                padding: 2,
                backgroundColor: 'rgb(255, 255, 255)',
            }}
            
            
            key={pet.id} onClick={(e) => viewPet(e, pet.id)}>
                <PetCard pet={pet} />
                
                </Item>            
        )) : null}
            </Stack>
            </Stack>
   
    
  
    </>
);
};

export default Splash;