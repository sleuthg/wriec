// file system module to perform file operations
const fs = require('fs');

// conversion from csv to JSON
const csv=require('csvtojson')

// CSV files
const sessTitlesCSV='./wriec_session_titles.csv'
const sessionsCSV='./wriec_sessions.csv'

// Do the conversion and save the JSON file
var sessions, papers;
csv().fromFile(sessTitlesCSV).then(function(sessions) {

  csv().fromFile(sessionsCSV).then(function(papers) {

    var i,j;

    // Loop over the papers and organize the authors
    for (i=0; i<papers.length; i++) {
      papers[i].authors = [];
      for (j=1; j<=4; j++) {
        if (papers[i]['Author '+j] !== "") {
          papers[i].authors.push({
            author: papers[i]['Author '+j],
            affiliation: papers[i]['Affiliation '+j]
          });
        }
      }

    }

    // Add the papers to the appropriate sessions
    for (i=0; i<sessions.length; i++) {
      sessions[i].papers = papers.filter(paper => paper.Session === sessions[i].ID);
    }
    console.log(sessions);
    console.log(sessions[0].papers);

    // stringify JSON Object
    var jsonContent = JSON.stringify(sessions);
    console.log(jsonContent);

    fs.writeFile("wriec_sessions.json", jsonContent, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }

      console.log("JSON file has been saved.");
    });

  })

});
