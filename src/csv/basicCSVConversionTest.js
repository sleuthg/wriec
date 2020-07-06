/** csv file
 a,b,c
 1,2,3
 4,5,6
 */
const csvFilePath='./wriec_session_titles.csv'
const csv=require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  })

// Async / await usage
const jsonArray=csv().fromFile(csvFilePath);