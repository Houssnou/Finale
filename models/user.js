//importing bcrypt fro password hashing
const bcryptjs = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 10]
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
      validate: {
        isUrl: true
      }
    }
    ,
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
  };

  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.hook("beforeCreate", function (user) {
    user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10), null);
    console.log(user);
  });

  //Users association with Reviews and Comments
  Users.associate = models => {
    // Associating Users with Reviews
    // When a user is deleted, also delete any associated Reviews
    Users.hasMany(models.Reviews, {
      onDelete: "cascade"
    });
  
    // Associating Users with Comments
    // When a user is deleted, also delete any associated Comments
    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    });
  
    // Associating Users with Reviews
    // When a user is deleted, also delete any associated Reviews
    Users.hasMany(models.Photos, {
      onDelete: "cascade"
    });
  };
  return Users;
};