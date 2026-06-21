const events = require('node:events');

events.defaultMaxListeners = 50;

if (typeof process.setMaxListeners === 'function') {
  process.setMaxListeners(50);
}
