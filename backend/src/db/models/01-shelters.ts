import {CreationOptional, Model, Optional} from 'sequelize';

type ShelterAttributes = {
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    email: string,
    website: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
};

type ShelterCreationAttributes = Optional<ShelterAttributes, 'id' | 'createdAt' | 'updatedAt'>;

module.exports = (sequelize: any, DataTypes: any) => {
    class Shelter extends Model<ShelterAttributes, ShelterCreationAttributes> {
        declare id: CreationOptional<string>;
        declare name: string;
        declare address: string;
        declare city: string;
        declare state: string;
        declare zip: string;
        declare phone: string;
        declare email: string;
        declare website: string;
        declare description: string;
        declare createdAt: CreationOptional<Date>;
        declare updatedAt: CreationOptional<Date>;

        static associate(models: any) {
            Shelter.hasMany(models.User, { foreignKey: 'shelterId', onDelete: 'cascade', hooks: true });
            Shelter.hasMany(models.Pet, { foreignKey: 'shelterId', onDelete: 'cascade', hooks: true });
        }
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
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
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
    );
    return Shelter;
};