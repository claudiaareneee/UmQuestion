# UmQuestion
*UmQuestion* is a message board for students to anonymously post questions to so that teachers can address them. Teachers will be able to designate a classroom for questions to be posted to and delete questions in any classroom they create. Students will be able to post questions to classrooms and advocate for other questions to make them more visible.Admins will be able to manage other accounts and classrooms.


## Github information
Here's the quick git commands:
```
git pull                # check for changes before making changes
# Make your changes
git add .               # add all files to be staged for commit
# OR 
git add filename.js     # add single file to be staged for commit
git commit -m "Write your message inside the quotation marks"   # Commit your changes locally
git pull                # Make sure there are no new changes
git push                # Push your changes to GitHub
```

To clone this repository, navigate to the directory you want to make this project in, and run the following command in your terminal
```
git clone https://github.com/claudiaareneee/UmQuestion.git
```

## Getting started
Installations:
- Install [Node JS](https://nodejs.org/en/download/)
- Run ```npm install```
- Run ```npm install express@4.15.2```
- Run ```npm install socket.io```
- Run ```npm install --save bootstrap```

#OR# just run 
- Run ```npm install```: The package.json will auto install all of our dependenciesn

## To run this project
In order to start the server, run the following command:
```
node app.js
```
Or you could also run
```
npm start
```
These both provide the same function. ```npm start``` runs any commands in the ```script``` object in ```package.json```.
