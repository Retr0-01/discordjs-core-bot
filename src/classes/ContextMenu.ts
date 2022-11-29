import { ContextMenuCommandBuilder,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction } from "discord.js";
import DiscordClient from "./DiscordClient";

/**
 * Derive from this class to create a new context menu interaction.
 * https://discordjs.guide/interactions/context-menus.html
 */
export default class ContextMenu
{
	readonly client: DiscordClient;

	data: ContextMenuCommandBuilder = new ContextMenuCommandBuilder()
	global = false;

	constructor(client: DiscordClient)
	{
		this.client = client;
	}

	execute(interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction)
	{
		throw new Error(`Method not implemented for context menu: ${interaction.commandName}`);
	}
}
