const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const errorbey = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks | Genel Yardım Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "**w!avatar **",
      "`Sizin Veya Etiketlediğiniz Kişinin Profilini Atar.`"
    )
    .addField("**w!afk **", "`Sizi Afk Durumuna Alır.`")
    .addField("**w!say**", "`Sunucudaki Ve Sesteki Kişilerin Sayısını Söyler.`")
    .addField(
      "**w!profil**",
      "`Etiketldiğiniz Kişinin Veya Kendi Profilinize Bakarsınız`"
    )
    .addField(" **w!sunucuresmi**", "`Bulunduğunuz Sunucunun Resmini Atar.`")
    .addField(
      "**w!fortnite**",
      "`Yazdığınız Fortnite Hesap İsminin İstasiklerine Bakar.`"
    )
    .addField(
      "**w!lolbilgi**",
      "`Yazdığınız Lol Hesap İsminin İstasiklerine Bakar.`"
    )
    .addField("**w!steamfiyat**", "`Belirtiğiniz Oyun Hakkında Bilgi Verir.`")
    .addField(
      "**w!canlıdestek**",
      "`Botumuzun Destek Sistemindeki Kişiler Sizlerin Sorununa Yardımcı Olur Gereksiz Kullanmayın`"
    )
  
    .addField("**w!bugbildir**", "`Bot Hakkında Bug Bildirirsiniz Gereksiz Kullanmayın.`")
    .setDescription("**[Destek Sunucusu Tıkla](https://discord.gg/waraks)")
    .setFooter(``, client.user.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/713795986111070299/714803282043863142/bots.gif"
    )
    .setFooter("© Kuruluş : 12,07,2020 Waraks BOT", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(errorbey).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["genel"],
  permLevel: 0
};

exports.help = {
  name: "genel"
};
