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