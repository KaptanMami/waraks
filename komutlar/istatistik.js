const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args) => {
   const muarx = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('BLACK')
  .setFooter(' Waraks\'Bot İstatistikleri', bot.user.avatarURL)
  .addField(" **Botun Sahibi**", "<@564165465465787654>")
  .addField("**Bellek kullanımı** ", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("**Çalışma süresi** ", muarx)
  .addField("**Kullanıcılar** " , bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("**Sunucular** ", bot.guilds.size.toLocaleString(), true)
  .addField(" **Kanallar** ", bot.channels.size.toLocaleString(), true)
  .addField(" **Discord.JS sürüm** ", "v"+Discord.version, true)
  .addField(" **Node.JS sürüm** ", `${process.version}`, true)
  .addField(" **Ping** ", bot.ping+" ms", true)
  .addField(" **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField(" **Bit**", `\`${os.arch()}\``, true)
  .addField(" **İşletim Sistemi**", `\Red Hat`) 
  .addField("**» Bot Davet**", " [Waraks Ekle!](https://discord.com/oauth2/authorize?client_id=54165748653387541&scope=bot&permissions=8)", )
  .addField("**» Destek Sunucusu**", " [Waraks Destek!](https://discord.gg/waraks)", )
  .addField("**» Voteleme sayfası**", " [Waraks'a oy ver!](https://top.gg/bot/5478635835316547/vote)", )
 return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i', 'istatistiklerim'],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};