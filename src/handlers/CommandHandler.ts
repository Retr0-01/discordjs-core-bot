import DiscordClient from "../classes/DiscordClient";
import Command from "../structures/Command";
import { join } from "path";
import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Collection } from "discord.js";
import { token, clientId } from "../config.json";

export default class CommandHandler extends Collection<string, Command>
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
		const path = join(__dirname, "..", "commands");
		const files = readdirSync(path);

		files.forEach((file) =>
		{
			const commandClass = ((r) => r.default || r)(require(join(path, file)));
			const command: Command = new commandClass(this.client);

			this.set(command.name, command);
			console.log(`Loaded slash command "${command.name}"`);
		});
	}

	async deploy()
	{
		const commands = this.map((c) => c.toJSON());
		const rest = new REST({ version: "10" }).setToken(token);
		const guilds = this.client.guilds.cache;

		guilds.forEach((guild) =>
		{
			console.log(`Deploying slash commands on guild "${guild.id}"`);
			rest.put(Routes.applicationGuildCommands(clientId, guild.id), { body: commands })
				.then(() => console.log("Successfully registered slash commands on all guilds."))
				.catch(console.error);
		});
	}
}