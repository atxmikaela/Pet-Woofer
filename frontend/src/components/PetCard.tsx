import type {Pet} from "../redux/types/pets";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';




interface PetProps {
    pet: Pet;
    }

function PetCard({ pet }: PetProps): JSX.Element {

return <Card sx={{ maxWidth: 310,
                    height: 320,
                    
 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={pet.images?.[0]?.url || ''}
            alt={pet.name}
            />
       <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {pet.name}
          </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {pet.shelter?.name || 'Unknown'}
        </Typography>
        </CardContent> 
 
      
      </CardActionArea>
       </Card>
}


//  {pet.images && pet.images.length > 0 && (

                //     <img
                //         src={pet.images[0].url}
                //         alt={pet.name}
                //         style={{ width: '300px', height: 'auto' }}
                // />
                // pet.images[0].url
export default PetCard;