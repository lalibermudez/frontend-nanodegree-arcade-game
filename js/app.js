let speed = 100;
let y;
let level = 1;
let numEnemies = 2;
var executed = false;

// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -202;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.y = this.y;
    // Make the enemy loop around when it exits the canvas
    if (this.x > 505) {
        this.x = -101;
    };
    
    // Check for collisions between enemy and player
    this.collision();
};

// Function to update Hearts when collision happens
function updateHearts(life) {
    switch (life) {
        case 4:
            document.getElementById('life5').innerHTML = "<i class='material-icons'>favorite_border</i>";
            break;
        case 3:
            document.getElementById('life4').innerHTML = "<i class='material-icons'>favorite_border</i>";
            break;
        case 2:
            document.getElementById('life3').innerHTML = "<i class='material-icons'>favorite_border</i>";
            break;
        case 1:
            document.getElementById('life2').innerHTML = "<i class='material-icons'>favorite_border</i>";
            break;
        case 0:
            document.getElementById('life1').innerHTML = "<i class='material-icons'>favorite_border</i>";
            setTimeout(function() {
                $('#myModal').modal('show');
                gameOverSound.play();    
            }, 1200);
            $('.btn-primary').click(function() {
                location.reload();
            });
            break;
    };
};

// Function to decrease player's life by one, when collision occurs
// Function with closure to be executed only once during the if statement in the enemy.collision method
// Closure function obtained from https://stackoverflow.com/questions/12713564/function-in-javascript-that-can-be-called-only-once
var decreaseLife = (function() {
    return function() {
        if (!executed) {
            executed = true;
            player.life -= 1;
            return player.life;
        }
    };   
})();

// Action to take when collision happens: play sound, player reset, decrease one heart
Enemy.prototype.collision = function() {
    if ((this.x >= player.x - 50) && (this.x <= player.x + 50) && (this.y === player.y)) {
        setTimeout(function() {
            player.reset()
        }, 100);
        collisionSound.play();
        decreaseLife();
        updateHearts(player.life);
    };
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
    this.life = 5;
};

Player.prototype.update = function(dt) {
};

Player.prototype.reset = function() {
    // Action to take when the player reaches the water
    // or collides with an enemy
    this.y = 405;
    this.x = 202;
    executed = false;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    // Move the player on screen according to the pressed key
    if (key === 'left') {
        this.x -= 101;
    } else if (key === 'up') {
        this.y -= 83;
    } else if (key === 'right') {
        this.x += 101;
    } else if (key === 'down') {
        this.y += 83;
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

    // If player reaches the water, send it back to initial position
    // and increase level number, this increases the number of Enemies
    if  (this.y <= -10) {
        levelUp();
    };
};

function levelUp () {
    level += 1;
    resetEnemies();
    createEnemies();
    winSound.play();
    document.getElementById("level").innerHTML = level;
    setTimeout(function() {
        player.reset()
    }, 600);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player          
var allEnemies = [];

function createEnemies() {
    for (var i = 0; i < numEnemies ; i++) {
        chooseRow();
        chooseSpeed();
        allEnemies.push(new Enemy(y, speed));
    };
};
createEnemies();

// Reset enemies for every new level
function resetEnemies() {
    numEnemies = level + 1;
    for (var i = 0; i < numEnemies ; i++) {
        allEnemies.pop();
    };
};

var player = new Player();

// Generate the enemies' positions

// Generate a random integer between two inclusive numbers, source: MDN
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

// Choose randomly one of the rows that the enemy may use
function chooseRow() {
    let row = getRandomInt(1, 3);
    if (row === 1) {
        y = 73;
    } else if (row === 2) {
        y = 156;
    } else if (row === 3) {
        y = 239;
    }
    return y;
};

// Choose randomly the speed the enemy is going to use
function chooseSpeed() {
    let speedMin = 100;
    let speedMax = 300;
    let randomSpeed = getRandomInt(speedMin, speedMax);
    speed = randomSpeed;
};

// This creates an object constructor to handle sounds for the game with HTML5 <audio> element
// From https://www.w3schools.com/graphics/game_sound.asp
var Sound = function(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    };
};

// Create new sound objects
// All sounds obtained from http://soundbible.com/
var winSound = new Sound("sounds/TaDa.mp3");
var collisionSound = new Sound("sounds/StrangeSlip.mp3");
var gameOverSound = new Sound("sounds/SadTrombone.mp3");


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

// Restart game if refresh button is clicked
document.getElementById("refresh-button").addEventListener("click", function( event ) {
    location.reload();
  }, false);
