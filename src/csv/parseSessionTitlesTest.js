// file system module to perform file operations
const fs = require('fs');

// conversion from csv to JSON
const csv=require('csvtojson')

// CSV files
const sessTitlesCSV='./wriec_session_titles.csv'
const sessionsCSV='./wriec_sessions.csv'
const teachingSessCSV='./teaching_sessions.csv'

let i,j;

let organizeAuthors = function (papers, maxAuth) {
  // Loop over the papers and organize the authors
  for (i=0; i<papers.length; i++) {
    papers[i].authors = [];
    for (j=1; j<=maxAuth; j++) {
      if (papers[i]['Author '+j] !== "") {
        papers[i].authors.push({
          author: papers[i]['Author '+j],
          affiliation: papers[i]['Affiliation '+j]
        });
      }
    }
  }
  return papers;
}

// Do the conversion and save the JSON file
csv().fromFile(sessTitlesCSV).then(function(sessions) {
  csv().fromFile(sessionsCSV).then(function(papers) {
    papers = organizeAuthors(papers,4);

    // Add the papers to the appropriate sessions
    for (i=0; i<sessions.length; i++) {
      sessions[i].papers = papers.filter(paper => paper.Session === sessions[i].ID);
    }

    // Add the teaching session data
    csv().fromFile(teachingSessCSV).then(function(teaching) {
      teaching = organizeAuthors(teaching, 2);

      // Create a structure with all of the website model data
      const all_data = {research: sessions, teaching: teaching};

      // stringify JSON Object
      const jsonContent = JSON.stringify(all_data);
      console.log(jsonContent);

      fs.writeFile("wriec_sessions.json", jsonContent, 'utf8', function (err) {
        if (err) {
          console.log("An error occurred while writing JSON Object to File.");
          return console.log(err);
        }

        console.log("JSON file has been saved.");
      });

    });

  });

});
