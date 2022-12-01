const { User } = require('../../schemas/user')
const mongoose = require('mongoose')

const listmanagers = async ({ client, command, ack, respond, }) => {
    try {
      await ack();

        const id = command.team_id
        const userId = command.user_id

        const data2 = await client.users.info({
            user: userId
        })

        const isOwner = data2.user.is_owner
        const isAdmin = data2.user.is_admin

        if(isOwner || isAdmin){

            const data = await User.findOne({
                _id: id
            })
    
            if(data){
                
                const managers = data['managers']
    
                console.log(managers)
                
                //Remove everything before | in the string
                const managers2 = managers.map((manager) => {
                    return manager.replace(/.*\|/g, '')
                })
                const managersTrue = managers.map((manager) => manager.replace(/\|.*$/g, ''))
    
    
                
                if(managers.length > 0){
                    
                    var managerStr = ''
    
                    for (var i = 0; i < managersTrue.length; i++) {
                        //Remove anything that comes after | also remove | in the string
                        managerStr += `${managers2[i]}\n`
                        
                    }
    
                    await respond('Here are your managers:\n\n' + managerStr)
                }
                else{
                    await respond('You don\'t have managers.')
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
  
  module.exports = { listmanagers };
  