var roleCarryer2 = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(Math.ceil(Math.random()*10) ==10){
            creep.say('这个工作真的挺无聊的。',true);
        }else if(Math.ceil(Math.random()*10) == 9){
            creep.say('我想大猫给我换个工作',true);
        }else if(Math.ceil(Math.random()*10) == 8){
            creep.say('一直在搬来搬去~~',true);
        }
        var s = 400000;
        var usefactory = 1;
        // var itemFrom = RESOURCE_UTRIUM,itemTo = RESOURCE_UTRIUM_BAR;
        var itemFrom = RESOURCE_OXYGEN,itemTo = RESOURCE_OXIDANT;
        var factory = Game.getObjectById('629149d6a48e452e909b0f05');
        if(usefactory == 1){
            if(factory.cooldown == 0 && factory.store[itemFrom] >= 500){
                factory.produce(itemTo);
            }
        }
        var powerspawn = Game.getObjectById('62a5b3bd3fe909309c7cfcd0');
        if(powerspawn.store[RESOURCE_POWER] > 0)powerspawn.processPower();
        const link = Game.getObjectById('628200e93839195f59156e94');
        var factory = Game.getObjectById('629149d6a48e452e909b0f05');
        var storage = creep.room.storage;
        var terminal = creep.room.terminal;
        if(terminal.store[RESOURCE_ENERGY] > 100000){
            terminal.send(RESOURCE_ENERGY,90000,'E17S55')
        }
        // Game.getObjectById('62864a761549707138cb318f').send(RESOURCE_ENERGY,80000,'E17S55')
        var lab = Game.getObjectById('6295e9040a952e492de76cc5');
        var creep_last = null,terminal_last = null,storage_last;
        for(const type in creep.store){
            creep_last = type;
        }
        for(const type in terminal.store) {
            terminal_last = type;
        }
        // for(const type in storage.store) {
        //     storage_last = type;
        // }
        if(powerspawn.store[RESOURCE_GHODIUM] < 5000 && (terminal.store[RESOURCE_GHODIUM] > 0 || storage.store[RESOURCE_GHODIUM] > 0 || creep.store[RESOURCE_GHODIUM] > 0)){
            if(creep.store.getUsedCapacity() == 0){
                creep.withdraw(terminal,RESOURCE_GHODIUM);
            }else if(creep.store[RESOURCE_GHODIUM] > 0){
                creep.transfer(powerspawn,RESOURCE_GHODIUM);
            }else{xs
                creep.transfer(storage,creep_last);
            }
        }else
        // if(factory.store[RESOURCE_ENERGY] > 10000 && usefactory == 1){
        //     if(creep.store.getUsedCapacity() == 0){
        //         creep.withdraw(factory,RESOURCE_ENERGY);
        //     }else{
        //         creep.transfer(storage,RESOURCE_ENERGY);
        //     }
        // }else
        if(storage.store.getUsedCapacity(RESOURCE_ENERGY) > s || (storage.store.getUsedCapacity(RESOURCE_ENERGY) > (s-400) && creep.store[RESOURCE_ENERGY] == 400)){
            creep.moveTo(7,40);
            if(creep.store.getUsedCapacity() == 0){
                if(link.store[RESOURCE_ENERGY] > 300){
                    creep.withdraw(link,RESOURCE_ENERGY);
                }else{
                    creep.withdraw(storage,RESOURCE_ENERGY)
                }
            }else{
                creep.transfer(terminal,creep_last);
            }
        }else
        if(lab.store[RESOURCE_GHODIUM_ACID] < 2000 && storage.store[RESOURCE_GHODIUM_ACID] > 1000 && creep.store.getUsedCapacity(RESOURCE_GHODIUM_ACID) > 0){
            if(creep.store.getUsedCapacity() == 0){
                creep.withdraw(storage,RESOURCE_GHODIUM_ACID);
                creep.moveTo(storage);
            }else if(creep_last == RESOURCE_GHODIUM_ACID){
                creep.transfer(lab,RESOURCE_GHODIUM_ACID);
                creep.moveTo(lab);
            }else{
                creep.transfer(storage,creep_last);
                creep.moveTo(storage);
            }
        }else{
            creep.moveTo(7,40);
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
            }else if(powerspawn.store[RESOURCE_ENERGY] < 5000 && (storage.store[RESOURCE_ENERGY] > 0 || creep.store[RESOURCE_ENERGY] > 0)){
                if(creep.store.getUsedCapacity() == 0){
                    creep.withdraw(storage,RESOURCE_ENERGY);
                }else if(creep.store[RESOURCE_ENERGY] > 0){
                    creep.transfer(powerspawn,RESOURCE_ENERGY);
                }else{
                    creep.transfer(storage,creep_last);
                }
            }else{
                if(terminal.store[RESOURCE_ENERGY] < 50000){
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
                    if(factory.cooldown == 0 && usefactory == 1 && (storage.store[itemFrom] > 0 || terminal.store[itemFrom] > 0 || creep.store[itemFrom] > 0 || creep.store[itemTo] > 0 || factory.store[itemTo])){
                        if(creep.store.getUsedCapacity() == 0){
                            if(storage.store[itemTo] > 0){
                                creep.withdraw(storage,itemTo);
                            }else if(factory.store[itemTo] > 0){
                                creep.withdraw(factory,itemTo);
                            }else if(factory.store[RESOURCE_ENERGY] < 500){
                                creep.withdraw(storage,RESOURCE_ENERGY);
                            }else if(factory.store[itemFrom] < 1000){
                                if(terminal.store[itemFrom] > 0){
                                    creep.withdraw(terminal,itemFrom);
                                }else{
                                    creep.withdraw(storage,itemFrom);
                                }
                            }
                        }else if(creep.store[itemTo] > 0){
                            creep.transfer(terminal,itemTo);                            
                        }else if((creep_last == RESOURCE_ENERGY && factory.store[RESOURCE_ENERGY] < 500) || creep_last != RESOURCE_ENERGY){
                            creep.transfer(factory,creep_last);
                        }else{
                            creep.transfer(storage,creep_last);
                        }
                    }else if(factory.store[RESOURCE_ENERGY] < 5000){
                        if(creep.store.getUsedCapacity() == 0){
                            creep.withdraw(storage,RESOURCE_ENERGY);
                        }else if(creep.store[RESOURCE_ENERGY] > 0){
                            creep.transfer(factory,RESOURCE_ENERGY);
                        }else if(creep_last == itemFrom){
                                creep.transfer(factory,creep_last);
                        }else creep.transfer(storage,creep_last);
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