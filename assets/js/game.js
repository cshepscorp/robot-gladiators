// Game States
// "LOSE" - Player robots's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
// console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
// console.log(enemyNames);
// for(var i = 0; i < enemyNames.length; i++) {
//     console.log(enemyNames[i]);
//     console.log(i);
//     console.log(enemyNames[i] + " is at " + i + " index");
// }

var enemyHealth = 50;
var enemyAttack = 12;

// Note that enemyName here is the arbitrarily named parameter that is used by the function, 
// and is not a reference to the previous enemyName variable used earlier in our code.
var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        //place fight function code block here
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);

    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight ==="FIGHT") {
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        // Subtract the value of 'playerAttack' from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable

        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // check players health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
        // if player chooses to "skip" confirm and then stop the loop  
    } else if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you want to quit?");

        // if yes (true) leave the fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("player money =", playerMoney);
            break;
        }
        // if no (false) then ask question again by running fight() again
        else {
            fight();    
        } 
        // if player didn't enter an acceptable response
    } else {
        window.alert("You need to enter a valid option. Try again!");
    }
    // Alert players that they are starting the round
    // window.alert("Welcome to Robot Gladiators!");
}
    
}

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    // call fight function with enemy-robot
    fight(pickedEnemyName);
}