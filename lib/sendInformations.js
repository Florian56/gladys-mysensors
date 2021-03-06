var queries = require('./queries.js');
var shared = require('./shared.js');
var saveInformations = require('./saveInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = {
	/**
	* Send time.
	* @method sendTime
	*/
	sendTime : function(nodeId, sensorId) {
		return gladys.param.getValue('mysensors_formattime')
			.then((formatTime) => {
				var messageType = constants.C_INTERNAL;
				var acknowledge = constants.ACK;
				var subType = constants.I_TIME;
				
				// Get UTC timestamp in milliseconds.
				var dateNow = new Date();
				var timestamp = dateNow.getTime();
				
				// Get local timestamp in milliseconds if parameter is local.
				if (formatTime === "local") {
					var difference = -1 * dateNow.getTimezoneOffset() * 60 * 1000;
					timestamp += difference;
				}
				
				// Transform timestamp in seconds.
				var payload = timestamp / 1000;
				
				return sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
			});
	},

	/**
	* Send next available id node.
	* @method sendNextAvailableNodeId
	*/
	sendNextAvailableNodeId : function() {
		var nodeIdToSend = 1;
		
		return gladys.utils.sqlUnique(queries.getNextAvailableNodeId, [constants.SERVICE])
			.then((result) => {
				nodeIdToSend = result.nodeId;
				
				if (nodeIdToSend < 255) {
					// Save the node in database.
					return saveInformations.saveSensor(nodeIdToSend, constants.SENSORID_INTERNAL, constants.S_ARDUINO_NODE);
				}
				else {
					return Promise.reject(new Error(`[MySensors] Too much node used. New id ${nodeIdToSend} is bigger than 254`));
				}
			})
			.then(() => {
				// Send id to node.
				var nodeId = constants.BROADCAST_ADDRESS;
				var sensorId = constants.SENSORID_INTERNAL;
				var messageType = constants.C_INTERNAL;
				var acknowledge = constants.ACK;
				var subType = constants.I_ID_RESPONSE;
				var payload = nodeIdToSend;
				
				return sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
			})
			.catch((err) => {
				sails.log.error(err);
				return Promise.reject(err);
			});
	},

	/**
	* Send configuration.
	* @method sendConfig
	*/
	sendConfig : function(nodeId) {
		var sensorId = constants.SENSORID_INTERNAL;
		var messageType = constants.C_INTERNAL;
		var acknowledge = constants.ACK;
		var subType = constants.I_CONFIG;
		var payload = "M";
		
		return sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
	},

	/**
	* Send a request to reboot node.
	* @method sendRebootMessage
	*/
	sendRebootRequest : function(nodeId) {
		var sensorId = constants.SENSORID_INTERNAL;
		var messageType = constants.C_INTERNAL;
		var acknowledge = constants.ACK;
		var subType = constants.I_REBOOT;
		var payload = "";
		
		return sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
	},
	
	/**
	* Send a message to node.
	* @method sendMessage
	*/
	sendMessage : function(nodeId, sensorId, messageType, acknowledge, subType, payload) {
		return sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
	}
};

/**
* Send a message to node.
* @method sendMessage
*/
function sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload) {
	var message = encodeMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
	shared.gateway.write(message);
	
	sails.log.info('[MySensors] -> ' + message);
	
	return Promise.resolve();
}

/**
* Encode a message.
* @method encodeMessage
*/
function encodeMessage(nodeId, sensorId, messageType, acknowledge, subType, payload) {
	var message = nodeId.toString(10) + ";" + sensorId.toString(10) + ";" + messageType.toString(10) + ";" + acknowledge.toString(10) + ";" + subType.toString(10) + ";";
	if (messageType == constants.C_STREAM) {
		for (var i = 0; i < payload.length; i++) {
			if (payload[i] < 16)
				message += "0";
			message += payload[i].toString(16);
		}
	}
	else {
		message += payload;
	}
	
	message += '\n';
	return message.toString();
}