const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  const maurex = new Discord.RichEmbed()
    .setColor("BLACK")
    .setAuthor(`Waraks  | Eğlence Paneli`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      " ** m!kedi **",
      "`Waraks  Rastgele Kedi Fotoğrafı Atar.`"
    )
    .addField("**w!piyango **", "`Waraks  Sizin İçin Piyango Oynar.`")
    .addField("**w!espri**", "`Waraks  Espri Yapar`")
    .addField("**w!vine**", "`Waraks  Youtubeden Bir Vine Atar.`")
    .addField("**w!spotify**", "`Waraks  Yazdığınız Şarkıyı Spotify'dan Bulur.`")
    .addField("**w!fal**", "`Waraks  Falına Bakar.`")
    .addField("**w!dürt**", "`Waraks  Etiket Attığın Kişiyi Özelden Dürter.`")
    .addField("**w!wasted**", "`Waraks  İle Ölmeye Hazırmısın.`")
    .addField("**w!konuştur**", "`Waraks  Yazdığın Kelimeyi Seste Okur.`")
    .addField("**w!malafat**", "`Waraks  Malafatının Kaç Cm Olduğunu Gösterir.`")
    .addField("**w!korona**", "`Waraks  Yazdığınız Ülkenin Korona İstatistiklerini Gösterir.`")
    .addField("**w!söv**", "`Waraks  İstediğin Kişiye Küfür Eder.`")
    .addField("**w!kasaaç**", "`Waraks  Size Bir CS:GO Kasası Açar.`")
    .addField("**w!ara155**", "`Waraks  Sizin İçin 155'i Arar.`")
    .addField("**w!efkarölçer**", "`Waraks  Efkarı'nızı Ölçer.`")
    .setDescription("[Destek Sunucusu Tıkla](https://discord.gg/waraks)")
    .setFooter(``, client.user.avatarURL)
    .setImage(
      "https://cdn.discordapp.com/attachments/713795986111070299/714803282043863142/bots.gif"
    )
    .setFooter("© Kuruluş : 12,07,2020 Waraks  BOT", client.user.avatarURL)
    .setTimestamp();
  message.channel.send(maurex).catch();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["eğlen"],
  permLevel: 0
};

exports.help = {
  name: "eğlence"
};
