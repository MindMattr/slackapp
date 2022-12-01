const { User } = require('../../schemas/user');

const checkinwithteam = async ({ ack, client, body }) => {

    await ack();

    const id = body.user.team_id;

    const userId = body.user.id;

    const data = await User.findOne({
        _id: id
    })

    if(data){
        const managers = data['managers']

        //Remove everything after the | in the string
        const managers2 = managers.map((manager) => manager.replace(/\|.*$/g, ''))

        

        if(managers2.includes(userId)){
            console.log('User is a manager.')

            const blocks = [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "The answers will be sent to your dashboard."
                    }
                },
                {
                    "type": "actions",
                    "block_id": "option",
                    "elements": [
                        {
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select an item",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Is there anything I can do to support you?",
                                        "emoji": true
                                    },
                                    "value": "firstcheckin"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "How are you doing with your workload?",
                                        "emoji": true
                                    },
                                    "value": "secondcheckin"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "What are struggling with the most?",
                                        "emoji": true
                                    },
                                    "value": "thirdcheckin"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "How would you rate your mental health at work?",
                                        "emoji": true
                                    },
                                    "value": "fourthcheckin"
                                }
                            ],
                            "action_id": "button-action"
                        }
                    ]
                }
            ]

            const modal = await client.views.open({
                trigger_id: body.trigger_id,
                view: {
                    "type": "modal",
                    "callback_id": "submitemployeecheckin",
                    "title": {
                        "type": "plain_text",
                        "text": "Employee Check-ins",
                        "emoji": true
                    },
                    "submit": {
                        "type": "plain_text",
                        "text": "Submit",
                        "emoji": true
                    },
                    "close": {
                        "type": "plain_text",
                        "text": "Cancel",
                        "emoji": true
                    },
                    "blocks": blocks

                }

            })

            console.log(modal)
        }   
        else{
            console.log('User is not a manager.')

            // Dm user that they are not a manager
            const dm = await client.chat.postMessage({
                channel: userId,
                text: 'You are not a manager.'
            })
            return
        }
    }

};

module.exports = { checkinwithteam };
