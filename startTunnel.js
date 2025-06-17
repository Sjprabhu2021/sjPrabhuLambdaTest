require('dotenv').config();
const LT = require('@lambdatest/node-tunnel');

const tunnelInstance = new LT();

const tunnelOptions = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,
  tunnelName: 'playwright-cert-tunnel',
  infoAPIPort: 15000,
};

tunnelInstance.start(tunnelOptions, (err) => {
  if (err) {
    console.error('Tunnel failed to start:', err);
  } else {
    console.log('Tunnel started successfully');
  }
});
