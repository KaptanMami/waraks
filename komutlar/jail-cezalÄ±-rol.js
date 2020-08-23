const Discord = require('discord.js');
const db = require('quick.db');


exports.run = (client,message,args) => {

if(!message.member.hasPermissions("ADMINISTRATOR")) return message.channel.send('Bu komutu sadece `YÖNETİCİ` yetkisine sahip olanlar kullanabilir.')

let rol = message.mentions.roles.first()
if(!rol) return message.channel.send('**Bir rol etiketle**')


db.set(`cezalırol_${message.guild.id}`, rol.id)
message.channel.send('**Cezalı rolü ayarlandı.**')

}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}

exports.help = {
name: "jail-cezalı-rol"
}