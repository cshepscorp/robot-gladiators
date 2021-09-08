// var playerName = 'Yackety Yack';
var playerName = window.prompt("What is your robot's name?");
console.log("Our robot's name is " + playerName);

var playerHealth = 60;
var playerAttack = 10;
var playerMoney = 10;

// log multiple values at once like so
// console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// console.log(enemyNames);
// console.log(enemyNames.length);
// for(var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }
var enemyHealth = 50;
var enemyAttack = 12;

// Game States
// "WIN" - player robot has defeated all enemy robots
//      * fight all enemy robots
//      * defeat each enemy robot
// "LOSE" - player robot's health is zero or less

var fight = function(enemyName) {
    // repeat and esecute as long as enemy robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {

        // Make sure player actually wants to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this round?");

        // if player chooses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm they actually want to skip
            var confirmSkip = window.confirm("Are you sure you don't want to fight?");

            // if yes (true) leave the fight (if user clicked OK)
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");

                // subtract money from playerMoney for skipping
                Math.max(0, playerMoney - 10);
                console.log("player has " + playerMoney + " money left");
                break;
            }
        }
        
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = Math.max(0, enemyHealth - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = Math.max(0, playerHealth - damage);
        
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " remaining."
        );
            
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // leave while() loop since player is dead
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

// fight();

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
  
    return value;
  };

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    // shop
    var shop = function() {
        // ask player what they'd like to do
        var shopOptionPrompt = window.prompt(
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
        switch (shopOptionPrompt) {
            case "refill":
            case "REFILL":
              if (playerMoney >= 7) {  
                alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                
              } else {
                  alert("You don't have enough money!");
              }

              break;
            case "upgrade":
            case "UPGRADE":
              if (playerMoney >= 7) {  
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
              } else {
                  alert("You don't have enough money!");
              }  

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
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));

            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // reset enemyHealth before starting new fight - btw 40 and 60
            enemyHealth = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedEnemyName variable's value into the fight function, 
            // where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if player is still alive AND if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
        if (playerHealth > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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

