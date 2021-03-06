const cloudinary = require('cloudinary');
const Formidable = require('formidable');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// upload image and send nexts part of route
module.exports = function (req, res, next) {
  const form = new Formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    console.log(fields);

    cloudinary.uploader.upload(files.url.path, result => {
      console.log(result);
      req.body.url = result.secure_url;
      req.body.caption = fields.caption;
      req.body.PlaceId = fields.PlaceId;
      req.body.UserId= fields.UserId;
      console.log(req.body);
      next();
    });

  });
};