const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {


    let deleter = message.mentions.roles.first()
 

  
  db.set(`yetkilirol_${message.guild.id}`, deleter.id)
  message.channel.send(new Discord.RichEmbed().setColor('36393f').setDescription(`Kanal silme iznini ${deleter} olarak ayarladım.`))
  
  return
}

exports.conf = 
{ 
  enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0
};


exports.help = 
{
 name: 'kanal-yetkili-rol' 
};