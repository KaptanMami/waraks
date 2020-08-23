const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const waraks = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Maurx | Yetkili Paneli`, client.user.avatarURL)
    .setThumbnail()
    .addField(
      "**w!sa-as** __aç/kapat__",
      "`Sa-As Sistemi Birisi Selam Verince Selamı Alır`"
    )

    .addField(
      "**w!sayaç <Sayı> #Kanal** ",
      "`Sunucu Sayacı Bi Sayı Belirlerseniz Size Kaç Kişi Kaldığınızı Söyler (Hedeflenen Sayıya) `"
    )
    .addField(
      " **w!uyar** **@kullanıcı** __Sebeb__",
      "`Sunucudan Birisini Uyarırsın (Yetkisi Olan Kişiler Yapabilir) `"
    )
    .addField(
      "**w!unban** __@kullanıcı__",
      "`Sunucudan Yasaklı Olan Birinin Banını Açar (Yetkisi Olan Kişiler Yapabilir) `"
    )
    .addField(
      " **w!ban** **@kullanıcı** __Sebebi__",
      "` Sunucudan Birisini Yasaklar (Yetkisi Olan Kişiler Yapabilir) `"
      
    )
    .setDescription("[Destek Sunucusu Tıkla](https://discord.gg/YAgJkQY)")
    .setFooter(``)
    .setImage(
      "https://cdn.discordapp.com/attachments/713795986111070299/714803282043863142/bots.gif"
    )
  
  
    .setFooter("© Kuruluş : 25.05.2020 Maurx BOT", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(waraks).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yetki"],
  permLevel: 0
};

exports.help = {
  name: "yetkili" 
};
