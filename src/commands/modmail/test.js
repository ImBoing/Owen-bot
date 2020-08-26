const GenericCommand = require('../../models/GenericCommand.js');
const { MessageEmbed } = require('discord.js');

module.exports = class Test extends GenericCommand {

	constructor(...args) {
		super(...args, {
			name: 'test',
			aliases: ['latency', 'lifeline'],
			description: 'Used to check if the bot is alive',
			usage: '{prefix}ping',
			category: 'general'
		});
	}

	async run(message) {
		const embed = new MessageEmbed()
			.setColor('RED')
			.setTitle('Message Sent')
			.setDescription('Testing')
			.setFooter(`${message.guild.id}`);

		message.author.send(embed);
	}

};
