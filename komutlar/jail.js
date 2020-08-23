const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  let yetkili = db.get(`yetkilirol_${message.guild.id}`);
  let verilecekrol = db.get(`cezalırol_${message.guild.id}`);
  let alınacakrol = db.get(`alınacakrol_${message.guild.id}`);

  let boş = args.slice(0).join(" ");
  if (!boş)
    return message.channel.send(
      " **At yada çıkar yazmalısın.**"
    );

  if (!verilecekrol)
    return message.channel.send(
      " **Cezalı rolü ayarlanmamış**"
    );

  if (!yetkili)
    return message.channel.send(
      " **Jail yetkili rolü ayarlanmamış**"
    );

  if (!message.member.roles.has(yetkili))
    return message.channel.send(
      " **Bu komutu kullanmaya yetkin yetmiyor**"
    );

  if (args[0] == "at") {
    if (!verilecekrol)
      return message.channel.send(
        " **Cezalı rolü ayarlanmamış**"
      );

    if (!yetkili)
      return message.channel.send(
        " **Jail yetkili rolü ayarlanmamış**"
      );

    if (!message.member.roles.has(yetkili))
      return message.channel.send(
        " **Bu komutu kullanmaya yetkin yetmiyor**"
      );

    let user = message.mentions.users.first();
    if (!user)
      return message.channel.send(
        " **Kimi jaile atacağım onu etiketle**"
      );

    let sebep = args.slice(2).join(" ");
    if (!sebep)
      return message.channel.send(
        "**Bir sebep belirtmelisin**"
      );

    message.guild.members.get(user.id).addRole(verilecekrol);
    message.guild.members.get(user.id).removeRole(alınacakrol);
    message.channel.send(
      `${user} **Adlı kişi başarıyla jaile atıldı.** <a:tick:715579283069730877>`
    );

    let log = db.get(`log_${message.guild.id}`);
    client.channels.get(log).send(
      new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle(" **Jaile birisi atıldı**")
        .addField("**Atılan kişi**", user)
        .addField(
          " **Atan yetkili**",
          message.author.tag
        )
        .addField(" **Sebebi**", sebep)
    );
  }

  if (args[0] == "çıkar") {
    if (!verilecekrol)
      return message.channel.send(
        " **Cezalı rolü ayarlanmamış**"
      );

    if (!yetkili)
      return message.channel.send(
        " **Jail yetkili rolü ayarlanmamış**"
      );

    if (!message.member.roles.has(yetkili))
      return message.channel.send(
        "**Bu komutu kullanmaya yetkin yetmiyor**"
      );

    let user = message.mentions.users.first();
    if (!user)
      return message.channel.send("Kimi jailden çıkaracağım onu etiketle!");

    message.guild.members.get(user.id).addRole(alınacakrol);
    message.guild.members.get(user.id).removeRole(verilecekrol);
    message.channel.send(
      `${user} Adlı kişi başarıyla jailden çıkarıldı.`
    );

    let log = db.get(`log_${message.guild.id}`);
    client.channels.get(log).send(
      new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle("**Jailden birisi çıkarıldı**")
        .addField(" **Çıkarılan kişi**", user)
        .addField(
          "**Çıkaran yetkili**",
          message.author.tag
        )
    );
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: []
};

exports.help = {
  name: "jail"
};
