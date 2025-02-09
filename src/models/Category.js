module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
              },
              name: DataTypes.STRING,
            },
            {
              timestamps: false,
              tableName: 'categories',
            });
          
    return Category;
};