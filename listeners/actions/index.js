//Daily Checkins
const { verysad } = require('./dailycheckins/verysad');
const { sad } = require('./dailycheckins/sad');
const { neutral } = require('./dailycheckins/neutral');
const { almosthappy } = require('./dailycheckins/almosthappy');
const { veryhappy } = require('./dailycheckins/veryhappy');


// Other actions
const { acknowledge } = require('./acknowledge');
const { checkinwithteam } = require ('./checkinwithteam')
const { poll } = require('./poll');

// Employee Checkins
const { firstcheckin } = require ('./employee_checkins/firstcheckin')
const { secondcheckin } = require ('./employee_checkins/secondcheckin')
const { thirdcheckin } = require ('./employee_checkins/thirdcheckin')
const { fourthcheckin } = require ('./employee_checkins/fourthcheckin')

// Polls Checkins

const { firstpoll } = require("./polls/firstpoll");
const { secondpoll } = require("./polls/secondpoll");
const { thirdpoll } = require("./polls/thirdpoll");
const { fourthpoll } = require("./polls/fourthpoll");
const { fifthpoll } = require("./polls/fifthpoll");
const { sixthpoll } = require("./polls/sixthpoll");

//Daily checkout

const { dailycheckout } = require('./dailycheckout/dailycheckout');

module.exports.register = (app) => {

  app.action('verysad', verysad);
  app.action('sad', sad);
  app.action('neutral', neutral);
  app.action('almosthappy', almosthappy);
  app.action('veryhappy', veryhappy);

  app.action('button-action', acknowledge);
  app.action('checkinwithteam', checkinwithteam);
  app.action('poll', poll);

  app.action("firstcheckinanswer", firstcheckin);
  app.action("secondcheckinanswer", secondcheckin);
  app.action("thirdcheckinanswer", thirdcheckin)
  app.action("fourthcheckinanswer", fourthcheckin)

  app.action("firstpollanswer", firstpoll);
  app.action("secondpollanswer", secondpoll);
  app.action("thirdpollanswer", thirdpoll);
  app.action("fourthpollanswer", fourthpoll);
  app.action("fifthpollanswer", fifthpoll);
  app.action("sixthpollanswer", sixthpoll);

  app.action("dailycheckout", dailycheckout);
};
