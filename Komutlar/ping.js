const Discord = require("discord.js")

exports.run = async (client, message, args) => {

message.channel.send(`Pong! ${client.ws.ping} Ms`) 

} 
exports.conf = {
aliases: [] 
}
exports.help = {
name: "ping" 
} 
