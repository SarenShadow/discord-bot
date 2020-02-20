const {Client, Attachment, RichEmbed} = require('discord.js');

const bot = new Client();


const token = 'Njc5NzcyMjM4NDY3MTcwMzM0.Xk2OAg.HcMCoomGvgyrYbf2EYiM0EsTpUM';

const PREFIX = '!';

var version = '1.0.1';

bot.on('ready',()=>{
    console.log('this bot is online!');
});

bot.on('guildMemberAdd' , member => {
   
    // db.fetchObject(`autoRole_${member.guild.id}`).then (i=>{

    //     if(!i.text || i.text.toLowerCase()=== 'name') return;
    //     else{
    //         try{
    //             member.addRole(member.guild.roles.find('name', i.text))
    //         } 
    //         catch (e){
    //             console.log("A guild tried to auto-role an invalid role to someone")
    //         }
    
    //     }

    // });

    const channel = member.guild.channels.find(channel => channel.name === 'welcome');
    if(!channel) return;

    channel.send(`Welcome to the server, ${member}, please read the rules in the rules channel!`).then(msg => msg.delete(20000))
});

bot.on('raw',event => {
 
    const eventName = event.t;
    if(eventName === 'MESSAGE_REACTION_ADD'){
        if(event.d.message_id === '680122629880938509'){
            var reactionchannel = bot.channels.get(event.d.channel_id);
            if(reactionchannel.messages.has(event.d.message_id))
                return;
            else{
                reactionchannel.fetchMessage(event.d.message_id)
                .then(msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    bot.emit('messageReactionAdd', msgReaction, user);
                })
                .catch(err => console.log(err));
            }
        }
        
    }
    else if(eventName === 'MESSAGE_REACTION_REMOVE'){
        if(event.d.message_id ==='680122629880938509'){
            var reactionChannel = bot.channels.get(event.d.channel_id);
            if(reactionChannel.messages.has(event.d.message_id))
                return;
            else{
                reactionchannel.fetchMessage(event.d.message_id)
                .then(msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = bot.users.get(event.d.user_id);
                    bot.emit('messageReactionRemove', msgReaction, user);
                })
                .catch(err => console.log(err));
            }
        }
    }
});

bot.on('messageReactionAdd',(messageReaction,user) => {
    var roleName = messageReaction.emoji.name;
    var emojicount = 0;
    console.log(roleName);
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());

    if(role){
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if(member){
            member.addRole(role.id);
            console.log("success,added");
        }
    }
});

bot.on('messageReactionRemove', (messageReaction,user) => {
    var release = messageReaction.emoji.name;
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === release.toLowerCase());
    if(role){
        var member = messageReaction.message.guild.members.find(member => member.id === user.id);
        if(member){
            member.removeRole(role.id);
            console.log("success,removed");
        }
    }
});


bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case 'hug':
            number = 3;
            imageNumber = Math.floor (Math.random() * (number - 1 + 1)) + 1;
            message.channel.send({files:["./images/hug" + imageNumber + ".jpg"]})

        break;

        case 'commands':
            message.channel.send("Commands: !hug !vampire !clear [integer]")
        break;

        case 'Vampire':
           const embed = new RichEmbed()
            .setTitle('vampire')
            .setColor(0xFF0000)
            .setDescription('Vampire description');
            message.channel.send(embed);
        break;
        // clear
        case 'clear':
                if(!message.member.roles.find(r => r.name === "Elf")) return message.channel.send('YOU DO NOT HAVE PERMISSIONS').then(msg => msg.delete(5000));
                message.channel.bulkDelete(args[1]);
        break;

        case 'hug':
            const attachment = new Attachment("https://media.tenor.com/images/11157eb0fe0b7b0f296a8066dffa39a7/tenor.gif")
            message.channel.send(attachment);
        break;
    }
})

bot.login(token);