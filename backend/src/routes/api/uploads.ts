
const { multiplePublicFileUpload, multipleMulterUpload } = require ('../../awsS3');
import db from '../../db/models';

import express from 'express';
const router = express.Router();

router.post('/images/:petId',

    multipleMulterUpload("image"),
    async (req: any, res: any) => {
         try {
            const petId = req.params.petId;
            
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ errors: ['No images :( '] });
            }

            const imageUrls = await multiplePublicFileUpload(req.files);

            const petImages = await Promise.all(
                imageUrls.map((url: string, index: number) =>
                    db.PetImage.create({
                        petId: Number(petId),
                        url: url,
                        preview: index === 0
                    })
                )
            );

            return res.json({ 
                success: true,
                imageUrls, 
                petImages 
            });
        } catch (error: any) {
            console.error('Image upload error:', error);
            return res.status(500).json({ 
                errors: [error.message || 'Failed to upload images'] 
            });
        }
    }
);

router.delete('/images/:imageId', async (req: any, res: any) => {
    try {
        const imageId = req.params.imageId;

        const image = await db.PetImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ errors: ['Pet image not found'] });
        }

        await image.destroy();

        return res.json({ sucess: true });
    } catch (error: any) {
        console.error('Image delete error:', error);
        return res.status(500).json({
            errors: [error.message || 'Failed to delete image']
        });
    
    }
});


export = router;