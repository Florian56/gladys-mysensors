var DeviceTypes = require('./deviceTypes.js');
var deviceTypes = DeviceTypes.deviceTypes;
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = {
	/**
	* Get device type by identifier.
	* @method getDeviceTypeByIdentifier
	*/
	getDeviceTypeByIdentifier : function (identifier) {
		var deviceType = [];
		
		switch (identifier) {
			case constants.V_TEMP :
				deviceType.push(deviceTypes.T_TEMP);
				break;
			case constants.V_HUM :
				deviceType.push(deviceTypes.T_HUM);
				break;
			case constants.V_STATUS :
				deviceType.push(deviceTypes.T_STATUS);
				break;
			case constants.V_LIGHT :
				deviceType.push(deviceTypes.T_LIGHT);
				break;
			case constants.V_PERCENTAGE :
				deviceType.push(deviceTypes.T_PERCENTAGE);
				break;
			case constants.V_DIMMER :
				deviceType.push(deviceTypes.T_DIMMER);
				break;
			case constants.V_PRESSURE :
				deviceType.push(deviceTypes.T_PRESSURE);
				break;
			case constants.V_FORECAST :
				deviceType.push(deviceTypes.T_FORECAST);
				break;
			case constants.V_RAIN :
				deviceType.push(deviceTypes.T_RAIN);
				break;
			case constants.V_RAINRATE :
				deviceType.push(deviceTypes.T_RAINRATE);
				break;
			case constants.V_WIND :
				deviceType.push(deviceTypes.T_WIND);
				break;
			case constants.V_GUST :
				deviceType.push(deviceTypes.T_GUST);
				break;
			case constants.V_DIRECTION :
				deviceType.push(deviceTypes.T_DIRECTION);
				break;
			case constants.V_UV :
				deviceType.push(deviceTypes.T_UV);
				break;
			case constants.V_WEIGHT :
				deviceType.push(deviceTypes.T_WEIGHT);
				break;
			case constants.V_DISTANCE :
				deviceType.push(deviceTypes.T_DISTANCE);
				break;
			case constants.V_IMPEDANCE :
				deviceType.push(deviceTypes.T_IMPEDANCE);
				break;
			case constants.V_ARMED :
				deviceType.push(deviceTypes.T_ARMED);
				break;
			case constants.V_TRIPPED :
				deviceType.push(deviceTypes.T_TRIPPED);
				break;
			case constants.V_WATT :
				deviceType.push(deviceTypes.T_WATT);
				break;
			case constants.V_KWH :
				deviceType.push(deviceTypes.T_KWH);
				break;
			case constants.V_SCENE_ON :
				deviceType.push(deviceTypes.T_SCENE_ON);
				break;
			case constants.V_SCENE_OFF :
				deviceType.push(deviceTypes.T_SCENE_OFF);
				break;
			case constants.V_HVAC_FLOW_STATE :
				deviceType.push(deviceTypes.T_HVAC_FLOW_STATE);
				break;
			case constants.V_HVAC_SPEED :
				deviceType.push(deviceTypes.T_HVAC_SPEED);
				break;
			case constants.V_LIGHT_LEVEL :
				deviceType.push(deviceTypes.T_LIGHT_LEVEL);
				break;
			case constants.V_VAR1 :
				deviceType.push(deviceTypes.T_VAR1);
				break;
			case constants.V_VAR2 :
				deviceType.push(deviceTypes.T_VAR2);
				break;
			case constants.V_VAR3 :
				deviceType.push(deviceTypes.T_VAR3);
				break;
			case constants.V_VAR4 :
				deviceType.push(deviceTypes.T_VAR4);
				break;
			case constants.V_VAR5 :
				deviceType.push(deviceTypes.T_VAR5);
				break;
			case constants.V_UP :
				deviceType.push(deviceTypes.T_UP);
				break;
			case constants.V_DOWN :
				deviceType.push(deviceTypes.T_DOWN);
				break;
			case constants.V_STOP :
				deviceType.push(deviceTypes.T_STOP);
				break;
			case constants.V_IR_SEND :
				deviceType.push(deviceTypes.T_IR_SEND);
				break;
			case constants.V_IR_RECEIVE :
				deviceType.push(deviceTypes.T_IR_RECEIVE);
				break;
			case constants.V_FLOW :
				deviceType.push(deviceTypes.T_FLOW);
				break;
			case constants.V_VOLUME :
				deviceType.push(deviceTypes.T_VOLUME);
				break;
			case constants.V_LOCK_STATUS :
				deviceType.push(deviceTypes.T_LOCK_STATUS);
				break;
			case constants.V_LEVEL :
				deviceType.push(deviceTypes.T_LEVEL);
				break;
			case constants.V_VOLTAGE :
				deviceType.push(deviceTypes.T_VOLTAGE);
				break;
			case constants.V_CURRENT :
				deviceType.push(deviceTypes.T_CURRENT);
				break;
			case constants.V_RGB :
				deviceType.push(deviceTypes.T_RGB);
				break;
			case constants.V_RGBW :
				deviceType.push(deviceTypes.T_RGBW);
				break;
			case constants.V_ID :
				deviceType.push(deviceTypes.T_ID);
				break;
			case constants.V_UNIT_PREFIX :
				deviceType.push(deviceTypes.T_UNIT_PREFIX);
				break;
			case constants.V_HVAC_SETPOINT_COOL :
				deviceType.push(deviceTypes.T_HVAC_SETPOINT_COOL);
				break;
			case constants.V_HVAC_SETPOINT_HEAT :
				deviceType.push(deviceTypes.T_HVAC_SETPOINT_HEAT);
				break;
			case constants.V_HVAC_FLOW_MODE :
				deviceType.push(deviceTypes.T_HVAC_FLOW_MODE);
				break;
			case constants.V_TEXT :
				deviceType.push(deviceTypes.T_TEXT);
				break;
			case constants.V_CUSTOM :
				deviceType.push(deviceTypes.T_CUSTOM);
				break;
			case constants.V_POSITION :
				deviceType.push(deviceTypes.T_POSITION);
				break;
			case constants.V_IR_RECORD :
				deviceType.push(deviceTypes.T_IR_RECORD);
				break;
			case constants.V_PH :
				deviceType.push(deviceTypes.T_PH);
				break;
			case constants.V_ORP :
				deviceType.push(deviceTypes.T_ORP);
				break;
			case constants.V_EC :
				deviceType.push(deviceTypes.T_EC);
				break;
			case constants.V_VAR :
				deviceType.push(deviceTypes.T_VAR);
				break;
			case constants.V_VA :
				deviceType.push(deviceTypes.T_VA);
				break;
			case constants.V_POWER_FACTOR :
				deviceType.push(deviceTypes.T_POWER_FACTOR);
				break;
		}
		
		return deviceType;
	},
	
	/**
	* Get all device types by sensor type.
	* @method getDeviceTypesBySensorType
	*/
	getDeviceTypesBySensorType : function (sensorType) {
		var newDeviceTypes = [];
		
		// Add defaults types.
		newDeviceTypes.push(deviceTypes.T_VAR1);
		newDeviceTypes.push(deviceTypes.T_VAR2);
		newDeviceTypes.push(deviceTypes.T_VAR3);
		newDeviceTypes.push(deviceTypes.T_VAR4);
		newDeviceTypes.push(deviceTypes.T_VAR5);
		
		// Add specifics types.
		switch (sensorType) {
			case constants.S_DOOR :
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_MOTION :
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_SMOKE :
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_BINARY :
				newDeviceTypes.push(deviceTypes.T_STATUS);
				newDeviceTypes.push(deviceTypes.T_WATT);
				break;
			case constants.S_DIMMER :
				newDeviceTypes.push(deviceTypes.T_STATUS);
				newDeviceTypes.push(deviceTypes.T_DIMMER);
				newDeviceTypes.push(deviceTypes.T_WATT);
				break;
			case constants.S_COVER :
				newDeviceTypes.push(deviceTypes.T_UP);
				newDeviceTypes.push(deviceTypes.T_DOWN);
				newDeviceTypes.push(deviceTypes.T_STOP);
				newDeviceTypes.push(deviceTypes.T_PERCENTAGE);
				break;
			case constants.S_TEMP :
				newDeviceTypes.push(deviceTypes.T_TEMP);
				newDeviceTypes.push(deviceTypes.T_ID);
				break;
			case constants.S_HUM :
				newDeviceTypes.push(deviceTypes.T_HUM);
				break;
			case constants.S_BARO :
				newDeviceTypes.push(deviceTypes.T_PRESSURE);
				newDeviceTypes.push(deviceTypes.T_FORECAST);
				break;
			case constants.S_WIND :
				newDeviceTypes.push(deviceTypes.T_WIND);
				newDeviceTypes.push(deviceTypes.T_GUST);
				newDeviceTypes.push(deviceTypes.T_DIRECTION);
				break;
			case constants.S_RAIN :
				newDeviceTypes.push(deviceTypes.T_RAIN);
				newDeviceTypes.push(deviceTypes.T_RAINRATE);
				break;
			case constants.S_UV :
				newDeviceTypes.push(deviceTypes.T_UV);
				break;
			case constants.S_WEIGHT :
				newDeviceTypes.push(deviceTypes.T_WEIGHT);
				newDeviceTypes.push(deviceTypes.T_IMPEDANCE);
				break;
			case constants.S_POWER :
				newDeviceTypes.push(deviceTypes.T_WATT);
				newDeviceTypes.push(deviceTypes.T_KWH);
				break;
			case constants.S_HEATER :
				newDeviceTypes.push(deviceTypes.T_HVAC_SETPOINT_HEAT);
				newDeviceTypes.push(deviceTypes.T_HVAC_FLOW_STATE);
				newDeviceTypes.push(deviceTypes.T_TEMP);
				break;
			case constants.S_DISTANCE :
				newDeviceTypes.push(deviceTypes.T_DISTANCE);
				newDeviceTypes.push(deviceTypes.T_UNIT_PREFIX);
				break;
			case constants.S_LIGHT_LEVEL :
				newDeviceTypes.push(deviceTypes.T_LIGHT_LEVEL);
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				break;
			case constants.S_ARDUINO_NODE :
				break;
			case constants.S_ARDUINO_REPEATER_NODE :
				break;
			case constants.S_LOCK :
				newDeviceTypes.push(deviceTypes.T_LOCK_STATUS);
				break;
			case constants.S_IR :
				newDeviceTypes.push(deviceTypes.T_IR_SEND);
				newDeviceTypes.push(deviceTypes.T_IR_RECEIVE);
				break;
			case constants.S_WATER :
				newDeviceTypes.push(deviceTypes.T_FLOW);
				newDeviceTypes.push(deviceTypes.T_VOLUME);
				break;
			case constants.S_AIR_QUALITY :
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				newDeviceTypes.push(deviceTypes.T_UNIT_PREFIX);
				break;
			case constants.S_CUSTOM :
				break;
			case constants.S_DUST :
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				newDeviceTypes.push(deviceTypes.T_UNIT_PREFIX);
				break;
			case constants.S_SCENE_CONTROLLER :
				newDeviceTypes.push(deviceTypes.T_SCENE_ON);
				newDeviceTypes.push(deviceTypes.T_SCENE_OFF);
				break;
			case constants.S_RGB_LIGHT :
				newDeviceTypes.push(deviceTypes.T_RGB);
				newDeviceTypes.push(deviceTypes.T_WATT);
				break;
			case constants.S_RGBW_LIGHT :
				newDeviceTypes.push(deviceTypes.T_RGBW);
				newDeviceTypes.push(deviceTypes.T_WATT);
				break;
			case constants.S_COLOR_SENSOR :
				newDeviceTypes.push(deviceTypes.T_RGB);
				break;
			case constants.S_HVAC :
				newDeviceTypes.push(deviceTypes.T_HVAC_SETPOINT_HEAT);
				newDeviceTypes.push(deviceTypes.T_HVAC_SETPOINT_COLD);
				newDeviceTypes.push(deviceTypes.T_HVAC_FLOW_STATE);
				newDeviceTypes.push(deviceTypes.T_HVAC_FLOW_MODE);
				newDeviceTypes.push(deviceTypes.T_HVAC_SPEED);
				break;
			case constants.S_MULTIMETER :
				newDeviceTypes.push(deviceTypes.T_VOLTAGE);
				newDeviceTypes.push(deviceTypes.T_CURRENT);
				newDeviceTypes.push(deviceTypes.T_IMPEDANCE);
				break;
			case constants.S_SPRINKLER :
				newDeviceTypes.push(deviceTypes.T_STATUS);
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				break;
			case constants.S_WATER_LEAK :
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_SOUND :
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_VIBRATION :
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_MOISTURE :
				newDeviceTypes.push(deviceTypes.T_LEVEL);
				newDeviceTypes.push(deviceTypes.T_TRIPPED);
				newDeviceTypes.push(deviceTypes.T_ARMED);
				break;
			case constants.S_INFO :
			 	newDeviceTypes.push(deviceTypes.T_TEXT);
				break;
			case constants.S_GAS :
				newDeviceTypes.push(deviceTypes.T_FLOW);
				newDeviceTypes.push(deviceTypes.T_VOLUME);
				break;
			case constants.S_GPS :
				newDeviceTypes.push(deviceTypes.T_POSITION);
				break;
			case constants.S_WATER_QUALITY :
				newDeviceTypes.push(deviceTypes.T_TEMP);
				newDeviceTypes.push(deviceTypes.T_PH);
				newDeviceTypes.push(deviceTypes.T_ORP);
				newDeviceTypes.push(deviceTypes.T_EC);
				newDeviceTypes.push(deviceTypes.T_STATUS);
				break;
		}
		
		return newDeviceTypes;
	}
};