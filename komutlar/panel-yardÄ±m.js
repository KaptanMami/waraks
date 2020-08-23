const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const errorbey = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks | Yardım Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "**w!kur**",
      "`Sunucu sayısını rekor aktifliğini statını kurar.`"
    )
    .addField(
      "**w!panel-sıfırla**",
      "`Kurdugu statı siler (kaldırır).`"
    )

    .setDescription("[Destek Sunucusu Tıkla](https://discord.gg/waraks)")
    .setFooter(``, client.user.avatarURL)

    .setFooter("© Kuruluş : 12,07,2020 Waraks BOT", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(errorbey).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "help"],
  permLevel: 0
};

exports.help = {
  name: "panel-yardım"
};
