var shared = require('./shared.js');
var appendedString = "";

module.exports = function(data)
{
	addDataInQueue(data);
};

/**
* Add data in reception queue.
* @method addDataInQueue
*/
function addDataInQueue(data)
{
	var position = 0;
    while (data.charAt(position) != '\n' && position < data.length)
	{
        appendedString = appendedString + data.charAt(position);
        position++;
    }
    if (data.charAt(position) == '\n')
	{
		// Add data in queue
		var newData = appendedString.trim();
		shared.queue.push(newData, function (err) {
			sails.log.info('[MySensors] Traitement terminé pour la ligne ' + newData);
		});
        appendedString = "";
    }
    if (position < data.length)
	{
        addDataInQueue(data.substr(position + 1, data.length - position - 1));
    }
}