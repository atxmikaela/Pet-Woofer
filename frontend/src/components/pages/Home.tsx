import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAdoptsThunk } from "../../redux/adopts";



const Adopts = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const adopts = useAppSelector((state) => state.adopts);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    
    useEffect(() => {
        const getAdopts = async () => {
             await dispatch(getAdoptsThunk())
             setIsLoaded(true)
        };
        getAdopts();
    }, [dispatch])



    if (!isLoaded) {
       return <h1>Site is loaded...</h1>
    }   
    return (
        <div>
            <h1>Welcome to the Home Page</h1>

            {adopts.byId[2].name}

            {/* {adopts.map((adopt) => (
                <div key={adopt.id}>
                <p>{adopt.name}</p>
                </div>
            ))} */}


      
        </div>
    );
};


export default Adopts;