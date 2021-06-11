var fs = require('fs');

var scenes = fs.readdirSync(__dirname + '/../scenes').slice(1);

scenes = scenes.filter(scene => scene != ".DS_Store")

var objectsArray = [];

for(scene of scenes) {

	var objects = fs.readdirSync(__dirname + '/../scenes/' + scene + "/images");
	objects = objects.filter(object => object.endsWith('.jpg'))
	objects = objects.map(object => object.substr(0, object.lastIndexOf('.')))
	objectsArray.push({name: scene, objects: objects})

}

js = "var scenes = " + JSON.stringify(objectsArray)

fs.writeFile(__dirname + '/../sceneObjects.js', js, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

console.log(objectsArray)