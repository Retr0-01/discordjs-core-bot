# Discord.js Core Bot
> A fully customizable Discord bot written in TypeScript. Made with Discord.js v14 and Better-SQLite3.

This repository contains the core of a Discord bot powered by Discord.js v14 with support for slash commands, autocomplete interactions, buttons and context menus. With Better-SQLite fully setup, you can easily use this template for your own projects and customize the bot to your needs.

- [Discord.js Core Bot](#discordjs-core-bot)
	- [Getting Started](#getting-started)
		- [Prerequisites](#prerequisites)
		- [Installing](#installing)
		- [Building](#building)
	- [Configuration](#configuration)
	- [Interactions](#interactions)
		- [Slash Commands](#slash-commands)
		- [Autocomplete](#autocomplete)
		- [Buttons](#buttons)
		- [Context Menus](#context-menus)
	- [Using SQLite](#using-sqlite)

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/download/) - v16.9.0 or higher.
* [Git](https://git-scm.com/) - If you want to install the bot using method 3.

### Installing
*Method 1*  
If you want your project to be on GitHub you can simply click the big green **Use this template** button to get started.

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

| Option   | Description                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| token    | Your bot's token. If you don't know what this [learn here.](https://discordjs.guide/preparations/setting-up-a-bot-application.html) |
| clientId | The client ID of your bot client.                                                                                                   |
| guildIds | An array of Discord server IDs for guild-only commands.                                          |

## Interactions
The core bot fully supports slash commands, autocomplete interactions, button interactions and context menus.

**NOTE:** Slash commands and context menus get automatically deployed to the guilds you have set in your config by the interaction handler each time the bot receives the `ready` event, there is nothing else to do on your part.

### Slash Commands
To create a new slash command, go into ``/interactions/commands/`` and create a new class which derives from the ``Command`` class.  
The folder is filled with some example commands which showcase slash commands, command options, subcommands, buttons, autocomplete and usage with the database. Feel free to delete them if you want. 

### Autocomplete
Each slash command which has at least one option which enables autocomplete can implement an ``autocomplete()`` method which returns an array of strings. Make sure you filter your strings according to the user's currently typed focused value. For example:
```ts
autocomplete(interaction: AutocompleteInteraction): string[]
{
   const focusedValue = interaction.options.getFocused();
   const choices: string[] = ["First Option", "Second Option", "Third Option"];

   const filtered = choices.filter(choice => choice.startsWith(focusedValue));
   return filtered;
}
```

### Buttons
If one of your slash commands sends a button through an interaction, you can implement the button logic inside the same class for convenience using the ``executeButton()`` method. When you finish building your buttons make sure to register the custom IDs you have set in the ``buttonIds`` array, otherwise the bot won't be able to reply to the button interactions.
You can see the clickme command for a simple implementation of two buttons.

### Context Menus
> You are free to delete the context menus directory if you don't want to implement context menus.

Go into ``/interactions/contextMenus/`` and create a new context menu command which derives from the ``ContextMenu`` class. Make sure you also use the correct type in the execute method's interaction parameter according to the type of your context menu (``UserContextMenuInteraction`` for ``ApplicationCommandType.User`` and ``MessageContextMenuInteraction`` for ``ApplicationCommandType.Message``).

## Using SQLite
> If you don't want to use SQLite at all, comment out the following line of the `index.ts` file:
> ```ts
> new Sqlite();
> ```

This bot can utilize SQLite to store and retrieve data from a local database. Using the database utility is simple but requires some setup:
- Modify the `setup.sql` file inside the db folder.
	- This file contains queries that get executed each time the database is started, in other words, *every time your bot starts*.
- For each table structure you have in your db, you must create a type for it in order to properly handle the data you receive.
  - Inside the `types` folder create any new interfaces you need.
- Use `Sqlite.prepare()` to prepare a statement, then execute it.

Check the `note.ts` file to see an example implementation.
