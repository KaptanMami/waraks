const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const muarx = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks | Guard Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "**w!kanal-koruma **",
      "`Kanal Korumayı Açar Veya Kapatırsınız.`"
    )
    .addField(
      "**w!kanal-yetkili-rol **",
      "`Kimler Kanal Silebilir Onu Ayarlarsınız.`"
    )
    .addField(
      "**w!küfür-engelleme**",
      "`Küfür Engellemeyi Açar Veya Kapatırsınız`"
    )
    .addField(
      " **w!mod-log-ayarla**",
      "`Mod Logunuzu Ayalarsınız`"
    )
    .addField(
      "**w!rol-koruma**",
      "`Rol Korumasanızı Açar Veya Kapatırsınız.`"
    )
    .addField(
      "**w!capslock-engel**",
      "`Fazla Büyük Harf Kullanımını Waraks Engeller.`"
    )
    .setDescription("**[Destek Sunucusu Tıkla](https://discord.gg/waraks)")
    .setFooter(``, client.user.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/713795986111070299/714803282043863142/bots.gif"
    )
    .setFooter("© Kuruluş : 12,07,2020 Waraks BOT", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(muarx).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["koruma"],
  permLevel: 0
};

exports.help = {
  name: "guard"
};
