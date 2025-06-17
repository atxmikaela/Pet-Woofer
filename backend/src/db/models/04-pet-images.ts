import { Association, CreationOptional, DataTypes, Model, Optional, ForeignKey } from 'sequelize';



const { Validator } = require( 'sequelize' );

type PetImageAttributes = {
    id: number,
    petId: number,
    url: string,
    preview: boolean;

};


type PetImageCreationAttribute = Optional<
    PetImageAttributes, 'id'>;

module.exports = ( sequelize: any, DataTypes: any ) => {

    class PetImage extends Model<PetImageAttributes, PetImageCreationAttribute>
    {
        declare id: CreationOptional<number>;
        declare petId: ForeignKey<PetImage[ 'id' ]>;
        declare url: string;
        declare preview: boolean;


        static associate ( models: any )
        {
            PetImage.belongsTo( models.Pet, { foreignKey: 'petId' } );
        }

        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    PetImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            petId: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            preview: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }

        },
        {
            sequelize,
            modelName: "PetImage",
            defaultScope: {
                attributes: {
                    exclude: [ "createdAt", "updatedAt" ]
                }
            },
        }
    );
    return PetImage;
};
