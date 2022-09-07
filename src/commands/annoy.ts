import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandStringOption, SlashCommandUserOption } from "discord.js";
import Command from "../structures/Command";

// Example slash command. Demonstrates command options and autocomplete.
// Don't forget to rename the file and the class if you copy-paste this and use it as a snippet.
export default class Annoy extends Command
{
	name = "annoy";
	description = "Make the bot ping someone with an extra message.";
	// Each Command can contain an array of options, these can be any type of supported ApplicationCommandOption
	// https://discordjs.guide/interactions/slash-commands.html#options
	options = [
		new SlashCommandUserOption()
			.setName("user")
			.setDescription("Target user.")
			.setRequired(true),
		new SlashCommandStringOption()
			.setName("message")
			.setDescription("The extra message to send.")
			.setRequired(true)
			.setAutocomplete(true),
	];

	async execute(interaction: ChatInputCommandInteraction)
	{
		const targetUser = interaction.options.getUser("user", true);
		const message = interaction.options.getString("message", true);

		interaction.reply(`Alright, I will annoy ${targetUser.username}`);
		return interaction.channel?.send(`Hey <@${targetUser.id}>, user <@${interaction.user.id}> wants you to ${message}.`);
	}

	// The autocomplete method gets called each time an AutocompleteInteraction is send through intreactionCreate.
	// Inside this method you should eventually return a string array of all the possible choices the user has for an option.
	// You can read the guide below if you want to learn more like implementing autocomplete for multiple choices.
	// https://discordjs.guide/interactions/autocomplete.html
	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		const focusedValue = interaction.options.getFocused();
		const choices: string[] = ["wake up", "go outside and play", "touch grass"];

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		return filtered;
	}
}
