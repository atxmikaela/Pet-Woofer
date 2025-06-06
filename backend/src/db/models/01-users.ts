import { Association, CreationOptional, DataTypes, Model, Optional } from 'sequelize';

const { Validator } = require('sequelize');

type UserAttributes = {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    role: string,
    phone: string,
    email: string,
    hashedPassword: string,
    shelterId: number,
    isActive: boolean,
    emailVerified: boolean,
};

type UserCreationAttributes = Optional<
    UserAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {

    class User extends Model<UserAttributes, UserCreationAttributes> {
        declare id: CreationOptional<number>;
        declare firstName: string;
        declare lastName: string;
        declare role: string;
        declare phone: string;
        declare email: string;
        declare username: string;
        declare hashedPassword: string;
        declare shelterId: number;
        declare isActive: boolean;
        declare emailVerified: boolean;
  
        async getSafeUser() {
            const safeUser = {
                id: this.id,
                email: this.email,
                phone: this.phone,
                username: this.username,
                role: this.role,
                firstName: this.firstName,
                lastName: this.lastName,
                shelterId: this.shelterId,
                isActive: this.isActive,
                emailVerified: this.emailVerified,
            };
            return safeUser
        }

        static associate(models: any) {
            // Associations go here
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
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isGoodLength(value: string) {
                        if (value.length < 10 || value.length > 10) {
                            throw new Error('Mobile Number must be 10 digits');
                        }
                    }
                }

            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Public",
                validate: {
                    isValidRole(value: string) {
                        if (value !== "Public") {
                            throw new Error('Must be either Admin, Shelter Staff, Volunteer, or Public')
                        }
                    }
                }
            },
            shelterId: {
                type: DataTypes.INTEGER,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            emailVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
         },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ["hashedPassword", "email", "phone", "role", "isActive", "shelterId", "emailVerified", "createdAt", "updatedAt"]
                }
            },
        }
    )
    return User;
}
