const EventEmitter = require('events');
const emitter = new EventEmitter();
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig.development);
const { v4: uuidv4 } = require('uuid');
const config = require('../src/utils/config');

emitter.on('connect', function () {
  console.log('connect');
});

emitter.on('disconnect', function () {
  console.log('disconnect');
});

emitter.on('addMetric', async function () {
  const memory = process.memoryUsage().rss;
  const host = {
    uuid: uuidv4(),
    memory,
    name: 'fake-host',
  };
  await knex('host_data').insert(host);
});

emitter.on('removeMetric', function () {
  console.log('removeMetric');
});

(function execute() {
  emitter.emit('connect');

  const setIntervalId = setInterval(function intervalFunc() {
    emitter.emit('addMetric');
  }, 1000);

  setTimeout(function timeoutFunc() {
    clearInterval(setIntervalId);
    emitter.emit('disconnect');
  }, config.MIN_DISCONNECT * 60 * 1000);
})();
