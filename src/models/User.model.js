const { date } = require("joi")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            display_name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            password: { type: DataTypes.STRING },
            image: { type: DataTypes.STRING },
        },
        {
            timestamps: false,
            underscored: true,
        },
    );
    return User;
}