const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db')
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, member, args) => {

if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yeterli yetki bulunmamakta.`);
  
  const db = require('quick.db');

  let Kanal = message.mentions.channels.first()
  
    if (!Kanal) {
        return message.reply("Lütfen bir kanal belirtiniz.")
    }
 
    db.delete(`antiraid_${message.guild.id}`, "<#"+Kanal.id+">")
  
    message.channel.send(`Anti-raid, deaktif edildi.`)
}

    
      

    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['anti-raid-kaldır'],
    permLevel: 0
}

exports.help = {
    name: 'anti-raid-kapat',
    description: 'Anti-raid özelliği deaktif eder.',
    usage: 'anti-raid-kapat',
}