module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define(
        'BlogPost',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true },
            title: { type: DataTypes.STRING },
            content: { type: DataTypes.STRING },
            userId: { type: DataTypes.INTEGER, field: 'user_id' },
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
        BlogPost.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
    };

    return BlogPost;
};
