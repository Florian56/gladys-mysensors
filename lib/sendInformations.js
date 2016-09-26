/**
 * Encode a message.
 * @method encodeMessage
 */
function encodeMessage(nodeId, sensorId, messageType, acknowledge, subType, payload)
{
	var message = nodeId.toString(10) + ";" + sensorId.toString(10) + ";" + messageType.toString(10) + ";" + acknowledge.toString(10) + ";" + subType.toString(10) + ";";
	if (messageType == C_STREAM)
	{
		for (var i = 0; i < payload.length; i++)
		{
			if (payload[i] < 16)
				message += "0";
			message += payload[i].toString(16);
		}
	}
	else
	{
		message += payload;
	}
	message += '\n';
	return message.toString();
}

/**
 * Send a message.
 * @method sendMessage
 */
function sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload)
{
	sails.log.info('[MySensors] -> ' + message.toString());
	
	var message = encodeMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
	gateway.write(message);
}

/**
 * Envoie de l'heure
 * @method sendTime
 */
function sendTime(nodeId, sensorId)
{
	var messageType = C_INTERNAL;
	var acknowledge = 0;
	var subType = I_TIME;
	var payload = new Date().getTime() / 1000;
	
	sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
}

/**
 * Envoie d'un nouvel id à un noeud qui en fait la demande
 * id envoyé = id max trouvé en base + 1
 * @method sendNextAvailableNodeId
 */
function sendNextAvailableNodeId(callback)
{
	var idToSend = 1;
	
	var request = "SELECT MAX(T.nodeId) nodeId ";
	request += "FROM ";
	request += "( ";
	request += "	SELECT 1 nodeId ";
	request += "	UNION ALL ";
	request += "	SELECT MAX(n.nodeId) + 1 nodeId ";
	request += "	FROM mysensorsnode n ";
	request += ") T";
	
	MySensorsNode.query(request, function(err, node){
		if(err)
		{
			sails.log.error("[MySensors] " + err);
			callback();
		}
		else
		{
			idToSend = node[0].nodeId;
			
			if (idToSend < 255)
			{
				MySensorsNode.create({ nodeId : idToSend }, function(err, node){
					if(err)
						sails.log.error("[MySensors] " + err);
					else
					{
						sails.log.info("[MySensors] Le contrôleur envoie l'id au nouveau noeud : " + node.nodeId);
						
						var nodeId = BROADCAST_ADDRESS;
						var sensorId = SENSORID_INTERNAL;
						var messageType = C_INTERNAL;
						var acknowledge = 0;
						var subType = I_ID_RESPONSE;
						var payload = idToSend;
						
						sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
					}
					
					callback();
				});
			}
			else
			{
				sails.log.error("[MySensors] id " + idToSend + " à envoyer supérieur à 254");
				callback();
			}
		}
	});
}

/**
 * Envoie de la configuration sur la demande d'un noeud
 * @method sendConfig
 */
function sendConfig(nodeId)
{
	var sensorId = SENSORID_INTERNAL;
	var messageType = C_INTERNAL;
	var acknowledge = 0;
	var subType = I_CONFIG;
	var payload = "M";
	
	sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
}

/**
 * Envoi un message pour demander à un noeud de rebooter.
 * @method sendRebootMessage
 */
function sendRebootMessage(nodeId)
{
	var sensorId = SENSORID_INTERNAL;
	var messageType = C_INTERNAL;
	var acknowledge = 0;
	var subType = I_REBOOT;
	var payload = "";
	
	sendMessage(nodeId, sensorId, messageType, acknowledge, subType, payload);
}