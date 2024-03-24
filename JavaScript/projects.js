title = 'Kliko\'s Hub';
author = 'TheKliko';

const isHexColor = color => /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);

window.onload = function setup() {
    // theme
    var theme = localStorage.getItem('theme');
    if (theme == 'light') {
        document.body.classList.add('light');
    }
    else {      // theme == 'dark'     (default theme)
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark')
    }

    // images
    var image_html_hub = "../Images/Projects/HTML/Klikos-Hub.png";

    var image_mod_kliko = "../Images/Projects/Roblox-mods/Klikos-mod.png";
    var image_mod_2015UI = "../Images/Projects/Roblox-mods/2015-UI.png";
    var image_mod_bloxstrap = "../Images/Projects/Roblox-mods/bloxstrap-theme.png";
    var image_mod_synthwave = "../Images/Projects/Roblox-mods/synthwave-theme.png";

    document.getElementById('klikos-hub-v6').src = image_html_hub;
    document.getElementById('klikos-hub-v5').src = image_html_hub;

    document.getElementById('Klikos-mod').src = image_mod_kliko;
    document.getElementById('2015-ui').src = image_mod_2015UI;
    document.getElementById('synthwave-theme').src = image_mod_synthwave;
    document.getElementById('bloxstrap-theme').src = image_mod_bloxstrap;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}