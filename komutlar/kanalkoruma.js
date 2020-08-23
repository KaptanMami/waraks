const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
var ayarlar = require("../ayarlar.json");

const aç = ["aç", "open","on"];
const kapat = ["kapat","off","close"];
const ceza = ["ceza"];
const limit = ["limit"]
const tip = ["tip", "tür"]

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.reply(new Discord.RichEmbed().setColor('#36393f').setDescription(
      `Bu komutu kullanabilmek için **Kanalları Yönet** iznine sahip olmalısın!`
    ));
  }


   if(!args[0]) return message.channel.send("aç yada kapat yazmalısın!")
   
  if(aç.includes(args[0])){
    
    message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription("Kanal Koruma başarıyla açıldı."))
    
    db.set(`kanalk_${message.guild.id}`, "açık")
    
  }
   
     if(kapat.includes(args[0])){
    
    message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription("Kanal Koruma başarıyla kapatıldı."))
    
    db.delete(`kanalk_${message.guild.id}`)
    
  }
   if (ceza.includes(args[0])) {
     if (!args[1]){
       
       let embed = new Discord.RichEmbed()
       .setDescription(new Discord.RichEmbed().setColor('#36393f').setDescription(`:x: Hata: limit,tür,aç veya kapat yazmalısın\n Doğru kullanım: w!kanal-koruma ceza <limit,tür,aç yada kapat>`))
       message.channel.send(embed)
       return;
     }
     if (limit.includes(args[1])) {
       
       if(!args[2]){
         message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription(`Bir sayı yazmalısın!`))
         return;
       }     
       
       db.set(`cezasayı_${message.guild.id}`, args[2])
       message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription(`ceza verme sınırı başarıyla ${args[2]} olarak ayarlandı.`))
     }
      if (tip.includes(args[1])) {
        
        if(!args[2]){
          message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription(`Bir tür yazmalısın. Türler: ban,kick,rolalma`))
          return;
        }
        
        db.set(`cezatip_${message.guild.id}`, args[2])
        message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription(`ceza tipi başarıyla ${args[2]} olarak algılandı`))
        
      }    
     
     if (aç.includes(args[1])) {
       
           message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription("Kanal-koruma-ceza başarıyla açıldı."));

    db.set(`cezasistemi_${message.guild.id}`, "acik");
       
     }
     
          if (kapat.includes(args[1])) {
                message.channel.send(new Discord.RichEmbed().setColor('#36393f').setDescription("Kanal-koruma-ceza sistemi başarıyla kapatıldı."));

    db.set(`cezasistemi_${message.guild.id}`, "kapalı");
          }
     
   }
  
   
};

exports.conf = {
  enabled: true,
  guildOnly: true,
permLevel: 0,
  aliases: []
};

exports.help = {
  name: "kanal-koruma"
};
