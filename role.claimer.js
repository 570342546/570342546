var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say('来喽,嗨害嗨',true);
        if(creep.room.name == 'E18S55'){
            var c = Game.getObjectById('5bbcae039099fc012e6384c8');
            if(creep.signController(c, "大猫在看着你~~") == ERR_NOT_IN_RANGE) {
                creep.moveTo(39,23);
            }
        }else{
            creep.moveTo(new RoomPosition(25,25,'E18S55'));
        }
	}
};

module.exports = roleClaimer;