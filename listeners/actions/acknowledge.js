const user = require('../../schemas/user');

const acknowledge = async ({ ack, client, body }) => {
  await ack();
};

module.exports = { acknowledge };
