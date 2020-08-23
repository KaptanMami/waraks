const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, msg, args) => {
  var başarılı = [
    "**İŞTE BU!**",
    "**SÜPER!**",
    "**NASIL YAPTIN BUNU?!**",
    "**MÜKEMMEL!**",
    "**SEVDİM BUNU!**",
    "**ŞİMDİ OLDU!**"
  ];
  var x = başarılı[Math.floor(Math.random() * başarılı.length)];

  var başarısız = [
    "**TÜH!**",
    "**OLMADI BU!**",
    "**HAY AKSİ!**",
    "**HADİ ORADAN!**",
    "**OLMADI YA!**",
    "**BÖYLE OLMAZ?!**",
    "**HADİ YA!**"
  ];
  var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];

  if (!msg.member.hasPermission("MANAGE_ROLES"))
    return msg.reply(
      `**${ayarlar.prefix}oto-rol** isimli komutu kullanabilmek için \`ROLLERİ YÖNET\` yetkisine sahip olman gerekiyor.`
    );
  if (!args[0])
    return msg.reply(
      `Sistemi kullanabilmek için,w!oto-rol ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: w!otorolyardım`
    );

  if (args[0] == "ayarla") {
    let data = await db.fetch(`otorolkanal_${msg.guild.id}`);
    if (!data)
      return msg.channel.send(
        x2 + ` Log kanalını bulamadım.\nBilgi almak için: m!yardım otorol-kanal`
      );
    let role = msg.mentions.roles.first();
    if (!role) return msg.channel.send(x2 + ` Bir rol etiketlemelisin.`);
    db.set(`${msg.guild.id}.otorol`, role.id);
    msg.channel.send(
      x + ` sistem aktif olarak <@&${role.id}> isimli role ayarlandı.`
    );
  } else if (args[0] == "sıfırla") {
    let otorol = db.fetch(`${msg.guild.id}.otorol`);
    if (!otorol)
      return msg.channel.send(
        x2 + " Sunucuda ayarlanmış bir oto rol sistemi zaten bulunmuyor!"
      );
    else {
      await db.delete(`${msg.guild.id}.otorol`);
      msg.channel.send(
        x +
          " oto-rol **ayarını başarıyla kapattım** <a:tik1:714897076990771300>"
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["otorol"],
  permLevel: 0
};

exports.help = {
  name: "oto-rol",
  description: "Oto-rol sistemini ayarlarsınız.",
  usage: "oto-rol ayarla/sıfırla @rol",
  kategori: "**MODERASYON**",
  permLvl: "**ROLLERİ YÖNET**"
};
