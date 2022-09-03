import { ChatInputCommandInteraction, SlashCommandStringOption, AutocompleteInteraction } from "discord.js";
import Command from "../structures/Command";
import Sqlite from "../classes/Sqlite";
import Note from "../types/Note";

// Example slash command. Demonstrates autocomplete working along with SQLite.
// Don't forget to rename the file and the class if you copy-paste this and use it as a snippet.
export default class GetNote extends Command
{
	name = "getnote";
	description = "Fetch a note from the database.";
	options = [
		new SlashCommandStringOption()
			.setName("title")
			.setDescription("The note's title.")
			.setRequired(true)
			.setAutocomplete(true),
	];

	// This file along with addnote.ts and removenote.ts implement a simple note system using the database.
	async execute(interaction: ChatInputCommandInteraction)
	{
		const title = interaction.options.getString("title", true);

		// Example of a SELECT query. When get() is executed it returns the first found row.
		// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#getbindparameters---row
		const query = Sqlite.prepare("SELECT * FROM 'notes' WHERE noteTitle=(?)");
		const note: Note = query.get(title);

		if (!note) return interaction.editReply("No note found.");
		return interaction.editReply(`**${note.noteTitle}**\n>>> ${note.noteDescription}\nCreated At: ${note.createdAt}`);
	}

	// We will utilize the dynamic ability of Autocomplete to show the user the list of current notes
	// from the db while they type.
	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		const focusedValue = interaction.options.getFocused();
		const choices: string[] = [];

		// Max of 25 choices at a time.
		const query = Sqlite.prepare("SELECT * FROM notes LIMIT 25");
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
