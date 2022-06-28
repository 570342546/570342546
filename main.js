var roleHarvester = require('role.harvester')
var roleHarvesterU = require('role.harvesterU')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleRepairer = require('role.repairer')
var roleWorker = require('role.worker')
var roleCarryer = require('role.carryer')
var roleCarryer2 = require('role.carryer2')
var roleAttacker = require('role.attacker')
var roleClaimer = require('role.claimer')
var roleHelper = require('role.helper')
var roleHelper2 = require('role.helper2')
var labCtrl = require('labCtrl')
var ControllerProgress = require('ControllerProgress')
var Draw = require('draw');
var autMarket = require('autMarket');
var SourceKeeperCtrl = require('SourceKeeperCtrl');
var powercreep_大猫 = require('powercreep_大猫');

const white_lists = ['smallLEI','yaddrx2','1452411'];
module.exports.loop = function () {
    // let center = Game.flags.center; // 房间中心的位置
    // let pa = Game.flags.pa;
    // let pb = Game.flags.pb;
    // let pc = Game.flags.pc;
    // let pm = Game.flags.pm;
    // if(center) {
    //     let points = [pc.pos,pm.pos,pa.pos]
    //     if(pb)points.push(pb.pos)
    //     require('./建筑规划v1.1').run(center.pos,points)
    // }
    // var t = new Date();
    // var h = t.getHours() + 8;
    // var m = t.getMinutes();
    // var s = t.getSeconds();
    // var say ='时间:'+h+':'+m+':'+s;
    // Draw.run();
    var Home = Game.spawns['大猫的家'];
    if(Home.spawning != null){
        Home = Game.spawns['猫爬架'];
    }
    var home2 = Game.spawns['第二个猫爬架'];
    if(home2.spawning != null){
        home2 = Game.spawns['creep.store[RESOURCE_ENERGY] == 0'];
    }
    var home3 = Game.spawns['大猫的第三个家'];
    var home4 = Game.spawns['大猫的第四个家'];
    var home5 = Game.spawns['大猫的第五个家'];
    // labCtrl.run('E17S57',RESOURCE_UTRIUM_OXIDE,50)
    ControllerProgress.run('E17S55');
    SourceKeeperCtrl.run();     
    
    
    var cpu = Game.cpu.bucket;
    console.log('所有的CPU_BUCKET:',cpu);
    if(cpu == 10000) {
        Game.cpu.generatePixel();
    }
    
    var harvesters_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '运输爬5');
    var repairers_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '维护爬5');
    var upgraders_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '升级爬5');
    var builders_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '建造爬5');
    var workers_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '拆解爬5');
    var harvesterUs_room5 = _.filter(Game.creeps, (creep) => creep.memory.role == '采矿5');
    
    var harvesters_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '运输爬4');
    var repairers_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '维护爬4');
    var upgraders_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '升级爬4');
    var builders_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '建造爬4');
    var workers_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '拆解爬4');
    var harvesterUs_room4 = _.filter(Game.creeps, (creep) => creep.memory.role == '采矿4');
    
    var harvesters_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '运输爬3');
    var repairers_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '维护爬3');
    var upgraders_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '升级爬3');
    var builders_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '建造爬3');
    var workers_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '拆解爬3');
    var harvesterUs_room3 = _.filter(Game.creeps, (creep) => creep.memory.role == '采矿3');
    
    var harvesters_room2 = _.filter(Game.creeps, (creep) => creep.memory.role == '运输爬2');
    var repairers_room2 = _.filter(Game.creeps, (creep) => creep.memory.role == '维护爬2');
    var upgraders_room2 = _.filter(Game.creeps, (creep) => creep.memory.role == '升级爬2');
    var builders_room2 = _.filter(Game.creeps, (creep) => creep.memory.role == '建造爬2');
    var harvesterUs_room2 = _.filter(Game.creeps, (creep) => creep.memory.role == '采矿2');
    var workers = _.filter(Game.creeps, (creep) => creep.memory.role == '拆解爬');
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == '建造爬');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == '升级爬');
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == '运输爬');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == '维护爬');
    var carryers = _.filter(Game.creeps, (creep) => creep.memory.role == '搬运爬');
    var harvesterUs = _.filter(Game.creeps, (creep) => creep.memory.role == '采矿1');
    var carryer = _.filter(Game.creeps, (creep) => creep.memory.role == 'carryer');
    
    var bigcat = Game.powerCreeps['大猫'];
    powercreep_大猫.run(bigcat);
    
    var e = Home.room.energyAvailable;
    var e1 = home2.room.energyAvailable;
    var e2 = home3.room.energyAvailable;
    var e3 = home4.room.energyAvailable;
    var e4 = home5.room.energyAvailable;
    var em = Home.room.energyCapacityAvailable;
    var em1 = home2.room.energyCapacityAvailable;
    var em2 = home3.room.energyCapacityAvailable;
    var em3 = home4.room.energyCapacityAvailable;
    var em4 = home5.room.energyCapacityAvailable;
    
    var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == '近战爬');
    if(attackers.length < 0){
        var newName = '近战爬'+Game.time;
        home3.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '近战爬'}});
    }
    
    var helpers = _.filter(Game.creeps, (creep) => creep.memory.role == '援建爬');
    if(helpers.length < 1){
        var newName = '援建爬'+Game.time;
        home2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE], newName,  {memory: {role: '援建爬'}});

        Game.flags['Flag9'].setPosition(new RoomPosition(22,29, 'E16S56') )
        
    }
    var helper2s = _.filter(Game.creeps, (creep) => creep.memory.role == '援建爬2');
    if(helper2s.length < 1){
        var newName = '援建爬2'+Game.time;
        // home2.spawnCreep([ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,CARRY,MOVE], newName,  {memory: {role: '援建爬2'}});
        home2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,ATTACK,HEAL,MOVE,MOVE,MOVE,MOVE,MOVE], newName,  {memory: {role: '援建爬2'}});

        Game.flags['Flag10'].setPosition(new RoomPosition(22,29, 'E16S56') )
        
    }
        
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == '占领爬');
    if(claimers.length < 0){
        var newName = '占领爬'+Game.time;
        home3.spawnCreep([MOVE], newName, {memory: {role: '占领爬'}});
    }
    var tower1 = Game.getObjectById('627f8e65b24f567c101e4f8b');
    var tower2 = Game.getObjectById('629100d552f8d3ed62be1705');
    var tower5 = Game.getObjectById('6291542c3da250f663585e95');
    
    var tower3 = Game.getObjectById('629a2d64cfb9d50a5432f95d');
    var tower4 = Game.getObjectById('628ee6458d0e5ca59ccc9fcc');
    
    var tower6 = Game.getObjectById('629b22ce66494e26804a0c3a');
    var tower7 = Game.getObjectById('629f8bb8fd992a5eb8cf4afb');
    
    var tower8 = Game.getObjectById('62a694c779055835011d2c15');
    var tower9 = Game.getObjectById('62abf8f1fd992a0dced2ae8c');
    if(tower1) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower1.attack(closestHostile);
        }
    }
    if(tower2) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower2.attack(closestHostile);
        }
    }
    if(tower3) {
        var closestHostile = tower3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower3.attack(closestHostile);
        }
        var healcreep = tower3.pos.findClosestByRange(FIND_MY_CREEPS,{filter: s => s.hits < s.hitsMax});
        if(healcreep){
            tower3.heal(healcreep);
        }
        // else{
        //     var closestDamagedStructure = Game.getObjectById('629764c42ba9c6ed5cec71b2');
        //     if(closestDamagedStructure && tower3.store[RESOURCE_ENERGY] > 500) {
        //         tower3.repair(closestDamagedStructure);
        //     }
        // }
        
    }
    if(tower4) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower4.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower4.attack(closestHostile);
        }
    }
    if(tower5) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower5.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower5.attack(closestHostile);
        }
    }
    if(tower6) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower6.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower6.attack(closestHostile);
        }
    }
    if(tower7) {
        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower7.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower7.attack(closestHostile);
        }
        var healcreep = tower7.pos.findClosestByRange(FIND_MY_CREEPS,{filter: s => s.hits < s.hitsMax});
        if(healcreep){
            tower7.heal(healcreep);
        }
    }
    if(tower8) {        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower8.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower8.attack(closestHostile);
        }else{
            var healcreep = tower8.pos.findClosestByRange(FIND_MY_CREEPS,{filter: s => s.hits < s.hitsMax});
            if(healcreep){
                tower8.heal(healcreep);
            }
        }
    }
    if(tower9) {        // var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure) => structure.hits < structure.hitsMax
        // });
        // if(closestDamagedStructure) {
        //     tower.repair(closestDamagedStructure);
        // }
        var closestHostile = tower9.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && white_lists.indexOf(closestHostile.owner.username) == -1) {
            tower9.attack(closestHostile);
        }
    }

    var f = 0;
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {                
            delete Memory.creeps[name];
            console.log('刚刚(', name,')死了');
            f = 1;
        }
    }

    
    
    let link1 = Game.getObjectById('628200e93839195f59156e94');
    let link2 = Game.getObjectById('629aec650f65040f21a54237');
    if(link1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && link1.cooldown == 0){
        link1.transferEnergy(link2);
    }
    link1 = Game.getObjectById('629384bd99b65d0e687533a6');
    link2 = Game.getObjectById('62ab22a64d1dab2608d90acc');
    if(link2.store[RESOURCE_ENERGY] < 500){
        link1.transferEnergy(link2);
    }else{
        link2 = Game.getObjectById('628e59edd7adcc470d945f20');
        link1.transferEnergy(link2);
    }
    // link1 =Game.getObjectById('628e59edd7adcc470d945f20');
    // if(link1.store.getFreeCapacity(RESOURCE_ENERGY) <= 50 && link1.cooldown == 0){
    //     link2 = Game.getObjectById('62ab22a64d1dab2608d90acc');
    //     link1.transferEnergy(link2);
    // }
    link1 =Game.getObjectById('629f7005464c7951b63a7087');
    if(link1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && link1.cooldown == 0){
        link2 = Game.getObjectById('629f8f5a13ee0bb5a5c6dff6');
        link1.transferEnergy(link2);
    }
    link1 =Game.getObjectById('62a6e43d820dd3a939f24306');
    if(link1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && link1.cooldown == 0){
        link2 = Game.getObjectById('628200e93839195f59156e94');
        link1.transferEnergy(link2);
    }
    link1 =Game.getObjectById('62a404305ae7b056e95b8d52');
    if(link1.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && link1.cooldown == 0){
        link2 = Game.getObjectById('629f8f5a13ee0bb5a5c6dff6');
        link1.transferEnergy(link2);
    }

    if(harvesters_room5.length < 2) {
        console.log('第5房需要运输爬');
        var newName = '运输爬' + Game.time;
        // if(e3 < 600){
        home5.spawnCreep([CARRY,CARRY,CARRY,MOVE,WORK,WORK,MOVE,MOVE], newName, {memory: {role: '运输爬5'}});
        // }else home4.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '运输爬5'}});
    }else if(harvesterUs_room5.length < 0 && Game.getObjectById('5bbcb1c040062e4259e932c1').mineralAmount > 0){
        var newName = '采矿'+Game.time;
        home5.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: '采矿5'}});
    }else if(builders_room5.length < 1){
        console.log('第5个房需要建造爬');
        var newName = '建造爬' + Game.time;
        home5.spawnCreep([CARRY,CARRY,WORK,WORK,MOVE,MOVE], newName, {memory: {role: '建造爬5'}});
    }else if(repairers_room5.length < 1) {
        console.log('第5个房需要维护爬');
        var newName = '维护爬' + Game.time;
        home5.spawnCreep([CARRY,WORK,MOVE], newName, {memory: {role: '维护爬5'}});
    }else if(upgraders_room5.length < 3) {
        console.log('第5个房需要升级爬');
        var newName = '升级爬' + Game.time;
        home5.spawnCreep([CARRY,CARRY,CARRY,MOVE,WORK,WORK,MOVE,MOVE], newName, {memory: {role: '升级爬5'}});
    }else if(workers_room5.length < 0){
        var newName = '工作爬'+Game.time;
        home5.spawnCreep([CARRY,MOVE], newName, {memory: {role: '拆解爬5'}});
    }
    

    if(harvesters_room4.length < 1) {
        console.log('第4房需要运输爬');
        var newName = '运输爬' + Game.time;
        if(e3 < 600){
            home4.spawnCreep([CARRY,MOVE], newName, {memory: {role: '运输爬4'}});
        }else home4.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '运输爬4'}});
    }else if(harvesterUs_room4.length < 1 && Game.getObjectById('5bbcb36f40062e4259e943c5').mineralAmount > 0){
        var newName = '采矿'+Game.time;
        home4.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: '采矿4'}});
    }else if(builders_room4.length < 0){
        console.log('第4个房需要建造爬');
        var newName = '建造爬' + Game.time;
        home4.spawnCreep([CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: '建造爬4'}});
    }else if(repairers_room4.length < 1) {
        console.log('第4个房需要维护爬');
        var newName = '维护爬' + Game.time;
        home4.spawnCreep([CARRY,CARRY,WORK,WORK,MOVE,MOVE], newName, {memory: {role: '维护爬4'}});
    }else if(upgraders_room4.length < 1) {
        console.log('第4个房需要升级爬');
        var newName = '升级爬' + Game.time;
        home4.spawnCreep([CARRY,WORK,MOVE], newName, {memory: {role: '升级爬4'}});
    }else if(workers_room4.length < 1){
        var newName = '工作爬'+Game.time;
        home4.spawnCreep([CARRY,CARRY,MOVE], newName, {memory: {role: '拆解爬4'}});
    }
    
    if(harvesters_room3.length < 1) {
        console.log('第三房需要运输爬');
        var newName = '运输爬' + Game.time;
        if(e2 < 600){
            home3.spawnCreep([CARRY,CARRY,MOVE], newName, {memory: {role: '运输爬3'}});
        }else home3.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '运输爬3'}});
    }else if(harvesterUs_room3.length < 1 && Game.getObjectById('5bbcb36f40062e4259e943c6').mineralAmount > 0){
        var newName = '采矿'+Game.time;
        home3.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '采矿3'}});
    }else if(builders_room3.length < 4){
        console.log('第三个房需要建造爬');
        var newName = '建造爬' + Game.time;
        home3.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE], newName, {memory: {role: '建造爬3'}});
    }else if(repairers_room3.length < 1) {
        console.log('第三个房需要维护爬');
        var newName = '维护爬' + Game.time;
        home3.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '维护爬3'}});
    }else if(upgraders_room3.length < 0) {
        console.log('第三个房需要升级爬');
        var newName = '升级爬' + Game.time;
        home3.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '升级爬3'}});
    }else if(workers_room3.length < 1){
        var newName = '工作爬'+Game.time;
        home3.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, {memory: {role: '拆解爬3'}});
    }
    
    
    if(harvesters_room2.length < 1) {
        console.log('第二个房需要运输爬');
        var newName = '运输爬' + Game.time;
        if(e1 >= 450){
            home2.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: '运输爬2'}});
        }else{
            home2.spawnCreep([CARRY,CARRY,MOVE], newName, {memory: {role: '运输爬2'}});
        }
    }else if(harvesterUs_room2.length < 1 && Game.getObjectById('5bbcb36f40062e4259e943c7').mineralAmount > 0){
        var newName = '采矿'+Game.time;
        home2.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '采矿2'}});
    }else if(workers.length < 1){
        var newName = '工作爬'+Game.time;
        home2.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, {memory: {role: '拆解爬'}});
    }else if(builders_room2.length < 1){
        console.log('第二个房需要建造爬');
        var newName = '建造爬' + Game.time;
        home2.spawnCreep([CARRY,WORK,MOVE], newName, {memory: {role: '建造爬2'}});
    }else if(repairers_room2.length < 1) {
        console.log('第二个房需要维护爬');
        var newName = '维护爬' + Game.time;
        home2.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '维护爬2'}});
    }else if(upgraders_room2.length < 0) {
        console.log('第二个房需要升级爬');
        var newName = '升级爬' + Game.time;
        home2.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '升级爬2'}});
        // home2.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '升级爬2'}});
    }
    
    
    if(harvesters.length < 1) {
        var newName = '运输爬'+Game.time;
        if(e >= 600){
            console.log('需要运输爬:450');
            Home.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '运输爬'}});
        }else{
            console.log('需要运输爬:150');
            Home.spawnCreep([CARRY,CARRY,MOVE], newName, {memory: {role: '运输爬'}});
        }
    }else {
        if(harvesterUs.length < 1 && Game.getObjectById('5bbcb36f40062e4259e943c8').mineralAmount > 0){
                var newName = '采矿'+Game.time;
                console.log('需要采矿爬:1550');
                Home.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '采矿1'}});
        }else
        if(builders.length < 0) {
            var newName = '建造爬'+Game.time;
            Home.spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '建造爬'}});
        }else if(repairers.length < 1){
            var newName = '维护爬'+Game.time;
            Home.spawnCreep([CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: '维护爬'}});
            // Home.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE], newName, {memory: {role: '维护爬'}});
        }else if(carryer.length < 1){
            var newName = 'carryer'+Game.time;
            Game.spawns['猫爬架'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: 'carryer'}});
        }else if(upgraders.length < 1 && Game.rooms['E17S57'].controller.ticksToDowngrade < 10000) {
            var newName = '升级爬'+Game.time;
            console.log('需要升级爬:200');
            Home.spawnCreep([WORK,CARRY,MOVE], newName,  {memory: {role: '升级爬'}});
        }else if(workers.length < 0){
            var newName = '拆解爬'+Game.time;
            console.log('需要拆解爬:700');
            Home.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], newName, {memory: {role: '拆解爬'}});
        }else if(carryers.length < 0){
            var newName = '搬运爬'+Game.time;
            console.log('需要搬运爬:450');
            Home.spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: '搬运爬'}});
        }else {
            console.log('所需爬已满');
        }
    }
    // if(Home.spawning) { 
    //     var spawningCreep = Game.creeps[Home.spawning.name];
    //     Home.room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Home.pos.x + 1, 
    //         Home.pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }
        
    var countcreep = 0,h = 0,u = 0, b = 0,r = 0,d = 0,a=0,c = 0,cpucount = 0;
    for(var name in Game.creeps) {
        // const startCpu = Game.cpu.getUsed();
        var creep = Game.creeps[name];
        if(f == 1){
            creep.say('又一个兄弟没了呜呜~',true);
            f = 0;
        }
        if(creep.ticksToLive <= 150){
            creep.memory.live = false;
        }
        if(creep.ticksToLive >= 1450){
            creep.memory.live = true;
        }
        if(creep.memory.role != null){
            var spawns = creep.room.find(FIND_MY_SPAWNS);
            if(!creep.memory.live && spawns.length > 0 && creep.memory.role != '援建爬' && creep.memory.role != '援建爬2' && creep.room.name != 'W33S14'){
                creep.say('信春哥，得永生！！！',true);
                var spawn = spawns[0];
                if(spawn.renewCreep(creep) == ERR_BUSY && spawns.length > 1){
                    spawn = spawns[1];
                }
                if(creep.pos.getRangeTo(spawn) != 1){
                    creep.moveTo(spawn);
                }else spawn.renewCreep(creep);
            }else{
                if(creep.memory.role == '采矿1' || creep.memory.role == '采矿2' || creep.memory.role == '采矿3' || creep.memory.role == '采矿4'){
                    roleHarvesterU.run(creep);
                    h++;
                }else if(creep.memory.role == '运输爬' || creep.memory.role == '运输爬2' || creep.memory.role == '运输爬3' || creep.memory.role == '运输爬4' || creep.memory.role == '运输爬5') {
                    roleHarvester.run(creep);
                    h++;
                }else if(creep.memory.role == '升级爬' || creep.memory.role == '升级爬2' || creep.memory.role == '升级爬3' || creep.memory.role == '升级爬4' || creep.memory.role == '升级爬5') {
                    roleUpgrader.run(creep);
                    u++;
                }else if(creep.memory.role == '建造爬' || creep.memory.role == '建造爬2' || creep.memory.role == '建造爬3' || creep.memory.role == '建造爬4' || creep.memory.role == '建造爬5') {
                    roleBuilder.run(creep);
                    b++;
                }else if(creep.memory.role == '维护爬' || creep.memory.role == '维护爬2' || creep.memory.role == '维护爬3' || creep.memory.role == '维护爬4' || creep.memory.role == '维护爬5') {
                    roleRepairer.run(creep);
                    r++;
                }else if(creep.memory.role =='拆解爬' || creep.memory.role == '拆解爬3' || creep.memory.role == '拆解爬4'){
                    roleWorker.run(creep);
                    d++;
                }else if(creep.memory.role =='搬运爬'){
                    roleCarryer.run(creep);
                    d++;
                }else if(creep.memory.role =='carryer'){
                    roleCarryer2.run(creep);
                    d++;
                }else if(creep.memory.role =='近战爬'){
                    roleAttacker.run(creep);
                    a++;
                }else if(creep.memory.role =='占领爬'){
                    roleClaimer.run(creep);
                    c++;
                }else if(creep.memory.role =='援建爬'){
                    roleHelper.run(creep);
                    c++;
                }else if(creep.memory.role =='援建爬2'){
                    roleHelper2.run(creep);
                    c++;
                }
            }
        }
        countcreep++;
            
        // const elapsed = Game.cpu.getUsed() - startCpu;
        // cpucount = cpucount + elapsed;
        // console.log('('+name+')用了'+elapsed+' CPU time');
    }
    console.log('主房间当前能量:',e,'/',em,'   分房间1当前能量:',e1,'/',em1,'   分房间2当前能量:',e2,'/',em2,'   分房间3当前能量:',e3,'/',em3,'   分房间4当前能量:',e4,'/',em4,'   爬总数:',countcreep);
    console.log('a:',a,'  c:',c,'  h:',h,'  u:',u,'  b:',b,'  r:',r,'  d:',d,'  other:',countcreep-a-c-h-u-b-r-d-4);
    console.log();
    // autMarket.run();
}