const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
      if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send('Waraks | Yetersiz **yetki!**')
  
  if (!args[0]){
    message.channel.send('Waraks | Geçersiz argüman; **( aç `/` kapat )**')
  }
  if (args[0] === 'aç'){
    message.channel.send("<Waraks | Küfür filtresi **aktif!**")
    
    db.set(`kufur_${message.guild.id}`, "acik")
  }
  if (args[0] === 'kapat'){
    message.channel.send('Waraks| Küfür filtresi **deaktif!**')
    
    db.set(`kufur_${message.guild.id}`, "kapali")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür","küfür-engel","küfür-engelleme"],
  permLevel: 1
}
exports.help = {
  name: "küfür",
  description: "Küfür engel açar yada kapatır.",
  usage: "küfür"
}