import DiscordClient from "../classes/DiscordClient";
import Interaction from "../classes/Interaction";
import Command from "../classes/Command";
import ContextMenu from "../classes/ContextMenu";
import { join } from "path";
import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Collection } from "discord.js";
import { token, clientId, guildIds } from "../config.json";

export default class InteractionHandler extends Collection<string, Interaction>
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
		let path: string;
		let files: string[];

		// Load slash commands.
		path = join(__dirname, "..", "interactions", "commands");
		files = readdirSync(path);

		files.forEach((file) =>
		{
			const interactionClass = ((r) => r.default || r)(require(join(path, file)));
			const command: Command = new interactionClass(this.client);

			this.set(command.name, command);
			console.log(`Loaded slash command "${command.name}"`);

		});

		// Load context menus.
		path = join(__dirname, "..", "interactions", "contextMenus");
		files = readdirSync(path);

		files.forEach((file) =>
		{
			const interactionClass = ((r) => r.default || r)(require(join(path, file)));
			const contextMenu: ContextMenu = new interactionClass(this.client);

			this.set(contextMenu.name, contextMenu);
			console.log(`Loaded context menu "${contextMenu.name}"`);
		});
	}

	async deploy()
	{
		const interactions = this.map((c) => c.toJSON());
		const rest = new REST({ version: "10" }).setToken(token);

		guildIds.forEach((id) =>
		{
			console.log(`Deploying interactions on guild "${id}"`);
			rest.put(Routes.applicationGuildCommands(clientId, id), { body: interactions })
				.then(() => console.log("Successfully registered interactions on all guilds."))
				.catch(console.error);
		});
	}
}