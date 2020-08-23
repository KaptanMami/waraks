const Discord = require("discord.js");
const db = require("quick.db");

exports.run = (client, message, args) => {
  let embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("**Waraks Jail Paneli!!**")
    .addField(
      "**`w!jail-yetkili-rol @jail-yetkilisi`**",
      "**Jail yetkili rolünü ayarlarsınız.**"
    )
    .addField(
      "**`w!jail-cezalı-rol @cezalı`**",
      "**Jail cezalı rolünü ayarlarsınız.**"
    )
    .addField(
      " **`w!jail-alınacak-rol @üye`**",
      "**Jail alınacak rolünü ayarlarsınız.**"
    )
    .addField(
      "**`w!jail-log #jail-log`**",
      "**Jail log kanalını ayarlarsınız.**"
    )
    .addField(
      "**`w!jail at @Üye küfür`**",
      "**Jaile birisini atarsınız.**"
    )
    .addField(
      " **`w!jail çıkar @Üye`**",
      "**Jailden birisini çıkarırsınız.**"
    );
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: []
};

exports.help = {
  name: "jail-yardım"
};
