var roleCarryer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_MY_SPAWNS)[0];
        var link = Game.getObjectById('628ebbd06e20b609d710ee9d');
        var link1 = Game.getObjectById('628210db54709fe26085c810');
        var link2 = Game.getObjectById('628f95ec8a8501678366b1bb');
        if(creep.store[RESOURCE_ENERGY] == 0){
            if(creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(link);
            };
        }else{
            creep.moveTo(link1);
            if(link1.store[RESOURCE_ENERGY] < 800 && link1.cooldown == 0 || link2.store[RESOURCE_ENERGY] == 800){
                creep.transfer(link1, RESOURCE_ENERGY);
            }else{
                creep.transfer(link2, RESOURCE_ENERGY);
            }
        }
    }
};

module.exports = roleCarryer;