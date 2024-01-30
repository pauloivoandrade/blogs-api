const { date } = require("joi");

module.exports = (sequelize, DataTypes) => {
    const Posts_category = sequelize.define(
        'posts_categories',
        {},
        {
            timestamps: false,
            underscored: true,
            tableName: 'posts_categories', 
        }
    );

    Posts_category.associate = (models) => {
        models.Posts_category.belongsToMany(models.Blog_posts, {
            as: 'blog_posts',
            through: models.Posts_category,
            foreignKey: 'post_id',
        });
    };

    return Posts_category;
};
