/* eslint-disable consistent-return */
const { Client, Collection } = require('discord.js');
const Handler = require('./handlers/fileHandler.js');

module.exports = class OwenClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		this.commands = new Collection();

        this.aliases = new Collection();
        
        this.events = new Collection();

		this.Handlers = new Handler(this);
	}

	validate(options) {
		if (typeof options !== 'object') { throw new TypeError('Options should be a type of Object.'); }

		if (!options.token) { throw new Error('You must pass the token for the client.'); }
		this.token = options.token;

		if (!options.prefix) { throw new Error('You must pass a prefix for the client'); }
		if (typeof options.prefix !== 'string') { throw new TypeError('Prefix should be a type of string'); }
		this.prefix = options.prefix;
	}

	async start(token = this.token) {
        this.Handlers.loadCommands();
        this.Handlers.loadEvents();
		super.login(token);
	}

};
