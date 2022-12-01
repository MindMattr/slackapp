const user = require('../../../schemas/user');

const dailycheckout = async ({ ack, client, body }) => {
  await ack();

    const team_id = body.team.id
    const user_id = body.user.id
    const today = new Date();
    const todayIso = today.toISOString();

    //Get when the user checked in

    

    const value = body.actions[0].selected_option.value;

    const message_ts = body.container.message_ts
    const channel_id = body.container.channel_id

    //Edit message

    const data = await user.User.findOne({
        _id: team_id,
    })

    const obj = {
        teamId: team_id,
        userId: user_id,
        time: todayIso,
        value: value,
    }

    if(data){

        const monthlyDailyCheckOut = data['monthlyDailyCheckOut'];
        const dailyCheckOutArray = data['dailyCheckOut'];

        dailyCheckOutArray.push(obj);
        monthlyDailyCheckOut.push(obj);

        await user.User.updateOne({
            _id: team_id,
        }, {
            $set: {
                dailyCheckOut: dailyCheckOutArray,
                monthlyDailyCheckOut: monthlyDailyCheckOut,
            }
        })

        
        await client.chat.update({
            channel: channel_id,
            ts: message_ts,
            blocks : [],
            text: "Thank you! :smile:",
        })
        
    }
    else{
        
        await client.chat.update({
            channel: channel_id,
            ts: message_ts,
            blocks : [],
            text: "Something went wrong. Please try again.",
        })

    }


  
};

module.exports = { dailycheckout };
