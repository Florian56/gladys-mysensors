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
				name : 'Noeud ' + nodeId + ' - Sensor ' + sensorId,
				protocol : constants.PROTOCOL,
				service : constants.SERVICE
			},
			types : mappingDeviceDeviceTypes.getDeviceTypesForDevice(sensorType)
		};
		
		return gladys.device.create(device);
	},
	
	/**
	* Save new data from sensor.
	* @method saveValue
	*/
	saveValue : function(nodeId, sensorId, valueType, value)
	{
		gladys.devicetype.getByIdentifiersAndService(nodeId + '-' + sensorId, valueType, constants.SERVICE)
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