const assert = require('assert');
const Player = require('../backend/player');
const BoardManager = require('../backend/boardManager');
const Card = require('../backend/card');
const Game = require('../backend/game');
const board = require('../backend/config/large_board');

// tests the Game object
describe('Game', function() {
    describe("#initialize", function() {
        // TODO actually test initial state

        it('reloads from JSON correctly', function() {
            const playerList = ["Bob", "Jerry", "Guy"];
            const game1 = new Game({"players": playerList});
            const json = game1.toJSON();
            const game2 = new Game(json, false);

            assert.deepEqual(game2.toJSON(), game1.toJSON());

        });
    });

    // TODO more tests
});

// tests the BoardManager object
describe('BoardManager', function(){

    const board1 = new BoardManager(board)

    describe("#initialize", function(){

        it("initializes buildings", function(){
            assert.equal(board1.houses, 81);
            assert.equal(board1.hotels, 31);
            assert.equal(board1.skyscrapers, 16);
        });
    });

    describe("#movements", function(){

        const player1 = new Player("Bob", "go", 1);
        const player2 = new Player("Jerry", "go", 1);
        const player3 = new Player("Ted", "go", 1);

        it("moves to the correct location after rolling", function() {
            // TODO update tests for new spec
            // move to reading rr
            const action1 = board1.moveLocation(player3, 5)['actions'][0];
            assert.equal(action1, 'buy');
            assert.equal(player3.location, 'reading railroad');
            assert.equal(player3.track, 1);
            assert.equal(player3.team.money, 3200);

            // move to pennsylvania rr
            board1.moveLocation(player3, 1);
            const action2 = board1.moveLocation(player3, 9)['actions'][0];
            assert.equal(action1, 'buy');
            assert.equal(player3.location, 'pennsylvania railroad');
            assert.equal(player3.track, 1);
            assert.equal(player3.team.money, 3200);

            // move to lombard st
            board1.moveLocation(player3, 2);
            board1.moveLocation(player3, 11)
            const action3 = board1.moveLocation(player3, 1)['actions'][0];
            assert.equal(action3, 'buy');
            assert.equal(player3.location, 'lombard st');
            assert.equal(player3.track, 0);
            assert.equal(player3.team.money, 3200);

            // move to bonus and get paid
            const action4 = board1.moveLocation(player3, 7)['actions'][0];
            assert.equal(action4, null);
            assert.equal(player3.location, 'bonus');
            assert.equal(player3.track, 0);
            assert.equal(player3.team.money, 3500);

            // move to stock exchange
            board1.moveLocation(player3, 3);
            const action5 = board1.moveLocation(player3, 3)['actions'][0];
            assert.equal(action5, 'stock');
            assert.equal(player3.location, 'stock exchange');
            assert.equal(player3.track, 0);
            assert.equal(player3.team.money, 3500);

            // go through a tunnel
            const movedTo = board1.moveLocation(player3, 6)['movedTo'];
            const expectedMovedTo = ['wall st', 'tax refund', 'gas company', 'fortune inner ne', 'florida ave', 'holland tunnel ne', 'holland tunnel sw'];
            assert.equal(player3.location, 'holland tunnel sw');
            assert.equal(player3.track, 2);
            assert.equal(player3.team.money, 3500);
            assert.deepEqual(movedTo, expectedMovedTo);

            // auction space
            const action6 = board1.moveLocation(player3, 1)['actions'][0];
            assert.equal(action6, 'choose auction'); // TODO test highest rent when all properties are owned

            // fortune space
            const action7 = board1.moveLocation(player3, 6)['actions'][0];
            assert.equal(action7, 'draw fortune');

            // pass pay day even
            const playerCheck = board1.moveLocation(player3, 8)['player'];
            const expectedPlayerCheck = {'name': 'Ted', 'money': 3900};
            assert.deepEqual(playerCheck, expectedPlayerCheck);

            // move backwards & test pay day odd & misfortune
            player3.switchDirection();
            const action8 = board1.moveLocation(player3, 5)['actions'][0];
            assert.equal(action8, 'draw misfortune');
            assert.equal(player3.team.money, 4200);
        });

        it('jumps the player to the specified location', function() {
            const json = board1.jumpToLocation(player3, 'bonus');
            assert.deepEqual(json.movedTo, ['bonus']);
            assert.equal(json.actions.length, 0);
            const expectedPlayer = {'name': 'Ted', 'money': 4500};
            assert.deepEqual(json.player, expectedPlayer);
            assert.equal(player3.location, 'bonus');
        });
        
        it('advances to the specified location', function() {
            // handles switching tracks too
            player3.switchDirection();
            const json = board1.advanceToLocation(player3, 'tennessee ave');
            assert.deepEqual(json.movedTo, ['boylston st', 'newbury st', 'pennsylvania railroad', 'st james pl', 'misfortune middle west', 'tennessee ave']);
            assert.equal(json.actions[0], 'buy');
            const expectedPlayer = {'name': 'Ted', 'money': 4500};
            assert.deepEqual(json.player, expectedPlayer);
            assert.equal(player3.location, 'tennessee ave');
        });
        
        it('buys properties normally', function() {
            let bought = board1.buyProperty(player2, 'biscayne ave');
            let expected = {"player": {"name": "Jerry", "money": 3050}, "location": "biscayne ave", "price": 150};
            assert.deepEqual(bought, expected);

            bought = board1.buyProperty(player3, 'biscayne ave');
            assert.deepEqual(bought, {}); // should be empty since nothing happened

            bought = board1.buyProperty(player2, 'miami ave');
            expected = {"player": {"name": "Jerry", "money": 2920}, "location": "miami ave", "price": 130};
            assert.deepEqual(bought, expected);
        });

        it('buys properties with special auction prices', function() {
            bought = board1.buyProperty(player2, 'boardwalk', 0);
            expected = {"player": {"name": "Jerry", "money": 2920}, "location": "boardwalk", "price": 0};
            assert.deepEqual(bought, expected);

            bought = board1.buyProperty(player2, 'park pl', 900);
            expected = {"player": {"name": "Jerry", "money": 2020}, "location": "park pl", "price": 900};
            assert.deepEqual(bought, expected);
        });

        it('finds the next location for Mr. Monopoly', function() {
            board1.jumpToLocation(player2, 'fortune middle east');
            let json = board1.nextMrMonopolyLocation(player2);
            let expected = {"player": {"name": "Jerry", "money": 2220}, 'movedTo': ['park pl', 'luxury tax', 'boardwalk', 'go', 'mediterranean ave'], 'actions': ['buy']};
            assert.deepEqual(json, expected);

            json = board1.nextMrMonopolyLocation(player2);
            expected = {"player": {"name": "Jerry", "money": 2200}, 'movedTo': ['misfortune middle south', 'baltic ave'], 'actions': ['buy']};

            // TODO decide how to handle edge cases (like current track filled/switching tracks)
        });

        it('sets houses on properties', function() {
            // after properties bought
            let toUpdate = {"biscayne ave": 3, 'miami ave': 2, 'park pl': 4, 'boardwalk': 5};
            let json = board1.setHousesForProperties(player2, toUpdate);
            let expected = {'properties': {"biscayne ave": 3, 'miami ave': 2, 'park pl': 4, 'boardwalk': 5, 'florida ave': 0}, 'delta': {"biscayne ave": 3, 'miami ave': 2, 'park pl': 4, 'boardwalk': 5, 'florida ave': 0}, "player": {"name": "Jerry", "money": 170}};
            assert.deepEqual(json, expected);
            assert.equal(board1.houses, 81-9);
            assert.equal(board1.hotels, 30);
            assert.equal(board1.skyscrapers, 16);

            // now try with properties doesn't have
            toUpdate = {"biscayne ave": 0, 'miami ave': 0, 'park pl': 4, 'boardwalk': 5};
            json = board1.setHousesForProperties(player3, toUpdate);
            expected = {'properties': {"biscayne ave": 3, 'miami ave': 2, 'park pl': 4, 'boardwalk': 5}, 'delta': {"biscayne ave": 0, 'miami ave': 0, 'park pl': 0, 'boardwalk': 0}, "player": {"name": "Ted", "money": 4500}};
            assert.deepEqual(json, expected);

            // now with the actual owner, sell houses
            json = board1.setHousesForProperties(player2, toUpdate);
            expected = {'properties': {"biscayne ave": 0, 'miami ave': 0, 'park pl': 4, 'boardwalk': 5, 'florida ave': 0}, 'delta': {"biscayne ave": -3, 'miami ave': -2, 'park pl': 0, 'boardwalk': 0, 'florida ave': 0}, "player": {"name": "Jerry", "money": 295}};
            assert.deepEqual(json, expected);

            // unbalanced amount should be balanced
            toUpdate = {"boardwalk": 0, "park pl": 0};
            board1.setHousesForProperties(player2, toUpdate);
            toUpdate = {"boardwalk": 6, "park pl": 0};
            json = board1.setHousesForProperties(player2, toUpdate);
            expectedDelta = {"boardwalk": 3, "park pl": 3}
            assert.deepEqual(json.delta, expectedDelta);
        });

        it('handles mortgaging/unmortgaging', function() {
            // owns
            let expected = {"player": {"name": "Jerry", "money": 70}, 'location': 'biscayne ave', 'gain': 75};
            assert.deepEqual(board1.mortgageProperty(player2, 'biscayne ave'), expected);
            expected = {"player": {"name": "Jerry", "money": 135}, 'location': 'miami ave', 'gain': 65};
            assert.deepEqual(board1.mortgageProperty(player2, 'miami ave'), expected);

            // already mortgaged should fail
            assert.deepEqual(board1.mortgageProperty(player2, 'biscayne ave'), {});
            assert.deepEqual(board1.mortgageProperty(player2, 'miami ave'), {});

            // unmortgage
            expected = {"player": {"name": "Jerry", "money": 60}, 'location': 'miami ave', 'lose': 75};
            assert.deepEqual(board1.unmortgageProperty(player2, 'miami ave'), expected);

            // doesn't own
            assert.deepEqual(board1.mortgageProperty(player3, 'miami ave'), {});
        });

        it('handles property transfer', function() {
            let properties = ['park pl', 'biscayne ave', 'miami ave', 'boardwalk'];
            let json = board1.transferProperties(player2, player3, properties);
            let expected = {'player1': 0, 'player2': {'park pl': 3, 'biscayne ave': 0, 'miami ave': 0, 'boardwalk': 3}};
            assert.deepEqual(json, expected)

            // add houses and see how it loses money
            board1.unmortgageProperty(player3, 'biscayne ave')
            board1.setHousesForProperties(player3, {'biscayne ave': 2}); // should balance to 2 houses
            expected = {'player1': 100, 'player2': {'biscayne ave': 0}}
            assert.deepEqual(board1.transferProperties(player3, player2, ['biscayne ave']), expected);

            // transfer again, but can't
            assert.deepEqual(board1.transferProperties(player3, player2, ['biscayne ave']), {'player1': 0, 'player2': {}});
        });

        it('gets the cost of rent', function() {
            // more setup
            board1.transferProperties(player2, player3, ['biscayne ave'])
            board1.setHousesForProperties(player3, {'biscayne ave': 1});
            board1.mortgageProperty(player3, 'miami ave');
            board1.buyProperty(player2, 'water works', 0);
            board1.buyProperty(player2, 'cable company', 0);
            board1.buyProperty(player2, 'electric company', 0);
            board1.buyProperty(player2, 'gas company', 0);
            board1.buyProperty(player2, 'reading railroad', 0);
            board1.buyProperty(player2, 'short line', 0);

            // actual tests
            assert.equal(board1.getRent(player1, 'biscayne ave'), 55);
            assert.equal(board1.getRent(player3, 'miami ave'), 0);
            assert.equal(board1.getRent(player1, 'park pl'), 1100);
            assert.equal(board1.getRent(player1, 'boardwalk'), 1400);
            assert.equal(board1.getRent(player3, 'boardwalk'), 0);

            player1.setLastRoll(11);
            assert.equal(board1.getRent(player3, 'water works'), 0);
            assert.equal(board1.getRent(player1, 'water works'), 440);
            assert.equal(board1.getRent(player1, 'short line'), 50);
            assert.equal(board1.getRent(player1, 'mulholland dr'), null);

            assert.equal(board1.getHighestRent(), 'boardwalk');
        });

        it('lets you know if you can buy properties', function() {
            assert(board1.canBuy('trash collector'));
            assert(!board1.canBuy('water works'));
            assert(!board1.canBuy('go'));
        });

        it('gets all properties in the forward direction', function() {
            board1.jumpToLocation(player2, 'checker cab co');
            let expected = ['reading railroad', 'esplanade ave', 'canal st', 'fortune outer south', 'cable company', 'magazine st', 'bourbon st', 'holland tunnel sw', 'jail', 'connecticut ave', 'vermont ave', 'fortune middle south', 'oriental ave', 'telephone company', 'misfortune inner sw', 'beacon st', 'bonus'];
            let actual = board1.locationsInForwardDirection(player2);
            expected.sort();
            actual.sort();
            assert.deepEqual(actual, expected);

            player2.switchDirection()
            board1.jumpToLocation(player2, 'randolph st');
            assert.deepEqual(board1.locationsInForwardDirection(player2), ['pay day']);
        });

        it('gets the next transit in the forward direction', function() {
            assert.equal(board1.nextTransit(player2), 'reading railroad');
        });
    });

    describe("#houseLimit", function() {

        const board2 = new BoardManager(board);
        board2.houses = 12;
        board2.hotels = 3;
        board2.skyscrapers = 2;

        const p1 = new Player('burp', 'go', 1);
        const p2 = new Player('rock', 'go', 1);

        board2.buyProperty(p1, 'biscayne ave');
        board2.buyProperty(p1, 'miami ave');
        board2.buyProperty(p1, 'florida ave');
        board2.buyProperty(p2, 'park pl');
        board2.buyProperty(p2, 'boardwalk');

        it('blocks from adding houses when there are not enough', function() {
            // houses check out
            let json = board2.setHousesForProperties(p1, {'biscayne ave': 4, 'miami ave': 4, 'florida ave': 4});
            assert(!json.hasOwnProperty('fail'));
            json = board2.setHousesForProperties(p2, {'park pl': 1});
            assert.deepEqual(json, {"fail": true});
            assert.equal(board2.locations['park pl'].houses, 0);

            // hotels check out
            board2.houses = 8;
            json = board2.setHousesForProperties(p2, {'park pl': 5, 'boardwalk': 5});
            assert(!json.hasOwnProperty('fail'));
            assert.equal(board2.locations['park pl'].houses, 5);
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5, 'miami ave': 5});
            assert.deepEqual(json, {"fail": true});
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5});
            assert(!json.hasOwnProperty('fail'));
            assert.equal(board2.locations['biscayne ave'].houses, 5);
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5, 'miami ave': 5});
            assert.deepEqual(json, {"fail": true});
            assert.equal(board2.locations['biscayne ave'].houses, 5);
            assert.equal(board2.locations['miami ave'].houses, 4);

            // skyscrapers check out
            board2.hotels = 2;
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5, 'miami ave': 5, 'florida ave': 5});
            assert(!json.hasOwnProperty('fail'));
            json = board2.setHousesForProperties(p1, {'biscayne ave': 6, 'miami ave': 6, 'florida ave': 6});
            assert.deepEqual(json, {"fail": true});
            json = board2.setHousesForProperties(p2, {'park pl': 6, 'boardwalk': 6});
            assert(!json.hasOwnProperty('fail'));
            assert.equal(board2.locations['boardwalk'].houses, 6);
            board2.skyscrapers = 1;
            json = board2.setHousesForProperties(p1, {'florida ave': 6, 'miami ave': 6});
            assert.deepEqual(json, {"fail": true});
            json = board2.setHousesForProperties(p1, {'biscayne ave': 6});
            assert(!json.hasOwnProperty('fail'));
            assert.equal(board2.locations['biscayne ave'].houses, 6);
            assert.equal(board2.locations['miami ave'].houses, 5);

            // check actual amounts are there
            assert.equal(board2.houses, 20);
            assert.equal(board2.hotels, 3);
            assert.equal(board2.skyscrapers, 0);
        });

        it('blocks from removing houses when there are not enough', function() {
            // check downgrade to hotels
            board2.hotels = 0;
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5, 'miami ave': 5, 'florida ave': 5});
            assert.deepEqual(json, {"fail": true});
            assert.equal(board2.locations['biscayne ave'].houses, 6);
            assert.equal(board2.locations['miami ave'].houses, 5);
            json = board2.setHousesForProperties(p2, {'park pl': 5, 'boardwalk': 5});
            assert.deepEqual(json, {"fail": true});
            assert.equal(board2.locations['park pl'].houses, 6);
            board2.hotels = 3;
            json = board2.setHousesForProperties(p1, {'biscayne ave': 5, 'miami ave': 5, 'florida ave': 5});
            assert(!json.hasOwnProperty('fail'));
            json = board2.setHousesForProperties(p2, {'park pl': 5, 'boardwalk': 5});
            assert(!json.hasOwnProperty('fail'));
            assert.equal(board2.locations['miami ave'].houses, 5);

            // check downgrade to houses
            board2.houses = 0;
            json = board2.setHousesForProperties(p1, {'biscayne ave': 4, 'miami ave': 5, 'florida ave': 5});
            assert.deepEqual(json, {"fail": true});
            json = board2.setHousesForProperties(p2, {'park pl': 0, 'boardwalk': 0});
            assert(!json.hasOwnProperty('fail'));
            board2.houses = 20;
            json = board2.setHousesForProperties(p1, {'biscayne ave': 4, 'miami ave': 3, 'florida ave': 4});
            assert(!json.hasOwnProperty('fail'));

            // check actual amounts are there
            assert.equal(board2.houses, 9);
            assert.equal(board2.hotels, 5);
            assert.equal(board2.skyscrapers, 3);
        });

        it('blocks from keeping houses when downgrading over trades if there are not enough', function() {
            board2.setHousesForProperties(p1, {'biscayne ave': 6, 'miami ave': 6, 'florida ave': 6});

            // try transfer from p1 with enough houses to downgrade to
            board2.transferProperties(p1, p2, ['biscayne ave', 'miami ave']);

            assert.equal(board2.locations['biscayne ave'].houses, 4);
            assert.equal(board2.locations['miami ave'].houses, 4);
            assert.equal(board2.locations['florida ave'].houses, 0);

            // try transfer without enough houses to downgrade to
            board2.transferProperties(p2, p1, ['biscayne ave', 'miami ave']);
            board2.setHousesForProperties(p1, {'biscayne ave': 6, 'miami ave': 6, 'florida ave': 6});
            board2.houses = 0;
            board2.transferProperties(p1, p2, ['biscayne ave', 'miami ave']);
            assert.equal(board2.locations['biscayne ave'].houses, 0);
            assert.equal(board2.locations['miami ave'].houses, 0);
            assert.equal(board2.locations['florida ave'].houses, 0);
        });
    })
});

// tests the Card object
describe('Card', function() {
    
    it('fortune card is valid', function() {
        for(let i = 0; i < 5; i++) {
            const fortune = Card.drawFortune();
            assert(fortune.hasOwnProperty('title'));
            assert(fortune.hasOwnProperty('description'));
            assert(fortune.hasOwnProperty('play'));
            assert(fortune.hasOwnProperty('short'));
        }
    });

    it('misfortune is valid', function() {
        for(let i = 0; i < 5; i++) {
            const cc = Card.drawMisfortune();
            assert(cc.hasOwnProperty('title'));
            assert(cc.hasOwnProperty('description'));
            assert(cc.hasOwnProperty('play'));
            assert(cc.hasOwnProperty('short'));
        }
    });

    it('bus pass is valid', function() {
        for(let i = 0; i < 5; i++) {
            const bp = Card.drawBusPass();
            assert(bp.includes('forward') || bp.includes('backward'));
        }
    });

    it('roll3 is valid', function() {
        for(let i = 0; i < 5; i++) {
            const roll3 = Card.drawRoll3();
            assert.equal(roll3.length, 3);

            let rollSet = new Set();

            roll3.forEach(r => {
                assert(1 <= r <= 6);
                rollSet.add(r);
            });

            // each value is distinct
            assert(Array.from(rollSet).length, 3);
        }
    });

    it('gets 3 dice rolls', function() {
        let [die1, die2, die3] = [Card.rollDie(), Card.rollDie(), Card.rollDie()];
        assert(die1);
        assert(1 <= die1 <= 6);
        assert(1 <= die2 <= 6);
        assert(1 <= die3 <= 6);
    });

});
