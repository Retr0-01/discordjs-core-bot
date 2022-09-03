import Event from "../structures/Event";
import { Interaction } from "discord.js";

export default class interactionCreate extends Event
{
	name = "interactionCreate";

	async execute(interaction: Interaction)
	{
		if (interaction.isChatInputCommand())
		{
			await interaction.deferReply();
			const command = this.client.commands.get(interaction.commandName);

			if (!command) return;

			try
			{
				command.execute(interaction);
			}
			catch (error)
			{
				console.error(error);
				await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
			}
		}
		else if (interaction.isAutocomplete())
		{
			const command = this.client.commands.get(interaction.commandName);

			if (!command) return;

			await interaction.respond(
				command.autocomplete(interaction).map(choice => ({ name: choice, value: choice })),
			);
		}
	}
}