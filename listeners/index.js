const actions = require('./actions');
const commands = require('./commands');
const events = require('./events');
const views = require('./views');

module.exports.registerListeners = (app) => {
  actions.register(app);
  commands.register(app);
  events.register(app);
  views.register(app);
};
