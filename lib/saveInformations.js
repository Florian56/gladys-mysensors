var getDeviceTypes = require('./getDeviceTypes.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = {
	/**
	* Save new sensor.
	* @method saveSensor
	*/
	saveSensor : function(nodeId, sensorId, sensorType) {
		var device = {
			device : {
				identifier : `${nodeId}-${sensorId}`,
				name : getSensorName(nodeId, sensorId),
				protocol : constants.PROTOCOL,
				service : constants.SERVICE
			},
			types : getDeviceTypes.getDeviceTypesBySensorType(sensorType)
		};
		
		sails.log.info(`[MySensors] Save new sensor : ${device.device.name}`);
		
		return gladys.device.create(device);
	},
	
	/**
	* Save new data from sensor.
	* @method saveValue
	*/
	saveValue : function(nodeId, sensorId, valueType, value, timestamp) {
		sails.log.info(`[MySensors] Save new data : nodeId = ${nodeId} - sensorId = ${sensorId} - valueType = ${valueType} - value = ${value}`);
		
		return getDeviceTypeId(nodeId, sensorId, valueType)
			.then(function(deviceTypeId) {
				var data = {
					value : value,
					devicetype : deviceTypeId,
					datetime : new Date(timestamp)
				};

				return gladys.deviceState.create(data);
			});
	}
};

/**
* Get sensor name.
* @method getSensorName
*/
function getSensorName(nodeId, sensorId) {
	var name = `[MySensors] Node ${nodeId} - Sensor ${sensorId}`;
	if (nodeId == constants.NODEID_GATEWAY) {
		name = '[MySensors] Gateway';
	}
	
	return name;
}

/**
* Get deviceType id.
* @method getDeviceTypeId
*/
function getDeviceTypeId(nodeId, sensorId, deviceTypeIdentifier)
{
	var deviceIdentifier = `${nodeId}-${sensorId}`;
	
	return gladys.deviceType.getByIdentifier({deviceIdentifier : deviceIdentifier, deviceService : constants.SERVICE, deviceTypeIdentifier : deviceTypeIdentifier})
		.then(function(deviceType) {
			return Promise.resolve(deviceType.id);
		})
		.catch(function() {
			var device = {
				device : {
					identifier : deviceIdentifier,
					name : getSensorName(nodeId, sensorId),
					protocol : constants.PROTOCOL,
					service : constants.SERVICE
				},
				types : getDeviceTypes.getDeviceTypeByIdentifier(deviceTypeIdentifier)
			};
			
			return gladys.device.create(device)
				.then(function(deviceAndDeviceType) {
					return Promise.resolve(deviceAndDeviceType.types[0].id);
				});
		});
}