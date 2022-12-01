const { submitemployeecheckin } = require('./submit-employee-checkin');
const { submitpoll } = require('./submit-poll');

module.exports.register = (app) => {
  app.view('submitemployeecheckin', submitemployeecheckin);
  app.view('submitpoll', submitpoll);
};
