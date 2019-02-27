module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define("Reviews", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
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

  //defining the association of the Reviews and entries
  Reviews.associate = models => {
    // Associating Users with Reviews
    // When a user is deleted, also delete any associated Reviews
    Reviews.hasMany(models.Comments, {
      onDelete: "cascade"
    });  
  };

  //backward relation btw Reviews and users
  Reviews.associate = models=> {
    // A Journal belongs to an user
    // and can't be created without an users id associate as the foreign key constraint
    Reviews.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

    return Reviews;
};