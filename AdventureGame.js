// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require('readline-sync');

// Game state variables
let playerName = "";
let playerHealth = 100;
let playerGold = 20;  // Starting gold
let inventory = [];
let startingLocation = "village";
let isFirstTimePlayer = readline.question("Are you first time player? Enter 'T' for 'true' or 'F' for 'false'");
if(isFirstTimePlayer == "T"){
    isFirstTimePlayer = true;
}else if(isFirstTimePlayer == "F"){
    isFirstTimePlayer = false;
}else{
    console.log("Invalid choice!!! Enter a valid choice either T or F");
    process.exit(); //stops the program here.
}
let currentLocation;

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0;      // Will increase to 10 when player gets a sword
console.log("Starting weapon damage: " + weaponDamage);
console.log("When you buy a sword, weapon damage will increase to 10!");

// Monster defense (affects combat outcomes)
let monsterDefense = 5;    // Monster's defense value
console.log("Monster defense: " + monsterDefense);
console.log("Monsters can withstand some damage in combat!");

// Healing potion restoration (matches final implementation)
let healingPotionValue = 30;  // How much health is restored
console.log("Healing potion value: " + healingPotionValue);
console.log("A potion will restore 30 health!");

console.log("=================================");
console.log("       The Dragon's Quest        ");
console.log("=================================");
console.log("\nYour quest: Defeat the dragon in the mountains!");

// Get player's name
playerName = readline.question("\nWhat is your name, brave adventurer? ");
console.log("\nWelcome, " + playerName + "!");
console.log("You start with " + playerGold + " gold.");


console.log("Starting location : "+ startingLocation);
console.log("First time playing : "+ isFirstTimePlayer);

function showVillage(){
    console.log("\n=== VILLAGE ===\n");
    currentLocation = "village";

    if(isFirstTimePlayer){
        console.log("You're in a bustling village. The blacksmith and market are nearby.");
         
        console.log("\n=== MENU ===")
        console.log("\nWhere do you like to go?");
        console.log("1: Go to blacksmith.");
        console.log("2: Go to market.");
        console.log("3: Enter forest.");
        console.log("4: Check status.");
        console.log("5: Quit game.");
    
        console.log("Villager: 'Welcome, adventurer! Rumor has it there's a dragon in the mountains...'");

        let choice = readline.question("\nEnter your choice (1 to 5) from the menu:");
        choice = parseInt(choice); //convert string to int
        switch(choice){
            case 1:
                showBlacksmith();
                break;
            case 2:
                showMarket();
                break; 
            case 3:
                showForest();
                break; 
            case 4:
                showStatus();
                break;
            case 5:
                quitGame();
                break;
            default:
                console.log("Invalid choice!!! Please choose between 1 to 5.")               
        }
        isFirstTimePlayer = false;
    }else{
        console.log("You're not a fist time player.")
    }
}




function showBlacksmith(){
    console.log("\n=== BLACKSMITH ===\n")
    console.log(`Since you chose otion 1, Welcome to blacksmith.....`);
    currentLocation = "blacksmith";

    console.log("\n=== MENU ===");
    console.log("\n1: Do you want to return to village?");
    console.log("2: Check status");
    console.log("3: Quit game.")

    let choice = readline.question("Enter you choice (1-3) from the menu:");
    choice = parseInt(choice);
    switch(choice){
        case 1:
            showVillage();
            break;
        case 2:
            showStatus();
            break;
        case 3:
            quitGame();
            break;
        default:
            console.log("Invalid choice!!! Please choose 1 to 3.")

    }


    
}


function showMarket(){
    console.log("\n=== MARKET ===\n")
    currentLocation = "market";

    console.log("\n=== MENU ===");
    console.log("\n1: Do you want to return to village?");
    console.log("2: Check status");
    console.log("3: Quit game.")

    let choice = readline.question("Enter you choice (1-3) from the menu:");
    choice = parseInt(choice);
    switch(choice){
        case 1:
            showVillage();
            break;
        case 2:
            showStatus();
            break;
        case 3:
            quitGame();
            break;
        default:
            console.log("Invalid choice!!! Please choose 1 to 3.")

    }



}

function showForest(){
    console.log("\n=== FOREST ===\n")
    currentLocation = "forest";

    console.log("\n=== MENU ===");
    console.log("\n1: Do you want to return to village?");
    console.log("2: Check status");
    console.log("3: Quit game.")

    let choice = readline.question("Enter you choice (1-3) from the menu:");
    choice = parseInt(choice);
    switch(choice){
        case 1:
            showVillage();
            break;
        case 2:
            showStatus();
            break;
        case 3:
            quitGame();
            break;
        default:
            console.log("Invalid choice!!! Please choose 1 to 3.")

    }

}

function showStatus(){
    console.log(`${playerName}'s status: Health=${playerHealth}, Gold=${playerGold}, Current Location=${currentLocation}`)
}

function quitGame(){
    console.log(`Goodbye ${playerName}, See you again!!!`)
}


if(startingLocation==="village"){
    showVillage();
}else if(startingLocation==="blacksmith"){
    showBlacksmith();
}else if(startingLocation==="market"){
    showMarket();
}else if(startingLocation==="forest"){
    showForest();
}else{
    console.log("You're not in game!!!")
}
