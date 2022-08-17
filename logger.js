const log4js = require('log4js');

//Nivel de salida: fatal, error, warn, info, debug, trace

log4js.configure({
  appenders: {
    consola: { type: 'console' },

    archivoError: { type: 'file', filename: 'error.log' },
    archivoWarn: { type: 'file', filename: 'warn.log' },

    soloWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn'},
    soloError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error'}
  },
  categories: {
    default: { appenders: ['consola','soloWarn', 'soloError'], level: 'all'},
  }
});

module.exports = log4js.getLogger('default');