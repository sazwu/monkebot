const Discord = require('discord.js');

const fs = require('fs');
const keepAlive = require('./server.js');
const auth = require('./auth.json');

const mySecret = process.env['secret'];

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const emotes = [];
const emoteFiles = fs.readdirSync('./emotes').filter(file => file.endsWith('.gif'));
for (const file of emoteFiles) {
	const filename = file.slice(0, file.length - 4).trim().split(/ +/);
  emotes.push(`${filename}`);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //console.log(emotes.join());
});
// Response commands
client.on('message', msg => {
    if (msg.content === 'hello') {
        msg.reply('hi!');
    } else if (emotes.includes(msg.content)) {
        msg.channel.send( { files: ["./emotes/" + msg.content + ".gif"]});
    }

    if(!msg.content.startsWith(auth.prefix) || msg.author.bot) 
        return;
    const args = msg.content.slice(auth.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('Sowwy, there was an error trying to execute that command!');
	}
});

keepAlive;
client.login(mySecret);
