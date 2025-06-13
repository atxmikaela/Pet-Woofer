import { text } from 'aws-sdk/clients/customerprofiles';
import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

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
    description: text,
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
        declare description: text;
        declare userId: number;


        static associate(models: any) {
            // Associations go here

            Shelter.belongsTo(models.User, { foreignKey: 'userId', as: 'Owner' });
          
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
                type: DataTypes.INTEGER,
            },
            lon: {
                type: DataTypes.INTEGER,
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
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
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
