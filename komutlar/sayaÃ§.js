const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "Bu Komutu Kullanabilmek İçin Yönetici Olmalısın !"
    );
  if (!args[0]) {
    message.channel.send(
      `__m!sayaç <Sayı> <#kanal> Yapınız__`
    );
    return;
  }

  let profil = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  var mentionedChannel = message.mentions.channels.first();
  if (!mentionedChannel && args[0] !== "sıfırla")
    return message.channel.send(
      "  **Sayaç Kanalı Seçer Misin**"
    );

  if (args[0] === "sıfırla") {
    if (!profil[message.guild.id]) {
      message.channel.send(
        `  **Ayarlanmayan Şeyi Sıfırlayamazsın**`
      );
      return;
    }
    delete profil[message.guild.id];
    fs.writeFile("./ayarlar/sayaç.json", JSON.stringify(profil), err => {
      console.log(err);
    });
    message.channel.send(
      ` **Sayaç Başarıyla Sıfırlandı**`
    );
    return;
  }

  if (isNaN(args[0])) {
    message.channel.send(
      ` **Lütfen Bir Sayı Yazar Mısın**`
    );
    return;
  }

  if (args[0] <= message.guild.memberCount) {
    message.channel.send(
      ` **Lütfen Sunucu Sayısından** [${message.guild.memberCount}] **Daha Yüksek Bir Değer Girer Misin**`
    );
    return;
  }

  if (!profil[message.guild.id]) {
    profil[message.guild.id] = {
      sayi: args[0],
      kanal: mentionedChannel.id
    };
  }

  profil[message.guild.id].sayi = args[0];
  profil[message.guild.id].kanal = mentionedChannel.id;

  fs.writeFile("./ayarlar/sayaç.json", JSON.stringify(profil), err => {
    console.log(err);
  });

  message.channel.send(
    ` \n **╔▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬** \n **║  Sayaç Başarılı Bir Şekilde Ayarlanmıştır.** \n **║<a:sagok1:714169901790527608>  Sayaç Hedefi ` +
      args[0] +
      ` Olarak Ayarlanmıştır.** \n **║  Sayaç Kanalı  ${mentionedChannel}  Olarak Ayarlanmıştır.** \n **║Sayacı Kapatmak İçin m!sayaç sıfırla Yazmalısınız.** \n **╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sayacayarla", "sayac", "sayaç"],
  permLevel: 0
};

exports.help = {
  name: "sayaç",
  description: "Sayacı ayarlar.",
  usage: "sayaç [sayı/sıfırla] [kanal]"
};
