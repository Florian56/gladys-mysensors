var mappingDeviceDeviceTypes = require('./mappingDeviceDeviceTypes.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = 
{
	/**
	* Save new sensor.
	* @method saveSensor
	*/
	saveSensor : function(nodeId, sensorId, sensorType, callback)
	{
		var device =
		{
			device :
			{
				identifier : nodeId + '-' + sensorId,
				name : 'Node ' + nodeId + ' - Sensor ' + sensorId,
				protocol : constants.PROTOCOL,
				service : constants.SERVICE
			},
			types : mappingDeviceDeviceTypes.getDeviceTypesForDevice(sensorType)
		};
		
		sails.log.info('[MySensors] Save new sensor : ' + device.device.name);
		
		return gladys.device.create(device)
			.then(function(d)
			{
				callback();
			});
	},
	
	/**
	* Save new data from sensor.
	* @method saveValue
	*/
	saveValue : function(nodeId, sensorId, valueType, value, callback)
	{
		sails.log.info('[MySensors] Save new data : nodeId = ' + nodeId + ' - sensorId = ' + sensorId + ' - valueType = ' + valueType + ' - value = ' + value);
		
		gladys.deviceType.getByIdentifier({deviceIdentifier : nodeId + '-' + sensorId, deviceService : constants.SERVICE, deviceTypeIdentifier : valueType})
			.then(function(devicetype)
				{
					var data =
					{
						value : value,
						devicetype : devicetype.id
					};
					
					gladys.deviceState.create(data)
						.then(function(d)
						{
							callback();
						});
				});
	}
};