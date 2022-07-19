var towerattack = require('towerattack')
var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        var emery = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(emery) {
            towerattack.attack(creep,emery);
        }
        var creep_last = null,storage_last = null,terminal_last = null;
        for(const type in creep.store){
            creep_last = type;
        }
        for(const type in storage.store){
            storage_last = type;
        }
        if(terminal){
        for(const type in terminal.store){
            if(terminal.cooldown > 0) break; 
            if(type != RESOURCE_ENERGY && type != RESOURCE_GHODIUM){
                terminal.send(type,terminal.store.getUsedCapacity(type), 'E17S57')
                break;
            }
        }}
        if(creep.room.name == 'W33S14'){
            creep.moveTo(12,9)
            var link = Game.getObjectById('62bd72a646a1a51b875571d0');
            if(creep.store.getUsedCapacity() == 0){
                if(link.store[RESOURCE_ENERGY] > 0){
                    creep.withdraw(link,RESOURCE_ENERGY)
                }else if(terminal.store[RESOURCE_ENERGY] > 50000){
                    creep.withdraw(terminal,RESOURCE_ENERGY)
                }else if(storage_last != RESOURCE_ENERGY){
                    creep.withdraw(storage,storage_last)
                }else{
                    creep.withdraw(storage,RESOURCE_ENERGY)
                }
            }else{
                if(creep_last != RESOURCE_ENERGY){
                    creep.transfer(terminal,creep_last)
                }else if(terminal.store[RESOURCE_ENERGY] < 50000 || storage.store.getFreeCapacity() <= 0){
                    creep.transfer(terminal,RESOURCE_ENERGY)
                }else creep.transfer(storage,RESOURCE_ENERGY);
            }
        }else
        if(creep.room.name == 'E17S54'){
            if(terminal.store[RESOURCE_ENERGY] > 20000){
                terminal.send(RESOURCE_ENERGY,10000, 'E17S57')
            }
            creep.moveTo(32,44);
            if(creep.store.getUsedCapacity() == 0){
                if(storage.store.getUsedCapacity() > 800000){
                    creep.withdraw(storage,storage_last)
                }
            }else{
                creep.transfer(terminal,creep_last);
            }
        }else
        if(creep.room.name == 'E17S55'){
            if(terminal.store[RESOURCE_ENERGY] > 100000){
                terminal.send(RESOURCE_ENERGY,40000, 'W33S14')
            }
            var nuker = Game.getObjectById('62bbba3af5636708cae0f3a7')
            if(nuker.store[RESOURCE_GHODIUM] < 5000){
                if(creep.store.getUsedCapacity() == 0){
                    creep.withdraw(terminal,RESOURCE_GHODIUM);
                }else if(creep.store[RESOURCE_GHODIUM] > 0){
                    creep.transfer(nuker,RESOURCE_GHODIUM);
                }else{
                    creep.transfer(storage,creep_last)
                }
            }else{
                var link = Game.getObjectById('629f8f5a13ee0bb5a5c6dff6');
                creep.moveTo(11,23);
                if(creep.store.getUsedCapacity() == 0){
                    if(link.store[RESOURCE_ENERGY] > 50){
                        creep.withdraw(link,RESOURCE_ENERGY)
                    }else if(storage_last != RESOURCE_ENERGY || storage.store[RESOURCE_ENERGY] > 800000){
                        creep.withdraw(storage,storage_last)
                    }else if(terminal.store[RESOURCE_ENERGY] > 200000){
                        creep.withdraw(storage,storage_last)
                    }
                }else{
                    if(storage.store.getFreeCapacity() > 200000 && creep_last == RESOURCE_ENERGY){
                        creep.transfer(storage,creep_last)
                    }else{
                        creep.transfer(terminal,creep_last)
                    }
                }
            }
        }else if(creep.room.name == 'E17S56'){
            if(terminal.store[RESOURCE_ENERGY] > 100000){
                terminal.send(RESOURCE_ENERGY,40000, 'W33S14')
            }
            var link = Game.getObjectById('628e59edd7adcc470d945f20');
            var container = Game.getObjectById('629aaca6dccb2fa9238c4bd7')
            if(creep.store.getUsedCapacity() == 0){
                if(link.store[RESOURCE_ENERGY] > 50){
                    if(creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(14,17);
                    }
                }else if(container.store[RESOURCE_ENERGY] > 100){
                    if(creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(container);
                    }
                }else if(storage_last != RESOURCE_ENERGY || storage.store[RESOURCE_ENERGY] > 800000){
                    if(creep.withdraw(storage,storage_last) == ERR_NOT_IN_RANGE){
                        creep.moveTo(14,17);
                    }
                }else if(terminal.store[RESOURCE_ENERGY] > 500000){
                    if(creep.withdraw(storage,storage_last) == ERR_NOT_IN_RANGE){
                        creep.moveTo(14,17);
                    }
                }
            }else{
                if(storage.store.getFreeCapacity() > 200000){
                    if(creep.transfer(storage,creep_last) == ERR_NOT_IN_RANGE){
                        creep.moveTo(14,17);
                    }
                }else{
                    if(creep.transfer(terminal,creep_last) == ERR_NOT_IN_RANGE){
                        creep.moveTo(14,17);
                    }
                }
            }
        }
    }
};

module.exports = roleWorker;