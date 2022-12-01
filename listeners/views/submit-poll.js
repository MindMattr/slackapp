const sleep = async (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const postToAllUsers = async (client, team_id, blocks) => {
  
    const users = await client.users.list({
      team_id: team_id
    })
  
    //Filter out bots
    const filteredUsers = users.members.filter((item) => item.is_bot === false)
  
    const members = filteredUsers.map((item) => item.id)
  
  
    for(let i = 0; i < members.length; i++){
  
      await client.chat.postMessage({
        
  
        channel: members[i],
        text: "Your manager wants to check in on you!",
        blocks: blocks,
  
      })
      await sleep(1000 * 5)
    }
  
  
}


const submitpoll = async ({ ack, view, body, client }) => {

    try {
        
        await ack()

        const userId = body.user.id
        const team_id = body.team.id
        const value = view.state.values.option[ "button-action" ].selected_option.value


        if (value === "firstpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Poll",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {   
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "firstpollanswer",
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Great",
                                    "emoji": true
                                },
                                "value": "great"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Good",
                                    "emoji": true
                                },
                                "value": "good"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Ok",
                                    "emoji": true
                                },
                                "value": "ok"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Bad",
                                    "emoji": true
                                },
                                "value": "bad"
                            }
                        ],
                        "action_id": "firstpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "How do you feel that meeting went?",
                        "emoji": true
                    }
                }

            ]

            postToAllUsers(client, team_id, blocks)

        }

        else if (value === "secondpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Poll",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "secondpollanswer",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "secondpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Share your microachievements.",
                        "emoji": true
                    }
                }

            ]

            postToAllUsers(client, team_id, blocks)

        }

        else if (value === "thirdpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Poll",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {   
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "thirdpollanswer",
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "1",
                                    "emoji": true
                                },
                                "value": "1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "2",
                                    "emoji": true
                                },
                                "value": "2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "3",
                                    "emoji": true
                                },
                                "value": "3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "4",
                                    "emoji": true
                                },
                                "value": "4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "5",
                                    "emoji": true
                                },
                                "value": "5"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "6",
                                    "emoji": true
                                },
                                "value": "6"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "7",
                                    "emoji": true
                                },
                                "value": "7"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "8",
                                    "emoji": true
                                },
                                "value": "8"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "9",
                                    "emoji": true
                                },
                                "value": "9"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "10",
                                    "emoji": true
                                },
                                "value": "10"
                            }

                        ],
                        "action_id": "thirdpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Out of 10 how optimistic are you about your future here?",
                        "emoji": true
                    }
                }

            ]

            postToAllUsers(client, team_id, blocks)

        }

        else if (value === "fourthpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Polls",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "fourthpollanswer",
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Great",
                                    "emoji": true
                                },
                                "value": "great"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Good",
                                    "emoji": true
                                },
                                "value": "good"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Ok",
                                    "emoji": true
                                },
                                "value": "ok"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Bad",
                                    "emoji": true
                                },
                                "value": "bad"
                            }
                        ],
                        "action_id": "fourthpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Rate your manager's performance this month (Anonymous)",
                        "emoji": true
                    }
                }

            ]

            postToAllUsers(client, team_id, blocks)

        }

        else if (value === "fifthpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Polls",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "fifthpollanswer",
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Very unlikely",
                                    "emoji": true
                                },
                                "value": "veryunlikely"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Unsure",
                                    "emoji": true
                                },
                                "value": "unsure"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Likely",
                                    "emoji": true
                                },
                                "value": "likely"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Very Likely",
                                    "emoji": true
                                },
                                "value": "verylikely"
                            }
                        ],
                        "action_id": "fifthpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "How likely are you to leave in the next 3-6 months? (Anonymous)",
                        "emoji": true
                    }
                }

            ]

            postToAllUsers(client, team_id, blocks)

        }
        else if (value === "sixthpoll"){

            const blocks = [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Polls",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "dispatch_action": true,
                    "type": "input",
                    "block_id": "sixthpollanswer",
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Show more Empathy",
                                    "emoji": true
                                },
                                "value": "empathy"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Improve people management skills",
                                    "emoji": true
                                },
                                "value": "management"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Build trust",
                                    "emoji": true
                                },
                                "value": "trust"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Be more motivational",
                                    "emoji": true
                                },
                                "value": "motivational"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Delegate better",
                                    "emoji": true
                                },
                                "value": "delegate"
                            }
                        ],
                        "action_id": "sixthpollanswer"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Where can I improve as a manager? (Anonymous Poll)",
                        "emoji": true
                    }
                }
                
            ]

            postToAllUsers(client, team_id, blocks)

        }


    } catch (error) {
        console.error(error);
    }
    


}


module.exports = { submitpoll };