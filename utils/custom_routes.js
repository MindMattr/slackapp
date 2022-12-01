const manifest = require("./../manifest.json");
const user = require("./../schemas/user")
const { config } = require('dotenv');

config()

const oauthRedirect = manifest.oauth_config.redirect_urls[0]
const botSopes = manifest.oauth_config.scopes.bot
const userScopes = manifest.oauth_config.scopes.user
const actualUrl = process.env.actualUrl

workspaceInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=${botSopes}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a><h1>Standard install. Go to /slack/install/orgadmin to install the app with extra admin capabilities.</h1>`
userScopesInstallHtml = `<a href='https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=&user_scope=${userScopes}&redirect_uri=${oauthRedirect}' style='align-items:center;color:#fff;background-color:#4A154B;border:0;border-radius:4px;display:inline-flex;font-family:Lato,sans-serif;font-size:40px;font-weight:600;height:112px;justify-content:center;text-decoration:none;width:552px'><svg xmlns='http://www.w3.org/2000/svg' style='height:48px;width:48px;margin-right:12px' viewBox='0 0 122.8 122.8'><path d='M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z' fill='#e01e5a'></path><path d='M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z' fill='#36c5f0'></path><path d='M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z' fill='#2eb67d'></path><path d='M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z' fill='#ecb22e'></path></svg>Add to Slack</a><h1>Admin install! Make sure you install this on an Organization.</h1>`


const getDailyReport = async(team_id) => {

  const data = await user.User.findOne({
    _id: team_id,
  });

  if (data) {
    const dailyCheckInArray = data['dailyCheckIn'];
    
    if(dailyCheckInArray.length > 0) {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().slice(0, 10);

    
      // Find all users that checked in and get the values
      const checkedInValues = dailyCheckInArray.map((user) => user.value);

      console.log(checkedInValues)

      // Count the values, if value is none, then value is 0
      const veryHappyCount = checkedInValues.filter((value) => value === 'veryhappy').length;
      const almostHappyCount = checkedInValues.filter((value) => value === 'almosthappy').length;
      const neutral = checkedInValues.filter((value) => value === 'neutral').length;
      const sadCount = checkedInValues.filter((value) => value === 'sad').length;
      const verySadCount = checkedInValues.filter((value) => value === 'verysad').length;

      //Get percentage of each value
      const veryHappyPercentage = Math.round((veryHappyCount / checkedInValues.length) * 100);
      const almostHappyPercentage = Math.round((almostHappyCount / checkedInValues.length) * 100);
      const neutralPercentage = Math.round((neutral / checkedInValues.length) * 100);
      const sadPercentage = Math.round((sadCount / checkedInValues.length) * 100);
      const verySadPercentage = Math.round((verySadCount / checkedInValues.length) * 100);

      const percentages = [
        { label: 'Very Happy', value: veryHappyPercentage},
        { label: 'Almost Happy', value: almostHappyPercentage},
        { label: 'Neutral', value: neutralPercentage },
        { label: 'Sad', value: sadPercentage },
        { label: 'Very Sad', value: verySadPercentage},
      ]

      const dailyReport = {
        veryhappy: veryHappyCount,
        happy: almostHappyCount,
        neutral: neutral,
        sad: sadCount,
        verysad: verySadCount,
        total: checkedInValues.length,
        percentages: percentages,
        users: dailyCheckInArray
      }
      return dailyReport;

    }
    else{
      const dailyReport = {
        veryhappy: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        verysad: 0,
        total: 0,
        users: []
      }

      return dailyReport;

    }

    
  }
  else{
    return null;
  }
  


}

const getDailyCheckOut = async(team_id) => {
  
    const data = await user.User.findOne({
      _id: team_id,
    })

    if (data) {
        
        const dailyCheckOut = data['dailyCheckOut'];
  
        return dailyCheckOut;
  
    }
    else{
      return null;
    }
}


const latestTeamCheckIn = async(team_id) => {
  
  const data = await user.User.findOne({
      _id: team_id,
  })

  if (data) {

    const latestCheckIn = data['latestEmployeeCheckIn'];

    return latestCheckIn;

  }

  else{
    return null;
  }
}
const latestPoll = async(team_id) => {

  const data = await user.User.findOne({
    _id: team_id,
  })

  if (data) {

    const latestPoll = data['latestPoll'];

    return latestPoll;

  }

  else{
    return null

  }
} 

const monthlyPolls = async(team_id) => {

  const data = await user.User.findOne({
    _id: team_id,
  })

  if (data) {

    const monthlyPolls = data['monthlyPolls'];

    return monthlyPolls;

  }

  else{
    return null

  }

}

const monthlyEmployeeCheckin = async(team_id) => {

  const data = await user.User.findOne({
    _id: team_id,
  })

  if (data) {

    const monthlyEmployeeCheckin = data['monthlyEmployeeCheckin'];

    return monthlyEmployeeCheckin;

  }

  else{
    return null

  }

}

const monthlyDailyCheckIn = async(team_id) => {

  const data = await user.User.findOne({
    _id: team_id,
  })

  if (data) {

    const monthlydaily = data['monthlyDailyCheckIn'];

    return monthlydaily;

  }

  else{
    return null

  }

}

const monthlyDailyCheckOut = async(team_id) => {
  
    const data = await user.User.findOne({
      _id: team_id,
    })

    if (data) {
          
          const monthlydaily = data['monthlyDailyCheckOut'];
  
          return monthlydaily;
    
    }
    else{
      return null;
    }
}


const customRoutes = [
  {
    path: '/slack/install/workspace',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(workspaceInstallHtml);
    },
  },
  {
    path: '/slack/install/orgadmin',
    method: ['GET'],
    handler: (req, res) => {
      res.writeHead(200);
      res.end(userScopesInstallHtml);
    },
  },
  {
    path: '/api/dailycheck',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      getDailyReport(team_id).then((dailyReport) => {

        if(dailyReport === null){
          res.writeHead(400);
          res.end('Team not found');
        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(dailyReport));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/dailycheckout',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      getDailyCheckOut(team_id).then((dailyReport) => {

        if(dailyReport === null){
          res.writeHead(400);
          res.end('Team not found');
        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(dailyReport));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/latestteamcheckin',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      latestTeamCheckIn(team_id).then((latestCheckIn) => {

        if(latestCheckIn === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(latestCheckIn));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/latestpoll',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      latestPoll(team_id).then((latestpoll) => {

        if(latestpoll === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(latestpoll));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/monthlypolls',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      monthlyPolls(team_id).then((monthlypolls) => {

        if(monthlypolls === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(monthlypolls));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/monthly-team-checkins',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      monthlyEmployeeCheckin(team_id).then((monthlyemployees) => {

        if(monthlyemployees === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(monthlyemployees));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/monthly-daily-checkins',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      monthlyDailyCheckIn(team_id).then((monthlydailycheckin) => {

        if(monthlydailycheckin === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(monthlydailycheckin));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  },
  {
    path: '/api/monthly-daily-checkouts',
    method: ['GET'],
    handler: (req, res) => {

      const url = actualUrl + req.url

      const urlParams = new URL(url);

      const team_id = urlParams.searchParams.get('team');

      if(!team_id) {
        res.writeHead(400);
        res.end('Missing team_id');
      }

      monthlyDailyCheckOut(team_id).then((monthlydailycheckin) => {

        if(monthlydailycheckin === null) {
          res.writeHead(400);
          res.end('Error invalid team_id');

        }
        else{
          res.writeHead(200);
          res.end(JSON.stringify(monthlydailycheckin));

        }
        
      },
      (err) => {
        res.writeHead(500);
        res.end('Error invalid team_id');
      })
    },
  }

];

module.exports = { customRoutes };