var roleAttacker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.room.name != 'E18S55'){
            creep.moveTo(new RoomPosition(24,16, 'E18S55'));
        }else{
            var c = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(c && c.owner.username != 'yaddrx2') {
                creep.say('有其他的爬入侵!',true)
                creep.attack(c);
                creep.moveTo(c,{visualizePathStyle: {stroke: '#ff0000'}});
            }else{
                creep.say('打盹中....',true)
                creep.moveTo(24,16,{visualizePathStyle: {stroke: '#0000ff'}});
            }
        }
    }
};

module.exports = roleAttacker;