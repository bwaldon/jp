var sceneAttributes = [{

	"name" : "vehicles",

	"rule" : "No vehicles in the town square.",

	"objects" : [
		"ambulance", "bike", "car", "fireworks", "forklift", "meatsmoker", "mobilityscooter", "motorcycle", "pedalpub", "pogostick", "scooter",
		"skateboard", "speaker", "stilts", "trafficcone"
	],

	"goals" : [
		{"id": "pollution", "text" : "A small town is concerned that air pollution is becoming a problem in their town square.",
		"continuation" : "Because of this, the local government passed a new rule:"},
		{"id": "noise", "text" : "A small town is concerned that there is too much ambient noise in their town square.",
		"continuation" : "Because of this, the local government passed a new rule:"},
		{"id": "safety", "text" : "A small town is concerned for the safety of pedestrians in their town square.",
		"continuation" : "Because of this, the local government passed a new rule:"},
		{"id": "none", "text" : "", 
		"continuation" : "The local government of a small town has passed a new rule for their town square:"}
	],

	"normingPrompts" : [

	{"id": "pollution", "text" : "Is this an object that causes air pollution?",
	"leftEnd" : "Definitely not.", "rightEnd" : "Definitely."},

	{"id": "noise", "text" : "Is this an object that creates lots of noise?",
	"leftEnd" : "Definitely not.", "rightEnd" : "Definitely."},

	{"id" : "safety", "text" : "Is this an object that could pose a danger to pedestrians?",
	"leftEnd" : "Definitely not.", "rightEnd" : "Definitely."},

	{"id" : "typicality", "text" : "How typical is this object for a vehicle?",
	"leftEnd" : "Highly atypical.", "rightEnd" : "Highly typical."},

	{"id" : "prohibition", "text" : "How likely do you think it is that a small town would want to prohibit this object from their town square?",
	"leftEnd" : "Highly unlikely.", "rightEnd" : "Highly likely."},

	{"id" : "nameability", "text" : "How likely would your average English speaker be to call this object a 'vehicle'?",
	"leftEnd" : "Highly unlikely.", "rightEnd" : "Highly likely."},

	{"id" : "inference", "text" : "If your average English speaker said to you, \"I own a vehicle,\" how likely would you be to infer that they own an object similar to this?" ,
	"leftEnd" : "Highly unlikely.", "rightEnd" : "Highly likely."},

	{"id" : "plausibility", "text" : "Is it physically possible for someone to take this object into a town square?"}
	]
	
}, {"name" : "electronics", "objects" : ["boombox", "candle", "cellphone", "champagneglass", "chips", "digitalwatch",
"filmcamera", "flashlight", "hearingaid", "lavalamp", "newspaper", "tablet", "videocam", "videogame", "waterbottle"] }]

