# Discord.js Core Bot
> A fully customizable Discord bot written in TypeScript. Made with Discord.js v14 and Better-SQLite3. Supports slash commands with autocomplete.

This repository contains the core of a Discord bot powered by Discord.js v14 with support for slash commands and autocomplete interactions. With Better-SQLite fully setup, you can easily use this template for your own projects and customize the bot to your needs.

- [Discord.js Core Bot](#discordjs-core-bot)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Installing](#installing)
		- [Building](#building)
	- [Configuration](#configuration)
	- [Creating Commands](#creating-commands)
	- [Using SQLite](#using-sqlite)

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) - v16.9.0 or higher.
* [Git](https://git-scm.com/) - If you want to install the bot using method 3.

### Installing
*Method 1*  
If you want your project to be on GitHub you can simply click the big green `Use this template` button to get started.

*Method 2*
1. Download the [ZIP file](https://github.com/Retr0-01/discordjs-core-bot/archive/main.zip) containing the source code.
1. Extract it to your preferable location.
1. Delete the ZIP file if you want, we won't need it.

*Method 3*
1. Launch a terminal in the directory you want the bot to install.
2. Type:
```batch
git clone https://github.com/Retr0-01/discordjs-core-bot.git
```

### Building
Assuming you have Node.js installed and you are in the directory you installed the bot, open a command prompt and type:
```batch
npm install
```
This will install all the required dependencies the bot needs to function.

## Configuration
Now that the bot is properly installed we need to configurate it. Go into the `src` directory and copy-paste the `example_config.json` file, then rename it to `config.json`.

Option | Description
------------ | -------------
token | Your bot's token. If you don't know what this [learn here.](https://discordjs.guide/preparations/setting-up-a-bot-application.html)
clientId | The client ID of your bot client.
guildIds | An array of Discord server IDs. This is the servers that will have the bot slash commands.

## Creating Commands
To create a new command, go into the `commands` directory and copy-paste the `ping.ts` file. This is the most basic command that exists.  
If you want to see the implementation of command options and autocomplete, check the `annoy.ts` file and use that as a template.  
If you want to see how you can use SQLite check the `addnote.ts`, `removenote.ts` and `getnote.ts` files which implement a simple notes system.

All files are filled with comments which explain the code/logic.

**NOTE:** Commands get automatically deployed by the command handler each time the bot receives the `ready` event, there is nothing else to do on your part.
## Using SQLite
> If you don't want to use SQLite at all, comment out the following line of the `index.ts` file:
> ```ts
> new Sqlite();
> ```

This bot can utilize SQLite to store and retrieve data from a local database. Using the database utility is simple but requires some setup:
- First open the `setup.sql` file inside the db folder.
	- This file contains the SQL queries that get executed each time the database is initiated. Normally you would want to put all your ``CREATE TABLE`` statements in there.
- For each table structure you have in your db, you must create a type for it in order to properly handle the data.
  - Inside the `types` folder create any new interfaces you need.
- `import` Sqlite to the file you want to execute a query.
- Use `Sqlite.prepare()` to prepare a statement, then execute it.

Check the `*note.ts` files  to see an example implementation.
