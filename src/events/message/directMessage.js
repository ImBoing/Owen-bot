const BaseEvent = require('../../models/GenericEvent');
const { pages, confirm } = require('../../utils/modmail');

module.exports = class directMessage extends BaseEvent {

	async run(message) {
		console.log('hello');
		const { client } = this;
		const messages = await message.channel.messages.fetch({ limit: 25 });


		if (messages.size >= 1) {
			console.log('Possible guild communication');
			const a = [];
			for (const [, msgs] of messages) {
				if (msgs.embeds[0] &&
					msgs.author.id === this.client.user.id &&
					msgs.embeds[0].title === 'Message Sent'
				) { a.push(msgs.embeds[0]); }
			}
			if (a.length >= 1) {
				console.log('confirm');
				await confirm(message, a[0].footer.text, client);
			} else {
				console.log('Hello');
				await pages(message, client);
			}
		} else if (!messages) {
			console.log('No previous guild communitcation');
		}
	}

};
