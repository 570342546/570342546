module.exports = {
    run:function(){
        var terminal = Game.getObjectById('62864a761549707138cb318f');
        var m = 1;
        var amount = 5000;
        var sellresource = RESOURCE_UTRIUM_BAR;
        var sellprice = 10;
        if(m == 1){
            if(terminal.store[sellresource] > amount && terminal.cooldown == 0){
                var orders = Game.market.getAllOrders(order => order.resourceType == sellresource && 
                    order.type == ORDER_BUY && order.price >= sellprice &&
                        Game.market.calcTransactionCost(amount, 'E17S57', order.roomName) < terminal.store[RESOURCE_ENERGY]);
                if(orders && orders.length > 0){
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
                    console.log(sellresource,'交易成功,订单id:',id,' 单价:',price,'  获得了:',price*amount,'cr');
                }
            }else console.log('market冷却:',terminal.cooldown)
        }
        
    }
};