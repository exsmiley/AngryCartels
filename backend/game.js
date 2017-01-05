var board = require('./config/large_board');
var Card = require('./card');
var BoardManager = require('./boardManager');
var PlayerManager = require('./playerManager');

/**
 * The Game object is the main entry point into the game. It manages everything
 * @param gamePresets preset data to initialze the game, has just players if a new game.
 *      Otherwise, it has data for an entire game to resume it.
 * @param newGame specifies whether this is a new game
 */
class Game {
    constructor(gamePresets, newGame=true) {
        if(newGame) {
            // first initialize players
            // TODO decide how to set other board presets, maybe just put in board
            this.playerManager = new PlayerManager(gamePresets['player'], 'go', 1);
            this.boardManager = new BoardManager(board);

            // auction variables
            this.auction = null; // object of player names : auction price
            this.auctionGoing = false;
            this.auctionedProperty = null;

            this.lastOdd = false; // used for some methods
            this.log = []; // log of actions that have occurred in the game

            // needs: free parking, highest rent, chance/community chest
            //      getAllLocations, getAllUnownedLocations

            // scrambles player order for more fun
            this.playerManager.scrambleTurnOrder();

            // TODO hold timestamp so that checks can be made for auctions and stuff if taking too long
        }
        else {
            // TODO in the future to load a game from saved state
        }
    }

    /****************************************************************************************
     * GAMEPLAY METHODS
     ****************************************************************************************/

    /**
    * Makes it so it is the next player's turn.
    * @return JSON with field message (string saying what happened)
    */
    nextTurn() {
        this.playerManager.nextTurn();
        const message = "It is now " + this.playerManager.getCurrentPlayer().name + "'s turn!";
        return {'message': message}
    }

    /**
    * Rolls the 3 dice for the player and moves him/her to the next location.
    * @return JSON with fields rolled (list of what was rolled), action (list
    *       of actions that the player should perform), and message (string saying what happened)
    */
    rollDice() {
        // need to simulate 3 dice just like the real game
        let player = this.playerManager.getCurrentPlayer();
        let die1, die2, die3 = Card.rollDie(), Card.rollDie(), Card.rollDie();
        let totalRoll = 0;
        let actions = [];
        let message = ""; // TODO maybe consider making a list called messages?

        if(die3 === 4 || die3 === 5) {
            die3 = 'mrmonopoly';
            totalRoll = die1 + die2;
        }
        else if(die3 === 6) {
            die3 = 'gain bus pass'
            totalRoll = die1 + die2;
        }
        else {
            totalRoll = die1 + die2 + die3
        }

        player.setLastRoll(totalRoll);

        // get stuff about the turn
        if(die1 === die2 === die3) {
            // do the teleport action
            actions.push('teleport');
        }
        else {
            // TODO update based on whatever happens with boardManager's API
            const action = this.boardManager.moveLocation(player, totalRoll);
            actions.push(action);
        }

        // push other actions after based on priority
        if(isNan(die3)) {
            actions.push(action);
        }

        // see if the player's turn is over
        if(actions.length === 0) {
            actions.push('end turn');
        }

        return {'rolled': [die1, die2, die3], 'actions': actions, 'message': message};
    }

    /**
    * Performs the Mr. Monopoly search for the next unowned property and moves the player.
    * @return JSON with fields action (list of actions that the player should perform)
    *       and message (string saying what happened)
    */
    unleashMrMonopoly() {
        const player = this.playerManager.getCurrentPlayer();
        const action = this.boardManager.nextMrMonopolyLocation(player, this.lastOdd);
        const message = this.playerManager.getCurrentPlayer().name + "used Mr. Monopoly to get to " + this.playerManager.getCurrentPlayer().location; 
        return {'action': action, 'message': message}
    }

    /**
    * Uses the specified bus pass.
    * @param pass the name of the bus pass
    * @param location if the pass says "any" then this is the location to advance to
    *
    * @return JSON with fields action (list of actions that the player should perform)
    *       and message (string saying what happened)
    */
    useBusPass(pass, location) {
        const player = this.playerManager.getCurrentPlayer();
        // TODO check if the player actually has the pass
        let oldDirection = player.forward; // store to reset later
        let action = [];
        let message = ''; // TODO implement the messages for this

        if(pass.includes('forward')) {
            player.forward = true;
        } else {
            player.forward = false;
        }

        if(pass.includes('any') && option) {
            action = this.boardManager.advanceToLocation(player, location);
        }
        else if(!pass.includes('any')) {
            const num = parseInt(pass.replace('forward', '').replace('backward', '').replace('expire', ''));
            action = this.boardManager.moveLocation(player, num);
        }

        // reset player to how they were before
        player.forward = oldDirection;

        return {'action': action, 'message': message};
    }

    /**
    * Takes a taxi ride to the specified location.
    * @param location to get transported to
    *
    * @return JSON with field message (string saying what happened)
    */
    taxiRide(location) {
        // TODO
    }

    /**
    * The current player buys the property that they are located on for market price.
    *
    * @return JSON with fields player (name: name, money: money), location (name of location),
    *      price (price paid for the property), message (saying what happened). null if failed
    */
    buyProperty() {
        const player = this.playerManager.getCurrentPlayer();
        let json = this.boardManager.buyProperty(player, player.location);
        // TODO add message
        return json;
    }

    /**
    * The current player mortgages the properties in the list.
    * @param properties list of strings of property names to mortgage
    *
    * @return JSON with fields player (name: name, money: money), locations (list of successfully
    *      mortgaged locations), gain (money gained from mortgaging), message (saying
    *      what happened).
    */
    mortgage(properties) {
        const player = this.playerManager.getCurrentPlayer();
        let success = [];
        let gain = 0;

        for(let property of properties) {
            let result = this.boardManager.mortgageProperty(player, property);

            if(result.hasOwnProperty('location')) {
                success.push(property);
                gain += result.gain;
            }
        }
        // TODO message
        return {"player": {"name": player.getName(), "money": player.getMoney()}, 
                "locations": success, "gain": gain}
    }

    /**
    * The current player unmortgages the properties in the list.
    * @param properties list of strings of property names to unmortgage
    *
    * @return JSON with fields player (name: name, money: money), locations (list of successfully
    *      unmortgaged locations), lose (money lost from unmortgaging), message (saying
    *      what happened).
    */
    unmortgage(properties) {
        const player = this.playerManager.getCurrentPlayer();
        let success = [];
        let lose = 0;

        for(let property of properties) {
            let result = this.boardManager.unmortgageProperty(player, property);

            if(result.hasOwnProperty('location')) {
                success.push(property);
                lose += result.lose;
            }
        }
        // TODO message
        return {"player": {"name": player.getName(), "money": player.getMoney()}, 
                "locations": success, "lose": lose}
    }

    /**
     * Sets the houses for all of the properties in the houseMap.
     * @param houseMap
     *
     */
    setHouses(houseMap) {
        this.boardManager.setHousesForPropertySet(houseMap);
        // TODO message
    }

    /**
    * The current player pays rent for the property that they are located on.
    * @return JSON with field message (string saying what happened)
    */
    payRent() {
        const player = this.playerManager.getCurrentPlayer();
        const rent = this.boardManager.getRent(player, player.location);
        const owner = this.boardManager.isOwned(player.location);

        if(!rent) {
            return {"message": player.location + " is unowned."};
        }
        
        player.deltaMoney(-rent);
        owner.deltaMoney(rent);

        let message = player.name + " paid " + rent + " rent to " + owner;
        return {"message": message};
    }

    trade() {
        // TODO figure out what needs to happen
    }

    /****************************************************************************************
     * AUCTION METHODS
     ****************************************************************************************/

    /**
     * Starts an auction for a property. At most one auction can happen at any time.
     */
    startAuction(property) {
        // starts the auction and inits stuff
        this.auction = {};
        this.auctionGoing = true;
        this.auctionedProperty = property;
        const players = this.playerManager.getPlayers();

        players.forEach(p => {
            this.auction[p.name] = null;
        });
    }

    /**
     * Sets the price the player is willing to bid. Assumes no JS concurrency issues.
     * @param player the name of a player
     * @param price the price the player is willing to bid
     */
    setAuctionPrice(player, price) {
        if(this.auctionGoing) {
            this.auction[player] = price;
        }
    }

    /**
     * The winning player of the auction buys.
     * 
     * @return JSON with fields player (name: name, money: money), location (name of location),
     *      price (price paid for the property), message (saying what happened). null if failed
     */
    finishAuction() {
        if(this.auctionGoing) {
            // check that all fields are not null
            this.over = true;

            for(p in this.auction) {
                if(!this.auction[p]) {
                    this.over = false;
                }
            }

            if(this.over) {
                let top = -1
                let names = [];

                let second = -1;

                for(p in this.auction) {
                    if(this.auction[p] > top) {
                        second = top;
                        top = this.auction[p];
                        names = [p];
                    }
                    else if (this.auction[p] === top) {
                        names.push(p);
                    }
                }

                let player;
                let price;
                // goes 20 over the next highest bidder
                if(names.length === 1) {
                    player = this.playerManager.getPlayer(names[0]);
                    price = Math.min(top, second + 20);
                }
                // if multiple people chose the same amount, then randomly choose one to win
                else {
                    player = this.playerManager.getPlayer(Card.chooseRandom(names));
                    price = top;
                }

                let json = this.boardManager.buyProperty(player, this.auctionedProperty, price);

                this.auction = null;
                this.auctionGoing = false;
                this.auctionedProperty = null;
                // TODO add message
                return json; 
            }
        }

        // no winner
        return null;
    }

    /****************************************************************************************
     * GET METHODS
     ****************************************************************************************/

    // TODO expand by adding more getter methods

    /**
     * Informs whose turn it is.
     *
     * @return object of the player whose turn it is
     */
    getCurrentPlayer() {
        return this.playerManager.getCurrentPlayer(); // TODO decide if just want name
    }

    /**
     * Gets the rent of the property.
     * @param property name of the property
     *
     * @return JSON of {name: property, price: rent price (null if unowned)}
     */
    getRent(player, property) {
        let rent = this.boardManager.getRent(player, player.location);
        return {"name": property, "price": rent}
    }

    getTaxiLocations() {
        // TODO get the taxi locations
    }

    /**
     * Gets a JSON that can be used to save the game and reloaded from.
     *
     * @return JSON with all of the Game's state
     */
    getGameJSON() {
        // TODO send the entire game as a json that can be stored/reloaded from
    }

}

module.exports = Game;
