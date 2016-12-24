const assert = require('assert');
const Player = require('../backend/player');
const HouseProperty = require('../backend/location/houseProperty');

// tests the Player object
describe('Player', function() {

    const player1 = new Player('Bob', 'go', 1);

    describe("#initialize", function() {
        it("should have all correct parts correctly initialized", function() {
            assert.equal(player1.name, 'Bob');
            assert.equal(player1.money, 3200);
        })
    });

    describe('#moneyTests', function() {
        it("should have added money", function() {
            const hasMoney = player1.deltaMoney(200);
            assert.equal(player1.money, 3400);
            assert.equal(hasMoney, true);
        });

        it("should have removed money", function() {
            const hasMoney = player1.deltaMoney(-2100);
            assert.equal(player1.money, 1300);
            assert.equal(hasMoney, true);
        });

        it("should handle multiple transactions", function() {
            player1.deltaMoney(-1100);
            player1.deltaMoney(500);
            player1.deltaMoney(-600);
            player1.deltaMoney(900);
            player1.deltaMoney(-50);
            player1.deltaMoney(-250);
            const hasMoney = player1.deltaMoney(-100);
            assert.equal(player1.money, 600);
            assert.equal(hasMoney, true);
        });

        it("should go bankrupt when goes below 0", function() {
            const hasMoney1 = player1.deltaMoney(-600);
            assert.equal(player1.money, 0);
            assert.equal(hasMoney1, true);

            const hasMoney2 = player1.deltaMoney(-1);
            assert.equal(player1.money, -1);
            assert.equal(hasMoney2, false);

            const hasMoney3 = player1.deltaMoney(2);
            assert.equal(player1.money, 1);
            assert.equal(hasMoney3, true);

            assert(player1.canAfford(1));
            assert(!player1.canAfford(2));
        });
    });

    describe("#busPassTests", function() {
        it("should add all of the bus passes", function() {
            const expected = {"forward any": 2, "derp 2": 1, "back 3": 1}
            player1.gainBusPass('forward any');
            player1.gainBusPass('derp 2');
            player1.gainBusPass('back 3');
            player1.gainBusPass('forward any');
            assert.deepEqual(player1.busTickets, expected);
        });

        it("should remove all of the bus passes", function() {
            const expected = {}
            player1.useBusPass('forward any');
            player1.useBusPass('derp 2');
            player1.useBusPass('back 3');
            player1.useBusPass('forward any');
            assert.deepEqual(player1.busTickets, expected);
        });

        it("should add and remove the bus passes", function() {
            const expected = {"forward any": 1, "derp 2": 1}
            player1.gainBusPass('forward any');
            player1.gainBusPass('derp 2');
            player1.gainBusPass('back 3');
            player1.gainBusPass('forward any');
            player1.useBusPass('back 3');
            player1.useBusPass('forward any');
            assert.deepEqual(player1.busTickets, expected);
        });

        it("should have all of the tickets expire", function() {
            const expected = {"forward expire": 1}
            player1.gainBusPass('forward any');
            player1.gainBusPass('derp 2');
            player1.gainBusPass('back 3');
            player1.gainBusPass('forward any');
            player1.useBusPass('back 3');
            player1.gainBusPass('forward expire');
            assert.deepEqual(player1.busTickets, expected);
            player1.gainBusPass('something else expire');
            const expected2 = {"something else expire": 1}
            assert.deepEqual(player1.busTickets, expected);
        });
    });

    describe("#specialCardTests", function() {
        it("should add all of the special cards", function() {
            player1.gainSpecialCard('just say no');
            player1.gainSpecialCard('get out of jail free');
            player1.gainSpecialCard('steal');
            player1.gainSpecialCard('just say no');
            assert(player1.specialCards.indexOf('just say no') > -1);
            assert(player1.specialCards.indexOf('steal') > -1);
            assert(player1.specialCards.indexOf('get out of jail free') > -1);
            assert.equal(player1.specialCards.length, 4);
        });

        it("should remove all of the special cards", function() {
            player1.useSpecialCard('just say no');
            player1.useSpecialCard('get out of jail free');
            player1.useSpecialCard('steal');
            player1.useSpecialCard('just say no');
            assert.equal(player1.specialCards.indexOf('just say no'), -1);
            assert.equal(player1.specialCards.indexOf('steal'), -1);
            assert.equal(player1.specialCards.indexOf('get out of jail free'), -1);
            assert.equal(player1.specialCards.length, 0);
        });
    });

    describe("#locationTest", function() {
        it("should move the player to the location with side effects", function() {
            let moveInfo = {"moneyGained": 299, "currentLocation": 'bob', "movedTo": []};
            player1.moveToLocation(moveInfo);
            assert.equal(player1.location, "bob");
            assert.equal(player1.money, 300);

            moveInfo["moneyGained"] = 0
            moveInfo["currentLocation"] = "dude";
            player1.moveToLocation(moveInfo);
            assert.equal(player1.location, "dude");
            assert.equal(player1.money, 300);
            assert.equal(player1.getNetWorth(), 300);
        });
    });

    describe("#propertyTests", function() {
        const p1 = new HouseProperty("boylston st", {"type": "property", "quality": "black", "rent": [30, 160, 470, 1050, 1250, 1500, 2500], "mortgage": 165, "house": 200, "forward": ["newbury st"], "side": [1], "backward": ["bonus"], "track": [0],"below": ["states ave"]});
        const p2 = new HouseProperty("westheimer rd", {"type": "property", "quality": "light yellow", "rent": [11, 55, 160, 475, 650, 800, 1300], "mortgage": 70, "house": 100, "forward": ["internet service provider"], "backward": ["katy freeway"], "side": [1], "track": [2], "above": ["st charles pl"]})
        const p3 = new HouseProperty("peachtree st", {"type": "property", "quality": "sea green", "rent": [20, 100, 300, 750, 925, 1100, 1600], "mortgage": 100, "house": 100, "forward": ["pay day"], "backward": ["decatur st"], "side": [1], "track": [2], "above": ["free parking"]});

        p2.gainHouse();
        p2.gainHouse();
        p3.mortgage();

        it("should gain the properties and associated wealth", function() {
            assert.equal(player1.properties.length, 0);

            player1.gainProperty(p1);
            assert.deepEqual(player1.properties, [p1]);
            assert.equal(player1.getNetWorth(), player1.money + p1.getValue());

            player1.gainProperty(p2);
            assert.deepEqual(player1.properties, [p1, p2]);
            assert.equal(player1.getNetWorth(), player1.money + p1.getValue() + p2.getValue());

            player1.gainProperty(p3);
            assert.deepEqual(player1.properties, [p1, p2, p3]);
            assert.equal(player1.getNetWorth(), player1.money + p1.getValue() + p2.getValue() + p3.getValue());

            // changes propogate?
            p3.unmortgage();
            assert.deepEqual(player1.properties, [p1, p2, p3]);
            assert.equal(player1.getNetWorth(), player1.money + p1.getValue() + p2.getValue() + p3.getValue());

            assert.equal(player1.properties.length, 3);
        });
        
        it("should lose the properties and associated wealth", function() {
            player1.loseProperty(p1);
            assert.deepEqual(player1.properties, [p2, p3]);
            assert.equal(player1.getNetWorth(), player1.money + p2.getValue() + p3.getValue());

            player1.loseProperty(p3);
            assert.deepEqual(player1.properties, [p2]);
            assert.equal(player1.getNetWorth(), player1.money + p2.getValue());

            // hopefully changes in the object propogate
            p2.removeHouse();
            assert.deepEqual(player1.properties, [p2]);
            assert.equal(player1.getNetWorth(), player1.money + p2.getValue());

            player1.loseProperty(p2);
            assert.deepEqual(player1.properties, []);
            assert.equal(player1.getNetWorth(), player1.money);

            assert.equal(player1.properties.length, 0);
        });
    });
})