// file system module to perform file operations
const fs = require('fs');

// conversion from csv to JSON
const csv=require('csvtojson')

// CSV files
const sessTitlesCSV='./wriec_session_titles.csv'
const sessionsCSV='./wriec_sessions.csv'
const teachingSessCSV='./teaching_sessions.csv'

// Destination
const jsonFileDest = '../../app/routes/wriec_sessions.json'

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

let uniqueArray = function(x) {
  let counting = 0;
  let found = false;
  let y = [];
  for (i=0; i<x.length; i++) {
    for (j=0; j<y.length; j++) {
      if (x[i].author == y[j].author) {
        found = true;
      }
    }
    counting++;
    if (counting==1 && found==false) {
      y.push(x[i]);
    }
    found = false;
    counting = 0;
  }
  return y;
}

let aggregateAuthors = function (papers) {
  let authors = [];
  for (i=0; i<papers.length; i++) {
    for (j=0; j<papers[i].authors.length; j++) {
      authors.push(papers[i].authors[j]);
    }
  }
  authors = uniqueArray(authors);
  authors = authors.sort(function(a,b) {
    const nameA = a.author.toUpperCase();
    const nameB = b.author.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    return 1;
  });
  return authors;
}

let uniqueArray2 = function(x) {
  let counting = 0;
  let found = false;
  let y = [];
  for (i=0; i<x.length; i++) {
    for (j=0; j<y.length; j++) {
      if (x[i] == y[j]) {
        found = true;
      }
    }
    counting++;
    if (counting==1 && found==false) {
      y.push(x[i]);
    }
    found = false;
    counting = 0;
  }
  return y;
}

let aggregateKeywords = function (papers) {
  let keywords = [];
  const re = /\s*(?:,|$)\s*/
  for (i=0; i<papers.length; i++) {
    const kw = papers[i].Keywords.split(re);
    for (j=0; j<kw.length; j++) {
      keywords.push(kw[j].toLowerCase());
    }
  }
  keywords = uniqueArray2(keywords);
  keywords = keywords.sort();
  return keywords;
}

// module.exports = function parse_wriec_csv(cb) {
// Do the conversion and save the JSON file
  csv().fromFile(sessTitlesCSV).then(function (sessions) {
    csv().fromFile(sessionsCSV).then(function (papers) {
      papers = organizeAuthors(papers, 5);

      // Add the papers to the appropriate sessions
      for (i = 0; i < sessions.length; i++) {
        sessions[i].papers = papers.filter(paper => paper.Session === sessions[i].ID);
      }

      // Add the teaching session data
      csv().fromFile(teachingSessCSV).then(function (teaching) {
        teaching = organizeAuthors(teaching, 2);
        const authors = aggregateAuthors(papers);
        const keywords = aggregateKeywords(papers);

        // Create a structure with all of the website model data
        const all_data = {
          research: sessions,
          teaching: teaching,
          authors: authors,
          keywords: keywords
        };

        // stringify JSON Object
        const jsonContent = JSON.stringify(all_data);
        //console.log(jsonContent);

        fs.writeFile(jsonFileDest, jsonContent, 'utf8', function (err) {
          if (err) {
            console.log("An error occurred while writing JSON Object to File.");
            // cb(new Error('kaboom'));
          }

          console.log("JSON file has been saved.");
          // cb();
        });

      });

    });

  });
// }
