module.exports = function AFKer(mod) {
	let lastTimeMoved = Date.now();
	const settings = mod.settings,
		command = mod.command;

	mod.hook('C_PLAYER_LOCATION', 5, (event) => {
		if([0,1,5,6].indexOf(event.type) > -1) { // running / walking / jumping / jumping
			lastTimeMoved = Date.now();
		}
	})

	mod.hook('C_RETURN_TO_LOBBY', 'raw', () => {
		if (settings.enabled && Date.now() - lastTimeMoved >= 3600000) return false; // Prevents you from being automatically logged out while AFK
	})

	command.add('afker', {
		$default() {
			settings.enabled = !settings.enabled;
			mod.saveSettings();
			command.message(`${settings.enabled ? 'En' : 'Dis'}abled`);
		}
	});

	this.destructor = () => {
		lastTimeMoved = null;
		command.remove('afker');
	}
}