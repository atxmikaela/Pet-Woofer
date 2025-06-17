import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";
import { setImageThunk } from "../redux/images";




const ImageSubmit = (): JSX.Element => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [ image, setImage ] = useState<File | null>( null );
    const [ imageLoading, setImageLoading ] = useState( false );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        setImageLoading( true );
        const formData = new FormData();
        if(image) formData.append('image', image);
        await dispatch( setImageThunk( formData ) );
        navigate( "/images" );
    }


    return (
        <>
            <form
                onSubmit={ handleSubmit }
                encType="multipart/form-data"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setImage(e.target.files[0])}
                />
                <button type="submit">Submit</button>
                { ( imageLoading ) && <p>Loading...</p> }
            </form>
        

        </>
    )


}

export default ImageSubmit;