const BaseEvent = require('../../models/GenericEvent');
const { pages } = require('../../utils/pages');

module.exports = class directMessage extends BaseEvent {

	async run(message) {
		const { client } = this;
		const messages = await message.channel.messages.fetch({ limit: 25 });
		const botmessages = messages.filter(
			(msg) => msg.author.id === this.client.user.id);

		console.log(botmessages);

		if (botmessages.size >= 1) {
			console.log('Possible guild communication');
			const a = [];
			for (const [, msgs] of botmessages) {
				if (msgs.embeds[0].title === 'Message Sent' || msgs.embeds[0].title === 'Message Recieved') {
					const tEmbed = msgs.embeds[0];
					a.push(tEmbed);
				}
			}
			if (a.length >= 1) {
				await pages(message, client);
			}
		} else if (!botmessages) {
			console.log('No previous guild communitcation');
		}
	}

};
