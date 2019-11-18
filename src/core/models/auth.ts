module.exports = (sequelize: any, DataTypes: any): any => {
    const Auth = sequelize.define(
        'auth',
        {
            email: DataTypes.STRING,
            phone_number: DataTypes.STRING,
            pin: DataTypes.INTEGER,
            role_id: DataTypes.INTEGER,
            is_active: DataTypes.INTEGER,
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            tableName: 'auth',
            paranoid: true,
            timestamps: true
        }
    );
    Auth.associate = (models: any): any => {};
    return Auth;
};
