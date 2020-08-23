const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      const emoji = client.emojis.find(emoji => emoji.name === "onay");
  const arvelosembed = new Discord.RichEmbed()
  .setColor("blue")
  .setAuthor('Bilgi', `${message.author.displayAvatarURL}`)
        .addField(`Ses kanallarında ${count} kişi bulunmaktadır.`, ` Sunucuda ${message.guild.memberCount} kişi bulunmaktadır.`)
        .setThumbnail("https://cdn.discordapp.com/attachments/704787278890795018/714512321032224788/202005254145898761494713999.jpg")
        .setTimestamp()
      
 
  message.channel.sendEmbed(arvelosembed)
  message.react(emoji)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Sunucudaki ve Sesteki Üyelerin Sayısını Söyler',
  usage: 'say'
};