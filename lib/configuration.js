const configuration =
{
	gatewayType : 'Serial',
	gatewayPort : '/dev/ttyACM0',
	gatewayBaud : 115200
	
	// Example for ethernet type
	//gatewayType						: 'Ethernet',
	//gatewayAddress					: '10.0.1.99',
	//gatewayPort						: 9999
};

module.exports.configuration = configuration;