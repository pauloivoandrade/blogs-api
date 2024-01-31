module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
        'posts_categories',
        {},
        {
            timestamps: false,
            underscored: true,
            tableName: 'posts_categories', 
        }
    );

    PostCategory.associate = (models) => {
        const BlogPost = models.BlogPost;
        const Category = models.Category;

        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'post_id',
        });

        Category.belongsToMany(BlogPost, {
            as: 'BlogPost',
            through: PostCategory,
            foreignKey: 'category_id',
        });
    };

    return PostCategory;
};
