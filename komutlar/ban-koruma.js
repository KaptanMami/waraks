const Discord = require("discord.js"),
  db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "w!";
  {
    let kanal = message.mentions.channels.first();
    if (!kanal) {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(`**__Lütfen log kanalını etiketleyiniz!__** `);
      message.channel.send(embed);
      return;
    }
    db.set(`bank_${message.guild.id}`, kanal.id);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`**Ban limit log kanalı; ${kanal} olarak ayarlandı!**`);
    message.channel.send(embed);
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 3
};

exports.help = {
  name: "ban-koruma-ayarla",
  description: "ban-koruma",
  usage: "ban-koruma"
};
