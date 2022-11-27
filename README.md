# RoTMG Trading Companion
Are you tired of trading in the traditional way? With this discord bot trading in Realm of The Mad God becomes much easier!

## Built with:
* [Discord.js](https://discord.js.org/#/)
* [Axios](https://github.com/axios/axios)
* [Express](https://expressjs.com/)
* [MySQL](https://www.npmjs.com/package/mysql)
* [body-parser](https://www.npmjs.com/package/body-parser)

## Configuration:
 1) Download [node.js](https://nodejs.org/en/)
 2) Import rotmgtb.sql file to your database
 3) Go to api.js file in api directory and change mysql login credentials
 4) Go to config.json and input all your bot data
 5) Go to commands/delto.js & listtos.js & newto.js and change path to config.js in line 3
 6) When all steps above is done run your api with: ```npm api.js```
 7) If api is running deploy commands with: ```npm deploy-commands.js``` then run bot with: ```npm bot.js```

 ## Available commands:
 ```/info``` - Lists available commands

 ![/info](https://i.imgur.com/p6kBIit.png)

 ```/newto``` - adds new trade offer 

![/newto](https://i.imgur.com/zjY5Icl.png)

```/delto``` - deletes specified trade offer

![/delto](https://i.imgur.com/K0gJ33y.png)

```/listtos``` - lists all your trade offers in DM

![/listtos](https://i.imgur.com/WQJnx4l.png)

## Auto channel clearing 
To avoid spam, every full hour bot checks for offers that is past 24 hours. If trade offer has been posted more than 24 hours past from check it gets deleted.

# Contributing
If you have some ideas that you want to suggest please make a [pull requests](https://github.com/yunglean4171/RoTMG-Trading-Companion/pulls) and if you found some bugs please make an [issue](https://github.com/yunglean4171/RoTMG-Trading-Companion/issues). Every contribution will be appreciated.
