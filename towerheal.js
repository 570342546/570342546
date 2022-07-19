var towerheal = {
    heal: function(creep){
        console.log(creep,':',creep.pos)
        var tower = creep.room.find(FIND_STRUCTURES, {filter: t => t.structureType == STRUCTURE_TOWER && t.store[RESOURCE_ENERGY] > 0})[0];
        if(tower)tower.heal(creep)   
    }
};

module.exports = towerheal;