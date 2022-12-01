const { App, LogLevel } = require('@slack/bolt');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const cron = require('node-cron');
const { saveUserOrgInstall } = require('./schemas/saveUserOrgInstall');
const { saveUserWorkspaceInstall } = require('./schemas/saveUserWorkspaceInstall');
const dbQuery = require('./schemas/findUser')
const user = require('./schemas/user');
const customRoutes = require('./utils/custom_routes')

const { registerListeners } = require('./listeners');
config();
mongoose.connect(process.env.mongoUri, {
  keepAlive: true,
});

const sleep = async (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const app = new App({
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'raphy-is-cool',
  customRoutes: customRoutes.customRoutes,

  scopes: [
    'channels:read',
    'chat:write',
    'chat:write.public',
    'commands',
    'im:read',
    'team:read',
    'users:read',
  ],

  installationStore: {
    storeInstallation: async (installation) => {
      if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
        return await saveUserOrgInstall(installation);
      }
      if (installation.team !== undefined) {
        return await saveUserWorkspaceInstall(installation);
      }
      throw new Error('Failed saving installation data to installationStore');
    },
    fetchInstallation: async (installQuery) => {
      if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
        return await dbQuery.findUser(installQuery.enterpriseId);
      }
      if (installQuery.teamId !== undefined) {
        return await dbQuery.findUser(installQuery.teamId);
      }
      throw new Error('Failed fetching installation');
    },

  },
  installerOptions: {
    directInstall: true,
    stateVerification: false,
  },
});

registerListeners(app);

//Morning check-in
const postToAllUsersMorning = async () => {
  const data = await user.User.find({})


  const ids = data.map((item) => item._id)

  const listOfUsers = []


  for(let i = 0; i < ids.length; i++){
    const users = await app.client.users.list({
      token: process.env.SLACK_BOT_TOKEN,
      team_id: ids[i]
    })

    //Filter out bots
    const filteredUsers = users.members.filter((item) => item.is_bot === false)

    const members = filteredUsers.map((item) => item.id)

    listOfUsers.push(members)

  }

  const finalList = [].concat.apply([], listOfUsers)

  console.log(finalList)

  const today = new Date();

    //Check if today is morning, afternoon, or evening
  const hour = today.getHours();


  if (hour < 12) {
        var greeting = "Good morning";
    }
  else if (hour < 18) {
        var greeting = "Good afternoon";
    }
  else {
        var greeting = "Good evening";
    }

  

  for(let i = 0; i < finalList.length; i++){

    //Get users real name
    var userName = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: finalList[i]

    })

    var username = userName.user.real_name

    const blocks = [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": `${greeting}, ${username}`,
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Let's get you ready for the day\n\nNow would be a good time to take a few minutes to:\n• 🌬️ Practice breathe work\n• 🧘‍♀️🏽 Do 5 minutes of guided mediation\n• 🏆 Celebrate a micro achievement you've had so far today\n• 🧠 Remember to do your daily mental check-in on Mindmattr's App Home"
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "😐 Feeling Low? Would you like to speak with someone?"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Speak to a Therapist",
            "emoji": true
          },
          "value": "speak_to_therapist",
          "url": "https://mindmattr.com/",
          "action_id": "speaktotherapist"
        }
      }
      
    ]



    await app.client.chat.postMessage({
      
      token: process.env.SLACK_BOT_TOKEN,
      channel: finalList[i],
      blocks: blocks,
      text: 'Good morning!',
    })
    await sleep(1000 * 5)
  }
  
  
}

const postToAllUsersAfternoon = async () => {
  const data = await user.User.find({})


  const ids = data.map((item) => item._id)

  const listOfUsers = []


  for(let i = 0; i < ids.length; i++){
    const users = await app.client.users.list({
      token: process.env.SLACK_BOT_TOKEN,
      team_id: ids[i]
    })

    //Filter out bots
    const filteredUsers = users.members.filter((item) => item.is_bot === false)

    const members = filteredUsers.map((item) => item.id)

    listOfUsers.push(members)

  }

  const finalList = [].concat.apply([], listOfUsers)

  console.log(finalList)

  

  for(let i = 0; i < finalList.length; i++){
    
    const blocks = [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": "Check out",
          "emoji": true
        }
      },
      {
        "type": "divider"
      },
      { 
        "dispatch_action": true,
        "type": "input",
        "block_id": "dailycheckout",
        "element": {
          "type": "radio_buttons",
          "options": [
            {
              "text": {
                "type": "plain_text",
                "text": "Not great I'm struggling",
                "emoji": true
              },
              "value": "struggling"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Meh, it could've been better",
                "emoji": true
              },
              "value": "meh"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Was good",
                "emoji": true
              },
              "value": "good"
            },
            {
              "text": {
                "type": "plain_text",
                "text": "Today went great",
                "emoji": true
              },
              "value": "great"
            }
          ],
          "action_id": "dailycheckout"
        },
        "label": {
          "type": "plain_text",
          "text": "How do you feel today went?",
          "emoji": true
        }
      }
      
    ]



    await app.client.chat.postMessage({
      
      token: process.env.SLACK_BOT_TOKEN,
      channel: finalList[i],
      blocks: blocks,
      text: 'Good afternoon!',
    })
    await sleep(1000 * 5)
  }
  
  
}


(async () => {
  try {

    //Reset dailycheckIn every day at midnight
    cron.schedule('0 0 * * *', async () => {
      await user.User.updateMany({}, { $set: { dailyCheckIn: [], dailyCheckOut: [], latestPoll: [], latestEmployeeCheckIn: [] } })
    })

    //Reset monthlyDailyCheckIn every month at day 1 at midnight
    cron.schedule('0 0 1 * *', async () => {
      await user.User.updateMany({}, { $set: { monthlyDailyCheckIn: [], monthlyDailyCheckOut: [], monthlyEmployeeCheckin: [], monthlyPolls: [] } })
    })

    //Run the function every day at 10:45 AM
    cron.schedule('45 10 * * *', async () => {
      try{
        await postToAllUsersMorning()
      }
      catch(err){
        console.log(err)
      }
      
    })

    //Run the function every day at 2:45 PM
    cron.schedule('45 16 * * *', async () => {
      try{
        await postToAllUsersAfternoon()
      }
      catch(err){
        console.log(err)
      }
      
    })

    await app.start(process.env.PORT || 3000);
    //await postToAllUsers()
    console.log('⚡️ Mindmattr is running!');
  } catch (error) {
    console.error('Unable to start App', error);
  }
})();
