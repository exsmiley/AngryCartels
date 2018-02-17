{
	"playerManager": {
		"players": [{
				"name": "asdf",
				"forward": true,
				"location": "go",
				"track": 1,
				"lastRolled": 0,
				"team": "asdf",
				"actions": ["mortgage", "unmortgage", "build", "trade", "use special", "roll", "bus"],
				"onHoldActions": [],
				"onNextTurn": null
			}, {
				"name": 4,
				"forward": true,
				"location": "go",
				"track": 1,
				"lastRolled": 0,
				"team": 4,
				"actions": [],
				"onHoldActions": [],
				"onNextTurn": null
			}
		],
		"teams": {
			"4": {
				"name": 4,
				"money": 3200,
				"properties": [],
				"busTickets": {
					"forward any": 1
				},
				"specialCards": {}
			},
			"asdf": {
				"name": "asdf",
				"money": 3200,
				"properties": [],
				"busTickets": {
					"backward 3": 1
				},
				"specialCards": {}
			}
		},
		"turnIndex": 0,
		"canRoll": true,
		"doubleCount": 0
	},
	"boardManager": {
		"houses": 81,
		"hotels": 31,
		"skyscrapers": 16,
		"pool": 0,
		"unownedProperties": 80,
		"locations": {
			"biscayne ave": {
				"name": "biscayne ave",
				"type": "property",
				"forward": ["short line"],
				"backward": ["miami ave"],
				"side": [3],
				"track": [0],
				"below": ["pennsylvania ave"],
				"snapshot": true,
				"group": 0,
				"rent": [11, 55, 160, 475, 650, 800, 1300],
				"mortgageValue": 75,
				"cost": 150,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"miami ave": {
				"name": "miami ave",
				"type": "property",
				"forward": ["biscayne ave"],
				"backward": ["holland tunnel ne"],
				"side": [3],
				"track": [0],
				"below": ["misfortune middle east"],
				"snapshot": true,
				"group": 0,
				"rent": [9, 45, 120, 350, 500, 700, 1200],
				"mortgageValue": 65,
				"cost": 130,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"florida ave": {
				"name": "florida ave",
				"type": "property",
				"forward": ["holland tunnel ne"],
				"backward": ["fortune inner ne"],
				"side": [2],
				"track": [0],
				"below": ["ventnor ave"],
				"snapshot": true,
				"group": 0,
				"rent": [9, 45, 120, 350, 500, 700, 1200],
				"mortgageValue": 65,
				"cost": 130,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"lombard st": {
				"name": "lombard st",
				"type": "property",
				"forward": ["squeeze play"],
				"backward": ["reverse"],
				"side": [3],
				"track": [0],
				"below": ["park pl"],
				"snapshot": true,
				"group": 1,
				"rent": [17, 85, 240, 475, 670, 1025, 1525],
				"mortgageValue": 105,
				"cost": 210,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"the embarcadero": {
				"name": "the embarcadero",
				"type": "property",
				"forward": ["fisherman's wharf"],
				"backward": ["squeeze play"],
				"side": [0],
				"track": [0],
				"below": ["baltic ave"],
				"snapshot": true,
				"group": 1,
				"rent": [17, 85, 240, 475, 670, 1025, 1525],
				"mortgageValue": 105,
				"cost": 210,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"fisherman's wharf": {
				"name": "fisherman's wharf",
				"type": "property",
				"forward": ["telephone company"],
				"backward": ["the embarcadero"],
				"side": [0],
				"track": [0],
				"below": ["income tax"],
				"snapshot": true,
				"group": 1,
				"rent": [21, 105, 320, 780, 950, 1125, 1625],
				"mortgageValue": 125,
				"cost": 250,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"beacon st": {
				"name": "beacon st",
				"type": "property",
				"forward": ["bonus"],
				"backward": ["misfortune inner sw"],
				"side": [0],
				"track": [0],
				"below": ["fortune middle south"],
				"snapshot": true,
				"group": 2,
				"rent": [30, 160, 470, 1050, 1250, 1500, 2500],
				"mortgageValue": 165,
				"cost": 330,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"boylston st": {
				"name": "boylston st",
				"type": "property",
				"forward": ["newbury st"],
				"backward": ["bonus"],
				"side": [1],
				"track": [0],
				"below": ["states ave"],
				"snapshot": true,
				"group": 2,
				"rent": [30, 160, 470, 1050, 1250, 1500, 2500],
				"mortgageValue": 165,
				"cost": 330,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"newbury st": {
				"name": "newbury st",
				"type": "property",
				"forward": ["pennsylvania railroad"],
				"backward": ["boylston st"],
				"side": [1],
				"track": [0],
				"below": ["virginia ave"],
				"snapshot": true,
				"group": 2,
				"rent": [40, 185, 550, 1200, 1500, 1700, 2700],
				"mortgageValue": 190,
				"cost": 380,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"fifth ave": {
				"name": "fifth ave",
				"type": "property",
				"forward": ["madison ave"],
				"backward": ["pennsylvania railroad"],
				"side": [1],
				"track": [0],
				"below": ["st james pl"],
				"snapshot": true,
				"group": 3,
				"rent": [60, 220, 650, 1500, 1800, 2100, 3600],
				"mortgageValue": 215,
				"cost": 430,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"madison ave": {
				"name": "madison ave",
				"type": "property",
				"forward": ["stock exchange"],
				"backward": ["fifth ave"],
				"side": [1],
				"track": [0],
				"below": ["misfortune middle east"],
				"snapshot": true,
				"group": 3,
				"rent": [60, 220, 650, 1500, 1800, 2100, 3600],
				"mortgageValue": 215,
				"cost": 430,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"wall st": {
				"name": "wall st",
				"type": "property",
				"forward": ["tax refund"],
				"backward": ["stock exchange"],
				"side": [2],
				"track": [0],
				"below": ["indiana ave"],
				"snapshot": true,
				"group": 3,
				"rent": [80, 300, 800, 1800, 2200, 2700, 4200],
				"mortgageValue": 250,
				"cost": 500,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"lake st": {
				"name": "lake st",
				"type": "property",
				"forward": ["misfortune outer se"],
				"backward": ["subway"],
				"side": [0],
				"track": [2],
				"above": ["go"],
				"snapshot": true,
				"group": 4,
				"rent": [1, 5, 15, 45, 80, 125, 625],
				"mortgageValue": 15,
				"cost": 30,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"nicollet ave": {
				"name": "nicollet ave",
				"type": "property",
				"forward": ["hennepin ave"],
				"backward": ["misfortune outer se"],
				"side": [0],
				"track": [2],
				"above": ["mediterranean ave"],
				"snapshot": true,
				"group": 4,
				"rent": [1, 5, 15, 45, 80, 125, 625],
				"mortgageValue": 15,
				"cost": 30,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"hennepin ave": {
				"name": "hennepin ave",
				"type": "property",
				"forward": ["bus ticket south"],
				"backward": ["nicollet ave"],
				"side": [0],
				"track": [2],
				"above": ["misfortune middle south"],
				"snapshot": true,
				"group": 4,
				"rent": [3, 15, 45, 130, 240, 350, 850],
				"mortgageValue": 30,
				"cost": 60,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"esplanade ave": {
				"name": "esplanade ave",
				"type": "property",
				"forward": ["canal st"],
				"backward": ["reading railroad"],
				"side": [0],
				"track": [2],
				"above": ["oriental ave"],
				"snapshot": true,
				"group": 5,
				"rent": [5, 25, 80, 225, 360, 600, 1000],
				"mortgageValue": 50,
				"cost": 100,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"katy freeway": {
				"name": "katy freeway",
				"type": "property",
				"forward": ["westheimer rd"],
				"backward": ["auction"],
				"side": [1],
				"track": [2],
				"above": ["jail"],
				"snapshot": true,
				"group": 6,
				"rent": [11, 55, 160, 475, 650, 800, 1300],
				"mortgageValue": 70,
				"cost": 140,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"westheimer rd": {
				"name": "westheimer rd",
				"type": "property",
				"forward": ["internet service provider"],
				"backward": ["katy freeway"],
				"side": [1],
				"track": [2],
				"above": ["st charles pl"],
				"snapshot": true,
				"group": 6,
				"rent": [11, 55, 160, 475, 650, 800, 1300],
				"mortgageValue": 70,
				"cost": 140,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"kirby dr": {
				"name": "kirby dr",
				"type": "property",
				"forward": ["cullen blvd"],
				"backward": ["internet service provider"],
				"side": [1],
				"track": [2],
				"above": ["states ave"],
				"snapshot": true,
				"group": 6,
				"rent": [14, 70, 200, 550, 750, 950, 1450],
				"mortgageValue": 80,
				"cost": 160,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"cullen blvd": {
				"name": "cullen blvd",
				"type": "property",
				"forward": ["fortune outer west"],
				"backward": ["kirby dr"],
				"side": [1],
				"track": [2],
				"above": ["virginia ave"],
				"snapshot": true,
				"group": 6,
				"rent": [14, 70, 200, 550, 750, 950, 1450],
				"mortgageValue": 80,
				"cost": 160,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"canal st": {
				"name": "canal st",
				"type": "property",
				"forward": ["fortune outer south"],
				"backward": ["esplanade ave"],
				"side": [0],
				"track": [2],
				"above": ["fortune middle south"],
				"snapshot": true,
				"group": 5,
				"rent": [5, 25, 80, 225, 360, 600, 1000],
				"mortgageValue": 50,
				"cost": 100,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"magazine st": {
				"name": "magazine st",
				"type": "property",
				"forward": ["bourbon st"],
				"backward": ["cable company"],
				"side": [0],
				"track": [2],
				"above": ["jail"],
				"snapshot": true,
				"group": 5,
				"rent": [8, 40, 100, 300, 450, 600, 1100],
				"mortgageValue": 60,
				"cost": 120,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"bourbon st": {
				"name": "bourbon st",
				"type": "property",
				"forward": ["holland tunnel sw"],
				"backward": ["magazine st"],
				"side": [0],
				"track": [2],
				"above": ["jail"],
				"snapshot": true,
				"group": 5,
				"rent": [8, 40, 100, 300, 450, 600, 1100],
				"mortgageValue": 60,
				"cost": 120,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"dekalb ave": {
				"name": "dekalb ave",
				"type": "property",
				"forward": ["misfortune outer nw"],
				"backward": ["black & white cab co"],
				"side": [1],
				"track": [2],
				"above": ["misfortune middle west"],
				"snapshot": true,
				"group": 7,
				"rent": [17, 85, 240, 670, 840, 1025, 1525],
				"mortgageValue": 90,
				"cost": 180,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"young int'l blvd": {
				"name": "young int'l blvd",
				"type": "property",
				"forward": ["decatur st"],
				"backward": ["misfortune outer nw"],
				"side": [1],
				"track": [2],
				"above": ["new york ave"],
				"snapshot": true,
				"group": 7,
				"rent": [17, 85, 240, 670, 840, 1025, 1525],
				"mortgageValue": 90,
				"cost": 180,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"decatur st": {
				"name": "decatur st",
				"type": "property",
				"forward": ["peachtree st"],
				"backward": ["young int'l blvd"],
				"side": [1],
				"track": [2],
				"above": ["free parking"],
				"snapshot": true,
				"group": 7,
				"rent": [20, 100, 300, 750, 925, 1100, 1600],
				"mortgageValue": 100,
				"cost": 200,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"peachtree st": {
				"name": "peachtree st",
				"type": "property",
				"forward": ["pay day"],
				"backward": ["decatur st"],
				"side": [1],
				"track": [2],
				"above": ["free parking"],
				"snapshot": true,
				"group": 7,
				"rent": [20, 100, 300, 750, 925, 1100, 1600],
				"mortgageValue": 100,
				"cost": 200,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"randolph st": {
				"name": "randolph st",
				"type": "property",
				"forward": ["fortune outer nw"],
				"backward": ["pay day"],
				"side": [2],
				"track": [2],
				"above": ["free parking"],
				"snapshot": true,
				"group": 8,
				"rent": [23, 115, 345, 825, 1010, 1180, 2180],
				"mortgageValue": 110,
				"cost": 220,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 150
			},
			"lake shore dr": {
				"name": "lake shore dr",
				"type": "property",
				"forward": ["wacker dr"],
				"backward": ["fortune outer nw"],
				"side": [2],
				"track": [2],
				"above": ["kentucky ave"],
				"snapshot": true,
				"group": 8,
				"rent": [23, 115, 345, 825, 1010, 1180, 2180],
				"mortgageValue": 110,
				"cost": 220,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 150
			},
			"wacker dr": {
				"name": "wacker dr",
				"type": "property",
				"forward": ["michigan ave"],
				"backward": ["wacker dr"],
				"side": [2],
				"track": [2],
				"above": ["fortune middle north"],
				"snapshot": true,
				"group": 8,
				"rent": [26, 130, 390, 900, 1100, 1275, 2275],
				"mortgageValue": 120,
				"cost": 240,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 150
			},
			"michigan ave": {
				"name": "michigan ave",
				"type": "property",
				"forward": ["yellow cab co"],
				"backward": ["wacker dr"],
				"side": [2],
				"track": [2],
				"above": ["indiana ave"],
				"snapshot": true,
				"group": 8,
				"rent": [26, 130, 390, 900, 1100, 1275, 2275],
				"mortgageValue": 120,
				"cost": 240,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 150
			},
			"south temple": {
				"name": "south temple",
				"type": "property",
				"forward": ["west temple"],
				"backward": ["misfortune outer north"],
				"side": [2],
				"track": [2],
				"above": ["ventnor ave"],
				"snapshot": true,
				"group": 9,
				"rent": [32, 160, 470, 1050, 1250, 1500, 2500],
				"mortgageValue": 130,
				"cost": 260,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"west temple": {
				"name": "west temple",
				"type": "property",
				"forward": ["trash collector"],
				"backward": ["south temple"],
				"side": [2],
				"track": [2],
				"above": ["water works"],
				"snapshot": true,
				"group": 9,
				"rent": [32, 160, 470, 1050, 1250, 1500, 2500],
				"mortgageValue": 130,
				"cost": 260,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"north temple": {
				"name": "north temple",
				"type": "property",
				"forward": ["temple square"],
				"backward": ["trash collector"],
				"side": [2],
				"track": [2],
				"above": ["roll3"],
				"snapshot": true,
				"group": 9,
				"rent": [38, 170, 520, 1125, 1275, 1425, 1650],
				"mortgageValue": 140,
				"cost": 280,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"temple square": {
				"name": "temple square",
				"type": "property",
				"forward": ["go to jail"],
				"backward": ["north temple"],
				"side": [2],
				"track": [2],
				"above": ["roll3"],
				"snapshot": true,
				"group": 9,
				"rent": [38, 170, 520, 1125, 1275, 1425, 1650],
				"mortgageValue": 140,
				"cost": 280,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 200
			},
			"south st": {
				"name": "south st",
				"type": "property",
				"forward": ["broad st"],
				"backward": ["go to jail"],
				"side": [3],
				"track": [2],
				"above": ["roll3"],
				"snapshot": true,
				"group": 10,
				"rent": [45, 210, 575, 1300, 1600, 1800, 3300],
				"mortgageValue": 150,
				"cost": 300,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 250
			},
			"broad st": {
				"name": "broad st",
				"type": "property",
				"forward": ["walnut st"],
				"backward": ["south st"],
				"side": [3],
				"track": [2],
				"above": ["roll3"],
				"snapshot": true,
				"group": 10,
				"rent": [45, 210, 575, 1300, 1600, 1800, 3300],
				"mortgageValue": 150,
				"cost": 300,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 250
			},
			"walnut st": {
				"name": "walnut st",
				"type": "property",
				"forward": ["misfortune outer east"],
				"backward": ["broad st"],
				"side": [3],
				"track": [2],
				"above": ["pacific ave"],
				"snapshot": true,
				"group": 10,
				"rent": [55, 225, 630, 1450, 1750, 2050, 3350],
				"mortgageValue": 160,
				"cost": 320,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 250
			},
			"market st": {
				"name": "market st",
				"type": "property",
				"forward": ["bus ticket east"],
				"backward": ["misfortune outer east"],
				"side": [3],
				"track": [2],
				"above": ["misfortune middle east"],
				"snapshot": true,
				"group": 10,
				"rent": [55, 225, 630, 1450, 1750, 2050, 3350],
				"mortgageValue": 160,
				"cost": 320,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 250
			},
			"mulholland dr": {
				"name": "mulholland dr",
				"type": "property",
				"forward": ["ventura blvd"],
				"backward": ["birthday gift"],
				"side": [3],
				"track": [2],
				"above": ["luxury tax"],
				"snapshot": true,
				"group": 11,
				"rent": [70, 350, 750, 1600, 1850, 2100, 3600],
				"mortgageValue": 175,
				"cost": 350,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"ventura blvd": {
				"name": "ventura blvd",
				"type": "property",
				"forward": ["fortune outer se"],
				"backward": ["mulholland dr"],
				"side": [3],
				"track": [2],
				"above": ["boardwalk"],
				"snapshot": true,
				"group": 11,
				"rent": [80, 400, 825, 1800, 2175, 2550, 4050],
				"mortgageValue": 200,
				"cost": 400,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"rodeo dr": {
				"name": "rodeo dr",
				"type": "property",
				"forward": ["subway"],
				"backward": ["fortune outer se"],
				"side": [3],
				"track": [2],
				"above": ["go"],
				"snapshot": true,
				"group": 11,
				"rent": [90, 450, 900, 2000, 2500, 3000, 4500],
				"mortgageValue": 250,
				"cost": 500,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 300
			},
			"mediterranean ave": {
				"name": "mediterranean ave",
				"type": "property",
				"forward": ["misfortune middle south"],
				"backward": ["go"],
				"side": [0],
				"track": [1],
				"above": ["squeeze play"],
				"below": ["nicollet ave"],
				"snapshot": true,
				"group": 12,
				"rent": [2, 10, 30, 90, 160, 250, 400],
				"mortgageValue": 30,
				"cost": 60,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"baltic ave": {
				"name": "baltic ave",
				"type": "property",
				"forward": ["income tax"],
				"backward": ["misfortune middle south"],
				"side": [0],
				"track": [1],
				"above": ["the embarcadero"],
				"below": ["bus ticket south"],
				"snapshot": true,
				"group": 12,
				"rent": [4, 20, 60, 180, 320, 450, 750],
				"mortgageValue": 30,
				"cost": 60,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"oriental ave": {
				"name": "oriental ave",
				"type": "property",
				"forward": ["fortune middle south"],
				"backward": ["reading railroad"],
				"side": [0],
				"track": [1],
				"above": ["misfortune inner sw"],
				"below": ["esplanade ave"],
				"snapshot": true,
				"group": 13,
				"rent": [6, 30, 90, 270, 400, 550, 900],
				"mortgageValue": 50,
				"cost": 100,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"vermont ave": {
				"name": "vermont ave",
				"type": "property",
				"forward": ["connecticut ave"],
				"backward": ["fortune middle south"],
				"side": [0],
				"track": [1],
				"above": ["bonus"],
				"below": ["fortune outer sw"],
				"snapshot": true,
				"group": 13,
				"rent": [6, 30, 90, 270, 400, 550, 900],
				"mortgageValue": 50,
				"cost": 100,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"connecticut ave": {
				"name": "connecticut ave",
				"type": "property",
				"forward": ["jail"],
				"backward": ["vermont ave"],
				"side": [0],
				"track": [1],
				"above": ["bonus"],
				"below": ["cable company"],
				"snapshot": true,
				"group": 13,
				"rent": [8, 40, 100, 300, 450, 600, 1000],
				"mortgageValue": 60,
				"cost": 120,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 50
			},
			"st charles pl": {
				"name": "st charles pl",
				"type": "property",
				"forward": ["electric company"],
				"backward": ["jail"],
				"side": [1],
				"track": [1],
				"above": ["bonus"],
				"below": ["westheimer rd"],
				"snapshot": true,
				"group": 14,
				"rent": [10, 50, 150, 450, 625, 750, 1200],
				"mortgageValue": 70,
				"cost": 140,
				"owner": null,
				"isMortgaged": false,
				"houses": 0,
				"housePrice": 100
			},
			"states ave": {
				"name": "states ave",
				"type": "property",
				"forward": ["virginia ave"],
				"backward": ["electric company"],
				"side": [1],
				"track": [1],
				"above": ["boylston st"],
				"below": ["kirby dr"],
				"snapshot": true,
				"group": 14,
				"rent": [10, 50, 150, 450, 625, 750, 1200],
				"mortgageValue": 70,
				"cost": 140,
				"owner": null,
				"isMortgaged": false,
			}
		}
	}
}