var mappingDeviceDeviceTypes = require('./mappingDeviceDeviceTypes.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = 
{
	/**
	* Save new sensor.
	* @method saveSensor
	*/
	saveSensor : function(nodeId, sensorId, sensorType)
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
		
		return gladys.device.create(device);
	},
	
	/**
	* Save new data from sensor.
	* @method saveValue
	*/
	saveValue : function(nodeId, sensorId, valueType, value)
	{
		sails.log.info('[MySensors] Save new data : nodeId = ' + nodeId + ' - sensorId = ' + sensorId + ' - valueType = ' + valueType + ' - value = ' + value);
		
		gladys.devicetype.getByIdentifier(nodeId + '-' + sensorId, constants.SERVICE, valueType)
			.then(function(devicetype)
				{
					var data =
					{
						value : value,
						devicetype : devicetype.id
					};
					
					gladys.devicestate.create(data);
				});
	}
};