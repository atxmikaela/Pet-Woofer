import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type UserAttributes = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    hashedPassword: string,
    role: string,
    shelterId: number,
};


type UserCreationAttributes = Optional<
    UserAttributes, 'id'>;

type RoleAttributes = 'Public' | 'KPA Volunteer' | 'Shelter Volunteer' | 'KPA Staff' | 'Shelter Staff' | 'Admin';

module.exports = (sequelize: any, DataTypes: any) => {

    

    class User extends Model<UserAttributes, UserCreationAttributes> {
        declare id: CreationOptional<number>;
        declare firstName: string;
        declare lastName: string;
        declare email: string;
        declare username: string;
        declare hashedPassword: string;
        declare shelterId: number;
        declare role: RoleAttributes;


    async getSafeUser() {
            const safeUser = {
                id: this.id,
                email: this.email,
                username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                role: this.role,
            };
            return safeUser
            
        }

        static associate(models: any) {
            // Associations go here
            User.hasMany(models.Pet, {foreignKey: 'userId', onDelete: 'cascade', hooks: true});

            User.belongsTo(models.Shelter, {foreignKey: 'userId'});
        }
        // declare public static associations: { [key: string]: Association<Model<any, any>, Model<any, any>>; };

    }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 30) {
                            throw new Error('First name must be between 1 - 30 characters');
                        }
                    },
                }
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 1 || value.length > 30) {
                            throw new Error('Last name must be between 1 - 30 characters');
                        }
                    },
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 6 || value.length > 12) {
                            throw new Error('Username must be between 6 - 12 characters');
                        }
                    },
                    isNotEmail(value: string) {
                        if (Validator.isEmail(value)) {
                            throw new Error("Cannot be an email.");
                        }
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 3 || value.length > 256) {
                            throw new Error('Email must be between 3 - 256 characters');
                        }
                    },
                    isEmail: true
                }
            },
            hashedPassword: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [60, 60]
                }
            },
            role: {
                type: DataTypes.ENUM('Public', 'KPA Volunteer', 'Shelter Volunteer', 'Shelter Staff', 'KPA Staff', 'Admin'),
                allowNull: false,
                defaultValue: 'Public'                
            },
            shelterId: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "createdAt", "updatedAt"]
                }
            },
        }
    )
    return User;
}
