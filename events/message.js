const ayarlar = require("../ayarlar.json");
const talkedRecently = new Set();
const Discord = require("discord.js") 
const client = new Discord.Client() 
const db = require("croxydb") 
module.exports = async (client, message) => {
  let prefix;
  if (db.has(`prefix_${message.guild.id}`) === true) {

    prefix = db.fetch(`prefix_${message.guild.id}`)
  }
  if (db.has(`prefix_${message.guild.id}`) === false) {
    prefix = ayarlar.prefix
  }
    if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
    if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
     
    if (talkedRecently.has(message.author.id)) {
    return message.inlineReply(`<:bakimda:798582408642560110> **|** Lütfen komutları **5 saniye** aralıkla kullan!`);

  }
    if (cmd) {
     
    talkedRecently.add(message.author.id);
      setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 5000);
    cmd.run(client, message, params)
  }
};
