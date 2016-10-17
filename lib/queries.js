module.exports = {
	getNextAvailableNodeId : `
		SELECT MAX(T.nodeId) nodeId
		FROM (
			SELECT 1 nodeId
			UNION
			SELECT MAX(CONVERT(SUBSTR(d.identifier, 1, INSTR(d.identifier, '-')), SIGNED INTEGER)) + 1 nodeId
			FROM device d
			WHERE d.service = ?
		) T`
};