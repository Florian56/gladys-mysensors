var serialport = require('serialport');
var configuration = require('./configuration.js');
var shared = require('./shared.js');
var dataReceived = require('./dataReceived.js');
var appendData = require('./appendData.js');
var sendInformations = require('./sendInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = function()
{
	const gatewayType = configuration.configuration.gatewayType;
	const gatewayPort = configuration.configuration.gatewayPort;
	const gatewayBaud = configuration.configuration.gatewayBaud;
	const gatewayAddress = configuration.configuration.gatewayAddress;
	
	// Set a queue for incoming messages.
	shared.queue = async.queue(dataReceived, 1);

	// Connect to gateway.
	if (gatewayType == 'Ethernet')
	{
		shared.gateway = require('net').Socket();
		shared.gateway.connect(gatewayPort, gatewayAddress);
		shared.gateway.setEncoding('ascii');
		
		shared.gateway.on('connect', function() {
			sails.log.info('[MySensors] Connected to ethernet gateway at ' + gatewayAddress + ":" + gatewayPort);
		});
		
		shared.gateway.on('error', function() {
			sails.log.error('[MySensors] Connection error - trying to reconnect');
			shared.gateway.connect(gatewayPort, gatewayAddress);
			shared.gateway.setEncoding('ascii');
		});
	}
	else if (gatewayType == 'Serial')
	{
		var SerialPort = serialport.SerialPort;
		shared.gateway = new SerialPort(gatewayPort, { baudrate: gatewayBaud });
		
		shared.gateway.on('open', function() {
			sails.log.info('[MySensors] Connected to serial gateway at ' + gatewayPort);
		});
		
		shared.gateway.on('error', function(error) {
			sails.log.error('[MySensors] Connection error ' + error.message + ' - trying to reconnect');
		});
	}
	else
	{
		throw new Error('[MySensors] Unknown Gateway type');
	}
		
	shared.gateway.on('data', function(data)
	{
		appendData(data.toString())
	});
	
	shared.gateway.on('end', function() {
		sails.log.info('[MySensors] Disconnected from gateway');
	});
	
	setInterval(function() {
		sendInformations.sendTime(constants.BROADCAST_ADDRESS, constants.SENSORID_INTERNAL);
	}, 5 * 60 * 1000);
};