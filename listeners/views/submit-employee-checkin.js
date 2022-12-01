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

const submitemployeecheckin = async ({ ack, view, body, client }) => {

  try {
    await ack();


    const userId = body.user.id
    const team_id = body.team.id
    const value = view.state.values.option[ "button-action" ].selected_option.value

    console.log(team_id)
    
    if(value === "firstcheckin"){
      
      const blocks = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Your manager asks",
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "dispatch_action": true,
          "type": "input",
          "block_id": "firstcheckinanswer",
          "element": {
            "type": "plain_text_input",
            "action_id": "firstcheckinanswer"
          },
          "label": {
            "type": "plain_text",
            "text": "Is there anything I can do to support you this week? Be reasonable :-)",
            "emoji": true
          }
        }
      ]

      postToAllUsers(client, team_id, blocks)


    }
    else if (value === "secondcheckin"){

      const blocks = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Your manager asks",
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "dispatch_action": true,
          "type": "input",
          "block_id": "secondcheckinanswer",
          "element": {
            "type": "static_select",
            "action_id": "secondcheckinanswer",
            "placeholder": {
              "type": "plain_text",
              "text": "Select an item",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "To be honest I’m struggling",
                  "emoji": true
                },
                "value": "struggling"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Could do with some help",
                  "emoji": true
                },
                "value": "needhelp"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Good thanks for asking",
                  "emoji": true
                },
                "value": "good"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "I’m at the sweet spot",
                  "emoji": true
                },
                "value": "sweetspot"
              }
            ],
            
          },
          "label": {
            "type": "plain_text",
            "text": "How are you doing with your workload?",
            "emoji": true
          }
        }
      ]

      postToAllUsers(client, team_id, blocks)
    }
    else if (value === "thirdcheckin"){

      const blocks = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Your manager asks",
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "dispatch_action": true,
          "type": "input",
          "block_id": "thirdcheckinanswer",
          "element": {
            "type": "static_select",
            "action_id": "thirdcheckinanswer",
            "placeholder": {
              "type": "plain_text",
              "text": "Select an item",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": "Mental health",
                  "emoji": true
                },
                "value": "mentalhealth"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Workload",
                  "emoji": true
                },
                "value": "workload"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Confidence",
                  "emoji": true
                },
                "value": "confidence"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": "Motivation",
                  "emoji": true
                },
                "value": "motivation"
              }
            ],
            
          },
          "label": {
            "type": "plain_text",
            "text": "What are struggling with the most at work?",
            "emoji": true
          }
        }
      ]

      postToAllUsers(client, team_id, blocks)
    }

    else if(value === "fourthcheckin"){

      const blocks = [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "Your manager asks",
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        { 
          "dispatch_action": true,
          "type": "input",
          "block_id": "fourthcheckinanswer",
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
            "action_id": "fourthcheckinanswer"
          },
          "label": {
            "type": "plain_text",
            "text": "Out of 10, how would you rate your mental health at work",
            "emoji": true
          }
        }
      ]

      postToAllUsers(client, team_id, blocks)
    }


  } catch (error) {
    console.error(error);
  }
};

module.exports = { submitemployeecheckin };
