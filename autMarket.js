module.exports = {
    run:function(){
        var terminal = Game.getObjectById('62864a761549707138cb318f');
        var m = 1;
        var amount = 500;
        if(m == 1){
            if(terminal.store[RESOURCE_ENERGY] > 10000 && terminal.cooldown == 0){
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY && 
                    order.type == ORDER_BUY && order.price >= 4 &&
                        Game.market.calcTransactionCost(amount, 'E17S57', order.roomName) < terminal.store[RESOURCE_ENERGY]);
                if(order && orders.length > 0){
                    var id = orders[0].id;
                    var price = orders[0].price;
                    for(var order of orders){
                        if(id != order.id){
                            if(price < order.price){
                                price = order.price;
                                id = order.id;
                            }
                        }
                    }
                    Game.market.deal(id,amount,"E17S57");
                }
                console.log('E交易成功,订单id:',id,' 单价:',price,'  获得了:',price*amount,'cr');
            }
        }else if(m == 2){
            if(terminal.store[RESOURCE_UTRIUM] > 10000 && terminal.cooldown == 0){
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_UTRIUM && 
                    order.type == ORDER_BUY && order.price >= 0.8 &&
                        Game.market.calcTransactionCost(amount, 'E17S57', order.roomName) < terminal.store[RESOURCE_ENERGY]);
                if(order && orders.length > 0){
                    var id = orders[0].id;
                    var price = orders[0].price;
                    for(var order of orders){
                        if(id != order.id){
                            if(price < order.price){
                                price = order.price;
                                id = order.id;
                            }
                        }
                    }
                    Game.market.deal(id,amount,"E17S57");
                }
                console.log('U交易成功,订单id:',id,' 单价:',price,'  获得了:',price*amount,'cr');
            }
        }else if(m == 3){
            if(terminal.store[RESOURCE_UTRIUM_BAR] > 500 && terminal.cooldown == 0){
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_UTRIUM_BAR && 
                    order.type == ORDER_BUY && order.price >= 0.8 &&
                        Game.market.calcTransactionCost(amount, 'E17S57', order.roomName) < terminal.store[RESOURCE_ENERGY]);
                if(order && orders.length > 0){
                    var id = orders[0].id;
                    var price = orders[0].price;
                    for(var order of orders){
                        if(id != order.id){
                            if(price < order.price){
                                price = order.price;
                                id = order.id;
                            }
                        }
                    }
                    Game.market.deal(id,amount,"E17S57");
                }
                console.log('UBAR交易成功,订单id:',id,' 单价:',price,'  获得了:',price*amount,'cr');
            }
        }else if(m = 4){
            if(terminal.cooldown == 0){
                var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_ENERGY && 
                    order.type == ORDER_SELL && order.price < 2.5 &&
                        Game.market.calcTransactionCost(amount, 'E17S57', order.roomName) < terminal.store[RESOURCE_ENERGY]);
                if(order && orders.length > 0){
                    var id = orders[0].id;
                    var price = orders[0].price;
                    for(var order of orders){
                        if(id != order.id){
                            if(price < order.price){
                                price = order.price;
                                id = order.id;
                            }
                        }
                    }
                    console.log(id,'  ',price);
                    // Game.market.deal(id,amount,"E17S57");
                }
                // console.log('E交易成功,订单id:',id,' 单价:',price,'  获得了:',price*amount,'cr');
            }
        }
        
    }
};