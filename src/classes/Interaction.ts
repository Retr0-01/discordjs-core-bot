import { RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import DiscordClient from "./DiscordClient";

export default class Interaction
{
	readonly client: DiscordClient;

	constructor(client: DiscordClient)
	{
		this.client = client;
	}

	toJSON(): RESTPostAPIApplicationCommandsJSONBody
	{
		throw new Error("Interaction data not implemented.");
	}
}
