var saveInformations = require('./saveInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

/**
 * Called when new valid data is receive.
 */
module.exports = function (data, callback)
{
	if ((data != null) && (data != ""))
	{
		sails.log.info('[MySensors] <- ' + data);
		
		// decoding message
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
		
		// decision on appropriate response
		switch (messageType)
		{
			case constants.C_PRESENTATION:
				if (sensorId == constants.SENSORID_INTERNAL)
				{
					saveInformations.saveNode(nodeId, sensorId, subType, payload, callback);
				}
				else
				{
					saveInformations.saveSensor(nodeId, sensorId, subType, callback);
				}
				break;
			case constants.C_SET:
				saveInformations.saveValue(nodeId, sensorId, subType, payload, callback);
				break;
			case constants.C_REQ:
				callback();
				break;
			case constants.C_INTERNAL:
				switch (subType)
				{
					case constants.I_BATTERY_LEVEL:
						saveInformations.saveValue(nodeId, sensorId, subType, payload, callback);
						break;
					case constants.I_TIME:
						sendTime(nodeId, sensorId);
						callback();
						break;
					case constants.I_VERSION:
						callback();
						break;
					case constants.I_ID_REQUEST:
						sendNextAvailableNodeId(callback);
						break;
					case constants.I_ID_RESPONSE:
						callback();
						break;
					case constants.I_INCLUSION_MODE:
						callback();
						break;
					case constants.I_CONFIG:
						sendConfig(nodeId);
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
						saveInformations.saveSketchName(nodeId, payload, callback);
						break;
					case constants.I_SKETCH_VERSION:
						saveInformations.saveSketchVersion(nodeId, payload, callback);
						break;
					case constants.I_REBOOT:
						sendRebootMessage(nodeId);
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