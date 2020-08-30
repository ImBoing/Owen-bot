/* eslint-disable max-len */
/* eslint-disable id-length */
const { MessageEmbed } = require('discord.js');
async function pages(message, client) {
	const userID = message.author.id;
	const memberGuilds = [];
	const embeds = [];
	const userFound = client.users.cache.get(userID);

	client.guilds.cache.forEach(guild => {
	// eslint-disable-next-line no-unused-expressions
		guild.members.cache.has(userFound.id) ? memberGuilds.push(guild) : null;
	});


	let a = 3;
	for (let i = 0; i < memberGuilds.length; i += 3) {
		const current = memberGuilds.slice(i, a);
		let j = i;
		a += 3;
		const embed = new MessageEmbed()
			.setColor('BLUE')
			.setTitle('Server Menu')
			.setDescription('Select the guild you want to send this message to. React with the corresponding emoji to select the guild position.');

		for (let k = 0; k < current.length; k++) {
			embed.addField(`${++j}. ${memberGuilds[k].name}`, `Server ID: ${memberGuilds[k].id}`, true);
		}
		embeds.push(embed);
	}
	let currentPage = 0;
	const menu = await message.channel.send(embeds[currentPage]);
	const reactions = ['1️⃣', '2️⃣', '3️⃣'];
	await menu.react('⬅️');
	await menu.react('➡️');
	for (let w = 0; w < menu.embeds[0].fields.length; w++) {
		await menu.react(reactions[w]);
	}

	const filter = (reaction, user) =>
		['⬅️', '➡️', '1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) &&
          message.author.id === user.id;

	const collector = menu.createReactionCollector(filter);

	collector.on('collect', async (reaction) => {
		if (reaction.emoji.name === '⬅️') {
			if (currentPage !== 0) {
				--currentPage;
				menu.edit('', embeds[currentPage]);
			}
		} else if (reaction.emoji.name === '➡️') {
			if (currentPage < embeds.length - 1) {
				currentPage++;
				menu.edit('', embeds[currentPage]);
			}
		} else if (reactions.indexOf(reaction.emoji.name >= 1)) {
			const chosen = reactions.indexOf(reaction.emoji.name);
			console.log(chosen);

			const guild = menu.embeds[0].fields[chosen];
			message.channel.send(guild.value);
		}
	});
}

async function confirm(message, guild, client) {
	const info = client.guilds.cache.get(guild);
	const heh = new MessageEmbed()
		.setColor('BLUE')
		.setTitle('Confirm')
		.setDescription(`You are now sending your message to **${info.name}** (ID: ${info.id}). React with ✅ to confim, react with 🔀 to select a different guild, react with ❌ to cancel the confrimation.`);
	const check = await message.channel.send(heh);
	await check.react('✅');
	await check.react('🔀');
	await check.react('❌');

	const filter = (reaction, user) =>
		['✅', '🔀', '❌'].includes(reaction.emoji.name) &&
			message.author.id === user.id;

	const collector = check.createReactionCollector(filter);

	collector.on('collect', (reaction) => {
		if (reaction.emoji.name === '🔀') {
			check.edit();
		}
	});
}


module.exports = { pages, confirm };
