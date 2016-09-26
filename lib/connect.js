var serialport = require('serialport');
var configuration = require('./configuration.js');
var shared = require('./shared.js');
var dataReceived = require('./dataReceived.js');
var appendData = require('./appendData.js');

module.exports = function()
{
	/*listUsbDevices()
    .then(function(ports) {

		// we keep only the arduinos
		return filterArduino(ports);
    });*/
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
		appendData(data.toString())
	});
	
	gateway.on('end', function() {
		sails.log.info('[MySensors] disconnected from gateway');
	});
	
	setInterval(function() {
		sendTime(BROADCAST_ADDRESS, SENSORID_INTERNAL);
	}, 5 * 60 * 1000);
};

function filterArduino(ports) {
  var arduinos = [];

  // foreach port we test if it is an arduino
  ports.forEach(function(port) {
	  sails.log.info(port.manufacturer);
	  sails.log.info(port.comName);

  });

  return Promise.resolve(arduinos);
}

function listUsbDevices() {
  return new Promise(function(resolve, reject) {
    serialPort.list(function(err, ports) {
      if (err) return reject(new Error(err));

      return resolve(ports);
    });
  });
}