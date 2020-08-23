const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (bot, message, args) => {

 if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yeterli yetki bulunmamakta.`);

  let nesne = args[0]
  if (!nesne) return message.reply('Lütfen bir ID numarası belirtiniz.')
  
  db.set(`katılabilir_${nesne}`, 'katılabilir')
  
  message.channel.send(`Belirtilen bot, sunucuya katılabilir.`)
}
  

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'anti-raid-katılabilir',
  description: 'Belirtilen kişilerin sunucuya katılmasına izin verir.',
  usage: 'anti-raid-katılabilir'
};