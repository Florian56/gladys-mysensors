var saveInformations = require('./saveInformations.js');
var sendInformations = require('./sendInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

/**
* Called when new valid data received.
*/
module.exports = function (data, callback)
{
	if ((data != null) && (data != ""))
	{
		sails.log.info('[MySensors] <- ' + data);
		
		// Decoding message.
		var datas = data.toString().split(";");
		var nodeId = +datas[0];
		var sensorId = +datas[1];
		var messageType = +datas[2];
		var ack = +datas[3];
		var subType = +datas[4];
		var rawpayload = "";
		if (datas[5])
		{
			rawpayload = datas[5].trim();
		}
		var payload;
		if (messageType == constants.C_STREAM)
		{
			payload = [];
			for (var i = 0; i < rawpayload.length; i += 2)
				payload.push(parseInt(rawpayload.substring(i, i + 2), 16));
		}
		else
		{
			payload = rawpayload;
		}
		
		// Decision on appropriate response.
		switch (messageType)
		{
			case constants.C_PRESENTATION:
				saveInformations.saveSensor(nodeId, sensorId, subType);
				break;
			case constants.C_SET:
				saveInformations.saveValue(nodeId, sensorId, subType, payload);
				break;
			case constants.C_REQ:
				callback();
				break;
			case constants.C_INTERNAL:
				switch (subType)
				{
					case constants.I_BATTERY_LEVEL:
						// TODO : Aucun deviceType rattaché encore. A prévoir uniquement pour le sensorId = 255 ?
						//saveInformations.saveValue(nodeId, sensorId, subType, payload);
						break;
					case constants.I_TIME:
						sendInformations.sendTime(nodeId, sensorId);
						callback();
						break;
					case constants.I_VERSION:
						callback();
						break;
					case constants.I_ID_REQUEST:
						sendInformations.sendNextAvailableNodeId(callback);
						break;
					case constants.I_ID_RESPONSE:
						callback();
						break;
					case constants.I_INCLUSION_MODE:
						callback();
						break;
					case constants.I_CONFIG:
						sendInformations.sendConfig(nodeId);
						callback();
						break;
					case constants.I_PING:
						callback();
						break;
					case constants.I_PING_ACK:
						callback();
						break;
					case constants.I_LOG_MESSAGE:
						callback();
						break;
					case constants.I_CHILDREN:
						callback();
						break;
					case constants.I_SKETCH_NAME:
						break;
					case constants.I_SKETCH_VERSION:
						break;
					case constants.I_REBOOT:
						sendInformations.sendRebootRequest(nodeId);
						callback();
						break;
					case constants.I_GATEWAY_READY:
						callback();
						break;
					case constants.I_REQUEST_SIGNING:
						callback();
						break;
					case constants.I_GET_NONCE:
						callback();
						break;
					case constants.I_GET_NONCE_RESPONSE:
						callback();
						break;
					case constants.I_HEARTBEAT:
						callback();
						break;
					case constants.I_PRESENTATION:
						callback();
						break;
					case constants.I_DISCOVER:
						callback();
						break;
					case constants.I_DISCOVER_RESPONSE:
						callback();
						break;
					case constants.I_HEARTBEAT_RESPONSE:
						callback();
						break;
					case constants.I_LOCKED:
						callback();
						break;
					case constants.I_PING:
						callback();
						break;
					case constants.I_PONG:
						callback();
						break;
					case constants.I_REGISTRATION_REQUEST:
						callback();
						break;
					case constants.I_REGISTRATION_RESPONSE:
						callback();
						break;
					case constants.I_DEBUG:
						callback();
						break;
				}
				break;
			case constants.C_STREAM:
				switch (subType)
				{
					case constants.ST_FIRMWARE_CONFIG_REQUEST:
						callback();
						break;
					case constants.ST_FIRMWARE_CONFIG_RESPONSE:
						callback();
						break;
					case constants.ST_FIRMWARE_REQUEST:
						callback();
						break;
					case constants.ST_FIRMWARE_RESPONSE:
						callback();
						break;
					case constants.ST_SOUND:
						callback();
						break;
					case constants.ST_IMAGE:
						callback();
						break;
				}
				break;
		}
	}
}