var sendInformations = require('./sendInformations.js');
var queries = require('./queries.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = function exec(params) {
	return gladys.utils.sql(queries.getDeviceIdentifiers, [params.deviceType.id])
		.then((result) => {
			return sendInformations.sendMessage(
				result.nodeId,
				result.sensorId,
				constants.C_SET,
				1,
				params.deviceType.identifier,
				params.state.value);
		});
};