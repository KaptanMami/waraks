const Discord = require("discord.js");

module.exports.run = async (client, message) => {
  
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`Yapımcım:`,`<@500297618505859072>`)
 .setImage ('https://cdn.discordapp.com/attachments/714523658017570929/715513448477229088/tenor.gif')
.setFooter(client.user.username, client.user.avatarURL)


  message.channel.send(embed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

module.exports.help = {
  name: "yapımcılar",
  description: "yapımcılar",
  usage: "yapımcılar"
};
