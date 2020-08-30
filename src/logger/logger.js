const chalk = require('chalk');

const format = () => {
	const date = new Date(Date.now()).toUTCString().split(' ');

	const colortime = `${chalk.white(date[0])} ${chalk.hex('#528fbf')(date[1])} ${chalk.white(date[2])} ${chalk.hex('#528fbf')(date[3])} ${chalk.hex('#6b8753')(date[4])} ${chalk.white(date[5])}`;

	return colortime;
};

class BaseLogger {

	log(
		body = ''
	) {
		console.log(`${format()} | ${chalk.green('INFO')} | ${body}`);
		// console.log(`${chalk.white(`${new Date(Date.now()).toUTCString()}`)} | ${chalk.green('INFO')} | ${chalk.white(body)}`);
	}

}

module.exports = { BaseLogger };
