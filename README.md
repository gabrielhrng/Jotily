# Jotily: A Web Application for Study Management
It's finally here! Jotily, the web application where you take control of your study and study the way you like to! Jotily combines 6 features that students use most when studying so that you won't have to jump from app to app, tab to tab!

## Features
Jotily has 6 features, including:
* A tasklist
* Kanban Board
* Stopwatch
* Music Player
* Pomodoro Timer
* Reading List link saver

This is all tied together through a clean slide interface.

## Development

### Stopwatch and Pomodoro Timer 
Although seemingly more appropriate according to users to implement a flow track timer, the pomodoro timer was chosen to be in the final prototype, due to time and skill level constraints. Creating an automated flow track timer and embeding that into the stopwatch functionality was too ambitious of a task and was scrapped for a more feasible solution. Users complained about the pomodoro timer for not being having enough feedback. This was improved by putting a progress bar at the top, across the screen. When the counter went down and users could see visually how far along they were in their study block or rest block.  

![Left: Mockup, Right: Prototype](/public/img/stopwatch%20comparison.png)

### Music Player
Based on user feedback before the development of the application, the music player was deemed as a distraction by our users whom attempted to study. Althought it had good reason to not be included, it was proposed to initially have very little functionality i.e. limited songs, no skip button/s. However in trying it out, it became even more distracting for users to not have control over this function and hence standard functionality was inplemented back into this feature. The final prototype still retains limited tracks for users to not be tempted to  "DJ" while doing work.

![Left: Mockup, Right: Prototype](/public/img/music%20player%20comparison.png)

### Kanban Board
The Kanban Board was difficult to implement into the final prototype, as it was a pre-existing library that had an established structure. Basic work was done to conform the kanban board to fit into the aesthetic of the application, make sure that users could add their tasks on the board and could freely move their tasks from one board to another. Ideally, the kanban board would replace the tasklist, which the tasklist functioning as a pop up menu when a task was to be added. In the end, it was not possible to combine the tasklist and the board together, due to the complexity of the library.

### Reading List Creator
Initially a button for updating the html link was planned, however, post converting the code from JQuery, feedback from the tutor rendered the update function pointless. As this was a web application, it was suggested that users would merely add another link in the list and remove the old link. Each link could be opened up individually, but opening all of the tabs in one go was a challenge. This feature was not able to be done in the final prototype.

![Left: Mockup, Right: Prototype](/public/img/reading%20list%20comparison.png)

## Help
When using command "npm run start", there is an error with the server.js file (renamed to index.js), script code in package.json can be changed to this: 
```
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "parcel build ./public/index.html",
    "dev": "parcel serve ./public/index.html"
  }
```
