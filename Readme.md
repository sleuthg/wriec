This readme is for keeping track of development for the WRIEC website.

### The Basics

Installing the application: 
````
npm install
````

Starting the server:
````
npm start
````

Available gulp tasks:
````
gulp default  // styles, scripts and images
gulp styles   // builds css from less source
gulp scripts
gulp images
````

Installing the CSV parser globally:
(this is because we're going to generate the JSON file offline)
````
npm i -g csvtojson
````

### Prioritized To Do List
1. Define the format of the CSV file
2. Parse CSV file to create JSON file
3. Make a gulp task to parse the CSV file and create the JSON file
4. Add filtering capabilities to enable users to find the papers they're looking for.
5. Make the website pretty
6. Make sure to include all the details on the website (introduction, sessions, plenaries, etc...)