const csvFilePath='./xjur_attributes - Sheet1.csv'
const csv=require('csvtojson')
const fs=require('fs')

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    js = "var attributes = " + JSON.stringify(jsonObj)
    fs.writeFile(__dirname + '/../sceneAttributes.js', js, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log("successfully wrote file.")
	})
})