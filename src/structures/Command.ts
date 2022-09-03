import DiscordClient from "../classes/DiscordClient";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody,
	ApplicationCommandOption,
	ChatInputCommandInteraction,
	ToAPIApplicationCommandOptions,
	AutocompleteInteraction,
} from "discord.js";

export default class Command
{
	readonly client: DiscordClient;
	name = "default";
	description = "No description provided.";
	options: ApplicationCommandOption[] = [];

	constructor(client: DiscordClient)
	{
		this.client = client;
	}

	execute(interaction: ChatInputCommandInteraction)
	{
		throw new Error(`Method not implemented for interaction: ${interaction.commandName}`);
	}

	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		throw new Error(`Autocomplete not implemented for interaction: ${interaction.commandName}`);
	}

	toJSON(): RESTPostAPIApplicationCommandsJSONBody
	{
		const command = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description);

		this.options.forEach((option) =>
		{
			command.options.push(option as unknown as ToAPIApplicationCommandOptions);
		});

		return command.toJSON();
	}
}
