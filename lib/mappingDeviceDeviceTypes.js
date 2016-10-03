var allDeviceTypes = require('./deviceTypes.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = 
{	
	/**
	* Get all device types for a device.
	* @method getDeviceTypesForDevice
	*/
	function getDeviceTypesForDevice(sensorType)
	{
		var deviceTypes = [];
		
		// Add defaults types.
		deviceTypes.push(allDeviceTypes.T_VAR1);
		deviceTypes.push(allDeviceTypes.T_VAR2);
		deviceTypes.push(allDeviceTypes.T_VAR3);
		deviceTypes.push(allDeviceTypes.T_VAR4);
		deviceTypes.push(allDeviceTypes.T_VAR5);
		
		// Add specifics types.
		switch (sensorType)
		{
			case S_DOOR :
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_MOTION :
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_SMOKE :
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_BINARY :
				deviceTypes.push(allDeviceTypes.T_STATUS);
				deviceTypes.push(allDeviceTypes.T_WATT);
				break;
			case S_DIMMER :
				deviceTypes.push(allDeviceTypes.T_STATUS);
				deviceTypes.push(allDeviceTypes.T_DIMMER);
				deviceTypes.push(allDeviceTypes.T_WATT);
				break;
			case S_COVER :
				deviceTypes.push(allDeviceTypes.T_UP);
				deviceTypes.push(allDeviceTypes.T_DOWN);
				deviceTypes.push(allDeviceTypes.T_STOP);
				deviceTypes.push(allDeviceTypes.T_PERCENTAGE);
				break;
			case S_TEMP :
				deviceTypes.push(allDeviceTypes.T_TEMP);
				deviceTypes.push(allDeviceTypes.T_ID);
				break;
			case S_HUM :
				deviceTypes.push(allDeviceTypes.T_HUM);
				break;
			case S_BARO :
				deviceTypes.push(allDeviceTypes.T_PRESSURE);
				deviceTypes.push(allDeviceTypes.T_FORECAST);
				break;
			case S_WIND :
				deviceTypes.push(allDeviceTypes.T_WIND);
				deviceTypes.push(allDeviceTypes.T_GUST);
				deviceTypes.push(allDeviceTypes.T_DIRECTION);
				break;
			case S_RAIN :
				deviceTypes.push(allDeviceTypes.T_RAIN);
				deviceTypes.push(allDeviceTypes.T_RAINRATE);
				break;
			case S_UV :
				deviceTypes.push(allDeviceTypes.T_UV);
				break;
			case S_WEIGHT :
				deviceTypes.push(allDeviceTypes.T_WEIGHT);
				deviceTypes.push(allDeviceTypes.T_IMPEDANCE);
				break;
			case S_POWER :
				deviceTypes.push(allDeviceTypes.T_WATT);
				deviceTypes.push(allDeviceTypes.T_KWH);
				break;
			case S_HEATER :
				deviceTypes.push(allDeviceTypes.T_HVAC_SETPOINT_HEAT);
				deviceTypes.push(allDeviceTypes.T_HVAC_FLOW_STATE);
				deviceTypes.push(allDeviceTypes.T_TEMP);
				break;
			case S_DISTANCE :
				deviceTypes.push(allDeviceTypes.T_DISTANCE);
				deviceTypes.push(allDeviceTypes.T_UNIT_PREFIX);
				break;
			case S_LIGHT_LEVEL :
				deviceTypes.push(allDeviceTypes.T_LIGHT_LEVEL);
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				break;
			case S_ARDUINO_NODE :
				break;
			case S_ARDUINO_REPEATER_NODE :
				break;
			case S_LOCK :
				deviceTypes.push(allDeviceTypes.T_LOCK_STATUS);
				break;
			case S_IR :
				deviceTypes.push(allDeviceTypes.T_IR_SEND);
				deviceTypes.push(allDeviceTypes.T_IR_RECEIVE);
				break;
			case S_WATER :
				deviceTypes.push(allDeviceTypes.T_FLOW);
				deviceTypes.push(allDeviceTypes.T_VOLUME);
				break;
			case S_AIR_QUALITY :
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				deviceTypes.push(allDeviceTypes.T_UNIT_PREFIX);
				break;
			case S_CUSTOM :
				break;
			case S_DUST :
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				deviceTypes.push(allDeviceTypes.T_UNIT_PREFIX);
				break;
			case S_SCENE_CONTROLLER :
				deviceTypes.push(allDeviceTypes.T_SCENE_ON);
				deviceTypes.push(allDeviceTypes.T_SCENE_OFF);
				break;
			case S_RGB_LIGHT :
				deviceTypes.push(allDeviceTypes.T_RGB);
				deviceTypes.push(allDeviceTypes.T_WATT);
				break;
			case S_RGBW_LIGHT :
				deviceTypes.push(allDeviceTypes.T_RGBW);
				deviceTypes.push(allDeviceTypes.T_WATT);
				break;
			case S_COLOR_SENSOR :
				deviceTypes.push(allDeviceTypes.T_RGB);
				break;
			case S_HVAC :
				deviceTypes.push(allDeviceTypes.T_HVAC_SETPOINT_HEAT);
				deviceTypes.push(allDeviceTypes.T_HVAC_SETPOINT_COLD);
				deviceTypes.push(allDeviceTypes.T_HVAC_FLOW_STATE);
				deviceTypes.push(allDeviceTypes.T_HVAC_FLOW_MODE);
				deviceTypes.push(allDeviceTypes.T_HVAC_SPEED);
				break;
			case S_MULTIMETER :
				deviceTypes.push(allDeviceTypes.T_VOLTAGE);
				deviceTypes.push(allDeviceTypes.T_CURRENT);
				deviceTypes.push(allDeviceTypes.T_IMPEDANCE);
				break;
			case S_SPRINKLER :
				deviceTypes.push(allDeviceTypes.T_STATUS);
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				break;
			case S_WATER_LEAK :
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_SOUND :
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_VIBRATION :
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_MOISTURE :
				deviceTypes.push(allDeviceTypes.T_LEVEL);
				deviceTypes.push(allDeviceTypes.T_TRIPPED);
				deviceTypes.push(allDeviceTypes.T_ARMED);
				break;
			case S_INFO :
			 	deviceTypes.push(allDeviceTypes.T_TEXT);
				break;
			case S_GAS :
				deviceTypes.push(allDeviceTypes.T_FLOW);
				deviceTypes.push(allDeviceTypes.T_VOLUME);
				break;
			case S_GPS :
				deviceTypes.push(allDeviceTypes.T_POSITION);
				break;
			case S_WATER_QUALITY :
				deviceTypes.push(allDeviceTypes.T_TEMP);
				deviceTypes.push(allDeviceTypes.T_PH);
				deviceTypes.push(allDeviceTypes.T_ORP);
				deviceTypes.push(allDeviceTypes.T_EC);
				deviceTypes.push(allDeviceTypes.T_STATUS);
				break;
		}
		
		return deviceTypes;
	}
};