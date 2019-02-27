module.exports = function(sequelize, DataTypes) {
  var Photos = sequelize.define("Photos", {
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    url:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:"https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
      validate: {
        isUrl: true
      }
    }
  });

  //backward relation btw Photos and Places
  Photos.associate = models=> {
    // A review belongs to a palce
    // and can't be created without an place id associate as the foreign key constraint
    Photos.belongsTo(models.Places, {
      foreignKey: {
        allowNull: false
      }
    });
  };
   //backward relation btw Photos and User
   Photos.associate = models=> {
    // A review belongs to a user
    // and can't be created without an user id associate as the foreign key constraint
    Photos.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    return Photos;
};