title = 'Kliko\'s Hub';
author = 'TheKliko';

const isHexColor = color => /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color);

window.onload = function setup() {
    var body = document.body;
    var iframe = document.getElementsByTagName('iframe')[0];
    var title = document.getElementsByTagName('title')[0];

    var content_background = document.getElementsByClassName('content-background')[0];
    var navbar_top_background = document.getElementsByClassName('navbar-navigation-background')[0];
    var navbar_bottom_background = document.getElementsByClassName('navbar-settings-background')[0];
    
    var content_background_overlay = document.getElementsByClassName('content')[0];
    var navbar_top_background_overlay = document.getElementsByClassName('navbar-navigation')[0];
    var navbar_bottom_background_overlay = document.getElementsByClassName('navbar-settings')[0];

    var settings_popup = document.getElementsByClassName('settings-popup')[0];
    var darkmode_toggle = document.getElementById('darkmode-toggle');
    var background_image_selector = document.getElementById('background-image-selector');
    var overlay_color_selector = document.getElementById('overlay-color-selector');
    var overlay_opacity_selector = document.getElementById('overlay-opacity-selector');
    var opacity_indicator = document.getElementById('overlay-opacity-indicator');
    
    var page = localStorage.getItem('page');
    var theme = localStorage.getItem('theme');
    var settings_state = localStorage.getItem('settings_state');
    var selected_background_image = localStorage.getItem('selected_background_image');
    var selected_background_index = localStorage.getItem('selected_background_index');
    var background_overlay_color = localStorage.getItem('background_overlay_color');
    var background_overlay_opacity = localStorage.getItem('background_overlay_opacity');

    if ('page' in localStorage) {
        var path = 'HTML/'+page+'.html';
    }
    else {
        var page = 'home'
        var path = 'HTML/'+page+'.html';
    }


    // Setting iframe source
    iframe.src = path;
    console.log(title + ' loaded on page: ' + page);
    if (page == 'home') {
        document.getElementById('home').classList.add('home-selected');
    }
    if (page == 'bookmarks') {
        document.getElementById('bookmarks').classList.add('bookmarks-selected');
    }
    if (page == 'projects') {
        document.getElementById('projects').classList.add('projects-selected');
    }
    if (page == 'about me') {
        document.getElementById('about-me').classList.add('about-me-selected');
    }
    title.innerHTML = 'Kliko\'s Hub | '+ capitalizeFirstLetter(page);

    // Setting theme
    if (theme == 'light') {
        body.classList.add('theme-light');
        document.getElementById('home').classList.add('home-light');
        document.getElementById('bookmarks').classList.add('bookmarks-light');
        document.getElementById('projects').classList.add('projects-light');
        document.getElementById('about-me').classList.add('about-me-light');
        document.getElementById('settings').classList.add('settings-light');
    }
    else {      // theme == 'dark'     (default theme)
        body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark')
        darkmode_toggle.checked = true;
        document.getElementById('home').classList.add('home-dark');
        document.getElementById('bookmarks').classList.add('bookmarks-dark');
        document.getElementById('projects').classList.add('projects-dark');
        document.getElementById('about-me').classList.add('about-me-dark');
        document.getElementById('settings').classList.add('settings-dark');
    }
    console.log(title, 'loaded with theme:', theme)

    // Setting settings_popup
    if (settings_state == 'true') {
        settings_popup.style = "";
    }
    else {      // settings_state == 'false'
        settings_popup.style = "display: none;";
    }
    console.log('Loaded settings_popup with state: ' + settings_state);

    // Settings
    // Background
    // Image
    if (selected_background_image == 'none') {
        var style_background_image = "background: #000; background-size: cover; background-attachment: fixed; background-position: center center;";
    }
    else {
        var style_background_image = "background: url("+selected_background_image+"); background-size: cover; background-attachment: fixed; background-position: center center;";
    }
    content_background.style=style_background_image;
    navbar_top_background.style=style_background_image;
    navbar_bottom_background.style=style_background_image;
    background_image_selector.selectedIndex = selected_background_index;

    // Overlay
    if (isHexColor(background_overlay_color)) {
        var background_overlay_color_rgb = hexToRgb(background_overlay_color).r.toString() + ', ' + hexToRgb(background_overlay_color).g.toString() + ', ' + hexToRgb(background_overlay_color).b.toString();
        var background_overlay_opacity_decimal = background_overlay_opacity * 0.01;
    }
    else {
        background_overlay_color = "#787878";
        var background_overlay_color_rgb = hexToRgb(background_overlay_color).r.toString() + ', ' + hexToRgb(background_overlay_color).g.toString() + ', ' + hexToRgb(background_overlay_color).b.toString();
    }
    if ('background_overlay_opacity' in localStorage && background_overlay_opacity >= 0 && background_overlay_opacity <= 100) {
        background_overlay_opacity_decimal = background_overlay_opacity * 0.01;
    }
    else {
        var background_overlay_opacity = 30;
        var background_overlay_opacity_decimal = 0.3;
    }
    var style_background_overlay = "background: rgba("+ background_overlay_color_rgb + ', ' + background_overlay_opacity_decimal + "); background-size: cover; background-attachment: fixed; background-position: center center;";
    overlay_color_selector.value = background_overlay_color;
    overlay_opacity_selector.value = background_overlay_opacity;
    opacity_indicator.innerHTML = background_overlay_opacity;
    content_background_overlay.style=style_background_overlay;
    navbar_top_background_overlay.style=style_background_overlay;
    navbar_bottom_background_overlay.style=style_background_overlay;
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

function change_to_page(page) {
    var iframe = document.getElementsByTagName('iframe')[0];
    var title = document.getElementsByTagName('title')[0];
    var path = 'HTML/'+page+'.html';
    iframe.src = path
    var addedClasslist = page+'-selected';
    // document.getElementsByClassName(page+'-selected').classList.remove(page+'-selected');
    document.getElementById('home').classList.remove('home-selected');
    document.getElementById('bookmarks').classList.remove('bookmarks-selected');
    document.getElementById('projects').classList.remove('projects-selected');
    document.getElementById('about-me').classList.remove('about-me-selected');
    if (page == 'about me') {
        document.getElementById('about-me').classList.add('about-me-selected');
    }
    else {
        document.getElementById(page).classList.add(addedClasslist);
    }
    title.innerHTML = 'Kliko\'s Hub | '+ capitalizeFirstLetter(page);
    localStorage.setItem('page', page)
}

function open_close_settings() {
    var settings_popup = document.getElementsByClassName('settings-popup')[0];
    var settings_state = localStorage.getItem('settings_state');
    if (settings_state == 'true') {
        localStorage.setItem('settings_state', 'false')
        settings_popup.style = "display: none;";
    }
    else {
        localStorage.setItem('settings_state', 'true')
        settings_popup.style = ""
    }
    // window.location.reload();
}

function darkmode_toggle() {
    var theme = localStorage.getItem('theme');

    if (theme == 'dark') {
        localStorage.setItem('theme', 'light');
    }
    else {      // theme == 'light'
        localStorage.setItem('theme', 'dark');
    }
    setTimeout(() => window.location.reload(), 150);
}

function change_background_image() {
    var dropdown = document.getElementById('background-image-selector');
    var input = dropdown.options[dropdown.selectedIndex].value;
    localStorage.setItem('selected_background_index', dropdown.selectedIndex);
    localStorage.setItem('selected_background_image', input);
    // window.location.reload();
}

function change_background_image_preview() {
    var dropdown = document.getElementById('background-image-selector');
    var input = dropdown.options[dropdown.selectedIndex].value;
    
    var content_background = document.getElementsByClassName('content-background')[0];
    var navbar_top_background = document.getElementsByClassName('navbar-navigation-background')[0];
    var navbar_bottom_background = document.getElementsByClassName('navbar-settings-background')[0];

    if (input == 'none') {
        var style_background_image = "background: #000; background-size: cover; background-attachment: fixed; background-position: center center;";
    }
    else {
        var style_background_image = "background: url("+input+"); background-size: cover; background-attachment: fixed; background-position: center center;";
    }
    content_background.style=style_background_image;
    navbar_top_background.style=style_background_image;
    navbar_bottom_background.style=style_background_image;
}

function change_overlay_color() {
    var color_selector = document.getElementById('overlay-color-selector');
    var input = color_selector.value;
    localStorage.setItem('background_overlay_color', input);
    // window.location.reload();
}

function change_overlay_color_preview() {
    var color_selector = document.getElementById('overlay-color-selector');
    var input = color_selector.value;

    var background_overlay_opacity = localStorage.getItem('background_overlay_opacity');
    var content_background_overlay = document.getElementsByClassName('content')[0];
    var navbar_top_background_overlay = document.getElementsByClassName('navbar-navigation')[0];
    var navbar_bottom_background_overlay = document.getElementsByClassName('navbar-settings')[0];
    // Overlay
    var background_overlay_color_rgb = hexToRgb(input).r.toString() + ', ' + hexToRgb(input).g.toString() + ', ' + hexToRgb(input).b.toString();
    if ('background_overlay_opacity' in localStorage && background_overlay_opacity >= 0 && background_overlay_opacity <= 100) {
        background_overlay_opacity_decimal = background_overlay_opacity * 0.01;
    }
    else {
        var background_overlay_opacity = 30;
        var background_overlay_opacity_decimal = 0.3;
    }
    var style_background_overlay = "background: rgba("+ background_overlay_color_rgb + ', ' + background_overlay_opacity_decimal + "); background-size: cover; background-attachment: fixed; background-position: center center;";
    content_background_overlay.style=style_background_overlay;
    navbar_top_background_overlay.style=style_background_overlay;
    navbar_bottom_background_overlay.style=style_background_overlay;
}

function change_overlay_opacity() {
    var opacity_selector = document.getElementById('overlay-opacity-selector');
    var input = opacity_selector.value;
    localStorage.setItem('background_overlay_opacity', input);
    // window.location.reload();
}

function change_overlay_opacity_preview() {
    var opacity_indicator = document.getElementById('overlay-opacity-indicator');
    var opacity_selector = document.getElementById('overlay-opacity-selector');
    var input = opacity_selector.value;
    opacity_indicator.innerHTML = input;
    var background_overlay_color = localStorage.getItem('background_overlay_color');
    var content_background_overlay = document.getElementsByClassName('content')[0];
    var navbar_top_background_overlay = document.getElementsByClassName('navbar-navigation')[0];
    var navbar_bottom_background_overlay = document.getElementsByClassName('navbar-settings')[0];
    // Overlay
    if (isHexColor(background_overlay_color)) {
        var background_overlay_color_rgb = hexToRgb(background_overlay_color).r.toString() + ', ' + hexToRgb(background_overlay_color).g.toString() + ', ' + hexToRgb(background_overlay_color).b.toString();
        var background_overlay_opacity_decimal = input * 0.01;
    }
    else {
        background_overlay_color = "#787878";
        var background_overlay_color_rgb = hexToRgb(background_overlay_color).r.toString() + ', ' + hexToRgb(background_overlay_color).g.toString() + ', ' + hexToRgb(background_overlay_color).b.toString();
    }
    var background_overlay_opacity_decimal = input*0.01;
    var style_background_overlay = "background: rgba("+ background_overlay_color_rgb + ', ' + background_overlay_opacity_decimal + "); background-size: cover; background-attachment: fixed; background-position: center center;";
    content_background_overlay.style=style_background_overlay;
    navbar_top_background_overlay.style=style_background_overlay;
    navbar_bottom_background_overlay.style=style_background_overlay;
}