var powercreep_大猫 = {

    run: function(creep) {
        if(creep.room.controller.isPowerEnabled){
            if(creep.memory.live && creep.ticksToLive < 500){
                creep.memory.live = false;
            }
            if(!creep.memory.live && creep.ticksToLive > 4900){
                creep.memory.live = true;
            }
            var spawn = Game.getObjectById('62a5b3bd3fe909309c7cfcd0');
            if(spawn.store[RESOURCE_POWER] > 0 && spawn.store[RESOURCE_ENERGY] > 50)spawn.processPower();
            if(creep.memory.live){
                if(creep.powers[PWR_GENERATE_OPS].cooldown == 0){
                    creep.usePower(PWR_GENERATE_OPS);
                }else{
                    var storage = creep.room.storage;
                    var terminal = creep.room.terminal;
                    if(creep.store[RESOURCE_OPS] > 300){
                        if(storage.store.getFreeCapacity() <= 0){
                            if(creep.transfer(terminal,RESOURCE_OPS,2) == ERR_NOT_IN_RANGE){
                                creep.moveTo(terminal);
                            }
                        }else
                        if(creep.transfer(storage,RESOURCE_OPS,2) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }else if(creep.store[RESOURCE_OPS] < 300){
                        if(creep.withdraw(storage,RESOURCE_OPS,2) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                }
            }else{
                    creep.say('大猫永生!!!!',true);
                    if(creep.renew(spawn) == ERR_NOT_IN_RANGE){
                        creep.moveTo(spawn);
                    }
            }
        }else{
            if(creep.enableRoom(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = powercreep_大猫;