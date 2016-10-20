module.exports = {
	getNextAvailableNodeId : `
		SELECT MAX(T.nodeId) nodeId
		FROM (
			SELECT 1 nodeId
			UNION
			SELECT MAX(CONVERT(SUBSTR(d.identifier, 1, INSTR(d.identifier, '-') - 1), SIGNED INTEGER)) + 1 nodeId
			FROM device d
			WHERE d.service = ?
		) T`,
	
	getDeviceIdentifiers : `
		SELECT
			SUBSTR(d.identifier, 1, INSTR(d.identifier, '-') - 1) nodeId,
			SUBSTR(d.identifier, INSTR(d.identifier, '-') + 1, LENGTH(d.identifier)) sensorId
		FROM device d
		INNER JOIN devicetype dt
			ON d.id = dt.device
		WHERE dt.id = ?
		`
};