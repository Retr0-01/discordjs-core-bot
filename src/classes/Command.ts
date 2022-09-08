import Interaction from "./Interaction";
import { SlashCommandBuilder,
	ApplicationCommandOption,
	ChatInputCommandInteraction,
	AutocompleteInteraction,
	RESTPostAPIApplicationCommandsJSONBody,
	ToAPIApplicationCommandOptions,
} from "discord.js";

/**
 * Derive from this class to create a new slash command interaction.
 * https://discordjs.guide/interactions/slash-commands.html
 */
export default class Command extends Interaction
{
	name = "default";
	description = "No description provided.";
	options?: ApplicationCommandOption[] = [];

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

		if (this.options)
		{
			this.options.forEach((option) =>
			{
				command.options.push(option as unknown as ToAPIApplicationCommandOptions);
			});
		}

		return command.toJSON();
	}
}