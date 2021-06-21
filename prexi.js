const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const db = require("croxydb");
const { MessageButton } = require("discord-buttons");
require("discord-buttons")(client);
const disbut = require("discord-buttons");
require("./inlinereply.js");
const prefix = "g.";
client.commands = new Discord.Collection();
const fetch = ("node-fetch");
const fs = require("fs");

const { DiscordTogether } = require("discord-together");
client.discordTogether = new DiscordTogether(client);
const path = require("path");

fs.readdir("./Komutlar/", (error, f) => {
  if (error) {
    return console.error(error);
  }
  let commandes = f.filter(f => f.split(".").pop() === "js");
  if (commandes.length <= 0) {
    return console.log("Aucune commande trouvée !");
  }

  commandes.forEach(f => {
    let commande = require(`./Komutlar/${f}`);
    console.log(`🚀 ${f} komut yüklendi!`);
    client.commands.set(commande.help.name, commande);
  });
});

fs.readdir("./events/", (error, f) => {
  if (error) {
    return console.error(error);
  }
  console.log(`🎉 ${f.length} event!`);

  f.forEach(f => {
    let events = require(`./events/${f}`);
    let event = f.split(".")[0];
    client.on(event, events.bind(null, client));
  });
});

client.on("message", message => {
  if (message.channel.type === "dm") return;
});

client.login(process.env.TOKEN); 
