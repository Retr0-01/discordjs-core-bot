import ContextMenu from "../../classes/ContextMenu";
import { ApplicationCommandType, UserContextMenuCommandInteraction, EmbedBuilder } from "discord.js";

export default class GetUserInfo extends ContextMenu
{
	name = "Get User Info";
	type = ApplicationCommandType.User;

	async execute(interaction: UserContextMenuCommandInteraction)
	{
		const user = await interaction.targetUser.fetch(true);
		const userCreated = user.createdAt.toString().split(" ");

		const whoisEmbed = new EmbedBuilder()
			.setTitle(user.tag)
			.setDescription(`<@${user.id}> - ID: ${user.id}\nJoined Discord: ${userCreated[2]} ${userCreated[1]} ${userCreated[3]}`)
			.setThumbnail(`${user.avatarURL()}`)
			.setColor("Random")
			.setTimestamp();

		await interaction.reply({ embeds: [whoisEmbed], ephemeral: true });
	}
}