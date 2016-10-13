var Constants = require('./constants.js');
var constants = Constants.constants;

const deviceTypes = 
{
	T_TEMP :
	{
		identifier : constants.V_TEMP,
		name : 'Temperature',
		type : 'temperature',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HUM :
	{
		identifier : constants.V_HUM,
		name : 'Humidity',
		type : 'humidity',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_STATUS :
	{
		identifier : constants.V_STATUS,
		name : 'Binary status',
		type : 'binary',
		sensor : true,
		min : 0,
		max : 1
	},
	T_LIGHT :
	{
		identifier : constants.V_LIGHT,
		name : 'Light status',
		type : 'binary',
		sensor : true,
		min : 0,
		max : 1
	},
	T_PERCENTAGE :
	{
		identifier : constants.V_PERCENTAGE,
		name : 'Percentage value',
		type : 'percentage',
		sensor : true,
		min : 0,
		max : 100,
		unit : 'percentage'
	},
	T_DIMMER :
	{
		identifier : constants.V_DIMMER,
		name : 'Dimmer value',
		type : 'dimmer',
		sensor : true,
		min : 0,
		max : 100,
		unit : 'percentage'
	},
	T_PRESSURE :
	{
		identifier : constants.V_PRESSURE,
		name : 'Atmospheric Pressure',
		type : 'pressure',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_FORECAST :
	{
		identifier : constants.V_FORECAST,
		name : 'Whether forecast',
		type : 'forecast',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MIN_VALUE
	},
	T_RAIN :
	{
		identifier : constants.V_RAIN,
		name : 'Amount of rain',
		type : 'rain',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_RAINRATE :
	{
		identifier : constants.V_RAINRATE,
		name : 'Rate of rain',
		type : 'rain',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_WIND :
	{
		identifier : constants.V_WIND,
		name : 'Windspeed',
		type : 'windspeed',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_GUST :
	{
		identifier : constants.V_GUST,
		name : 'Gust',
		type : 'gust',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_DIRECTION :
	{
		identifier : constants.V_DIRECTION,
		name : 'Wind direction',
		type : 'direction',
		sensor : true,
		min : 0,
		max : 360,
		unit : 'degrees'
	},
	T_UV :
	{
		identifier : constants.V_UV,
		name : 'UV light level',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_WEIGHT :
	{
		identifier : constants.V_WEIGHT,
		name : 'Weight',
		type : 'weight',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_DISTANCE :
	{
		identifier : constants.V_DISTANCE,
		name : 'Distance',
		type : 'distance',
		sensor : true,
		min : 0,
		max : Number.MAX_VALUE
	},
	T_IMPEDANCE :
	{
		identifier : constants.V_IMPEDANCE,
		name : 'Impedance',
		type : 'impedance',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_ARMED :
	{
		identifier : constants.V_ARMED,
		name : 'Armed status of a security sensor',
		type : 'binary',
		sensor : true,
		min : 0,
		max : 1
	},
	T_TRIPPED :
	{
		identifier : constants.V_TRIPPED,
		name : 'Tripped status of a security sensor',
		type : 'binary',
		sensor : true,
		min : 0,
		max : 1
	},
	T_WATT :
	{
		identifier : constants.V_WATT,
		name : 'Watt value for power meters',
		type : 'watt',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_KWH :
	{
		identifier : constants.V_KWH,
		name : 'Accumulated number of KWH for a power meter',
		type : 'kilowatthour',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_SCENE_ON :
	{
		identifier : constants.V_SCENE_ON,
		name : 'Turn on a scene',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_SCENE_OFF :
	{
		identifier : constants.V_SCENE_OFF,
		name : 'Turn off a scene',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HVAC_FLOW_STATE :
	{
		identifier : constants.V_HVAC_FLOW_STATE,
		name : 'Mode of header. One of "Off", "HeatOn", "CoolOn", or "AutoChangeOver"',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HVAC_SPEED :
	{
		identifier : constants.V_HVAC_SPEED,
		name : 'HVAC/Heater fan speed ("Min", "Normal", "Max", "Auto")',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_LIGHT_LEVEL :
	{
		identifier : constants.V_LIGHT_LEVEL,
		name : 'Uncalibrated light level',
		type : 'multilevel',
		sensor : true,
		min : 0,
		max : 100,
		unit : 'percentage'
	},
	T_VAR1 :
	{
		identifier : constants.V_VAR1,
		name : 'Custom value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_VAR2 :
	{
		identifier : constants.V_VAR2,
		name : 'Custom value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_VAR3 :
	{
		identifier : constants.V_VAR3,
		name : 'Custom value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_VAR4 :
	{
		identifier : constants.V_VAR4,
		name : 'Custom value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_VAR5 :
	{
		identifier : constants.V_VAR5,
		name : 'Custom value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_UP :
	{
		identifier : constants.V_UP,
		name : 'Window covering. Up.',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_DOWN :
	{
		identifier : constants.V_DOWN,
		name : 'Window covering. Down.',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_STOP :
	{
		identifier : constants.V_STOP,
		name : 'Window covering. Stop.',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_IR_SEND :
	{
		identifier : constants.V_IR_SEND,
		name : 'Send out an IR-command',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_IR_RECEIVE :
	{
		identifier : constants.V_IR_RECEIVE,
		name : 'Received IR-command',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_FLOW :
	{
		identifier : constants.V_FLOW,
		name : 'Flow of water',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE,
		unit : 'meter'
	},
	T_VOLUME :
	{
		identifier : constants.V_VOLUME,
		name : 'Water volume',
		type : 'volume',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_LOCK_STATUS :
	{
		identifier : constants.V_LOCK_STATUS,
		name : 'Set or get lock status',
		type : 'binary',
		sensor : true,
		min : 0,
		max : 1
	},
	T_LEVEL :
	{
		identifier : constants.V_LEVEL,
		name : 'Used for sending level-value',
		type : 'binary',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_VOLTAGE :
	{
		identifier : constants.V_VOLTAGE,
		name : 'Voltage level',
		type : 'voltage',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_CURRENT :
	{
		identifier : constants.V_CURRENT,
		name : 'Current level',
		type : 'current',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_RGB :
	{
		identifier : constants.V_RGB,
		name : 'RGB value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_RGBW :
	{
		identifier : constants.V_RGBW,
		name : 'RGBW value',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_ID :
	{
		identifier : constants.V_ID,
		name : 'Optional unique sensor id',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_UNIT_PREFIX :
	{
		identifier : constants.V_UNIT_PREFIX,
		name : 'Allows sensors to send in a string representing the unit prefix',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HVAC_SETPOINT_COOL :
	{
		identifier : constants.V_HVAC_SETPOINT_COOL,
		name : 'HVAC cold setpoint',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HVAC_SETPOINT_HEAT :
	{
		identifier : constants.V_HVAC_SETPOINT_HEAT,
		name : 'HVAC/Heater setpoint',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_HVAC_FLOW_MODE :
	{
		identifier : constants.V_HVAC_FLOW_MODE,
		name : 'Flow mode for HVAC',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_TEXT :
	{
		identifier : constants.V_TEXT,
		name : 'Text message',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_CUSTOM :
	{
		identifier : constants.V_CUSTOM,
		name : 'Custom messages',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_POSITION :
	{
		identifier : constants.V_POSITION,
		name : 'GPS position and altitude',
		type : 'position',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_IR_RECORD :
	{
		identifier : constants.V_IR_RECORD,
		name : 'Record IR codes S_IR for playback',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_PH :
	{
		identifier : constants.V_PH,
		name : 'Water PH',
		type : 'ph',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	},
	T_ORP :
	{
		identifier : constants.V_ORP,
		name : 'Water ORP',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE,
		unit : 'minivolt'
	},
	T_EC :
	{
		identifier : constants.V_EC,
		name : 'Water electric conductivity',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE,
		unit : 'microSiemens/cm'
	},
	T_VAR :
	{
		identifier : constants.V_VAR,
		name : 'Reactive power',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE,
		unit : 'volt-ampere reactive'
	},
	T_VA :
	{
		identifier : constants.V_VA,
		name : 'Apparent power',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE,
		unit : 'volt-ampere'
	},
	T_POWER_FACTOR :
	{
		identifier : constants.V_POWER_FACTOR,
		name : 'Ratio of real power to apparent power',
		type : 'multilevel',
		sensor : true,
		min : Number.MIN_VALUE,
		max : Number.MAX_VALUE
	}
};

module.exports.deviceTypes = deviceTypes;
	