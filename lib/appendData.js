var shared = require('./shared.js');
var appendedString = "";

module.exports = function(data) {
	addDataInQueue(data);
};

/**
* Add data in reception queue.
* @method addDataInQueue
*/
function addDataInQueue(data) {
	var position = 0;
    while (data.charAt(position) != '\n' && position < data.length) {
        appendedString = appendedString + data.charAt(position);
        position++;
    }
	
    if (data.charAt(position) == '\n') {
		var newData = appendedString.trim();
		
		// Add timestamp in first position.
		var timestamp = Date.now();
		newData = `${timestamp};${newData}`;
		
		// Add data in queue.
		shared.queue.push(newData, function (err) {
			sails.log.info(`[MySensors] Process completed : ${newData}`);
		});
        appendedString = "";
    }
    if (position < data.length) {
        addDataInQueue(data.substr(position + 1, data.length - position - 1));
    }
}