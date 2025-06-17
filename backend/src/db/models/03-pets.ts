import { text } from 'aws-sdk/clients/customerprofiles';
import { Association, CreationOptional, DataTypes, Model, Optional, type BelongsToGetAssociationMixin, type ForeignKey, type HasManyAddAssociationMixin, type HasManyCreateAssociationMixin, type HasManyGetAssociationsMixin } from 'sequelize';

const { Validator } = require('sequelize');

type PetAttributes = {
    id: number,
    name: string,
    species: string,
    breed: string,
    age: string,
    description: string,
    gender: string,
    size: string,
    color?: string | null;
    status: 'adopted' | 'missing' | 'found' | 'available' | 'protective custody' | 'not available' | 'expired',
    expireDate?: Date | null;
    lastSeenLocation?: string | null;
    lastSeenDate?: Date | null;
    fee: number,
    shelterId?: number | null,
    userId: number,
    createdAt?: Date;
    updatedAt?: Date;
};

type PetCreationAttributes = Optional<PetAttributes, 'id' | 'shelterId' | 'color' | 'expireDate' | 'lastSeenDate' | 'fee' | 'createdAt' | 'updatedAt'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Pet extends Model<PetAttributes, PetCreationAttributes> implements PetAttributes {


        declare id: number;
        declare name: string;
        declare species: string;
        declare breed: string;
        declare age: string;
        declare description: string;
        declare gender: string;
        declare size: string;
        declare color: string | null;
        declare status: 'adopted' | 'missing' | 'found' | 'available' | 'protective custody' | 'not available' | 'expired';
        declare expireDate: Date | null;
        declare lastSeenLocation: string | null;
        declare lastSeenDate: Date | null;
        declare fee: number;
 
        
        declare userId: ForeignKey<number>;
        declare shelterId: ForeignKey<number>;
        
        declare readonly createdAt: Date;
        declare readonly updatedAt: Date;

        declare getOwner: BelongsToGetAssociationMixin<any>;
        declare getShelter: BelongsToGetAssociationMixin<any>;
        declare getImages: HasManyGetAssociationsMixin<any>;
        declare addImage: HasManyAddAssociationMixin<any, number>;
        declare createImage: HasManyCreateAssociationMixin<any>;

        static associate(models: any) {
            // Associations go here

        Pet.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'owner'
        });

        Pet.belongsTo(models.Shelter, {
            foreignKey: 'shelterId',
            as: 'shelter',
            constraints: false
        });

        Pet.hasMany(models.PetImage, {
            foreignKey: 'petId',
            as: 'images',
            onDelete: 'CASCADE'
        });

        if (models.PetSighting) {
            Pet.hasMany(models.petSighting, {
                foreignKey: 'petId',
                as: 'sightings',
                onDelete: 'CASCADE'
            });
        }
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

            public static associations: { 
                owner: Association<Pet, any>;
                shelter: Association<Pet, any>;
                images: Association<Pet, any>;
                sightings?: Association<Pet, any>;
            };
    }


    Pet.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false
            },
            species: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            breed: {
                type: DataTypes.STRING(40),
                allowNull: false
            },
            age: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            size: {
                type: DataTypes.STRING(20),
            },
            fee: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.ENUM( 'adopted', 'missing', 'found', 'available', 'protective custody', 'not available', 'expired'),
                allowNull: false,
                defaultValue: 'not available'
            },
            lastSeenLocation: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            lastSeenDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            expireDate: {
                type: DataTypes.DATE
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            shelterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Shelters',
                    key: 'id'
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
        },
        {
            sequelize,
            modelName: "Pet",
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    )
    return Pet;
}
