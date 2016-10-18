var serialport = require('serialport');
var shared = require('./shared.js');
var dataReceived = require('./dataReceived.js');
var appendData = require('./appendData.js');
var sendInformations = require('./sendInformations.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = function() {
	
	// Set a queue for incoming messages.
	shared.queue = async.queue(dataReceived, 1);

	gladys.param.getValue('mysensors_gatewaytype')
		.then((gatewayType) => {
			return [gatewayType, gladys.param.getValue('mysensors_gatewayport')];
		})
		.spread((gatewayType, gatewayPort) => {
			// Connect to gateway.
			if (gatewayType == 'Ethernet') {
				return gladys.param.getValue('mysensors_gatewayaddress')
					.then((gatewayAddress) => {
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
						
						return Promise.resolve();
					});
			}
			if (gatewayType == 'Serial') {
				var SerialPort = serialport.SerialPort;
				shared.gateway = new SerialPort(gatewayPort, { baudrate: 115200 });
				
				shared.gateway.on('open', function() {
					sails.log.info('[MySensors] Connected to serial gateway at ' + gatewayPort);
				});
				
				shared.gateway.on('error', function(error) {
					sails.log.error('[MySensors] Connection error ' + error.message + ' - trying to reconnect');
				});
				
				return Promise.resolve();
			}
			
			return Promise.reject(new Error(`[MySensors] Unknown Gateway type : ${gatewayType}`));
		})
		.then(() => {
			shared.gateway.on('data', function(data) {
				appendData(data.toString());
			});
			
			shared.gateway.on('end', function() {
				sails.log.info('[MySensors] Disconnected from gateway');
			});
			
			return Promise.resolve();
		})
		.catch((err) => {
			sails.log.error(err);
			return Promise.reject(err);
		});	
	
	setInterval(function() {
		sendInformations.sendTime(constants.BROADCAST_ADDRESS, constants.SENSORID_INTERNAL);
	}, 5 * 60 * 1000);
};