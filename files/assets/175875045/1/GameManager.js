var GameManager = pc.createScript('gameManager');
GameManager.attributes.add('restartButton', { type: 'entity' });
GameManager.attributes.add('character', { type: 'entity' });
GameManager.attributes.add('weight', { type: 'number',default:0 });
GameManager.attributes.add('index', { type: 'number',default:0 });
// initialize code called once per entity
GameManager.prototype.initialize = function() {
    this.restartButton.button.on('click', function () {
       this.fullScreen();
    }, this);

    // var button = div.querySelector('.btn');
    // console.log(button)
    // // if found
    // if (button) {
    //     // add event listener on `click`
    //     button.addEventListener('click', function() {
    //         console.log("i am called")
    //     }, false);
    // }
    // console.log()

};

// update code called every frame
GameManager.prototype.update = function(dt) {
    
};
GameManager.prototype.fullScreen = function(event) {
    var canvas = this.app.graphicsDevice.canvas;
    // Check if fullscreen is supported
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {
        var fullscreenChangeEvent = function() {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                console.log('Fullscreen mode activated');
            } else {
                console.log('Exited fullscreen mode');
            }
        };
        
        document.addEventListener('fullscreenchange', fullscreenChangeEvent);
        document.addEventListener('webkitfullscreenchange', fullscreenChangeEvent);
        document.addEventListener('mozfullscreenchange', fullscreenChangeEvent);
        document.addEventListener('MSFullscreenChange', fullscreenChangeEvent);

        console.log("i am called");
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen();
            } else if (canvas.mozRequestFullScreen) {
                canvas.mozRequestFullScreen();
            } else if (canvas.msRequestFullscreen) {
                canvas.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        
    } else {
        console.warn('Fullscreen API is not supported');
    }
};

// uncomment the swap method to enable hot-reloading for this script
// update the method body to copy state from the old instance
// GameManager.prototype.swap = function(old) { };

// learn more about scripting here:
// https://developer.playcanvas.com/user-manual/scripting/