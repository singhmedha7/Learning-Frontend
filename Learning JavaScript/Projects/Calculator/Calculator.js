// Automatically resizes the window when the app opens
window.addEventListener('DOMContentLoaded', () => {
    // Set your target width and height in pixels
    const appWidth = 277; 
    const appHeight = 520; 

    window.resizeTo(appWidth, appHeight);
});

let currentDisplay = '';
document.querySelector('#display').value = currentDisplay;
