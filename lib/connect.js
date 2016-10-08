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
	var gateway = shared.gateway;
	
	// Set a queue for incoming messages.
	shared.queue = async.queue(dataReceived, 1);

	// Connect to gateway.
	if (gatewayType == 'Ethernet')
	{
		gateway = require('net').Socket();
		gateway.connect(gatewayPort, gatewayAddress);
		gateway.setEncoding('ascii');
		
		gateway.on('connect', function() {
			sails.log.info('[MySensors] connected to ethernet gateway at ' + gatewayAddress + ":" + gatewayPort);
		});
		
		gateway.on('error', function() {
			sails.log.error('[MySensors] connection error - trying to reconnect');
			gateway.connect(gatewayPort, gatewayAddress);
			gateway.setEncoding('ascii');
		});
	}
	else if (gatewayType == 'Serial')
	{
		var SerialPort = serialport.SerialPort;
		gateway = new SerialPort(gatewayPort, { baudrate: gatewayBaud });
		
		gateway.on('open', function() {
			sails.log.info('[MySensors] connected to serial gateway at ' + gatewayPort);
		});
		
		gateway.on('error', function(error) {
			sails.log.error('[MySensors] connection error ' + error.message + ' - trying to reconnect');
		});
	}
	else
	{
		throw new Error('unknown Gateway type');
	}
		
	gateway.on('data', function(data)
	{
		sails.log.info('[MySensors] data received : ' + data.toString());
		appendData(data.toString())
	});
	
	gateway.on('end', function() {
		sails.log.info('[MySensors] disconnected from gateway');
	});
	
	setInterval(function() {
		sendInformations.sendTime(constants.BROADCAST_ADDRESS, constants.SENSORID_INTERNAL);
	}, 5 * 60 * 1000);
};