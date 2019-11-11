const logger = require('./logger');

function greet(name) {
  console.log('Hello', name);
}

greet('dixy');

var message = 'hai dixy';
console.log(message);
console.log(global);
console.log(module);

logger.log('hello message');
