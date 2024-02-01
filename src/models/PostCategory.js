module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
        'PostCategory',
        {
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'BlogPost',
                    key: 'id',
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Category',
                    key: 'id',
                },
            },
        },
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
            foreignKey: 'postId',
        });

        Category.belongsToMany(BlogPost, {
            as: 'BlogPost',
            through: PostCategory,
            foreignKey: 'categoryId',
        });
    };

    return PostCategory;
};
