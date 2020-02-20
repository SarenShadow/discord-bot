const db = require('quick.db');

exports.run = (bot,message,args,func)=> {
    if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send('This requires you to have Administrator role')
    if (!args.join(" ")) return message.channel.send("Please enter arguments 'setAutoRole <roleName>")

    db.updateText(`autoRole_${message.guild.id}`, args.join(" ").trim()).then(i => {

        message.channel.send('Successfully changed auto role to: `' + i.text + '`');

    })
}