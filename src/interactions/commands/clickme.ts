import { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction } from "discord.js";
import Command from "../../classes/Command";

// Example slash command. Demonstrates button components.
export default class ClickMe extends Command
{
	name = "clickme";
	description = "Sends a button which you can press.";
	buttonIds = [
		"clickMeButton",
		"dontClickMeButton",
	]

	async execute(interaction: ChatInputCommandInteraction)
	{
		const buttons = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("clickMeButton")
					.setLabel("Click Me")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("dontClickMeButton")
					.setLabel("Don't Click Me")
					.setStyle(ButtonStyle.Danger),
			);

		await interaction.reply({ content: "I think you should...", components: [buttons] });
	}

	executeButton(interaction: ButtonInteraction)
	{
		if (interaction.customId === "clickMeButton")
		{
			interaction.reply("Thank you for clicking me :)")
		}
		else
		{
			interaction.reply("Why did you click me? :(")
		}
	}
}
