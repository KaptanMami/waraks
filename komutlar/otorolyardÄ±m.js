const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
  const errorbey = new Discord.RichEmbed()
  .setColor('BLACK')
  .setAuthor(`Waraks | Otorol Yardım Paneli`, client.user.avatarURL)
  .setThumbnail(client.user.avatarURL)
  .addField('**w!oto-rol ayarla **','`oto-rol ayarla/sıfırla @rol | Oto Rolü Açarsınız`')
  .addField('**w!otorol-kanal ayarla! **','`Oto Rol Kanalını Aktifleştirisiniz`')
  .setFooter(``, client.user.avatarURL)
  .setImage ('https://cdn.discordapp.com/attachments/704787278890795018/716652233269444658/tenor.gif')
  .setFooter('© Kuruluş : 12,07,2020 Waraks BOT', client.user.avatarURL)
  .setTimestamp()
  message.channel.send(errorbey).catch()
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['genel'],
  permLevel: 0
};

exports.help = {
  name: 'otorolyardım'
}