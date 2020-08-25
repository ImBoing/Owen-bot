const OwenClient = require('./mainClass.js');
const config = require('./config.json');

const client = new OwenClient(config);
client.start();
