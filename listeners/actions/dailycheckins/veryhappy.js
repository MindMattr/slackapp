const user = require("../../../schemas/user")

const { postView } = require("../postview")

const veryhappy = async ({ ack, client, body }) => {
  await ack();
  
  console.log(body)

  const team_id = body.team.id;
  const userId = body.user.id;

  const today = new Date();
  const todayIso = today.toISOString();

  const userName = await client.users.info({
    user: userId
  });

  const name = userName.user.real_name;

  const { value } = body.actions[0];

  const obj = {
    teamId: team_id,
    userName: name,
    userId: userId,
    value: value,
    date: todayIso,
  }

  const data = await user.User.findOne({
    _id: team_id,
  })

  console.log(data)

  if (data) {
    
    // Check if the user has already checked in today
    const dailyCheckInArray = data['dailyCheckIn'];
    const monthlyCheckInArray = data['monthlyDailyCheckIn'];

    //Find user in dailyCheckIn array
    const userIndex = dailyCheckInArray.findIndex((user) => user.user === userId);

    console.log(userIndex)

    if (userIndex === -1) {
      // User has not checked in today
      dailyCheckInArray.push(obj);
      monthlyCheckInArray.push(obj);
      await user.User.updateOne({
        _id: team_id,
      }, {
        $set: {
          dailyCheckIn: dailyCheckInArray,
          monthlyDailyCheckIn: monthlyCheckInArray,
        }
      })

      await postView(client, userId, name);
    }
  }

};

module.exports = { veryhappy };
