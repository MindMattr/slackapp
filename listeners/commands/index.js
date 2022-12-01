const { setmanager } = require('./setmanager');
const { removemanager } = require('./removemanager');
const { listmanagers } = require('./listmanagers')
 
module.exports.register = (app) => {
  app.command('/setmanager', setmanager);
  app.command('/removemanager', removemanager);
  app.command('/listmanagers', listmanagers)
};
