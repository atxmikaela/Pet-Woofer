import { text } from 'aws-sdk/clients/customerprofiles';
import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type AdoptAttributes = {
    id: number,
    name: string,
    species: string,
    breed: string,
    age: string,
    gender: string,
    size: string,
    fee: number,
    status: string,
    description: text,
    shelterId: number,
    userId: number
};

type AdoptCreationAttributes = Optional<
    AdoptAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class Adopt extends Model<AdoptAttributes, AdoptCreationAttributes> {
        declare id: CreationOptional<number>;
        declare name: string;
        declare species: string;
        declare breed: string;
        declare age: string;
        declare gender: string;
        declare size: string;
        declare fee: number;
        declare status: string;
        declare description: text;
        declare shelterId: number;
        declare userId: number;



        static associate(models: any) {
            // Associations go here

            Adopt.belongsTo(models.User, { foreignKey: 'userId', as: 'Owner' });
            Adopt.belongsTo(models.Shelter, { foreignKey: 'shelterId', as: 'Rescue' });
          
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

            public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    Adopt.init(
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
            species: {
                type: DataTypes.STRING,
                allowNull: false
            },
            breed: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.INTEGER,
            },
            fee: {
                type: DataTypes.INTEGER,
            },
            status: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING(1000),
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
            modelName: "Adopt",
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    )
    return Adopt;
}
