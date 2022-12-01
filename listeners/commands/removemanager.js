const { User } = require('../../schemas/user')
const mongoose = require('mongoose')

const removemanager = async ({ client, command, ack, respond, }) => {
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
                      const index = managers.indexOf(user)
                      managers.splice(index, 1)
                      await respond(`User <@${user}> has been removed as a manager.`)
                      await data.updateOne({managers: managers})
                      return
                  }
                  else{
                      await respond('User is not a manager.')
                      return
                  }
              }
          }
          else{
              await respond('You are not an admin or owner.')
              return
          }

        

        await respond(`User <@${user}> has been removed as a manager`);
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { removemanager };
  