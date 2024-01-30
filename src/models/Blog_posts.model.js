const { date } = require("joi");

module.exports = (sequelize, DataTypes) => {
    const Blog_posts = sequelize.define(
        'blog_posts',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            title: { type: DataTypes.STRING },
            content: { type: DataTypes.STRING },
            user_id: { type: DataTypes.INTEGER },
            published: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            timestamps: false,
            underscored: true,
        },
    );
    
    Blog_posts.associate = (models) => {
        models.Blog_posts.belongsToMany(models.Category, {
            as: 'categories',
            through: models.Post_category,
            foreignKey: 'post_id',
            otherKey: 'category_id',
        });
        models.Category.belongsToMany(models.Blog_posts, {
            as: 'blog_posts',
            through: models.Post_category,
            foreignKey: 'category_id',
            otherKey: 'post_id',
        });
    };

    return Blog_posts;
};
