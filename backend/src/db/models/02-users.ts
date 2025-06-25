import {CreationOptional, Model, Optional, ForeignKey} from 'sequelize';

type UserAttributes = {
    id: number,
    firstName: string,
    lastName: string,
    role: string,
    shelterId: number,
    username: string,
    email: string,
    hashedPassword: string,
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes, UserCreationAttributes> {
        declare id: CreationOptional<number>;
        declare firstName: string;
        declare lastName: string;
        declare role: string;
        declare shelterId: ForeignKey<number>;
        declare username: string;
        declare email: string;
        declare hashedPassword: string;



        getSafeUser() {
            const safeUser = {
                id: this.id,
                email: this.email,
                username: this.username,
                firstName: this.firstName,
                lastName: this.lastName,
                role: this.role,
                shelterId: this.shelterId,
            };
            return safeUser
    }

            static associate(models: any) {
            User.belongsTo(models.Shelter, { foreignKey: 'shelterId', as: "Shelter" });
        }
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
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            },
            shelterId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            hashedPassword: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: {
                    exclude: ['hashedPassword']
                }
            },
        }
    );
    return User;
};