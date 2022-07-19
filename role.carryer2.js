var towerattack = require('towerattack')
var body = [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
var roleCarryer2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.ticksToLive < 60) Game.spawns['猫爬架'].spawnCreep(body,'工具猫'+Game.time, {memory: {role: 'carryer'}});
        
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        var emery = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(emery) {
            towerattack.attack(creep,emery);
        }
        var powerspawn = Game.getObjectById('62a5b3bd3fe909309c7cfcd0');
        const link = Game.getObjectById('628200e93839195f59156e94');
        var factory = Game.getObjectById('62c973e0b6de654a8f5623de');
        // var itemFrom = RESOURCE_KEANIUM,itemTo = RESOURCE_KEANIUM_BAR;
        // var itemFrom = RESOURCE_ZYNTHIUM,itemTo = RESOURCE_ZYNTHIUM_BAR;
        // var itemFrom = RESOURCE_UTRIUM,itemTo = RESOURCE_UTRIUM_BAR;
        var itemFrom = RESOURCE_LEMERGIUM,itemTo = RESOURCE_LEMERGIUM_BAR;
        // var itemFrom = RESOURCE_OXYGEN,itemTo = RESOURCE_OXIDANT;
        var usefactory = 1;
        if(usefactory == 1){
            if(factory.cooldown == 0 && factory.store[itemFrom] >= 500){
                factory.produce(itemTo);
            }
        }
        var creep_last = null,terminal_last = null,storage_last;
        for(const type in creep.store){
            creep_last = type;
        }
        for(const type in terminal.store) {
            terminal_last = type;
        }
        for(const type in storage.store) {
            storage_last = type;
        }
        creep.moveTo(7,40,{ignoreCreeps:false})
        if(terminal.store[RESOURCE_ENERGY] > 50000)terminal.send(RESOURCE_ENERGY,10000,'E17S56')
        if(terminal.store[RESOURCE_ENERGY] < 20000){
            if(creep.store.getUsedCapacity() == 0){
                creep.withdraw(storage,RESOURCE_ENERGY)
            }else{
                creep.transfer(terminal,creep_last)
            }
        }else
        if(terminal.store.getFreeCapacity() < 20000 && storage.store.getFreeCapacity() > 100000){
            if(creep.store.getUsedCapacity() == 0){
                creep.withdraw(terminal,terminal_last)
            }else{
                creep.transfer(storage,creep_last)
            }
        }else
        if(storage.store.getFreeCapacity() < 100000){
            if(creep.store.getUsedCapacity() == 0) {
                if(link.store[RESOURCE_ENERGY] > 300){
                    creep.withdraw(link,RESOURCE_ENERGY);
                }else{
                    creep.withdraw(storage,RESOURCE_ENERGY)
                }
            }else if(creep.store.getUsedCapacity() > 0)creep.transfer(terminal,creep_last)
        }else
        if(storage.store[RESOURCE_ENERGY] < 50000 && (terminal.store[RESOURCE_ENERGY] > 50000 || creep.store[RESOURCE_ENERGY] > 0)){
            if(creep.store.getUsedCapacity() == 0){
                if(link.store[RESOURCE_ENERGY] > 300){
                    creep.withdraw(link,RESOURCE_ENERGY);
                }else{
                    creep.withdraw(terminal,RESOURCE_ENERGY)
                }
            }else{
                creep.transfer(storage,creep_last);
            }
        }else{
            if(powerspawn.store[RESOURCE_POWER] == 0 && (terminal.store[RESOURCE_POWER] > 0 || creep.store[RESOURCE_POWER] > 0)){
                if(creep.store.getUsedCapacity() == 0){
                    creep.withdraw(terminal,RESOURCE_POWER,100);
                }else if(creep.store[RESOURCE_POWER] > 0){
                    creep.transfer(powerspawn,RESOURCE_POWER,100);
                }else{
                    creep.transfer(storage,creep_last);
                }
            }else if(powerspawn.store[RESOURCE_POWER] == 0 && (storage.store[RESOURCE_POWER] > 0 || creep.store[RESOURCE_POWER] > 0)){
                if(creep.store.getUsedCapacity() == 0){
                    creep.withdraw(storage,RESOURCE_POWER,100);
                }else if(creep.store[RESOURCE_POWER] > 0){
                    creep.transfer(powerspawn,RESOURCE_POWER,100);
                }else{
                    creep.transfer(storage,creep_last);
                }
            }else if(powerspawn.store[RESOURCE_ENERGY] < 4500 && (storage.store[RESOURCE_ENERGY] > 0 || creep.store[RESOURCE_ENERGY] > 0)){
                if(creep.store.getUsedCapacity() == 0){
                    creep.withdraw(storage,RESOURCE_ENERGY);
                }else if(creep.store[RESOURCE_ENERGY] > 0){
                    creep.transfer(powerspawn,RESOURCE_ENERGY);
                }else{
                    creep.transfer(storage,creep_last);
                }
            }else{
                if(terminal.store[RESOURCE_ENERGY] < 20000){
                    if(creep.store.getUsedCapacity() == 0){
                        creep.withdraw(storage,RESOURCE_ENERGY);
                    }else if(creep.store[RESOURCE_ENERGY] > 0){
                        creep.transfer(terminal,RESOURCE_ENERGY);
                    }else{
                        if(storage.store.getFreeCapacity() == 0){
                            creep.transfer(terminal,creep_last);
                        }else creep.transfer(storage,creep_last);
                    }
                }else if(link.store[RESOURCE_ENERGY] == 0){
                    if(usefactory == 1 && (storage.store[itemFrom] > 0 || terminal.store[itemFrom] > 0 || creep.store[itemFrom] > 0 || creep.store[itemTo] > 0 || factory.store[itemTo])){
                        if(creep.store.getUsedCapacity() == 0){
                            var factory_last = null;
                            for(const type in factory.store){
                                if(type != RESOURCE_ENERGY && type != itemFrom){
                                    factory_last = type;
                                    break; 
                                }
                            }
                            if(factory_last != null){
                                creep.withdraw(factory,factory_last)
                            }else if(factory.store[RESOURCE_ENERGY] < 1000){
                                if(storage.store[RESOURCE_ENERGY] > 0){
                                    creep.withdraw(storage,RESOURCE_ENERGY)
                                }else creep.withdraw(terminal,RESOURCE_ENERGY)
                            }else if(factory.store[itemFrom] < 1000){
                                if(storage.store[itemFrom] > 0){
                                    creep.withdraw(storage,itemFrom)
                                }else creep.withdraw(terminal,itemFrom)
                            }
                        }else{
                            if((factory.store[RESOURCE_ENERGY] < 5000 && creep_last == RESOURCE_ENERGY) || creep_last == itemFrom){
                                creep.transfer(factory,creep_last)
                            }else if(creep_last == itemTo){
                                creep.transfer(terminal,creep_last)
                            }else creep.transfer(storage,creep_last)
                        }
                    }else if(factory.store[RESOURCE_ENERGY] < 5000){
                        if(creep.store.getUsedCapacity() == 0){
                            creep.withdraw(storage,RESOURCE_ENERGY);
                        }else if(creep.store[RESOURCE_ENERGY] > 0){
                            creep.transfer(factory,RESOURCE_ENERGY);
                        }else creep.transfer(storage,creep_last)
                    }
                }else{
                    if(creep.store.getUsedCapacity() == 0){
                        creep.withdraw(link,RESOURCE_ENERGY);
                    }else{
                        if(storage.store.getFreeCapacity() < 50000){
                            creep.transfer(terminal,creep_last);
                        }else creep.transfer(storage,creep_last);
                    }
                }
            }
        }
    }
};

module.exports = roleCarryer2;