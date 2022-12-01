# Slack MindMattr Bot

### Requirements

1. Node JS https://nodejs.org/en/download/


### Installation

1. Extract the zip onto a folder
2. Open terminal or CMD and cd onto the folder. (If you're on mac just drag the folder to the terminal!)
3. Run `npm install`
4. Rename `sample.env` file to `.env` and add all tokens aquired in the `Creating the bot on Slack` and `Creating Database`sections.
5. Run `npm start`
6. The bot is running!

### Creating the bot on Slack

1. Go to https://api.slack.com/
2. Log into your account. You may be redirected to another page. Please return to the page above if redirected after logging in
3. Click on Create a new App
4. Choose from Manifest
5. Choose JSON
6. Copy all the contents in the manifest.json file inside this folder and paste it there
7. Create bot
8. Install bot in your workspace. Under basic information, scroll down, click on Generate Tokens and Scopes underneath where it says App-Level Tokens 
9. Name it whatever you want, click on add scope and add the following scopes: `connection:write`
10. Click on Generate Token and copy the app token, then return to settings.json and paste it inside of the quotation marks in the SLACK_APP_TOKEN field.
11. Copy the signing secret in the same page and paste it inside of the quotation marks in the SLACK_SIGNING_SECRET field in settings.json.
12. Go to the OAuth & Permissions page and copy the bot token and user token, then return to settings.json and paste them inside of the quotation marks in the SLACK_BOT_TOKEN field AND SLACK_USER_TOKEN field.


### Creating database

1. Head to https://www.mongodb.com/try/download/community
2. Create an account
3. Create a free cluster
4. Wait for cluster to be created
5. Once created, please head to Network Access and whitelist your IP or enable all IPs to be able to connect to it
6. Head to Database
7. Click Connect
8. Choose Connect Using MongoDB Compass
9. Replace `<password>` with the password you created for the database
10. Copy the connection string and paste it inside of the quotation marks in the MONGO_CONNECTION_STRING field in settings.json



### API CALLS

Please refer to https://lopsided-koi-602.notion.site/Mindmattr-API-Documentation-f826cd8dc6d24149a191299046945fec for API Documentation.
