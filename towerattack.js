var towerattack = {

    attack: function(creep,emery) {
        console.log(emery,':',emery.pos)
        const white_lists = ['smallLEI','yaddrx2','1452311','owwwman'];
        var towers = creep.room.find(FIND_STRUCTURES, {filter: t => t.structureType == STRUCTURE_TOWER && t.store[RESOURCE_ENERGY] > 0});
        for(var tower of towers){
            if(white_lists.indexOf(emery.owner.username) == -1) {
                tower.attack(emery);
            }
        }
    }
};

module.exports = towerattack;