var saveInformations = require('./saveInformations.js');
var sendInformations = require('./sendInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

/**
* Called when new valid data received.
*/
module.exports = function (data, resolve) {
	if ((data != null) && (data != "")) {
		sails.log.info('[MySensors] <- ' + data);
		
		// Decoding message.
		var datas = data.toString().split(";");
		var nodeId = +datas[0];
		var sensorId = +datas[1];
		var messageType = +datas[2];
		var ack = +datas[3];
		var subType = +datas[4];
		var rawpayload = "";
		if (datas[5]) {
			rawpayload = datas[5].trim();
		}
		var payload;
		if (messageType == constants.C_STREAM) {
			payload = [];
			for (var i = 0; i < rawpayload.length; i += 2)
				payload.push(parseInt(rawpayload.substring(i, i + 2), 16));
		}
		else {
			payload = rawpayload;
		}
		
		// Decision on appropriate response.
		switch (messageType) {
			case constants.C_PRESENTATION:
				saveInformations.saveSensor(nodeId, sensorId, subType)
					.then(function() {
						resolve();
					});
				break;
			case constants.C_SET:
				saveInformations.saveValue(nodeId, sensorId, subType, payload)
					.then(function() {
						resolve();
					});
				break;
			case constants.C_REQ:
				resolve();
				break;
			case constants.C_INTERNAL:
				switch (subType) {
					case constants.I_BATTERY_LEVEL:
						// TODO : Aucun deviceType rattaché encore. A prévoir uniquement pour le sensorId = 255 ?
						//saveInformations.saveValue(nodeId, sensorId, subType, payload);
						resolve();
						break;
					case constants.I_TIME:
						sendInformations.sendTime(nodeId, sensorId);
						resolve();
						break;
					case constants.I_VERSION:
						resolve();
						break;
					case constants.I_ID_REQUEST:
						sendInformations.sendNextAvailableNodeId()
							.then(function() {
								resolve();
							});
						break;
					case constants.I_ID_RESPONSE:
						resolve();
						break;
					case constants.I_INCLUSION_MODE:
						resolve();
						break;
					case constants.I_CONFIG:
						sendInformations.sendConfig(nodeId);
						resolve();
						break;
					case constants.I_PING:
						resolve();
						break;
					case constants.I_PING_ACK:
						resolve();
						break;
					case constants.I_LOG_MESSAGE:
						resolve();
						break;
					case constants.I_CHILDREN:
						resolve();
						break;
					case constants.I_SKETCH_NAME:
						resolve();
						break;
					case constants.I_SKETCH_VERSION:
						resolve();
						break;
					case constants.I_REBOOT:
						sendInformations.sendRebootRequest(nodeId);
						resolve();
						break;
					case constants.I_GATEWAY_READY:
						resolve();
						break;
					case constants.I_REQUEST_SIGNING:
						resolve();
						break;
					case constants.I_GET_NONCE:
						resolve();
						break;
					case constants.I_GET_NONCE_RESPONSE:
						resolve();
						break;
					case constants.I_HEARTBEAT:
						resolve();
						break;
					case constants.I_PRESENTATION:
						resolve();
						break;
					case constants.I_DISCOVER:
						resolve();
						break;
					case constants.I_DISCOVER_RESPONSE:
						resolve();
						break;
					case constants.I_HEARTBEAT_RESPONSE:
						resolve();
						break;
					case constants.I_LOCKED:
						resolve();
						break;
					case constants.I_PING:
						resolve();
						break;
					case constants.I_PONG:
						resolve();
						break;
					case constants.I_REGISTRATION_REQUEST:
						resolve();
						break;
					case constants.I_REGISTRATION_RESPONSE:
						resolve();
						break;
					case constants.I_DEBUG:
						resolve();
						break;
				}
				break;
			case constants.C_STREAM:
				switch (subType)
				{
					case constants.ST_FIRMWARE_CONFIG_REQUEST:
						resolve();
						break;
					case constants.ST_FIRMWARE_CONFIG_RESPONSE:
						resolve();
						break;
					case constants.ST_FIRMWARE_REQUEST:
						resolve();
						break;
					case constants.ST_FIRMWARE_RESPONSE:
						resolve();
						break;
					case constants.ST_SOUND:
						resolve();
						break;
					case constants.ST_IMAGE:
						resolve();
						break;
				}
				break;
		}
	}
}