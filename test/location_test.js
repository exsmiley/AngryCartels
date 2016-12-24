const assert = require('assert');
const Place = require('../backend/location/place');
const Property = require('../backend/location/property');
const HouseProperty = require('../backend/location/houseProperty');
const Utility = require('../backend/location/utility');
const Railroad = require('../backend/location/railroad');
const CabCompany = require('../backend/location/cabCompany');

// tests the Location objects
describe('Location', function() {
    describe("#placeTest", function() {
        it("should parse a normal location correctly", function() {
            const name = "birthday gift"
            const spot = {
                            "type": "spot",
                            "forward": ["mulholland dr"],
                            "backward": ["ute cab co"],
                            "side": [2],
                            "track": [2],
                            "above": ["park pl"],
                        }
            const place = new Place(name, spot);
            assert.equal(place.name, name);
            assert.equal(place.kind, spot.type);
            assert.deepEqual(place.forward, spot.forward);
            assert.deepEqual(place.backward, spot.backward);
            assert.deepEqual(place.side, spot.side);
            assert.deepEqual(place.above, spot.above);
        })
    });

    describe("#propertyTests", function() {
        const name = "electric company";
        const prop = {
                        "type": "utility",
                        "quality": "utility",
                        "rent": [4, 10, 20, 40, 80, 100, 120, 150],
                        "mortgage": 75,
                        "forward": ["states ave"],
                        "backward": ["st charles pl"],
                        "side": [1],
                        "track": [1],
                        "above": ["bonus"],
                        "below": ["internet service provider"]
                     };
        const property = new Property(name, prop);

        it("should initialize a Property correctly", function() {
            assert.equal(property.kind, prop.type);
            assert.equal(property.mortgageValue, prop.mortgage);
            assert.equal(property.forward, prop.forward);
            assert.equal(property.below, prop.below);
            assert.equal(property.rent, prop.rent);
            assert.equal(property.color, prop.quality);
            assert.equal(property.cost, 2*prop.mortgage);
        });

        it("should have the cost be the value", function() {
            assert.equal(property.getValue(), property.cost);
        });

        it("should get an owner", function() {
            assert.equal(property.owner, null);
            property.setOwner("Bob");
            assert.equal(property.owner, "Bob");
        });

        it("should be mortgaged", function() {
            property.mortgage();
            assert(property.isMortgaged);
            assert.equal(property.getValue(), prop.mortgage);
        });

        it("should be unmortgaged", function() {
            property.unmortgage()
            assert(!property.isMortgaged);
            assert.equal(property.getValue(), 2*prop.mortgage);
        });
    });

    describe("#housePropertyTests", function() {
        const name = "newbury st";
        const prop = {
                        "type": "property",
                        "quality": "black",
                        "rent": [40, 185, 550, 1200, 1500, 1700, 2700],
                        "mortgage": 190,
                        "house": 200,
                        "forward": ["pennsylvania railroad"],
                        "backward": ["boylston st"],
                        "side": [1],
                        "track": [0],
                        "below": ["virginia ave"]
                     };

        const property = new HouseProperty(name, prop);

        it("should initialize a HouseProperty correctly", function() {
            assert.equal(property.kind, prop.type);
            assert.equal(property.mortgageValue, prop.mortgage);
            assert.equal(property.forward, prop.forward);
            assert.equal(property.below, prop.below);
            assert.equal(property.rent, prop.rent);
            assert.equal(property.color, prop.quality);
            assert.equal(property.cost, 2*prop.mortgage);
            assert.equal(property.housePrice, prop.house);
            assert.equal(property.houses, 0);
            assert.equal(property.getValue(), property.cost);
            assert.equal(property.getRent(false), prop.rent[0]);
            assert.equal(property.getRent(true), 2*prop.rent[0]);
        });

        it("should add houses and increase rent/value", function() {
            property.addHouse();
            assert.equal(property.getRent(false), prop.rent[1]);
            assert.equal(property.getRent(true), prop.rent[1]);
            property.addHouse();
            assert.equal(property.getRent(false), prop.rent[2]);
            property.addHouse();
            property.addHouse();
            assert.equal(property.getValue(), 4*prop.house+2*prop.mortgage);
            assert.equal(property.getRent(false), prop.rent[4]);
            property.addHouse();
            property.addHouse();
            assert.equal(property.getRent(false), prop.rent[6]);
            assert.equal(property.houses, 6)
            property.addHouse(); // can't go above 6 houses (aka skyscraper)
            assert.equal(property.houses, 6);
            assert.equal(property.getRent(true), prop.rent[6]);
            assert.equal(property.getValue(), 6*prop.house+2*prop.mortgage);
        });

        it("should remove houses and decrease rent/value", function() {
            property.removeHouse();
            assert.equal(property.getRent(false), prop.rent[5]);
            assert.equal(property.getValue(), 5*prop.house+2*prop.mortgage);
            property.removeHouse();
            assert.equal(property.getRent(false), prop.rent[4]);
            property.removeHouse();
            property.removeHouse();
            assert.equal(property.getRent(false), prop.rent[2]);
            assert.equal(property.getValue(), 2*prop.house+2*prop.mortgage);
            property.removeHouse();
            property.removeHouse();
            assert.equal(property.getRent(false), prop.rent[0]);
            assert.equal(property.houses, 0)
            property.removeHouse(); // can't go below 0 houses
            assert.equal(property.houses, 0);
            assert.equal(property.getValue(), 0*prop.house+2*prop.mortgage);
        });

        it("should not charge any rent or let you add houses if mortgaged", function() {
            property.mortgage();
            assert(property.isMortgaged);
            assert.equal(property.getRent(false), 0);
            property.addHouse();
            assert.equal(property.houses, 0);

            // now unmortgage and see if still works
            property.unmortgage();
            assert(!property.isMortgaged)
            property.addHouse();
            assert.equal(property.getRent(true), prop.rent[1]);
        });
    });

    describe("#utilityTests", function() {
        const name = "electric company";
        const prop = {
                        "type": "utility",
                        "quality": "utility",
                        "rent": [4, 10, 20, 40, 80, 100, 120, 150],
                        "mortgage": 75,
                        "forward": ["states ave"],
                        "backward": ["st charles pl"],
                        "side": [1],
                        "track": [1],
                        "above": ["bonus"],
                        "below": ["internet service provider"]
                     };
        const property = new Utility(name, prop);

        it("should initialize a Utility correctly", function() {
            assert.equal(property.name, name);
            assert.equal(property.kind, prop.type);
            assert.equal(property.mortgageValue, prop.mortgage);
            assert.equal(property.forward, prop.forward);
            assert.equal(property.below, prop.below);
            assert.equal(property.rent, prop.rent);
            assert.equal(property.color, prop.quality);
            assert.equal(property.cost, 2*prop.mortgage);
            assert.equal(property.getValue(), property.cost);
        });

        it("should charge the correct amount of rent", function() {
            assert.equal(property.getRent(0, 4), prop.rent[0]*4);
            assert.equal(property.getRent(3, 4), prop.rent[2]*4);
            assert.equal(property.getRent(7, 4), prop.rent[6]*4);
            assert.equal(property.getRent(9, 4), prop.rent[7]*4); // should just assume that 8 is max

            // handle mortgage cases
            property.mortgage();
            assert.equal(property.getRent(4, 4), 0);
            property.unmortgage();
            assert.equal(property.getRent(5, 4), prop.rent[4]*4);
        });
    });

    describe("#railroadTests", function() {
        const name = "short line";
        const spot = {
                        "type": "transportation",
                        "quality": "railroad",
                        "rent": [25, 50, 100, 200],
                        "mortgage": 100,
                        "forward": ["chance middle east", "reverse"],
                        "backward": ["pennsylvania ave", "biscayne ave"],
                        "side": [3],
                        "track": [1, 0],
                        "below": ["sewage system"]
                    };

        const rr = new Railroad(name, spot);

        it("should initialize a Railroad correctly", function() {
            assert.equal(rr.name, name);
            assert.equal(rr.kind, spot.type);
            assert.equal(rr.mortgageValue, spot.mortgage);
            assert.equal(rr.forward, spot.forward);
            assert.equal(rr.below, spot.below);
            assert.equal(rr.rent, spot.rent);
            assert.equal(rr.color, spot.quality);
            assert.equal(rr.cost, 2*spot.mortgage);
            assert.equal(rr.getValue(), rr.cost);
            assert(!rr.hasTrainDepot);
            assert.equal(rr.trainDepotPrice, 100);
        });

        it("should charge rent correctly", function() {
            assert.equal(rr.getRent(0), spot.rent[0]); // just in case a typo comes from above
            assert.equal(rr.getRent(1), spot.rent[0]);
            assert.equal(rr.getRent(2), spot.rent[1]);
            assert.equal(rr.getRent(4), spot.rent[3]);
        });

        it("should handle mortgages correctly", function() {
            rr.mortgage();
            assert.equal(rr.getRent(3), 0);
            assert.equal(rr.getValue(), spot.mortgage);
            rr.addTrainDepot();
            assert.equal(rr.getRent(2), 0);
            assert.equal(rr.getValue(), spot.mortgage);
            rr.unmortgage();
            assert.equal(rr.getValue(), 2*spot.mortgage);
        })

        it("should handle train depots correctly", function() {
            rr.addTrainDepot();
            assert.equal(rr.getRent(1), 2*spot.rent[0]);
            assert.equal(rr.getRent(4), 2*spot.rent[3]);
            assert.equal(rr.getValue(), 2*spot.mortgage+rr.trainDepotPrice);

            rr.removeTrainDepot();
            assert.equal(rr.getRent(3), spot.rent[2]);
            assert.equal(rr.getValue(), 2*spot.mortgage);
        });

    });

    describe("#cabCompanyTests", function() {
        const name = "ute cab co";
        const spot = {
                        "type": "transportation",
                        "quality": "cab",
                        "rent": [30, 60, 120, 240],
                        "mortgage": 150,
                        "forward": ["birthday gift"],
                        "backward": ["sewage system"],
                        "side": [3],
                        "track": [1],
                        "above": ["chance middle east"]
                     };

        const cc = new CabCompany(name, spot);

        it("should initialize a CabCompany correctly", function() {
            assert.equal(cc.name, name);
            assert.equal(cc.kind, spot.type);
            assert.equal(cc.mortgageValue, spot.mortgage);
            assert.equal(cc.forward, spot.forward);
            assert.equal(cc.below, spot.below);
            assert.equal(cc.rent, spot.rent);
            assert.equal(cc.color, spot.quality);
            assert.equal(cc.cost, 2*spot.mortgage);
            assert.equal(cc.getValue(), 2*spot.mortgage);
            assert(!cc.hasCabStand);
            assert.equal(cc.cabStandPrice, 150);
        });

        it("should charge rent correctly", function() {
            assert.equal(cc.getRent(0), spot.rent[0]); // just in case a typo comes from above
            assert.equal(cc.getRent(1), spot.rent[0]);
            assert.equal(cc.getRent(2), spot.rent[1]);
            assert.equal(cc.getRent(4), spot.rent[3]);
        });

        it("should handle mortgages correctly", function() {
            cc.mortgage();
            assert.equal(cc.getRent(3), 0);
            assert.equal(cc.getValue(), spot.mortgage);
            cc.addCabStand();
            assert.equal(cc.getRent(2), 0);
            assert.equal(cc.getValue(), spot.mortgage);
            cc.unmortgage();
            assert.equal(cc.getValue(), 2*spot.mortgage);
        })

        it("should handle cab stands correctly", function() {
            cc.addCabStand();
            assert.equal(cc.getRent(1), 2*spot.rent[0]);
            assert.equal(cc.getRent(4), 2*spot.rent[3]);
            assert.equal(cc.getValue(), 2*spot.mortgage+cc.cabStandPrice);

            cc.removeCabStand();
            assert.equal(cc.getRent(3), spot.rent[2]);
            assert.equal(cc.getValue(), 2*spot.mortgage);
        });
    });
});