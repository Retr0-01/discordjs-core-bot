import { Client, GatewayIntentBits, Partials } from "discord.js";
import EventHandler from "../handlers/EventHandler";
import CommandHandler from "../handlers/CommandHandler";
import { token } from "../config.json";

export default class DiscordClient extends Client
{
	public events = new EventHandler(this);
	public commands = new CommandHandler(this);

	constructor()
	{
		super({
			intents: [
				GatewayIntentBits.Guilds,
			],
			partials: [
				Partials.Channel,
			],
		});

		this.login(token);
	}
}