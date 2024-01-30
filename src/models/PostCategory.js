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
        const BlogPost = models.blog_posts;
        const Category = models.categories;

        BlogPost.belongsToMany(Category, {
            as: 'categories',
            through: PostCategory,
            foreignKey: 'post_id',
        });

        Category.belongsToMany(BlogPost, {
            as: 'blog_posts',
            through: PostCategory,
            foreignKey: 'category_id',
        });
    };

    return PostCategory;
};
