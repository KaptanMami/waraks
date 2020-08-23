const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const waraks = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks | Yardım Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "**w!genel**",
      "`Herkesin Kullanabileceği Komutları Listeler.`"
    )
    .addField(
      "**w!eğlence**",
      "`Eğlence komutları hakkında bilgi verir.`"
    )
    .addField(
      " **w!jail-yardım**",
      "`Jail sistemi hakkında bilgi verir.`"
    )
    .addField(
      "**w!guard**",
      "`Koruma panelini görüntüler.`"
    )
    .addField(
      "**w!yetkili**",
      "`Yetkili Komutlarını Listeler.`"
    )
    
    
    .addField(
      "**w!banlimit-yardım**",
      "`Banlimit hakkında bilgi verir.`"
   
    
    )
    .setDescription("[Destek Sunucusu Tıkla](https://discord.gg/waraks)")
    .setFooter(``, client.user.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/713795986111070299/714803282043863142/bots.gif"
    )
    .setFooter("© Waraks", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(waraks).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "help"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'yardımm menüsü',
  usage: 'yardım'
};