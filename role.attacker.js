var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'W35S13'){
            creep.moveTo(new RoomPosition(45,48, 'W35S13'));
        }else{
            var npc = creep.room.find(FIND_HOSTILE_STRUCTURES,{filter: i => i.owner.username == 'Invader'})[0]
            if(npc){
                creep.attack(npc);
                creep.moveTo(npc);
            }else{
                creep.moveTo(8,10);
            }
        }
    }
};

module.exports = roleAttacker;