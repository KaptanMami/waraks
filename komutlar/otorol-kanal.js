const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!**', '**SÜPER!**', '**NASIL YAPTIN BUNU?!**', '**MÜKEMMEL!**', '**SEVDİM BUNU!**', '**ŞİMDİ OLDU!**'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!**', '**OLMADI BU!**', '**HAY AKSİ!**', '**HADİ ORADAN!**', '**OLMADI YA!**', '**BÖYLE OLMAZ?!**', '**HADİ YA!**'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**${ayarlar.prefix}otorol-kanal** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
    if (!args[0]) return message.reply(`Sistemi kullanabilmek için, w!otorol-kanal ayarla/sıfırla #kanal yazmalısın.\nDetaylı bilgi için: w!otorolyardım`)
    if (args[0] == 'ayarla') {
 let kanal = message.mentions.channels.first() || message.guild.channels.get(args.join(' '))
  if (!kanal)     return message.channel.send(x2 + ` Bir kanal etiketle.`)
    db.set(`otorolkanal_${message.guild.id}`, kanal.id)
  let otorolkanal = await db.set(`otorolkanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + ` **Oto-rol kanalı** ${kanal} **olarak ayarlandı.**`)
  } 
  

  if (args[0] == 'sıfırla') {
    

    
    
    db.delete(`otorolkanal_${message.guild.id}`)

    message.channel.send(x + ` Oto-rol kanalı başarıyla sıfırlandı.`)
  }
};
  
  
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['otorolkanal', 'otorollog', 'otorol-log'],
 permLevel: 0
};

exports.help = {
 name: 'otorol-kanal',
 description: 'Oto-rol sisteminin logunu hangi kanala mesaj gideceğini ayarlarsınız.',
 usage: 'otorol-kanal ayarla/sıfırla #kanal',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};