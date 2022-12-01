const { User } = require('../../schemas/user');

const poll = async ({ ack, client, body }) => {
    await ack();

    const id = body.user.team_id;
    const userId = body.user.id;

    const data = await User.findOne({
        _id: id
    })

    if(data){
        const managers = data['managers']

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
                                        "text": "How do you feel that meeting went?",
                                        "emoji": true
                                    },
                                    "value": "firstpoll"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Share your microachievements.",
                                        "emoji": true
                                    },
                                    "value": "secondpoll"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "How optimistic are you about your future here?",
                                        "emoji": true
                                    },
                                    "value": "thirdpoll"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "As your manager, rate my performance this month (Anonymous)",
                                        "emoji": true
                                    },
                                    "value": "fourthpoll"
                                },

                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Are you likely to leave in 3-6 months? (Anonymous)",
                                        "emoji": true
                                    },
                                    "value": "fifthpoll"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Where can I improve as a manager? ",
                                        "emoji": true
                                    },
                                    "value": "sixthpoll"
                                }
                            ],
                            "action_id": "button-action"
                        }
                    ]
                }
            ]

            await client.views.open({
                trigger_id: body.trigger_id,

                view: {
                    "type": "modal",
                    "callback_id": "submitpoll",
                    "title": {
                        "type": "plain_text",
                        "text": "Polls",
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

module.exports = { poll };
