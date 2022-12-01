const user = require('../../../schemas/user');

const thirdpoll = async ({ ack, client, body }) => {
  await ack();

    console.log(body)

    const team_id = body.team.id
    const user_id = body.user.id
    const question = body.message.blocks[2].label.text
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
        question: question,
        value: value,
    }

    if(data){
        //Append to latestPollCheckIn



        const latestPollCheckIn = data['latestPoll'];
        const monthlyPolls = data['monthlyPolls'];

        latestPollCheckIn.push(obj);
        monthlyPolls.push(obj);

        await user.User.updateOne({
            _id: team_id,
        }, {
            $set: {
                latestPollCheckIn: latestPollCheckIn,
                monthlyPolls: monthlyPolls,
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

module.exports = { thirdpoll };
