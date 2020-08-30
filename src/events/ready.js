const { BaseLogger } = require('../logger/logger');
const logger = new BaseLogger();
const BaseEvent = require('../models/GenericEvent');

module.exports = class Ready extends BaseEvent {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		logger.log(`Logged in as ${this.client.user.tag}`);
		logger.log(`Loaded ${this.client.commands.size} ${this.client.commands.size > 1 ? 'commands' : 'command'}`);
		logger.log(`Loaded ${this.client.events.size} ${this.client.events.size > 1 ? 'events' : 'events'}`);
	}

};
