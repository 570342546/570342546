module.exports = {
    run:function(room){
        const roomName = room;
        const terrain = new Room.Terrain(roomName);
        const costs = new PathFinder.CostMatrix;
        const visual = new RoomVisual(roomName);
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                const tile = terrain.get(x, y);
                switch(tile) {
                    case TERRAIN_MASK_WALL:
                        break;
                    case TERRAIN_MASK_SWAMP:
                        costs.set(x, y, 10);
                        break;
                    case 0:
                        costs.set(x, y, 2);
                        break;
                }
            }
        }
        Game.rooms[roomName].find(FIND_STRUCTURES).forEach(function(struct) {
          if (struct.structureType === STRUCTURE_ROAD) {
            // 相对于平原，寻路时将更倾向于道路
            costs.set(struct.pos.x, struct.pos.y, 1);
          } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                     (struct.structureType !== STRUCTURE_RAMPART ||
                      !struct.my)) {
            // 不能穿过无法行走的建筑
            costs.set(struct.pos.x, struct.pos.y, 255);
          }
        });
        for(let y = 0; y < 50; y++) {
            for(let x = 0; x < 50; x++) {
                visual.text(costs.get(x,y), x, y);
            }
        }
    }
};