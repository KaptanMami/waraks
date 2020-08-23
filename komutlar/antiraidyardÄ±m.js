const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const errorbey = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks | Anti Raid Yardım Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "**w!anti-raid-aç**",
      "`Anti Raid Komutunu Aktif Edersiniz.`"
    )
    .addField(
      "**w!anti-raid-kapat**",
      "`Anti Raid Komutunu Deaktif Edersiniz.`"
    )
    .addField(
      " **w!anti-raid-katılabilir**",
      "`İdsini Yazdığınız Bot Giriş Yapabilir.`"
    )
  
    .setDescription("[Destek Sunucusu Tıkla](https://discord.gg/d9sud8a)")
    .setFooter(``, client.user.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/708474946611052555/717078948399546388/tenor.gif"
    )
    .setFooter("© Kuruluş : 25.05.2020 Maurx BOT", client.user.avatarURL)
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
  name: "antiraid-yardım"
};
