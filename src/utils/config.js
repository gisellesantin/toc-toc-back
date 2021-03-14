const configuration = require('config');
// We import js-yaml since it's the module used by config
// to parse yaml files. It's a not included dependency that
// must be included manually as they state in their documentation
// github.com/lorenwest/node-config/wiki/Configuration-Files#yaml-aint-markup-language---yaml
// eslint-disable-next-line no-unused-vars
const yaml = require('js-yaml');
const config = {};

(function getConfig(source = configuration, destiny = config) {
  for (const key in source) {
    if (Array.isArray(source[key])) {
      destiny[key] = destiny[key] || [];
      source[key].forEach((item, i) => getConfig(item, destiny[key][i]));
    } else if (source[key] && typeof source[key] === 'object') {
      destiny[key] = destiny[key] || {};
      getConfig(source[key], destiny[key]);
    } else {
      destiny[key] =
        process.env[source[key] && source[key].slice && source[key].slice(1)] ||
        source[key];
      if (destiny[key] && destiny[key].replace) {
        destiny[key] = destiny[key].replace(/\"/g, '');
      }
    }
  }
})();

module.exports = config;
