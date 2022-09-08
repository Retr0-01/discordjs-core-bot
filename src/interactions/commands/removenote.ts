import { ChatInputCommandInteraction, SlashCommandStringOption, AutocompleteInteraction } from "discord.js";
import Command from "../../classes/Command";
import Sqlite from "../../classes/Sqlite";
import Note from "../../types/Note";

// Example slash command. Demonstrates autocomplete working along with SQLite.
// This file along with addnote.ts and getnote.ts implement a simple note system using the database.
export default class RemoveNote extends Command
{
	name = "removenote";
	description = "Remove a note from the database.";
	options = [
		new SlashCommandStringOption()
			.setName("title")
			.setDescription("The note's title.")
			.setRequired(true)
			.setAutocomplete(true),
	];

	async execute(interaction: ChatInputCommandInteraction)
	{
		const title = interaction.options.getString("title", true);

		// Example of a DELETE query. When run() is executed it returns an Info object.
		// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#runbindparameters---object
		const query = Sqlite.prepare("DELETE FROM 'notes' WHERE noteTitle=(?)");
		const result = query.run(title);

		if (result.changes === 0) return interaction.editReply("Note not found. No notes where removed");
		return interaction.reply(`Success! Removed ${result.changes} note(s).`);
	}

	// We will utilize the dynamic ability of Autocomplete to show the user the
	// list of current notes from the db while they type.
	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		const focusedValue = interaction.options.getFocused();
		const choices: string[] = [];

		// Max of 25 choices at a time.
		const query = Sqlite.prepare("SELECT * FROM 'notes' LIMIT 25");
		// .all() returns an array of all rows from the select query.
		// You must use a custom type so you can handle the data.
		const allNotes: Note[] = query.all();
		allNotes.forEach(note =>
		{
			choices.push(note.noteTitle);
		});

		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		return filtered;
	}
}
