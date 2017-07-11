module.exports = function(sails) {
    
    var exec = require('./lib/exec.js');
    var connect = require('./lib/connect.js');

    gladys.on('ready', function() {
        connect();
    });
    
    return {
        connect : connect,
		exec : exec
    };
};