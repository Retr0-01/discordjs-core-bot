import { ChatInputCommandInteraction } from "discord.js";
import Command from "../../classes/Command";

// Example slash command. The simplest type of command to exist.
// Don't forget to rename the file and the class if you copy-paste this and use it as a snippet.
export default class Ping extends Command
{
	// The slash command's name that gets shown on the Discord client.
	name = "ping";
	// Similar to name.
	description = "Pong. Check if the bot is up and running smoothly.";

	// The execute function is called when a user enters the slash command.
	// It gets called by the interactionCreate event.
	// ALWAYS use interaction.editReply() when replying, that's because we use interaction.deferReply();
	// inside the interactionCreate event. Using intreaction.reply() will throw an error.
	async execute(interaction: ChatInputCommandInteraction)
	{
		const rtt = Math.abs(Date.now() - interaction.createdTimestamp);
		const websocketHeartbeat = Math.floor(this.client.ws.ping);

		return interaction.reply(`Pong! \n> Websocket Heartbeat: **${websocketHeartbeat}ms**\n> Roundtrip Latency: **${rtt}ms**`);
	}
}
