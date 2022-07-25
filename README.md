# Ethereum addresses management and transaction simulation application

## To run the Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## To run the Tests

### `npm run test`

Runs application tests in console mode.

### Code Decisions
- I separated the app in Components, Pages, Services and Utils, so it's structured in a way that we should know where to find if we are looking to something specific
- I used Hooks because I prefere them to classes
- Unless I use to work with axios, I used fetch to call the API because it's just 1 GET call
- I used Bootstrap to manage easely the structure and avoid to have a lot of CSS
- Each screen has his own .scss file. Common styles are in the common.scss
### Tests
- I added the test divided in 4 categories
### Extra Features
- I used the API suggested, but as the API returns the result in wei -> 10^18 wei = 1 ETH, I did the conversion but the result was ugly, so finally I used a random to show the balance
- I added the feature to copy the addresses because I found it useful, it also helped me a lot while testing
- I added a button to go back to 'My Ethereum addresses' page so we can check that the form worked properly

### Git Issue
- I use to work creating a branch for each feature but I didn't have time. I just created one branch for this update of the README just to show how I use to work.