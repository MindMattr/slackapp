const { User } = require('../../schemas/user')
const mongoose = require('mongoose')

const setmanager = async ({ client, command, ack, respond, }) => {
    try {
      await ack();
              
        const text = command.text

        
        const userId = command.user_id

        const data2 = await client.users.info({
            user: userId
        })

        const isOwner = data2.user.is_owner
        const isAdmin = data2.user.is_admin

        const user = text.match(/(?<=<@)(.*?)(?=>)/g)[0]

        console.log(user)

        const id = command.team_id

        if(isOwner || isAdmin){

          const data = await User.findOne({
            _id: id
          })

          if(data){  
            const managers = data['managers']

            if(managers.includes(user)){
              await respond('User is already a manager.')
              return
            }
            else{
              managers.push(user)
              await respond(`User <@${user}> has been added as a manager.`) 
              await data.updateOne({managers: managers})

              return
            }
            


          }
            
        }
        else{
          await respond('You are not an admin or owner.')
          return
        }
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { setmanager };
  