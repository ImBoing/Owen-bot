/* eslint-disable consistent-return */
const BaseEvent = require('../../models/GenericEvent');

module.exports = class Message extends BaseEvent {

	async run(message) {
		const prefix = '?';
		if (message.author.bot) return;
		if (!message.guild && message.channel.type === 'dm') { this.client.emit('directMessage', message); }
		if (message.content.startsWith(prefix)) {
			const [...args] = message.content
				.slice(prefix.length)
				.trim()
				.split(/ +/g);
			const cmd = args.shift().toLowerCase();
			const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

			if (command) {
				if (command.perms && !message.member.hasPermission(command.perms)) {
					return message.channel.send(
						`You are missing the \`${command.perms[0]}\` permission. Make sure you have the required permissions before running the command again.`
					);
				} else if (command.missingArgs && !args[0]) {
					return message.channel.send(command.missingArgs);
				} else {
					command.run(message, args);
				}
			}
		}
	}

};
