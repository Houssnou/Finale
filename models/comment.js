module.exports = function (sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  });

  //backward relation btw Comments and User and reviews
  Comments.associate = models => {
    // A comment belongs to a review
    // and can't be created without an review id associate as the foreign key constraint
    Comments.belongsTo(models.Reviews, {
      foreignKey: {
        allowNull: false
      }
    });

    // A review belongs to a user
    // and can't be created without an user id associate as the foreign key constraint
    Comments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
    
  };
  return Comments;
};