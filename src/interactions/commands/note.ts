import { ChatInputCommandInteraction, SlashCommandBuilder, AutocompleteInteraction } from "discord.js";
import Command from "../../classes/Command";
import Sqlite from "../../classes/Sqlite";
import Note from "../../types/Note";

// Example slash command. Demonstrates the following:
//	- Subcommands.
//	- State management.
//	- Autocomplete working along with SQLite.
export default class NoteCmd extends Command
{
	data = new SlashCommandBuilder()
		.setName("note")
		.setDescription("Private notes system.")
		.addSubcommand(cmd =>
			cmd.setName("add")
				.setDescription("Add a note to the database.")
				.addStringOption(option =>
					option.setName("title")
						.setDescription("The note's title.")
						.setRequired(true))
				.addStringOption(option =>
					option.setName("description")
						.setDescription("What is this note about.")
						.setRequired(true)))
		.addSubcommand(cmd =>
			cmd.setName("remove")
				.setDescription("Remove a note from the database.")
				.addStringOption(option =>
					option.setName("title")
						.setDescription("The note's title.")
						.setRequired(true)
						.setAutocomplete(true)))
		.addSubcommand(cmd =>
			cmd.setName("get")
				.setDescription("Get a note from the database.")
				.addStringOption(option =>
					option.setName("title")
						.setDescription("The note's title.")
						.setRequired(true)
						.setAutocomplete(true)));

	async execute(interaction: ChatInputCommandInteraction)
	{
		const action = interaction.options.getSubcommand(true);

		if (action === "add")
		{
			const title = interaction.options.getString("title", true);
			const description = interaction.options.getString("description", true);

			// Example of an INSERT query. When run() is executed it returns an Info object.
			// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#runbindparameters---object
			const query = Sqlite.prepare("INSERT INTO 'notes' (noteTitle, noteDescription, createdAt) VALUES (?, ?, datetime('now'))");
			const result = query.run(title, description);
			return await interaction.reply(`Success! Added ${result.changes} note.`);
		}
		else if (action === "remove")
		{
			const title = interaction.options.getString("title", true);

			// Example of a DELETE query. When run() is executed it returns an Info object.
			// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#runbindparameters---object
			const query = Sqlite.prepare("DELETE FROM 'notes' WHERE noteTitle=(?)");
			const result = query.run(title);

			if (result.changes === 0) return interaction.reply({ content: "Note not found.", ephemeral: true });
			return await interaction.reply(`Success! Removed ${result.changes} note(s).`);
		}
		else if (action === "get")
		{
			const title = interaction.options.getString("title", true);

			// Example of a SELECT query. When get() is executed it returns the first found row.
			// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#getbindparameters---row
			const query = Sqlite.prepare("SELECT * FROM 'notes' WHERE noteTitle=(?)");
			const note: Note = query.get(title);

			if (!note) return interaction.reply({ content: "Note not found.", ephemeral: true });
			return interaction.reply(`**${note.noteTitle}**\n>>> ${note.noteDescription}\nCreated At: ${note.createdAt}`);
		}
	}

	// We will utilize the dynamic ability of Autocomplete to show the user the list of current notes
	// from the db while they type.
	autocomplete(interaction: AutocompleteInteraction): string[]
	{
		const focusedOption = interaction.options.getFocused(true);
		const choices: string[] = [];

		if (focusedOption.name === "title")
		{
			// Max of 25 choices at a time.
			const query = Sqlite.prepare("SELECT * FROM notes LIMIT 25");
			// .all() returns an array of all rows from the select query.
			// You must use a custom type so you can handle the data.
			const allNotes: Note[] = query.all();
			allNotes.forEach(note =>
			{
				choices.push(note.noteTitle);
			});
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		return filtered;
	}
}
