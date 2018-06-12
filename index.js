const Command = require('command')

module.exports = function AFKer(dispatch) {
	let enabled = true,
		lasttimemoved = null;
	
	dispatch.hook('C_PLAYER_LOCATION', '5', () => {
		if(type === 0) // running
		{
			lasttimemoved = Date.now(); 
		}
	})

	dispatch.hook('C_RETURN_TO_LOBBY', 'raw', () => {
		if (enabled && Date.now() - lasttimemoved >= 3600000) return false; // Prevents you from being automatically logged out while AFK
	})
  
	// ################# //
	// ### Chat Hook ### //
	// ################# //
	
	const command = Command(dispatch)
	command.add('afk', () => {
		enabled = !enabled;
		command.message('[AFKer] ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'));
		console.log('[AFKer] ' + (enabled ? 'enabled' : 'disabled'));
	})
}
