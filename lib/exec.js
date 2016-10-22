var sendInformations = require('./sendInformations.js');
var queries = require('./queries.js');
var Constants = require('./constants.js');
var constants = Constants.constants;

module.exports = function exec(params) {
	return gladys.utils.sqlUnique(queries.getDeviceIdentifiers, [params.deviceType.id])
		.then((result) => {
			return sendInformations.sendMessage(
				result.nodeId,
				result.sensorId,
				constants.C_SET,
				1,
				result.deviceTypeIdentifier,
				params.state.value);
		});
};