import Interaction from "./Interaction";
import { ApplicationCommandType,
	ContextMenuCommandBuilder,
	MessageContextMenuCommandInteraction,
	RESTPostAPIApplicationCommandsJSONBody,
	UserContextMenuCommandInteraction,
} from "discord.js";

/**
 * Derive from this class to create a new context menu interaction.
 * https://discordjs.guide/interactions/context-menus.html
 */
export default class ContextMenu extends Interaction
{
	name = "default";
	type = ApplicationCommandType.User;

	execute(interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction)
	{
		throw new Error(`Method not implemented for context menu: ${interaction.commandName}`);
	}

	toJSON(): RESTPostAPIApplicationCommandsJSONBody
	{
		const command = new ContextMenuCommandBuilder()
			.setName(this.name)
			.setType(this.type as number);

		return command.toJSON();
	}
}
