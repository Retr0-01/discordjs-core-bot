import DiscordClient from "../classes/DiscordClient";
import Command from "../classes/Command";
import ContextMenu from "../classes/ContextMenu";
import { join } from "path";
import { readdirSync, existsSync } from "fs";
import { REST } from "@discordjs/rest";
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v10";
import { Collection } from "discord.js";
import { token, clientId, guildIds } from "../config.json";

export default class InteractionHandler extends Collection<string, Command | ContextMenu>
{
	readonly client: DiscordClient;

	constructor(client: DiscordClient)
	{
		super();

		this.client = client;
		this.init();
	}

	private async init()
	{
		// Load slash commands.
		let path = join(__dirname, "..", "interactions", "commands");
		let files = readdirSync(path);

		files.forEach((file) =>
		{
			const interactionClass = ((r) => r.default || r)(require(join(path, file)));
			const command: Command = new interactionClass(this.client);

			this.set(command.data.name, command);
			console.log(`Loaded slash command "${command.data.name}"`);

		});

		// Load context menus.
		path = join(__dirname, "..", "interactions", "contextMenus");
		if (existsSync(path))
		{
			files = readdirSync(path);

			files.forEach((file) =>
			{
				const interactionClass = ((r) => r.default || r)(require(join(path, file)));
				const contextMenu: ContextMenu = new interactionClass(this.client);

				this.set(contextMenu.data.name, contextMenu);
				console.log(`Loaded context menu "${contextMenu.data.name}"`);

			});
		}
		else
		{
			console.log("No conext menus loaded! Directory does not exist.");
		}
	}

	async deploy()
	{
		const rest = new REST({ version: "10" }).setToken(token);
		const globalCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
		const guildCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];

		this.forEach(cmd =>
		{
			if (cmd.global) globalCommands.push(cmd.data.toJSON());
			else guildCommands.push(cmd.data.toJSON());
		});

		guildIds.forEach(async (id) =>
		{
			console.log(`Deploying interactions on guild "${id}"`);
			await rest.put(Routes.applicationGuildCommands(clientId, id), { body: guildCommands })
				.then(() => console.log("Successfully registered interactions on all guilds."))
				.catch(console.error);
		});

		console.log("Deploying global interactions...");
		await rest.put(Routes.applicationCommands(clientId), { body: globalCommands })
			.then(() => console.log("Successfully registered global interactions."))
			.catch(console.error);
	}
}
