const { date } = require("joi")

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'categories',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            name: { type: DataTypes.STRING },
        },
        {
            timestamps: false,
            underscored: true,
        },
    );
    return Category;
};