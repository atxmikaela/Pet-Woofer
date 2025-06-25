import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type PetAttributes = {
    id: number,
    name: string,
    species: string,
    breed: string,
    age: number,
    gender: string,
    size: string,
    color:string,
    fee: number,
    description: string,

    status: string,
    shelterId: number | null,
    userId: number | null,
    lastSeenLocation: string,
    lastSeenDate: Date,
    expireDate: Date,
    createdAt: Date,
    updatedAt: Date,
};

type PetCreationAttributes = Optional<PetAttributes, 'id' | 'createdAt' | 'updatedAt'>;

module.exports = (sequelize: any, DataTypes: any) => {
    class Pet extends Model<PetAttributes, PetCreationAttributes> {
        declare id: CreationOptional<number>;
        declare name: string;
        declare species: string;
        declare breed: string;
        declare age: number;
        declare gender: string;
        declare size: string;
        declare color: string;
        declare fee: number;
        declare description: string;

        declare status: string;
        declare shelterId: ForeignKey<number | null>;
        declare userId: ForeignKey<number | null>;
        declare lastSeenLocation: string;
        declare lastSeenDate: Date;
        declare expireDate: Date;
        declare createdAt: CreationOptional<Date>;
        declare updatedAt: CreationOptional<Date>;

        static associate(models: any) {
            Pet.belongsTo(models.Shelter, { foreignKey: 'shelterId', as: "shelter" });
            Pet.belongsTo(models.User, { foreignKey: 'userId', as: "User" });
            Pet.hasMany(models.PetImage, { foreignKey: 'petId', as: 'images', onDelete: 'cascade', hooks: true });
        }
    }

    Pet.init(
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
            species: {
                type: DataTypes.STRING,
                allowNull: false
            },
            breed: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false
            },
            fee: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'available'
            },
            shelterId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            lastSeenLocation: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastSeenDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            expireDate: {
                type: DataTypes.DATE,
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
            modelName: "Pet",
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    );
    return Pet;
};