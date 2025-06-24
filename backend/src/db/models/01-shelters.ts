import { Association, CreationOptional, DataTypes, Model, Optional, type ForeignKey } from 'sequelize';

const { Validator } = require('sequelize');

type ShelterAttributes = {
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    lat: number,
    lon: number,
    phone: string,
    email: string,
    website: string,
    description: string,
    userId: number,
};

type ShelterCreationAttributes = Optional<
    ShelterAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Shelter extends Model<ShelterAttributes, ShelterCreationAttributes> {
        declare id: CreationOptional<number>;
        declare name: string;
        declare address: string;
        declare city: string;
        declare state: string;
        declare zip: string;
        declare lat: number;
        declare lon: number;
        declare phone: string;
        declare email: string;
        declare website: string;
        declare description: string;
        declare userId: ForeignKey<Shelter['id']>;


        static associate(models: any) {
            // Associations go here

        
        Shelter.hasMany(models.User, {foreignKey: 'userId' });
        Shelter.hasMany(models.Pet, { foreignKey: 'petId' });
    }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };


    }
    Shelter.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lat: {
                type: DataTypes.DECIMAL(10, 8),
            },
            lon: {
                type: DataTypes.DECIMAL(10, 8),
            },
            phone: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            website: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(1000),
                
            },
            userId: {
                type: DataTypes.INTEGER,
                    references: {
                    model: {
                        tableName: 'Users',
                    },
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            modelName: "Shelter",
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    )
    return Shelter;
}
