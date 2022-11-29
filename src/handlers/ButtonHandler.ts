import DiscordClient from "../classes/DiscordClient";
import Command from "../classes/Command";
import { Collection } from "discord.js";

export default class ButtonHandler extends Collection<string, Command>
{
	readonly client: DiscordClient;

	constructor(client: DiscordClient)
	{
		super();

		this.client = client;
		this.init();
	}

	private async init()
	{
		// Register buttons.
		this.client.interactions.forEach(interaction =>
		{
			if (interaction instanceof Command)
			{
				if (interaction.buttonIds)
				{
					interaction.buttonIds.forEach(buttonId =>
					{
						this.set(buttonId, interaction);
						console.log(`Loaded button "${buttonId}"`);
					});
				}
			}
		});
	}
}
