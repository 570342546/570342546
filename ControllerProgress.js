/*
 * loop里加个ControllerProgress.run('你的房间坐标');就可以了
 * 
var SourceKeeperCtrl = require('SourceKeeperCtrl')

module.exports.loop = function () {
    SourceKeeperCtrl.run('你的房间坐标');

    //your code

}
 * by 大猫
**/
module.exports = {
    run:function(id){
        var room = Game.rooms[id];
        var controller = room.controller;
        var progress = room.controller.progress;
        var progressTotal = room.controller.progressTotal;
        var b = progress/progressTotal;
        if(controller.pos.y > 25){
            room.visual.rect(controller.pos.x - 3, controller.pos.y+0.8, 6, 0.7,{fill: 'white',opacity:1});
            room.visual.rect(controller.pos.x - 3, controller.pos.y+0.8, 6 * b, 0.7,{fill: 'green',opacity:1});
            room.visual.text((b * 100).toFixed(4) + '%', controller.pos.x, controller.pos.y+2.4,{color: 'green', font: 0.8});
        }else{
            room.visual.rect(controller.pos.x - 3, controller.pos.y-2, 6, 0.7,{fill: 'white',opacity:1});
            room.visual.rect(controller.pos.x - 3, controller.pos.y-2, 6 * b, 0.7,{fill: 'green',opacity:1});
            room.visual.text((b * 100).toFixed(4) + '%', controller.pos.x, controller.pos.y-2.4,{color: 'green', font: 0.8});
        }
    }
};