import DiscordClient from "../classes/DiscordClient";
import Event from "../structures/Event";
import Sqlite from "../classes/Sqlite";

export default class Ready extends Event
{
	name = "ready";
	once = true;

	async execute(client: DiscordClient): Promise<void>
	{
		await client.commands.deploy();

		Sqlite.setup();

		console.log(`Ready! Logged in as "${this.client.user?.tag}"`);
	}
}