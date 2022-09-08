import ContextMenu from "../../classes/ContextMenu";
import { ApplicationCommandType, MessageContextMenuCommandInteraction } from "discord.js";

export default class PrintMessage extends ContextMenu
{
	name = "Print Message";
	type = ApplicationCommandType.Message;

	async execute(interaction: MessageContextMenuCommandInteraction)
	{
		const msg = await interaction.targetMessage.fetch(true);

		await interaction.reply({ content: `CONTENT: ${msg.content}`, ephemeral: true });
	}
}