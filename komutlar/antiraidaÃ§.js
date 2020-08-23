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
 
    db.set(`antiraid_${message.guild.id}`, "<#"+Kanal.id+">")
  
    message.channel.send(`Anti-raid, aktif edildi.`)
}

    
      
  

    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['anti-raid-aç'],
    permLevel: 0
}

exports.help = {
    name: 'anti-raid-aç',
    description: 'Anti-raid özelliği aktif eder.',
    usage: 'anti-raid-aç',
}