const Discord = require('discord.js');
const db = require('quick.db');


exports.run = (client,message,args) => {

if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send('Bu komutu sadece `YÖNETİCİ` yetkisine sahip olanlar kullanabilir.')

let log = message.mentions.channels.first()
if(!log) return message.channel.send(' **Bir kanal etiketle**')


db.set(`log_${message.guild.id}`, log.id)
message.channel.send(' **Jail log kanalı ayarlandı.**')

}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}

exports.help = {
name: "jail-log"
}