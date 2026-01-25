// ===========================================
// The Dragon's Quest - Text Adventure Game
// A progression-based learning project
// ===========================================

// Include readline for player input
const readline = require("readline-sync");

// Game state variables
let gameRunning = true;
let playerName = "";
let playerHealth = 100;
let playerGold = 20; // Starting gold
let currentLocation = "village";

// Weapon damage (starts at 0 until player buys a sword)
let weaponDamage = 0; // Base weapon damage
let monsterDefense = 5; // Monster's defense value
let healingPotionValue = 30; // How much health is restored

// Item templates with properties
const healthPotion = {
  name: "Health Potion",
  type: "potion",
  value: 5, // Cost in gold
  effect: 30, // Healing amount
  description: "Restores 30 health points",
};

const sword = {
  name: "Sword",
  type: "weapon",
  value: 10, // Cost in gold
  effect: 10, // Damage amount
  description: "A sturdy blade for combat",
};

const steelSword = {
    name: "Steel Sword",
    type: "weapon",
    value: 20, // Cost in gold
    effect: 15, // Damage amount
    description: "A sharp steel blade for combat",
  };

const shield = {
    name : "Wooden Shield",
    type : "armor",
    value : 8, //cost in gold
    effect : 5, //protection amount
    description : "Reduces damage taken in combat"

}

const ironShield = {
    name : "Iron Shield",
    type : "armor",
    value : 15, //cost in gold
    effect : 10, //protection amount
    description : "Reduces damage taken in combat thank wood sheild"

}

// Create empty inventory array (from previous lab)
let inventory = []; // Will now store item objects instead of strings

// ===========================
// Display Functions
// Functions that show game information to the player
// ===========================

/**
 * Shows the player's current stats
 * Displays health, gold, and current location
 */
function showStatus() {
  console.log("\n=== " + playerName + "'s Status ===");
  console.log("❤️  Health: " + playerHealth);
  console.log("💰 Gold: " + playerGold);
  console.log("📍 Location: " + currentLocation);

  // Enhanced inventory display with item details
  console.log("🎒 Inventory: ");
  if (inventory.length === 0) {
    console.log("   Nothing in inventory");
  } else {
    inventory.forEach((item, index) => {
      console.log(
        "   " + (index + 1) + ". " + item.name + " - " + item.description
      );
    });
  }
}

/**
 * Shows the current location's description and available choices
 */
function showLocation() {
  console.log("\n=== " + currentLocation.toUpperCase() + " ===");

  if (currentLocation === "village") {
    console.log(
      "You're in a bustling village. The blacksmith and market are nearby."
    );
    // console.log("\nWhat would you like to do?");
    console.log("1: Go to blacksmith");
    console.log("2: Go to market");
    console.log("3: Enter forest");
    console.log("4: Check status");
    console.log("5: Use item");
    console.log("6: Help");
    
    console.log("7: Quit game");
    console.log("8: Enter mountains");
  } else if (currentLocation === "blacksmith") {
    console.log(
      "The heat from the forge fills the air. Weapons and armor line the walls."
    );
    // console.log("\nWhat would you like to do?");
    console.log("1: Buy sword or armor)");
    console.log("2: Return to village");
    console.log("3: Check status");
    console.log("4: Use item");
    console.log("5: Help");
    console.log("6: Quit game");
  } else if (currentLocation === "market") {
    console.log(
      "Merchants sell their wares from colorful stalls. A potion seller catches your eye."
    );
    // console.log("\nWhat would you like to do?");
    console.log("1: Buy potion");
    console.log("2: Return to village");
    console.log("3: Check status");
    console.log("4: Use item");
    console.log("5: Help");
    console.log("6: Quit game");
  } else if (currentLocation === "forest") {
    console.log(
      "The forest is dark and foreboding. You hear strange noises all around you."
    );
    // console.log("\nWhat would you like to do?");
    console.log("1: Return to village");
    console.log("2: Check status");
    console.log("3: Use item");
    console.log("4: Help");
    console.log("5: Quit game");
  }else if (currentLocation === "mountains") {
    console.log("The mountains are treacherous. The dragon awaits!");
    console.log("1: Fight the dragon");
    console.log("2: Return to village");
    console.log("3: Check status");
    console.log("4: Use item");
    console.log("5: Help");
    console.log("6: Quit game");
  }

}

// ===========================
// Combat Functions
// Functions that handle battles and health
// ===========================

/**
 * Checks if player has an item of specified type
 * @param {string} type The type of item to check for
 * @returns {boolean} True if player has the item type
 */
function hasItemType(type) {
  return inventory.some((item) => item.type === type);
}

/**
 * Handles monster and dragon battles
 * @returns {boolean} isDragon - true if facing the dragon
 * @returns {boolean} true if player wins, false if they retreat or lose
 */
function handleCombat(isDragon = false) {
    //Determine monster stats:
    const monsterDamage = isDragon ? 20 : 10;
    const monsterHealth = isDragon ? 50 : 20;


    //Automatically select the best weapon and armor
    const weapon = getBestItem("weapon");
    const armor = getBestItem("armor");

    //if dragon require good equipment
    if(isDragon && !hasGoodEquipment()){
        console.log("DRAGON ROARS! You donot have good equipment to fight....\n Go get some good equipment.");
        updateHealth(-30);  //penalty for trying unprepared
        return false;
    }

    //check if player has good equipment
    if(!weapon){
        console.log("Without a weapon, you must retreat!!!");
        updateHealth(-20);
        return false;

    }

    //display chosen equipment
    console.log("You have entered the battle!");
    console.log(`Weapon used: ${weapon.name} (Damage: ${weapon.effect})`);

    if(armor){
        console.log(`Armor used: ${armor.name} (Protection: ${armor.effect})`);
    }else{
        console.log("No Armor equipped.")
    }

    //calculate damage dealt to the monster
    const damageDealt = Math.max(1, weapon.effect); //min 1

    //calculate damage taken by the player
    const protection = armor? armor.effect : 0;
    const damageTaken = Math.max(1, monsterDamage - protection); //min 1

    //Apply damage to the player
    updateHealth(-damageTaken);


    //determine victory:
    if(isDragon){
        console.log("Victory! you defeated dragon and earned 100 gold!")
        playerGold += 100;

        // Special ending for dragon
        console.log("\n🎉 Congratulations! You completed The Dragon's Quest! 🎉");
        console.log(`Final stats: Health: ${playerHealth}, Gold: ${playerGold}`);
        gameRunning = false; // ends the game
    }else{
        console.log("Victory! you defeated monster and won 10 gold!")
        playerGold +=10;
    }
     
    return true;
}

/**
 * Updates player health, keeping it between 0 and 100
 * @param {number} amount Amount to change health by (positive for healing, negative for damage)
 * @returns {number} The new health value
 */
function updateHealth(amount) {
  playerHealth += amount;

  if (playerHealth > 100) {
    playerHealth = 100;
    console.log("You're at full health!");
  }
  if (playerHealth < 0) {
    playerHealth = 0;
    console.log("You're gravely wounded!");
  }

  console.log("Health is now: " + playerHealth);
  return playerHealth;
}

// ===========================
// Item Functions
// Functions that handle item usage and inventory
// ===========================


/**
 * Displays the player's inventory
 */
function checkInventory() {
    console.log("\n=== INVENTORY ===");
    if (inventory.length === 0) {
      console.log("Your inventory is empty!");
      return;
    }
  
    // Display all inventory items with numbers and descriptions
    inventory.forEach((item, index) => {
      console.log(index + 1 + ". " + item.name + " - " + item.description);
    });
  }

/**
 * Handles using items like potions
 * @returns {boolean} true if item was used successfully, false if not
 */
function useItem() {
  if (inventory.length === 0) {
    console.log("\nYou have no items!");
    return false;
  }

  console.log("\n=== Inventory ===");
  inventory.forEach((item, index) => {
    console.log(index + 1 + ". " + item.name);
  });

  let choice = readline.question("Use which item? (number or 'cancel'): ");
  if (choice === "cancel") return false;

  let index = parseInt(choice) - 1;
  if (index >= 0 && index < inventory.length) {
    let item = inventory[index];

    if (item.type === "potion") {
      console.log("\nYou drink the " + item.name + ".");
      updateHealth(item.effect);
      inventory.splice(index, 1);
      console.log("Health restored to: " + playerHealth);
      return true;
    } else if (item.type === "weapon") {
      console.log("\nYou ready your " + item.name + " for battle.");
      return true;
    }
  } else {
    console.log("\nInvalid item number!");
  }
  return false;
}

/*
Returns all items in the inventory of a given type
@param {string} type - eg, "weapon" or "armor"
@returns {array} Array of matching item objects
*/
function getItemsByType(type){
    return inventory.filter(i => i.type === type);

}


/*
Returns the item with highest effect value of a given type
@param {string} type - eg, "weapon" or "armor"
@returns {object| null} The best item or null if none found
*/
function getBestItem(type){
    const items = getItemsByType(type); // get all items of this type

    if(items.length === 0){
        return null;                //no items of this type found.
    }

    //find the item with highest effect
    return items.reduce((best, item)=>{
        return item.effect > best.effect ? item : best ;
    }, items[0]);

}



/**
 * checks if the player is well-equipped for the dragon
 * Requires steel sword and any armor
 * @returns {boolean} True if ready, false otherwise
 */
 
function hasGoodEquipment(){
    //check for steel sword
    const hasSteelSword = inventory.some(i => i.type === "weapon" && i.name === "Steel Sword");

    const hasArmor = inventory.some(i => i.type === "armor");

    return hasSteelSword && hasArmor;
}



// ===========================
// Shopping Functions
// Functions that handle buying items
// ===========================

/**
 * Handles purchasing items at the blacksmith
 */
function buyFromBlacksmith() {
    console.log("Weapons and Armors are available:");
    console.log("0: Steel Sword - 20 gold, deals 15 damage");
    console.log("1: Sword - 10 gold, deals 10 damage");
    console.log("2: Wooden Shield - 8 gold, reduces damage by 5");
    console.log("3: Iron Shield - 20 gold, reduces damage by 15");

    let choice = readline.question("Which one do you want to buy? (number or cancel):");
    if(choice === "cancel"){
        return;
    }

    let choiceNum = parseInt(choice);

    let itemToBuy;
    if(choiceNum === 0){
        itemToBuy = {...steelSword};
    }else if(choiceNum === 1){
        itemToBuy = {...sword};
    }else if(choiceNum === 2){
        itemToBuy = {...shield};
    }else if(choiceNum === 3){
        itemToBuy = { ...ironShield }
    }else{
        console.log("Invalid choice");
    }

    if(playerGold >= itemToBuy.value){
        inventory.push(itemToBuy);
        playerGold -= itemToBuy.value;
        console.log(`you purchased ${itemToBuy.name} for ${itemToBuy.value} gold.`);
    }else{
        console.log("Not enough gold to make this purchase!!!");
    }

}

/**
 * Handles purchasing items at the market
 */
function buyFromMarket() {
    console.log(`Potion available: Health Potion - ${healthPotion.value} gold, restores ${healthPotion.effect} Health Potion`);

    let choice = readline.question("Buy Potion?  (YES/NO):")

    if(choice.toLowerCase()=== "yes"){
        if(playerGold >= healthPotion.value){
            inventory.push({...healthPotion});
            playerGold -=healthPotion.value;
            console.log("Potion purchased.");
        }else{
            console.log("Not enough gold to make this purchase!");
        }
    }
  
}

// ===========================
// Help System
// Provides information about available commands
// ===========================

/**
 * Shows all available game commands and how to use them
 */
function showHelp() {
  console.log("\n=== AVAILABLE COMMANDS ===");

  console.log("\nMovement Commands:");
  console.log("- In the village, choose 1-3 to travel to different locations");
  console.log(
    "- In other locations, choose the return option to go back to the village"
  );

  console.log("\nBattle Information:");
  console.log("- You need a weapon to win battles");
  console.log("- Weapons have different damage values");
  console.log("- Monsters appear in the forest");
  console.log("- Without a weapon, you'll lose health when retreating");

  console.log("\nItem Usage:");
  console.log("- Health potions restore health based on their effect value");
  console.log(
    "- You can buy potions at the market for " + healthPotion.value + " gold"
  );
  console.log(
    "- You can buy a sword at the blacksmith for " + sword.value + " gold"
  );

  console.log("\nOther Commands:");
  console.log("- Choose the status option to see your health and gold");
  console.log("- Choose the help option to see this message again");
  console.log("- Choose the quit option to end the game");

  console.log("\nTips:");
  console.log("- Keep healing potions for dangerous areas");
  console.log("- Defeat monsters to earn gold");
  console.log("- Health can't go above 100");
}

// ===========================
// Movement Functions
// Functions that handle player movement
// ===========================

/**
 * Handles movement between locations
 * @param {number} choiceNum The chosen option number
 * @returns {boolean} True if movement was successful
 */
function move(choiceNum){
    if (currentLocation === "village") {
        if (choiceNum === 1) {
        currentLocation = "blacksmith";
        } else if (choiceNum === 2) {
        currentLocation = "market";  
        } else if (choiceNum === 3) {
        currentLocation = "forest";
        console.log("\nA monster appears");
        handleCombat();
        }else if(choiceNum === 8){
        currentLocation = "mountains";
        }
  } else if (currentLocation === "blacksmith" || currentLocation ==="market" || currentLocation === "forest") {
        if(choiceNum === 2 || choiceNum === 1){
        currentLocation = "village";
        }
    }
    else if(currentLocation === "mountains"){
        if(choiceNum === 2){
            currentLocation = "village";
        }else if(choiceNum === 1){
            handleCombat(true); //dragon fight

        }
    }  
}

// ===========================
// Input Validation
// Functions that validate player input
// ===========================

/**
 * Validates if a choice number is within valid range
 * @param {string} input The user input to validate
 * @param {number} max The maximum valid choice number
 * @returns {boolean} True if choice is valid
 */
function isValidChoice(input, max) {
  if (input === "") return false;
  let num = parseInt(input);
  return num >= 1 && num <= max;
}

// ===========================
// Main Game Loop
// Controls the flow of the game
// ===========================

if (require.main === module) {
  console.log("=================================");
  console.log("       The Dragon's Quest        ");
  console.log("=================================");
  console.log("\nYour quest: Defeat the dragon in the mountains!");

  // Get player's name
  playerName = readline.question("\nWhat is your name, brave adventurer? ");
  console.log("\nWelcome, " + playerName + "!");
  console.log("You start with " + playerGold + " gold.");

  while (gameRunning) {
    // Show current location and choices
    showLocation();

    // Get and validate player choice
    let validChoice = false;
    while (!validChoice) {
      try {
        let choice = readline.question("\nEnter choice (number): ");

        // Check for empty input
        if (choice.trim() === "") {
          throw "Please enter a number!";
        }

        // Convert to number and check if it's a valid number
        let choiceNum = parseInt(choice);
        if (isNaN(choiceNum)) {
          throw "That's not a number! Please enter a number.";
        }

        // Handle choices based on location
        if (currentLocation === "village") {
          if (choiceNum < 1 || choiceNum > 8) {
            throw "Please enter a number between 1 and 8.";
          }

          validChoice = true;

          if (choiceNum <= 3) {
            move(choiceNum);
          } else if (choiceNum === 4) {
            showStatus();
          } else if (choiceNum === 5) {
            useItem();
          } else if (choiceNum === 6) {
            showHelp();
          } else if (choiceNum === 7) {
            gameRunning = false;
            console.log("\nThanks for playing!");
          }else if(choiceNum === 8){
            move(choiceNum);
          }
        } else if (currentLocation === "blacksmith") {
          if (choiceNum < 1 || choiceNum > 6) {
            throw "Please enter a number between 1 and 6.";
          }

          validChoice = true;

          if (choiceNum === 1) {
            buyFromBlacksmith();
          } else if (choiceNum === 2) {
            move(choiceNum);
          } else if (choiceNum === 3) {
            showStatus();
          } else if (choiceNum === 4) {
            useItem();
          } else if (choiceNum === 5) {
            showHelp();
          } else if (choiceNum === 6) {
            gameRunning = false;
            console.log("\nThanks for playing!");
          }
        } else if (currentLocation === "market") {
          if (choiceNum < 1 || choiceNum > 6) {
            throw "Please enter a number between 1 and 6.";
          }

          validChoice = true;

          if (choiceNum === 1) {
            buyFromMarket();
          } else if (choiceNum === 2) {
            move(choiceNum);
          } else if (choiceNum === 3) {
            showStatus();
          } else if (choiceNum === 4) {
            useItem();
          } else if (choiceNum === 5) {
            showHelp();
          } else if (choiceNum === 6) {
            gameRunning = false;
            console.log("\nThanks for playing!");
          }
        } else if (currentLocation === "forest") {
          if (choiceNum < 1 || choiceNum > 5) {
            throw "Please enter a number between 1 and 5.";
          }

          validChoice = true;

          if (choiceNum === 1) {
            move(choiceNum);
          } else if (choiceNum === 2) {
            showStatus();
          } else if (choiceNum === 3) {
            useItem();
          } else if (choiceNum === 4) {
            showHelp();
          } else if (choiceNum === 5) {
            gameRunning = false;
            console.log("\nThanks for playing!");
          }
        }else if (currentLocation === "mountains") {
            if (choiceNum < 1 || choiceNum > 6) {
              throw "Please enter a number between 1 and 6.";
            }
          
            validChoice = true;
          
            if (choiceNum === 1) {
              move(choiceNum); // fight dragon
            } else if (choiceNum === 2) {
              move(choiceNum); // return to village
            } else if (choiceNum === 3) {
              showStatus();
            } else if (choiceNum === 4) {
              useItem();
            } else if (choiceNum === 5) {
              showHelp();
            } else if (choiceNum === 6) {
              gameRunning = false;
              console.log("\nThanks for playing!");
            }
          }
          
      } catch (error) {
        console.log("\nError: " + error);
        console.log("Please try again!");
      }
    }

    // Check if player died
    if (playerHealth <= 0) {
      console.log("\nGame Over! Your health reached 0!");
      gameRunning = false;
    }
  }
}
