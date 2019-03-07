module.exports = function (sequelize, DataTypes) {
  var Places = sequelize.define("Places", {
      name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    review_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    
    is_Open: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }    
  });
  //defining the association of the Reviews and places
  Places.associate = models => {
    // Associating Users with Reviews
    // When a place is deleted, also delete any associated Reviews
    Places.hasMany(models.Reviews, {
      onDelete: "cascade"
    });
  
    // Associating Users with Reviews
    // When a user is deleted, also delete any associated Reviews
    Places.hasMany(models.Photos, {
      onDelete: "cascade"
    });
  };

  return Places;
};