// Game States
// "WIN" - player robot has defeated all enemy robots
//      * fight all enemy robots
//      * defeat each enemy robot
// "LOSE" - player robot's health is zero or less

var fight = function(enemy) {
    
    // repeat and esecute as long as enemy robot is alive
    while(enemy.health > 0 && playerInfo.health > 0) {

        // Make sure player actually wants to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round?");

        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm they actually want to skip
            var confirmSkip = window.confirm("Are you sure you don't want to fight?");

            // if yes (true) leave the fight (if user clicked OK)
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight! Goodbye!");

                // subtract money from playerMoney for skipping
                Math.max(0, playerInfo.money - 10);
                console.log("player has " + playerInfo.money + " money left");
                break;
            }
        }
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " remaining."
        );
            
        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop since player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";

// ****************************************
//  add loop here with prompt and condition
// ****************************************
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

  var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    }, // comma needed!
    refillHealth: function() {
        if (this.money >= 7) {
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("Sorry. You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            this.attack += 20;
            this.money -= 7;
        }
        else {
            window.alert("Sorry. You don't have enough money!");
        }
    }
}

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

var startGame = function() {
    // reset player stats
    playerInfo.reset();

    // shop
    var shop = function() {
        // ask player what they'd like to do
        var shopOptionPrompt = window.prompt(
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
        switch (shopOptionPrompt) {
            case "refill":
            case "REFILL":
                playerInfo.refillHealth();  
                console.log("player has " + playerInfo.money + " money left");
                break;
            case "upgrade":
            case "UPGRADE":
                playerInfo.upgradeAttack();  
                console.log("player has " + playerInfo.money + " money left");
                break;
            case "leave":
            case "LEAVE":
                window.alert("Leaving the store.");

                // do nothing, so function will end
                break;
            default:
                window.alert("You did not pick a valid option. Try again.");

                // call shop() again to force player to pick a valid option
                shop();
                break;
        }
    };

    // fight() was replaced with a for loop that calls the fight() function multiple times using
    // the element in the enemyNames[i] array as the argument
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight - btw 40 and 60
            pickedEnemyObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName variable's value into the fight function, 
            // where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if player is still alive AND if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask player if they wwant to enter the shop
                var storeConfirm = window.confirm("The fight is over. Visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // function to end the entire game
    var endGame = function() {
        // if player is still alive, they win!
        if (playerInfo.health > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        } else {
            window.alert("You've lost your robot in battle.")
        }

        // ask player if they want to play again
        var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            // restart the game
            startGame();
        }
        else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    };
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};



// start the game when the page loads
startGame();