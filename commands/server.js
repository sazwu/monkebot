module.exports = {
	name: 'server',
	description: 'Monkebot tells you about the server.',
	execute(message, args) {
		message.channel.send(`We are ${message.guild.name}, oo oo! Currently there are ${message.guild.memberCount} of us!`);
	},
};