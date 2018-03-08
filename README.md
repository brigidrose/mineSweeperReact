#Minesweeper - A React Learning Experience

In this personal exercise I attempted to apply the knowledge learned in recent React tutorials while also building a game that implemented new common gaming algorithms I had recently learned. I am writing a readme so I can come back to this later and remember my thought process. I haven't done this in the past, and I regreted it! Yay learning from mistakes!

##Tools Used

-JavaScript (mixture of ES5 + 6 because I'm still learning all the differences)
-React
-Mocha/Chai


##Major Difficulties Encountered

-Flood Fill Algorithm: had never heard of this, had to find examples in other minesweeper projects. 
-Neighbor count algorithm: Knew about Moore Neighbor algorithm, had no idea how to implement it. 
-Testing: I've really only ever written tests for python so I had to get up to speed quickly on Mocha/Chai/Jest. Unfortunately, I ran out of time and was only able to implement a small number of tests.  Important note: I know that I should use my source code while testing, but I was having trouble integrating my test code and my source without needing to make alterations to the source. This is why I added the app.js file. I promise that what I lack in current knowledge, I make up for with enthusiasm and a willingness to learn!
-React build process: I'm not yet very familiar with the React build process, so I first worked by testing things out using the html document. My intent  in the future is to refactor all my code so that it will be a well structured example of a React build environment. At the moment I just used a quick fix to make everthing work which was adding it to the top of my index.js. WORK IN PROGRESS!

##Stylistic Decisions

At first, I thought about creating 4 different components in React - timer, game (including type and new game button), board, and mineButton. Despite this, I eventually came to the conclusion that it would be easier/less code if all of these components were combined into one by making one class that had multiple methods. I recently had a mentor go over my code and they suggested I should have stuck with plan A. Not only is this more appropriate from a stylistic perspective, but having more components would have made it easier for me to figure out how to do unit testing. Side note to self: must do more practice/work on learing more about different testing methods.

##Resources Used
-Minesweeper examples:
https://codepen.io/morgulking75/pen/BjwxMG
http://therealmofcode.com/posts/2012/11/building-minesweeper-game-using-javascript-html-css.html
https://github.com/zminic/minesweeper.js

-Testing documentation:
http://chaijs.com/guide/styles/
https://codeburst.io/how-to-test-javascript-with-mocha-the-basics-80132324752e
https://medium.freecodecamp.org/simple-react-testing-d9e25ec87e2s