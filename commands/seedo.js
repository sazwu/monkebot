module.exports = {
	name: 'seedo',
	description: 'Monkebot see, Monkebot do.',
	execute(message, args) {
		if (!args.length) {
            return message.channel.send(`Monkebot see nothing, do again, ${message.author}!`);
        } else {
            return message.channel.send(`"${args}", eek eek!!`);
        }
	},
};