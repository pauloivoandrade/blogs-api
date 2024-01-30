module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
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
    
    BlogPost.associate = (models) => {
        models.User.belongsTo(models.User, {
            through: models.BlogPost,
            foreignKey: 'id',
            as: 'user',
        });
    };

    return BlogPost;
};