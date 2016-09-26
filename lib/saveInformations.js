module.exports = 
{
	/**
	* Sauvegarde d'un nouveau noeud en base de données
	* @method saveNode
	*/
	saveNode : function (nodeId, sensorId, subType, protocol, callback)
	{
		MySensorsNode.findOne({ nodeId : nodeId }, function (err, node){
			if(err)
			{
				sails.log.error("[MySensors] " + err);
				callback();
			}
			else if(!node)
			{	
				MySensorsNode.create({ nodeId : nodeId, protocol : protocol }, function(err, node){
					if(err)
					{
						sails.log.error("[MySensors] " + err);
						callback();
					}
					else
					{
						sails.log.info("[MySensors] Nouveau noeud ajouté : " + node.nodeId + " - " + node.protocol);
						saveSensor(nodeId, sensorId, subType, callback);
					}
				});
			}
			else
			{
				MySensorsNode.update({ nodeId : nodeId }, { protocol : protocol }, function (err, node){
					if(err)
					{
						sails.log.error("[MySensors] " + err);
						callback();
					}
					else
					{
						sails.log.info("[MySensors] Noeud " + node[0].nodeId + " mis à jour, protocole : " + node[0].protocol);
						
						MySensorsSensor.destroy({ node : node[0].id }, function (err){
							if(err)
							{
								sails.log.error("[MySensors] " + err);
								callback();
							}
							else						
								saveSensor(nodeId, sensorId, subType, callback);
						});
					}
				});
			}
		});
	},
	
	/**
	* Sauvegarde d'un nouveau sensor en base de données
	* Un sensor est lié à un noeud. Ce noeud peut posséder plusieurs sensors
	* @method saveSensor
	*/
	saveSensor : function (nodeId, sensorId, subType, callback)
	{
		MySensorsNode.findOne({ nodeId : nodeId }, function (err, node){
			if (err)
			{
				sails.log.error("[MySensors] " + err);
				callback();
			}
			else if(!node)
			{
				sails.log.error("[MySensors] Noeud " + nodeId + " inexistant en base de données");
				callback();
			}
			else
			{
				var device = {name : 'Device', protocol : 'MySensors', service: 'MySensorsService', room : 1};
				var deviceType;
				
				switch (subType)
				{
					case S_DOOR :
						deviceType = [{type : 'binary', sensor : true, min : 0, max : 1}];
						break;
					case S_MOTION :
						deviceType = [{type : 'binary', sensor : true, min : 0, max : 1}];
						break;
					case S_SMOKE :
						deviceType = [{type : 'binary', sensor : true, min : 0, max : 1}];
						break;
					case S_BINARY :
						deviceType = [{type : 'binary', sensor : true, min : 0, max : 1}];
						break;
					case S_DIMMER :
						deviceType = [{type : 'multilevel', sensor : true, min : 0, max : 100}];
						break;
					case S_COVER :
						deviceType = [{type : 'multilevel', sensor : true, min : 0, max : 100}];
						break;
					case S_TEMP :
						deviceType = [{type : 'multilevel', sensor : true, min : -100, max : 100, unit : 'degrees'}];
						break;
					case S_HUM :
						
						break;
					case S_BARO :
						
						break;
					case S_WIND :
						
						break;
					case S_RAIN :
						
						break;
					case S_UV :
						
						break;
					case S_WEIGHT :
						
						break;
					case S_POWER :
						
						break;
					case S_HEATER :
						
						break;
					case S_DISTANCE :
						
						break;
					case S_LIGHT_LEVEL :
						
						break;
					case S_ARDUINO_NODE :
						
						break;
					case S_ARDUINO_REPEATER_NODE :
						
						break;
					case S_LOCK :
						
						break;
					case S_IR :
						
						break;
					case S_WATER :
						
						break;
					case S_AIR_QUALITY :
						
						break;
					case S_CUSTOM :
						
						break;
					case S_DUST :
						
						break;
					case S_SCENE_CONTROLLER :
						
						break;
					case S_RGB_LIGHT :
						
						break;
					case S_RGBW_LIGHT :
						
						break;
					case S_COLOR_SENSOR :
						
						break;
					case S_HVAC :
						
						break;
					case S_MULTIMETER :
						
						break;
					case S_SPRINKLER :
						
						break;
					case S_WATER_LEAK :
						
						break;
					case S_SOUND :
						
						break;
					case S_VIBRATION :
						
						break;
					case S_MOISTURE :
						
						break;
				}
				
				var deviceInformations = {device : device, types : deviceType};
				
				gladys.device.create(deviceInformations).then(function(device){
					var sensor =
					{
						node : node.id,
						sensorId : sensorId,
						type : subType,
						device : device.id
					};
					
					MySensorsSensor.create(sensor, function(err, sensor){
						if(err)
							sails.log.error("[MySensors] " + err);
						else
							sails.log.info("[MySensors] Nouveau sensor ajouté : " + nodeId + " - " + sensor.sensorId + " - " + sensor.type);
						
						callback();
					});
				}).catch(function(err){
					sails.log.error("[MySensors] " + err);
					callback();
				});
			}
		});
	},
	
	/**
	* Sauvegarde une nouvelle valeur reçue d'un sensor
	* @method saveValue
	*/
	saveValue : function (nodeId, sensorId, subType, payload, callback)
	{
		MySensorsNode.findOne({ nodeId : nodeId }, function (err, node){
			if(!node)
			{
				sails.log.error("[MySensors] Noeud " + nodeId + " inexistant en base de données");
				callback();
			}
			else if (err)
			{
				sails.log.error("[MySensors] " + err);
				callback();
			}
			else
			{
				MySensorsSensor.findOne({ node : node.id, sensorId : sensorId }, function (err, sensor){
					if(!sensor)
					{
						sails.log.error("[MySensors] Sensor " + sensorId + " inexistant en base de données pour le noeud " + nodeId);
						callback();
					}
					else if (err)
					{
						sails.log.error("[MySensors] " + err);
						callback();
					}
					else
					{
						var data =
						{
							sensorId : sensor.id,
							type : subType,
							data : payload
						};
						
						MySensorsData.create(data, function(err, data){
							if(err)
								sails.log.error("[MySensors] " + err);
							else
								sails.log.info("[MySensors] Nouvelle donnée ajoutée : " + nodeId + " - " + sensorId + " - " + subType + " - " + payload);
							
							callback();
						});
					}
				});
			}
		});
	},
	
	/**
	* Sauvegarde le nom du sketch du noeud
	* @method saveSketchName
	*/
	saveSketchName : function (nodeId, payload, callback)
	{
		MySensorsNode.update({ nodeId : nodeId }, { sketchName : payload }, function (err, node){
			if(err)
				sails.log.error("[MySensors] " + err);
			else
				sails.log.info("[MySensors] Noeud " + nodeId + " mis à jour, nom du sketch : " + node[0].sketchName);
			
			callback();
		});
	},

	/**
	* Sauvegarde la version du sketch du noeud
	* @method saveSketchVersion
	*/
	saveSketchVersion : function (nodeId, payload, callback)
	{
		MySensorsNode.update({ nodeId : nodeId }, { sketchVersion : payload }, function (err, node){
			if(err)
				sails.log.error("[MySensors] " + err);
			else
				sails.log.info("[MySensors] Noeud " + nodeId + " mis à jour, version du sketch : " + node[0].sketchVersion);
			
			callback();
		});
	}
};