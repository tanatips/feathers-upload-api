const users = require('./users/users.service.js');
const message = require('./message/message.service.js');
const watermark = require('./watermark/watermark.service.js');
const upload = require('./upload/upload.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(message);

  app.configure(watermark);
  app.configure(upload);
};
