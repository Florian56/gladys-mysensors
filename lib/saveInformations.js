var mappingDeviceTypesByDevice = require('./mappingDeviceTypesByDevice.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = {
	/**
	* Save new sensor.
	* @method saveSensor
	*/
	saveSensor : function(nodeId, sensorId, sensorType) {
		var name = 'Node ' + nodeId + ' - Sensor ' + sensorId;
		if (nodeId == constants.NODEID_GATEWAY) {
			name = 'Gateway';
		}
		
		var device = {
			device : {
				identifier : nodeId + '-' + sensorId,
				name : name,
				protocol : constants.PROTOCOL,
				service : constants.SERVICE
			},
			types : mappingDeviceTypesByDevice.getDeviceTypesForDevice(sensorType)
		};
		
		sails.log.info('[MySensors] Save new sensor : ' + device.device.name);
		
		return gladys.device.create(device);
	},
	
	/**
	* Save new data from sensor.
	* @method saveValue
	*/
	saveValue : function(nodeId, sensorId, valueType, value, timestamp) {
		sails.log.info('[MySensors] Save new data : nodeId = ' + nodeId + ' - sensorId = ' + sensorId + ' - valueType = ' + valueType + ' - value = ' + value);
		
		return gladys.deviceType.getByIdentifier({deviceIdentifier : nodeId + '-' + sensorId, deviceService : constants.SERVICE, deviceTypeIdentifier : valueType})
			.then(function(devicetype) {
				var data = {
					value : value,
					devicetype : devicetype.id,
					datetime : new Date(timestamp)
				};
				
				return gladys.deviceState.create(data);
			});
	}
};