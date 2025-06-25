import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type PetImageAttributes = {
    id: number,
    petId: number,
    url: string,
    preview: boolean
};

type PetImageCreationAttributes = Optional<PetImageAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {
    class PetImage extends Model<PetImageAttributes, PetImageCreationAttributes> {
        declare id: CreationOptional<number>;
        declare petId: ForeignKey<number>;
        declare url: string;
        declare preview: boolean;

        static associate(models: any) {
            PetImage.belongsTo(models.Pet, { foreignKey: 'petId', as: "Pet" });
        }
    }

    PetImage.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            petId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            preview: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: "PetImage",
            timestamps: false,
            defaultScope: {
                attributes: {
                    exclude: []
                }
            },
        }
    );
    return PetImage;
};