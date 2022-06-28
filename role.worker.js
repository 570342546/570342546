var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        
        var creep_last = null,storage_last = null,terminal_last = null;
        for(const type in creep.store){
            creep_last = type;
        }
        for(const type in storage.store){
            storage_last = type;
        }
        for(const type in terminal.store){
            if(terminal.cooldown > 0) break; 
            if(type != RESOURCE_ENERGY){
                terminal.send(type,terminal.store.getUsedCapacity(type), 'E17S57')
                break;
            }
        }
        if(creep.room.name == 'E17S54'){
            if(terminal.store[RESOURCE_ENERGY] > 20000){
                terminal.send(RESOURCE_ENERGY,15000, 'E17S55')
            }
            creep.moveTo(32,44);
            if(creep.store.getUsedCapacity() == 0 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 50000){
                creep.withdraw(storage,storage_last);
            }else{
                creep.transfer(terminal,creep_last);
            }
        }else
        if(creep.room.name == 'E17S55'){
            creep.moveTo(11,23);
            if(storage.store.getFreeCapacity() < 100000 && terminal.store.getFreeCapacity() > 10000){
                if(creep.store.getFreeCapacity() == 0){
                    creep.transfer(terminal,creep_last);
                }else{
                    creep.withdraw(storage,RESOURCE_ENERGY);
                }
            }else
            if(creep.store.getUsedCapacity() == 0){
                var link = Game.getObjectById('629f8f5a13ee0bb5a5c6dff6');
                if(link.store[RESOURCE_ENERGY] > 300){
                    creep.withdraw(link,RESOURCE_ENERGY);
                }else if(terminal.store[RESOURCE_ENERGY] > 50000){
                    creep.withdraw(terminal,RESOURCE_ENERGY);
                }else{
                    creep.withdraw(storage,storage_last);
                }
            }else{
                if(creep_last != RESOURCE_ENERGY){
                    creep.transfer(terminal,creep_last);
                }else{
                    creep.transfer(storage,creep_last);
                }
            }
        }else if(creep.room.name == 'E17S56'){
            if(terminal.store[RESOURCE_ENERGY] > 50000){
                terminal.send(RESOURCE_ENERGY,45000, 'E17S55')
            }
            var link = Game.getObjectById('628e59edd7adcc470d945f20');
            var creep_last = null,b = null,terminal_last;
            for(const type in creep.store){
                if(type) creep_last = type;
            }
            for(const type in storage.store){
                if(type != RESOURCE_ENERGY) b = type;
            }
            if(storage.store.getUsedCapacity() > 50000){
                creep.moveTo(14,17);
                if(creep.store.getUsedCapacity() == 0){
                    if(link.store[RESOURCE_ENERGY] > 50){
                        creep.withdraw(link,RESOURCE_ENERGY);
                    }else{
                        creep.withdraw(storage,RESOURCE_ENERGY)
                    }
                }else{
                    creep.transfer(terminal,creep_last);
                }
            }else
            if(link.store[RESOURCE_ENERGY] > 50){
                if(creep.store.getUsedCapacity() == 0){
                    if(creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(link);
                    }
                }else if(creep.transfer(storage,creep_last) == ERR_NOT_IN_RANGE){
                        creep.moveTo(storage);
                }
            }else{
            // if(terminal.store[RESOURCE_ENERGY] > 10000){
            //     if(creep.store.getUsedCapacity() == 0){
            //         if(creep.withdraw(terminal,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
            //             creep.moveTo(terminal);
            //         }
            //     }else{
            //         if(creep.transfer(storage,creep_last) == ERR_NOT_IN_RANGE){
            //             creep.moveTo(storage);
            //         }
            //     }
            // }else{
                if(creep.store.getUsedCapacity() == 0){
                    var container = Game.getObjectById('629aaca6dccb2fa9238c4bd7');
                    if(container.store.getUsedCapacity() > 100){
                        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo(container);
                        }
                    }else if(b != null){
                        if(creep.withdraw(storage,b) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                }else{
                    if(creep_last != RESOURCE_ENERGY){
                        if(creep.transfer(terminal, creep_last) == ERR_NOT_IN_RANGE){
                            creep.moveTo(terminal);
                        }
                    }else{
                        if(creep.transfer(storage, creep_last) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storage);
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleWorker;