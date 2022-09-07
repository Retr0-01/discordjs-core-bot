import { ChatInputCommandInteraction, SlashCommandStringOption } from "discord.js";
import Command from "../structures/Command";
import Sqlite from "../classes/Sqlite";

// Example slash command. Demonstrates autocomplete working along with SQLite.
// Don't forget to rename the file and the class if you copy-paste this and use it as a snippet.
export default class AddNote extends Command
{
	name = "addnote";
	description = "Add a note to the database.";
	options = [
		new SlashCommandStringOption()
			.setName("title")
			.setDescription("The note's title.")
			.setRequired(true),
		new SlashCommandStringOption()
			.setName("description")
			.setDescription("What is this note about.")
			.setRequired(true),
	];

	// This file along with removenote.ts and getnote.ts implement a simple note system using the database.
	async execute(interaction: ChatInputCommandInteraction)
	{
		const title = interaction.options.getString("title", true);
		const description = interaction.options.getString("description", true);

		// Example of an INSERT query. When run() is executed it returns an Info object.
		// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#runbindparameters---object
		const query = Sqlite.prepare("INSERT INTO 'notes' (noteTitle, noteDescription, createdAt) VALUES (?, ?, datetime('now'))");
		const result = query.run(title, description);
		return interaction.reply(`Success! Added ${result.changes} note.`);
	}
}
