// BOTUN İSMİ NE OLCAK LA
// WARAKS OLSUN
//PREFİX İ NE YPCAZ
//w! İŞTE WARAKS OLDUĞUNA GÖRE :D
//BOTU YAPK SONRA HAYRINA PAYLAŞIRIZ QWEqwq:wQ:e
//BAKARZ
//OK HADİ BEN BAŞLİOM










const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} Kullanıcıya ulaştık! Sayaç Sıfırlandı <a:gold:663748584700641291>!`
        )
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile("./ayarlar/sayaç.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});

client.on("message", async message => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  if (sayac[message.guild.id]) {
    if (sayac[message.guild.id].sayi <= message.guild.members.size) {
      const embed = new Discord.RichEmbed()
        .setDescription(
          `Tebrikler ${message.guild.name}! Başarıyla ${sayac[message.guild.id].sayi} Kullanıcıya Ulaştık! Sayaç Sıfırlandı <a:gold:663748584700641291>`
        )
        .setColor("RANDOM")
        .setTimestamp();
      message.channel.send({ embed });
      delete sayac[message.guild.id].sayi;
      delete sayac[message.guild.id];
      fs.writeFile("./ayarlar/sayaç.json", JSON.stringify(sayac), err => {
        console.log(err);
      });
    }
  }
});
client.on("guildMemberRemove", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("RED")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `:loudspeaker: :outbox_tray: \`${
        member.user.tag
      }\` Adlı Kullanıcısı Sunucudan Ayrıldı. \`${
        sayac[member.guild.id].sayi
      }\` Kişi Olmamıza \`${sayac[member.guild.id].sayi -
        member.guild.memberCount}\` Kişi Kaldı \`${
        member.guild.memberCount
      }\` Kişiyiz !`
    );
  } catch (e) {
    return console.log(e);
  }
});
client.on("guildMemberAdd", async member => {
  let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayaç.json", "utf8"));
  let embed = new Discord.RichEmbed()
    .setTitle("")
    .setDescription(``)
    .setColor("GREEN")
    .setFooter("", client.user.avatarURL);

  if (!giriscikis[member.guild.id].kanal) {
    return;
  }

  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds
      .get(member.guild.id)
      .channels.get(giriscikiskanalID);
    giriscikiskanali.send(
      `  \`${
        member.user.tag
      }\` Adlı Kullanıcı Sunucuya Katıldı! \`${
        sayac[member.guild.id].sayi
      }\` Kişi Olmamıza \`${sayac[
        member.guild.id
      ].sayi - member.guild.memberCount}\` Kişi Kaldı \`${
        member.guild.memberCount
      }\` Kişiyiz ! `
    );
  } catch (e) {
    return console.log(e);
  }
});
////////////////İNVİTE SİSTEMİ
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kişi aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
///////////PANEL MAİNİ
client.on("guildMemberAdd", async member => {
  let sat = await db.fetch(`kategori_${member.guild.id}`);
  let sa = await db.fetch(`toplamk_${member.guild.id}`);
  let sa1 = await db.fetch(`botk_${member.guild.id}`);
  let sa2 = await db.fetch(`aktif_${member.guild.id}`);
  let sa3 = await db.fetch(`rekor_${member.guild.id}`);
  let sa4 = await db.fetch(`son_${member.guild.id}`);
  if (!sat) return;
  if (!sa) return;
  if (!sa1) return;
  if (!sa2) return;
  if (!sa3) return;
  if (!sa4) return;
  try {
    let isim =
      (await db.fetch(`isimtoplam_${member.guild.id}`)) ||
      `» Toplam Üye {toplamüye}`;
    member.guild.channels
      .get(sa)
      .setName(isim.replace(`{toplamüye}`, member.guild.memberCount));
  } catch (err) {
    return;
  }
  try {
    let isim2 =
      (await db.fetch(`isimsonüye_${member.guild.id}`)) ||
      `» Son Üye: {sonüye}`;
    member.guild.channels
      .get(sa4)
      .setName(isim2.replace(`{sonüye}`, member.user.tag));
  } catch (err) {
    return;
  }
  if (client.users.get(member.id).bot) {
    try {
      let isim3 =
        (await db.fetch(`isimbot_${member.guild.id}`)) ||
        `» Toplam Bot {toplambot}`;
      member.guild.channels
        .get(sa1)
        .setName(
          isim3.replace(
            `{toplambot}`,
            member.guild.members.filter(m => m.user.bot).size
          )
        );
    } catch (err) {
      return;
    }
  }
});

client.on("guildMemberRemove", async member => {
  let sat = await db.fetch(`kategori_${member.guild.id}`);
  let sa = await db.fetch(`toplamk_${member.guild.id}`);
  let sa1 = await db.fetch(`botk_${member.guild.id}`);
  let sa2 = await db.fetch(`aktif_${member.guild.id}`);
  let sa3 = await db.fetch(`rekor_${member.guild.id}`);
  let sa4 = await db.fetch(`son_${member.guild.id}`);
  if (!sat) return;
  if (!sa) return;
  if (!sa1) return;
  if (!sa2) return;
  if (!sa3) return;
  if (!sa4) return;
  try {
    let isim =
      (await db.fetch(`isimtoplam_${member.guild.id}`)) ||
      `» Toplam Üye {toplamüye}`;
    member.guild.channels
      .get(sa)
      .setName(isim.replace(`{toplamüye}`, member.guild.memberCount));
  } catch (err) {
    return;
  }
  if (client.users.get(member.id).bot) {
    try {
      let isim3 =
        (await db.fetch(`isimbot_${member.guild.id}`)) ||
        `» Toplam Bot {toplambot}`;
      member.guild.channels
        .get(sa1)
        .setName(
          isim3.replace(
            `{toplambot}`,
            member.guild.members.filter(m => m.user.bot).size
          )
        );
    } catch (err) {
      return;
    }
  }
});

client.on("message", async message => {
  let sa2 = await db.fetch(`aktif_${message.guild.id}`);
  let kanal = await db.fetch(`rekor_${message.guild.id}`);
  let rekoronline = await db.fetch(`panelrekor_${message.guild.id}`);
  try {
    let isim1 =
      (await db.fetch(`isimaktif_${message.guild.id}`)) ||
      `» Toplam Aktif {toplamaktif}`;
    message.guild.channels
      .get(sa2)
      .setName(
        isim1.replace(
          `{toplamaktif}`,
          message.guild.members.filter(off => off.presence.status !== "offline")
            .size
        )
      );
  } catch (err) {
    return;
  }
  if (
    message.guild.members.filter(off => off.presence.status !== "offline")
      .size > rekoronline
  ) {
    db.set(
      `panelrekor_${message.guild.id}`,
      message.guild.members.filter(off => off.presence.status !== "offline")
        .size
    );
    let kontrole = await db.fetch(`panelrekor_${message.guild.id}`);
    try {
      let isim2 =
        (await db.fetch(`isimrekoraktif_${message.guild.id}`)) ||
        `» Rekor Aktif {rekoraktif}`;
      message.guild.channels
        .get(kanal)
        .setName(isim2.replace(`{rekoraktif}`, kontrole));
    } catch (err) {
      return;
    }
  }
});
/////OTO ROL///
client.on("guildMemberAdd", async (member, guild, message) => {
  let otorol = await db.fetch(`${member.guild.id}.otorol`);
  let i = await db.fetch(`otorolkanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;

      member.addRole(member.guild.roles.get(otorol));
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setFooter(`Waraks`)
        .setTimestamp()
        .setDescription(
          `**Sunucuya yeni katılan** <@${member.user.id}> **kullanıcısına** <@&${otorol}> **isimli rol verildi.**`
        );
      member.guild.channels.get(i).send(embed);
    } catch (e) {
      console.log(e);
    }
  }
});
///////BAN KORUMA MAİN DOSYASI////////
client.on("guildBanAdd", async (guild, user) => {
  let kanal = await db.fetch(`bank_${guild.id}`);
  let rol = await db.fetch(`banrol_${guild.id}`);
  if (!kanal) return;
  {
    const entry = await guild
      .fetchAuditLogs({ type: "GUILD_BAN_ADD" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    if (entry.executor.id == guild.owner.id) return;
    if (!rol) {
      guild.unban(user.id);
      guild.members.get(entry.executor.id).kick();
      const embed = new Discord.RichEmbed()
        .setTitle(`Biri Yasaklandı!`)
        .setColor("BLACK")
        .addField(`Yasaklayan`, entry.executor.tag)
        .addField(`Yasaklanan Kişi`, user.name)
        .addField(
          `Sonuç`,
          `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
        );
      client.channels.get(kanal).send(embed);
    } else {
      if (entry.executor.roles.has(rol)) {
        let limito = await db.fetch(`limido_${entry.executor.id}`);
        let slimito = await db.fetch(`slimido_${guild.id}`);
        if (slimito == limito || slimito > limito) {
          db.delete(`limido_${entry.executor.id}`);
          guild.unban(user.id);
          guild.members.get(entry.executor.id).kick();
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!\nNOT: LİMİTİ AŞTI!`
            );
          client.channels.get(kanal).send(embed);
        } else {
          db.add(`limido_${entry.executor.id}`, +1);
          const embed = new Discord.RichEmbed()
            .setTitle(`Biri Yasaklandı!`)
            .setColor("BLACK")
            .addField(`Yasaklayan`, entry.executor.tag)
            .addField(`Yasaklanan Kişi`, user.name)
            .addField(
              `Sonuç`,
              `Yasaklayan kişi ${limito}/${slimito} sınırına ulaştı!`
            );
          client.channels.get(kanal).send(embed);
        }
      } else {
        guild.unban(user.id);
        guild.members.get(entry.executor.id).kick();
        const embed = new Discord.RichEmbed()
          .setTitle(`Biri Yasaklandı!`)
          .setColor("BLACK")
          .addField(`Yasaklayan`, entry.executor.tag)
          .addField(`Yasaklanan Kişi`, user.name)
          .addField(
            `Sonuç`,
            `Yasaklayan kişi sunucudan açıldı!\nve yasaklanan kişinin yasağı kalktı!`
          );
        client.channels.get(kanal).send(embed);
      }
    }
  }
});

/////SA-AS/////
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if (i === "acik") {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          "**Aleyküm Selam, Hoşgeldin!** "
        );

      message.channel.send(embed).then(msg => msg.delete(5000));
    }
  }
});
/////////DESTEK EKİP GOLD

////Oto Tag///
client.on("guildMemberAdd", async member => {
  let kontrol = await db.fetch(`ototag_${member.guild.id}`);
  if (!kontrol) return;
  if (member.bot === true) return;

  var sonuc = await db
    .fetch(`ototag_${member.guild.id}`)
    .replace("-uye-", `${member.user.username}`);
  member.setNickname(sonuc);
});
//////bot eklendi
client.on("guildCreate", guild => {
  let waraks = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Botumuzu Ekledi  ")
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
  client.channels.get(" ").send(waraks);
});

///bot atıldı
client.on("guildDelete", guild => {
  let waraks = new Discord.RichEmbed()

    .setColor("RED")
    .setTitle("Botumuzu Attı! ")
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount);
  client.channels.get(" ").send(waraks);
});
////Rol Koruma//
client.on("roleUpdate", async function(oldRole, newRole) {
  const Kanal = db
    .fetch(`rolkorumakanal_${oldRole.guild.id}`)
    .replace("<#", "")
    .replace(">", "");
  let koruma = `rolkoruma_${oldRole.guild.id}`; //db limi olcak dbli yapıcam ayar şeyni istersen

  if (Kanal === null) return;
  const bilgilendir = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPLATE" })
    .then(hatırla => hatırla.entries.first());
  let yapanad = bilgilendir.executor;
  let idler = bilgilendir.executor.id;
  // yapan kişinin id si bu ise bir şey yapma
  if (oldRole.hasPermission("ADMINISTRATOR")) return;

  setTimeout(() => {
    if (newRole.hasPermission("ADMINISTRATOR")) {
      newRole.setPermissions(newRole.permissions - 8);
    }

    if (newRole.hasPermission("ADMINISTRATOR")) {
      if (!client.guilds.get(newRole.guild.id).channels.has(Kanal))
        return newRole.guild.owner.send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}**`
        ); //bu id ye sahip kanal yoksa sunucu sahibine yaz

      client.channels
        .get(Kanal)
        .send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}**`
        ); // belirtilen id ye sahip kanala yaz
    }
  }, 1000);
});
////////////////
client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "**Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi! (Rol Koruma Sistemi)** "
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
////////////////////7
client.on("messageDelete", async message => {
  // mod-log
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("MESAJ SİLİNDİ")
    .setDescription(
      `<@!${message.author.id}> adlı kullanıcı tarafından <#${message.channel.id}> kanalına gönderilen mesaj silindi!\n\nSilinen Mesaj: **${message.content}**`
    )
    .setFooter("Waraks |  Mod-Log");
  modlogkanal.sendEmbed(embed);
});

client.on("guildBanAdd", async message => {
  let modlogs = db.get(`tc-modlog_${message.guild.id}`);
  const modlogkanal = message.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  const embed = new Discord.RichEmbed()
    .setColor("BLUE")

    .setDescription(
      `Üye Sunucudan Yasaklandı! \n<@!${message.user.id}>, ${message.user.tag}`
    )
    .setThumbnail(message.user.avatarURL)
    .setFooter("Waraks | mod-log");
  modlogkanal.sendEmbed(embed);
});
client.on("channelCreate", async channel => {
  let modlogs = db.get(`tc-modlog_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogkanal) return;
  if (channel.type === "text") {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${channel.name} adlı metin kanalı oluşturuldu.`)
      .setFooter(`Waraks | Mod-Log Sistemi Kanal ID: ${channel.id}`);
    modlogkanal.send({ embed });
  }
  if (channel.type === "voice") {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("SES KANALI OLUŞTURULDU")
      .setDescription(`${channel.name} adlı ses kanalı oluşturuldu!`)
      .setFooter(`Waraks | Mod-Log Sistemi Kanal ID: ${channel.id}`);

    modlogkanal.send({ embed });
  }
});

///////////////////GOLD
client.on("message", async message => {
  if (
    message.content === "sa" ||
    message.content === "Sa" ||
    message.content === "Selamın Aleyküm" ||
    message.content === "selamın aleyküm" ||
    message.content === "slm" ||
    message.content === "Sea"
  ) {
    let gold = require("quick.db").fetch(`tios_gold${message.author.id}`);
    if (gold === "gold") {
      const embed = new Discord.RichEmbed()
        .setColor("GOLD")
        .setDescription(
          "**Hizaya Geçin Bu Bir** **__Gold__** **Üye**  "
        );
      message.channel.send({ embed }).then(msg => msg.delete(5000));
    } else {
      return;
    }
  }
});
/////////YÖNETİM GOLDD
client.on("message", async message => {
  if (
    message.content === "sa" ||
    message.content === "as" ||
    message.content === "hb" ||
    message.content === "as hg" ||
    message.content === "Sa" ||
    message.content === "Selamın Aleyküm" ||
    message.content === "selamın aleyküm" ||
    message.content === "slm" ||
    message.content === "Sea"
  ) {
    let gold = require("quick.db").fetch(`yönetim_gold${message.author.id}`); //mr
    if (gold === "gold") {
      const embed = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          " **Hizaya Geçin Bu Bir** **__Bot Yönetim Ekibinden__** **Üye** "
        );
      message.channel.send({ embed }).then(msg => msg.delete(5000));
    } else {
      return;
    }
  }
});
///////////Bot Koruma
client.on("guildMemberAdd", async member => {
  if (db.has(`botkoruma_${member.guild.id}`) === false) return;
  if (member.user.bot === false) return;
  if (db.has(`botİzinli_${member.id}`) === true) return;

  member.kick(member, `Bot koruması aktif!`);

  member.guild.owner.send(
    `Sunucunuza bir bot eklendi ve sunucudan otomatik olarak atıldı, sunucuya eklenmesini onaylıyor iseniz \`!giriş-izni ${member.id}\``
  );
});
/////kanal koruma//
client.on("channelDelete", async channel => {
  const kanalk = db.get(`kanalk_${channel.guild.id}`);

  if (kanalk == "açık") {
    const logs = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    const deleter = await channel.guild.members.get(logs.executor.id);
    let rol = db.get(`yetkilirol_${channel.guild.id}`);
    if (deleter.roles.has(rol)) {
      const entry = await channel.guild
        .fetchAuditLogs({ type: "CHANNEL_DELETE" })
        .then(audit => audit.entries.first());
      let kisi = channel.guild.member(entry.executor);

      return;
    } else {
      channel
        .clone(undefined, true, true, "Kanal silme Koruma")
        .then(async klon => {
          await klon.setParent(channel.parent);
          await klon.setPosition(channel.position);
          const entry = await channel.guild
            .fetchAuditLogs({ type: "CHANNEL_DELETE" })
            .then(audit => audit.entries.first());

          let kisi = channel.guild.member(entry.executor);
          db.add(`kanaluyarı_${channel.guild.id}_${kisi.id}`, 1);
          let sayı = db.get(`kanaluyarı_${channel.guild.id}_${kisi.id}`);
          let embed = new Discord.RichEmbed()
            .setTitle("Uyarı")
            .setColor("RED")
            .setFooter("Kanal Koruma")
            .setDescription(
              `\`${channel.guild.name}\` adlı sunucunuzda ${channel.name} adlı kanal, ${kisi} adlı kişi tarafından silindi. Ben tekrardan onardım! Bu onun ${sayı} yapışı`
            );

          channel.guild.owner.send(embed);

          const cezasistemi = db.get(`cezasistemi_${channel.guild.id}`);
          const cezatip = db.get(`cezatip_${channel.guild.id}`);

          if (cezasistemi == "açık") {
            const cezasayı = db.get(`cezasayı_${channel.guild.id}`);

            if (sayı == cezasayı) {
              if (cezatip == "kick") {
                kisi.kick();
              }

              if (cezatip == "ban") {
                channel.guild.ban(kisi, 2);
              }

              if (cezatip == "rolalma") {
                kisi.roles
                  .filter(a => a.hasPermission("ADMINISTRATOR"))
                  .forEach(x => kisi.removeRole(x.id));
                kisi.roles
                  .filter(a => a.hasPermission("MANAGE_CHANNELS"))
                  .forEach(x => kisi.removeRole(x.id));
                kisi.roles
                  .filter(a => a.hasPermission("MANAGE_ROLES"))
                  .forEach(x => kisi.removeRole(x.id));
              }
            }
          }
        });
    }
  }
});

client.login(ayarlar.token);

////Botu Ekleyene Mesaj///
client.on("guildCreate", guild => {
  let kanal = guild.channels.filter(c => c.type === "text").random();

  kanal.send(
    "**Beni Sunucuna Eklediğin İçin Teşekkürler.**\n  **Komutları Öğrenmek İçin w!yardım \n **Destek Sunucum İçin w!davet Yazman Yeterli.**"
  );
});
///log
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  console.log(
    `${chalk.green(client.user.username)}${chalk.red(",")} ${chalk.blue(
      client.guilds.size
    )} ${chalk.yellow("Sunucu'ya")} ${chalk.red("ve")} ${chalk.blue(
      client.users.size.toLocaleString()
    )} ${chalk.yellow("Kullanıcı'ya")} ${chalk.red("hizmet veriyor!")}`
  );
  client.user.setStatus("dnd");
  let embed = new Discord.RichEmbed()
    .setTitle(`♛**${client.user.username} Bot Durum**♛`)
    .setDescription(
      ` ➥ **${client.guilds
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString() + ``}** kullanıcıya hizmet veriyorum. \n ➥ **${
        client.guilds.size
      }** sunucuya hizmet veriyorum. \n ➥ **${
        client.channels.size
      }** adet kanala hizmet veriyorum. \n ➥ pingim **${client.ping}**. `
    )
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setColor("40bcdb")
    .setFooter(`${client.user.username} `, client.user.avatarURL);
  client.channels.get(" ").send(embed);
});
///Anti Raid
client.on("guildMemberAdd", member => {
  const db = require("quick.db");

  const guild = member.guild;

  const katılabilir = db.fetch(`katılabilir_${member.id}`);

  const Kanal = db
    .fetch(`antiraid_${member.guild.id}`)
    .replace("<#", "")
    .replace(">", "");
  if (katılabilir == undefined) {
    if (Kanal != undefined) {
    }

    if (member.user.bot !== true) {
    } else {
      member.guild.channels
        .get(Kanal)
        .send(
          `:white_check_mark: ${member} adlı bot, Anti-raid özelliği aktif olduğundan dolayı sunucudan atıldı.`
        );
      member.kick(member);
    }
  }
  if (katılabilir == "katılabilir") {
    member.guild.channels
      .get(Kanal)
      .send(
        `:white_check_mark: ${member} adlı bot, Anti-raid özelliğinden etkilenmediğinden dolayı sunucuya katıldı.`
      );
    db.delete(`katılabilir_${member.id}`);
  }
});

/////Özel Komut////
client.on("message", async msg => {
  let ozelkomut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let ozelkomutYazi;
  if (ozelkomut == null) ozelkomutYazi = "Burayı silme yoksa hatalı olur";
  else ozelkomutYazi = "" + ozelkomut + "";
  if (msg.content.toLowerCase() === `${ozelkomutYazi}`) {
    let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
    let mesajYazi;
    if (mesaj == null) mesajYazi = "Burayı silme yoksa hatalı olur";
    else mesajYazi = "" + mesaj + "";
    msg.channel.send(mesajYazi);
  }
});
///Reklam Engel
client.on("message", msg => {
  var reklam = db.fetch(`reklam_${msg.channel.id}`);
  if (reklam == "acik") {
    const reklam = [
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      "net",
      ".rf.gd",
      ".az",
      ".party",
      "j4j"
    ];
    if (reklam.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          return msg
            .reply("Reklam Yapmayı Kes! ⚠")
            .then(msg => msg.delete(3000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  } else if (reklam == "kapali") {
  }
  if (!reklam) return;
});
//KÜFÜR ENGEL//
client.on("message", async vegas => {
  let recep = await db.fetch(`küfürengel_${yecep.guild.id}`);
  if (!recep) return;

  let yecep = yecep.content;

  if (yecep.member.permissions.has("ADMINISTRATOR")) return;
  let küfürler = [
    "abaza",
    "abazan",
    "ag",
    "a\u011fz\u0131na s\u0131\u00e7ay\u0131m",
    "ahmak",
    "allah",
    "allahs\u0131z",
    "am",
    "amar\u0131m",
    "ambiti",
    "am biti",
    "amc\u0131\u011f\u0131",
    "amc\u0131\u011f\u0131n",
    "amc\u0131\u011f\u0131n\u0131",
    "amc\u0131\u011f\u0131n\u0131z\u0131",
    "amc\u0131k",
    "amc\u0131k ho\u015faf\u0131",
    "amc\u0131klama",
    "amc\u0131kland\u0131",
    "amcik",
    "amck",
    "amckl",
    "amcklama",
    "amcklaryla",
    "amckta",
    "amcktan",
    "amcuk",
    "am\u0131k",
    "am\u0131na",
    "am\u0131nako",
    "am\u0131na koy",
    "am\u0131na koyar\u0131m",
    "am\u0131na koyay\u0131m",
    "am\u0131nakoyim",
    "am\u0131na koyyim",
    "am\u0131na s",
    "am\u0131na sikem",
    "am\u0131na sokam",
    "am\u0131n feryad\u0131",
    "am\u0131n\u0131",
    "am\u0131n\u0131 s",
    "am\u0131n oglu",
    "am\u0131no\u011flu",
    "am\u0131n o\u011flu",
    "am\u0131s\u0131na",
    "am\u0131s\u0131n\u0131",
    "amina",
    "amina g",
    "amina k",
    "aminako",
    "aminakoyarim",
    "amina koyarim",
    "amina koyay\u0131m",
    "amina koyayim",
    "aminakoyim",
    "aminda",
    "amindan",
    "amindayken",
    "amini",
    "aminiyarraaniskiim",
    "aminoglu",
    "amin oglu",
    "amiyum",
    "amk",
    "amkafa",
    "amk \u00e7ocu\u011fu",
    "amlarnzn",
    "aml\u0131",
    "amm",
    "ammak",
    "ammna",
    "amn",
    "amna",
    "amnda",
    "amndaki",
    "amngtn",
    "amnn",
    "amona",
    "amq",
    "ams\u0131z",
    "amsiz",
    "amsz",
    "amteri",
    "amugaa",
    "amu\u011fa",
    "amuna",
    "ana",
    "anaaann",
    "anal",
    "analarn",
    "anam",
    "anamla",
    "anan",
    "anana",
    "anandan",
    "anan\u0131",
    "anan\u0131",
    "anan\u0131n",
    "anan\u0131n am",
    "anan\u0131n am\u0131",
    "anan\u0131n d\u00f6l\u00fc",
    "anan\u0131nki",
    "anan\u0131sikerim",
    "anan\u0131 sikerim",
    "anan\u0131sikeyim",
    "anan\u0131 sikeyim",
    "anan\u0131z\u0131n",
    "anan\u0131z\u0131n am",
    "anani",
    "ananin",
    "ananisikerim",
    "anani sikerim",
    "ananisikeyim",
    "anani sikeyim",
    "anann",
    "ananz",
    "anas",
    "anas\u0131n\u0131",
    "anas\u0131n\u0131n am",
    "anas\u0131 orospu",
    "anasi",
    "anasinin",
    "anay",
    "anayin",
    "angut",
    "anneni",
    "annenin",
    "annesiz",
    "anuna",
    "aptal",
    "aq",
    "a.q",
    "a.q.",
    "aq.",
    "ass",
    "atkafas\u0131",
    "atm\u0131k",
    "att\u0131rd\u0131\u011f\u0131m",
    "attrrm",
    "auzlu",
    "avrat",
    "ayklarmalrmsikerim",
    "azd\u0131m",
    "azd\u0131r",
    "azd\u0131r\u0131c\u0131",
    "babaannesi ka\u015far",
    "baban\u0131",
    "baban\u0131n",
    "babani",
    "babas\u0131 pezevenk",
    "baca\u011f\u0131na s\u0131\u00e7ay\u0131m",
    "bac\u0131na",
    "bac\u0131n\u0131",
    "bac\u0131n\u0131n",
    "bacini",
    "bacn",
    "bacndan",
    "bacy",
    "bastard",
    "basur",
    "beyinsiz",
    "b\u0131z\u0131r",
    "bitch",
    "biting",
    "bok",
    "boka",
    "bokbok",
    "bok\u00e7a",
    "bokhu",
    "bokkkumu",
    "boklar",
    "boktan",
    "boku",
    "bokubokuna",
    "bokum",
    "bombok",
    "boner",
    "bosalmak",
    "bo\u015falmak",
    "cenabet",
    "cibiliyetsiz",
    "cibilliyetini",
    "cibilliyetsiz",
    "cif",
    "cikar",
    "cim",
    "\u00e7\u00fck",
    "dalaks\u0131z",
    "dallama",
    "daltassak",
    "dalyarak",
    "dalyarrak",
    "dangalak",
    "dassagi",
    "diktim",
    "dildo",
    "dingil",
    "dingilini",
    "dinsiz",
    "dkerim",
    "domal",
    "domalan",
    "domald\u0131",
    "domald\u0131n",
    "domal\u0131k",
    "domal\u0131yor",
    "domalmak",
    "domalm\u0131\u015f",
    "domals\u0131n",
    "domalt",
    "domaltarak",
    "domalt\u0131p",
    "domalt\u0131r",
    "domalt\u0131r\u0131m",
    "domaltip",
    "domaltmak",
    "d\u00f6l\u00fc",
    "d\u00f6nek",
    "d\u00fcd\u00fck",
    "eben",
    "ebeni",
    "ebenin",
    "ebeninki",
    "ebleh",
    "ecdad\u0131n\u0131",
    "ecdadini",
    "embesil",
    "emi",
    "fahise",
    "fahi\u015fe",
    "feri\u015ftah",
    "ferre",
    "fuck",
    "fucker",
    "fuckin",
    "fucking",
    "gavad",
    "gavat",
    "geber",
    "geberik",
    "gebermek",
    "gebermi\u015f",
    "gebertir",
    "ger\u0131zekal\u0131",
    "gerizekal\u0131",
    "gerizekali",
    "gerzek",
    "giberim",
    "giberler",
    "gibis",
    "gibi\u015f",
    "gibmek",
    "gibtiler",
    "goddamn",
    "godo\u015f",
    "godumun",
    "gotelek",
    "gotlalesi",
    "gotlu",
    "gotten",
    "gotundeki",
    "gotunden",
    "gotune",
    "gotunu",
    "gotveren",
    "goyiim",
    "goyum",
    "goyuyim",
    "goyyim",
    "g\u00f6t",
    "g\u00f6t deli\u011fi",
    "g\u00f6telek",
    "g\u00f6t herif",
    "g\u00f6tlalesi",
    "g\u00f6tlek",
    "g\u00f6to\u011flan\u0131",
    "g\u00f6t o\u011flan\u0131",
    "g\u00f6to\u015f",
    "g\u00f6tten",
    "g\u00f6t\u00fc",
    "g\u00f6t\u00fcn",
    "g\u00f6t\u00fcne",
    "g\u00f6t\u00fcnekoyim",
    "g\u00f6t\u00fcne koyim",
    "g\u00f6t\u00fcn\u00fc",
    "g\u00f6tveren",
    "g\u00f6t veren",
    "g\u00f6t verir",
    "gtelek",
    "gtn",
    "gtnde",
    "gtnden",
    "gtne",
    "gtten",
    "gtveren",
    "hasiktir",
    "hassikome",
    "hassiktir",
    "has siktir",
    "hassittir",
    "haysiyetsiz",
    "hayvan herif",
    "ho\u015faf\u0131",
    "h\u00f6d\u00fck",
    "hsktr",
    "huur",
    "\u0131bnel\u0131k",
    "ibina",
    "ibine",
    "ibinenin",
    "ibne",
    "ibnedir",
    "ibneleri",
    "ibnelik",
    "ibnelri",
    "ibneni",
    "ibnenin",
    "ibnerator",
    "ibnesi",
    "idiot",
    "idiyot",
    "imansz",
    "ipne",
    "iserim",
    "i\u015ferim",
    "ito\u011flu it",
    "kafam girsin",
    "kafas\u0131z",
    "kafasiz",
    "kahpe",
    "kahpenin",
    "kahpenin feryad\u0131",
    "kaka",
    "kaltak",
    "kanc\u0131k",
    "kancik",
    "kappe",
    "karhane",
    "ka\u015far",
    "kavat",
    "kavatn",
    "kaypak",
    "kayyum",
    "kerane",
    "kerhane",
    "kerhanelerde",
    "kevase",
    "keva\u015fe",
    "kevvase",
    "koca g\u00f6t",
    "kodu\u011fmun",
    "kodu\u011fmunun",
    "kodumun",
    "kodumunun",
    "koduumun",
    "koyarm",
    "koyay\u0131m",
    "koyiim",
    "koyiiym",
    "koyim",
    "koyum",
    "koyyim",
    "krar",
    "kukudaym",
    "laciye boyad\u0131m",
    "lavuk",
    "libo\u015f",
    "madafaka",
    "mal",
    "malafat",
    "malak",
    "manyak",
    "mcik",
    "meme",
    "memelerini",
    "mezveleli",
    "minaamc\u0131k",
    "mincikliyim",
    "mna",
    "monakkoluyum",
    "motherfucker",
    "mudik",
    "oc",
    "ocuu",
    "ocuun",
    "O\u00c7",
    "o\u00e7",
    "o. \u00e7ocu\u011fu",
    "o\u011flan",
    "o\u011flanc\u0131",
    "o\u011flu it",
    "orosbucocuu",
    "orospu",
    "orospucocugu",
    "orospu cocugu",
    "orospu \u00e7oc",
    "orospu\u00e7ocu\u011fu",
    "orospu \u00e7ocu\u011fu",
    "orospu \u00e7ocu\u011fudur",
    "orospu \u00e7ocuklar\u0131",
    "orospudur",
    "orospular",
    "orospunun",
    "orospunun evlad\u0131",
    "orospuydu",
    "orospuyuz",
    "orostoban",
    "orostopol",
    "orrospu",
    "oruspu",
    "oruspu\u00e7ocu\u011fu",
    "oruspu \u00e7ocu\u011fu",
    "osbir",
    "ossurduum",
    "ossurmak",
    "ossuruk",
    "osur",
    "osurduu",
    "osuruk",
    "osururum",
    "otuzbir",
    "\u00f6k\u00fcz",
    "\u00f6\u015fex",
    "patlak zar",
    "penis",
    "pezevek",
    "pezeven",
    "pezeveng",
    "pezevengi",
    "pezevengin evlad\u0131",
    "pezevenk",
    "pezo",
    "pic",
    "pici",
    "picler",
    "pi\u00e7",
    "pi\u00e7in o\u011flu",
    "pi\u00e7 kurusu",
    "pi\u00e7ler",
    "pipi",
    "pipi\u015f",
    "pisliktir",
    "porno",
    "pussy",
    "pu\u015ft",
    "pu\u015fttur",
    "rahminde",
    "revizyonist",
    "s1kerim",
    "s1kerm",
    "s1krm",
    "sakso",
    "saksofon",
    "salaak",
    "salak",
    "saxo",
    "sekis",
    "serefsiz",
    "sevgi koyar\u0131m",
    "sevi\u015felim",
    "sexs",
    "s\u0131\u00e7ar\u0131m",
    "s\u0131\u00e7t\u0131\u011f\u0131m",
    "s\u0131ecem",
    "sicarsin",
    "sie",
    "sik",
    "sikdi",
    "sikdi\u011fim",
    "sike",
    "sikecem",
    "sikem",
    "siken",
    "sikenin",
    "siker",
    "sikerim",
    "sikerler",
    "sikersin",
    "sikertir",
    "sikertmek",
    "sikesen",
    "sikesicenin",
    "sikey",
    "sikeydim",
    "sikeyim",
    "sikeym",
    "siki",
    "sikicem",
    "sikici",
    "sikien",
    "sikienler",
    "sikiiim",
    "sikiiimmm",
    "sikiim",
    "sikiir",
    "sikiirken",
    "sikik",
    "sikil",
    "sikildiini",
    "sikilesice",
    "sikilmi",
    "sikilmie",
    "sikilmis",
    "sikilmi\u015f",
    "sikilsin",
    "sikim",
    "sikimde",
    "sikimden",
    "sikime",
    "sikimi",
    "sikimiin",
    "sikimin",
    "sikimle",
    "sikimsonik",
    "sikimtrak",
    "sikin",
    "sikinde",
    "sikinden",
    "sikine",
    "sikini",
    "sikip",
    "sikis",
    "sikisek",
    "sikisen",
    "sikish",
    "sikismis",
    "siki\u015f",
    "siki\u015fen",
    "siki\u015fme",
    "sikitiin",
    "sikiyim",
    "sikiym",
    "sikiyorum",
    "sikkim",
    "sikko",
    "sikleri",
    "sikleriii",
    "sikli",
    "sikm",
    "sikmek",
    "sikmem",
    "sikmiler",
    "sikmisligim",
    "siksem",
    "sikseydin",
    "sikseyidin",
    "siksin",
    "siksinbaya",
    "siksinler",
    "siksiz",
    "siksok",
    "siksz",
    "sikt",
    "sikti",
    "siktigimin",
    "siktigiminin",
    "sikti\u011fim",
    "sikti\u011fimin",
    "sikti\u011fiminin",
    "siktii",
    "siktiim",
    "siktiimin",
    "siktiiminin",
    "siktiler",
    "siktim",
    "siktim",
    "siktimin",
    "siktiminin",
    "siktir",
    "siktir et",
    "siktirgit",
    "siktir git",
    "siktirir",
    "siktiririm",
    "siktiriyor",
    "siktir lan",
    "siktirolgit",
    "siktir ol git",
    "sittimin",
    "sittir",
    "skcem",
    "skecem",
    "skem",
    "sker",
    "skerim",
    "skerm",
    "skeyim",
    "skiim",
    "skik",
    "skim",
    "skime",
    "skmek",
    "sksin",
    "sksn",
    "sksz",
    "sktiimin",
    "sktrr",
    "skyim",
    "slaleni",
    "sokam",
    "sokar\u0131m",
    "sokarim",
    "sokarm",
    "sokarmkoduumun",
    "sokay\u0131m",
    "sokaym",
    "sokiim",
    "soktu\u011fumunun",
    "sokuk",
    "sokum",
    "soku\u015f",
    "sokuyum",
    "soxum",
    "sulaleni",
    "s\u00fclaleni",
    "s\u00fclalenizi",
    "s\u00fcrt\u00fck",
    "\u015ferefsiz",
    "\u015f\u0131ll\u0131k",
    "taaklarn",
    "taaklarna",
    "tarrakimin",
    "tasak",
    "tassak",
    "ta\u015fak",
    "ta\u015f\u015fak",
    "tipini s.k",
    "tipinizi s.keyim",
    "tiyniyat",
    "toplarm",
    "topsun",
    "toto\u015f",
    "vajina",
    "vajinan\u0131",
    "veled",
    "veledizina",
    "veled i zina",
    "verdiimin",
    "weled",
    "weledizina",
    "whore",
    "xikeyim",
    "yaaraaa",
    "yalama",
    "yalar\u0131m",
    "yalarun",
    "yaraaam",
    "yarak",
    "yaraks\u0131z",
    "yaraktr",
    "yaram",
    "yaraminbasi",
    "yaramn",
    "yararmorospunun",
    "yarra",
    "yarraaaa",
    "yarraak",
    "yarraam",
    "yarraam\u0131",
    "yarragi",
    "yarragimi",
    "yarragina",
    "yarragindan",
    "yarragm",
    "yarra\u011f",
    "yarra\u011f\u0131m",
    "yarra\u011f\u0131m\u0131",
    "yarraimin",
    "yarrak",
    "yarram",
    "yarramin",
    "yarraminba\u015f\u0131",
    "yarramn",
    "yarran",
    "yarrana",
    "yarrrak",
    "yavak",
    "yav\u015f",
    "yav\u015fak",
    "yav\u015fakt\u0131r",
    "yavu\u015fak",
    "y\u0131l\u0131\u015f\u0131k",
    "yilisik",
    "yogurtlayam",
    "yo\u011furtlayam",
    "yrrak",
    "z\u0131kk\u0131m\u0131m",
    "zibidi",
    "zigsin",
    "zikeyim",
    "zikiiim",
    "zikiim",
    "zikik",
    "zikim",
    "ziksiiin",
    "ziksiin",
    "zulliyetini",
    "zviyetini"
  ]; // uzatabilirsiniz...
  if (küfürler.some(word => yecep.content.toLowerCase().includes(word))) {
    vegas.delete(30);
    let sa = await db.fetch(`küfür_${yecep.guild.id}_${yecep.author.id}`);
    if (!sa) sa = 1;
    yecep.channel.send(
      "<@!" +
        yecep.author.id +
        "> Bu sunucuda küfürler **" +
        client.user.username +
        "** tarafından engelleniyor.Bu sunucu da toplam **" +
        sa +
        "** küfür etmişsin!"
    );
    db.add(`küfür_${yecep.guild.id}_${yecep.author.id}`, 1);
  }
});
/////Caps Engel//
client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`✋ Lütfen Büyük Harf Kullanma!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

///afk sistemi///

client.on("message", async (message, guild) => {
if(message.author.bot === true) return
  var miranafk = db.get(`kullanicilar.${message.author.id}.afk`);
  if (!miranafk) return;
  var afkb = JSON.parse(miranafk);
  if (new Date().getTime() - afkb.zaman < 1000) return;
  db.delete(`kullanicilar.${message.author.id}.afk`);
  var süre = new Date().getTime() - afkb.zaman;

    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    message.channel.send(
      " | AFK modundan ayrıldınız. <@" +
        message.author.id +
        ">. Afk kaldığın süre:** " +
        sürem +
        "**"
    );

});
//
client.on("message", async (message, guild) => {
  let etiket = message.mentions.users.first();
  if (!etiket) return;
  var afaka = db.fetch(`kullanicilar.${etiket.id}.afk`);
  if (!afaka) return;
  var afk = JSON.parse(afaka);
  if (!afk) return;
  var süre = new Date().getTime() - afk.zaman;
    var sürem = moment
      .duration(süre)
      .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
    if (afk) {
      return message.channel.send(
        `**${etiket.tag}** adlı kullanıcı **${sürem}**dir **${afk.sebep}** sebebiyle afk!`
      );
    }
  

});

///küfür engel///

client.on("message", async msg => {
  
  
  let a = await db.fetch(`kufur_${msg.guild.id}`)
    if (a == 'acik') {
      const küfür = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
        if (küfür.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("MANAGE_GUILD")) {
                  msg.delete();
                          
                    return msg.channel.send(`:carpi: | ${msg.author} Bu sunucuda **küfür** filtresi **aktif!**`).then(msg => msg.delete(10000));
            }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
          if (!a) return;
          });

///eklendimatıldım///

client.on("guildCreate", guild => {
  let log = client.channels.get(" ");
  const embed = new Discord.RichEmbed()
    .setAuthor("Yeni bir sunucuya eklendim!")
    .setThumbnail(
      guild.iconURL ||
        ""
    )
    .setColor("GREEN")
         .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
client.on("guildDelete", guild => {
  let log = client.channels.get(" ");
  const embed = new Discord.RichEmbed()
    .setAuthor("Bir sunucudan atıldım -_-")
    .setThumbnail(
      guild.iconURL ||
        ""
    )
    .setColor("RED")
       .addField("» Sunucu İsmi:", `**${guild.name}**`)
    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
    .addField(
      "Sunucu Bilgisi:",
      `**Sunucu Sahibi: \`${guild.owner}\`\nSunucu Bölgesi: \`${guild.region}\`\nÜye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    )
    .setTimestamp()
    .setFooter(client.user.username, client.user.avatarURL);
  log.send(embed);
});
 