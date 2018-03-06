// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    // Set the player initial location
    this.x = 202;
    this.y = 405;

    // Draw the player
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.initial = function() {
    // Return the player to the starting position
    this.y = 405;
    this.x = 202;      
};

Player.prototype.reset = function() {
    // Action to take when the player reaches the water
    // or collides with an enemy
    setTimeout(function() {
        player.initial()
    }, 500);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Move the player on screen according to the pressed key
    if (key === 'left') {
        this.x = this.x - 101;
    } else if (key === 'up') {
        this.y = this.y - 83;
    } else if (key === 'right') {
        this.x = this.x +  101;
    } else if (key === 'down') {
        this.y = this.y + 83;
    };

    // Make sure the player does not exit the canvas
    if  (this.x < 0) {
        this.x = 0;
    };
    if  (this.x > 404) {
        this.x = 404;
    };

    if  (this.y < 0) {
        this.y = -10;
    };
    if  (this.y > 405) {
        this.y = 405;
    };

    //Send player back to initial position if it reaches the water
    if  (this.y <= -10) {
        player.reset();
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player          
var allEnemies = [];

var player = new Player(); //*** place the Player object in here!!!


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
