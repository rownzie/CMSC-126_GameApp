// Initialize player and opponent health
var player = 100;
var opponent = 100;

// Initialize player and opponent attack damage
var playerDamage = 0;
var oppDamage = 0;
	
function attack() {
  // Generates random attack damage
  var damage = Math.round(Math.random() * 5);

  return damage;
}

function tossCoin () {
  // Generates random coin toss
  var coin = Math.round(Math.random());

  // Obtains user-preferred coin face
  var temp = document.getElementById("coin");
  var coinPlayer = Number(temp.options[temp.selectedIndex].value);

  // If coin face is the same with user's choice
  if (coin == coinPlayer) {
    // Enable the attack button
    document.getElementById("attack").disabled = false;

    // Display information about coin
    if (coin) document.getElementById('result').innerHTML = "Coin is tails. <b> You chose tails! </b>";
    else document.getElementById('result').innerHTML = "Coin is heads. <b> You chose heads!";
  } else {
    // Opponent prepares for attack
    oppDamage = attack();
    oppAbsorb = 0;

    // Enable buttons
    document.getElementById("attack").disabled = false;
    document.getElementById("defend").disabled = false;

    // Display information about coin
    if (coin) document.getElementById('result').innerHTML = "Coin is tails. <b> You chose heads. </b>";
    else document.getElementById('result').innerHTML = "Coin is heads. <b> You chose tails. </b> ";
  }

  // Disable coin toss options
  document.getElementById("coin").disabled = true;
  document.getElementById("coinTosser").disabled = true;

  // Show reset button
  document.getElementById("reset").style.display = "block";
}

function oppAction (didAttack) {
  // Determine action of opponent randomly
  var oppAction = Math.round(Math.random());

  // Ensures that buttons are enabled
  document.getElementById("attack").disabled = false;
  document.getElementById("defend").disabled = false;

  // Opponent attacks
  if (oppAction) {
    // Subtract opponent's health with player damage
    opponent -= playerDamage;

    // Generate random damage
    oppDamage = attack();

    // Display status
    // document.getElementById("result").innerHTML += "<br> Opponent attacks!";
    if (playerDamage) document.getElementById("result").innerHTML += "<br> You inflict <b>" + playerDamage + "</b> damage!";
  // Opponent defends
  } else {
    // Reset opponent damage
    oppDamage = 0;
    // Store player damage for comparison
    temp = playerDamage;

    // Absorb player damage up to 3
    playerDamage -= 3;
    // If damage is negative, damage will be 0
    if (playerDamage < 0) playerDamage = 0;

    // Subtract opponent's health with player damage
    opponent -= playerDamage;

    // Display status
    // document.getElementById("result").innerHTML += "<br> Opponent defends!";
    if (temp && playerDamage) document.getElementById("result").innerHTML = "<br> You inflict <b>" + playerDamage + "</b> damage!";
    else if (temp && !playerDamage) document.getElementById("result").innerHTML = "<br> The opponent completely blocked the attack!";
  }

  // Print health
  printHealth ();
}

function playerAttack () {
  // Subtract player's health with opponent damage
  player -= oppDamage;

  // Generate random damage
  playerDamage = attack();

  // Display status
  document.getElementById("result").innerHTML = "<br> <b> You will attack! </b>";
  if (oppDamage) document.getElementById("result").innerHTML = "<br> Opponent inflicts <b>" + oppDamage + " </b> damage!";

  // Generate opponent action, indicating that player will attack
  oppAction (1);

  // Check health of player and opponent
  checkHealth ();
}

function playerDefend () {
  // Reset player damage
  playerDamage = 0;
  // Store opponent damage for comparison
  temp = oppDamage;

  // Absorb opponent damage up to 3
  oppDamage -= 3;
  // If damage is negative, damage will be 0
  if (oppDamage < 0) oppDamage = 0;

  // Subtract player's health with opponent damage
  player -= oppDamage;

  // Display status
  document.getElementById("result").innerHTML = "<br><b> You will defend! </b>";
  if (temp && oppDamage) document.getElementById("result").innerHTML = "<br> Opponent inflicts <b>" + oppDamage + "</b> damage!";
  else if (temp && !oppDamage) document.getElementById("result").innerHTML = "<br> You completely blocked the attack!";
  else document.getElementById("result").innerHTML = "<br> The opponent defended too.";

  // Generate opponent action, indicating that player will defend
  oppAction (0);

  // Check health of player and opponent
  checkHealth ();
}

//Function that will display the status of health of the players
function printHealth () {
  document.getElementById('health').innerHTML = "<b> Player: " + player + "<br> Opponent: " + opponent + "</b>";
}

//Function that will monitor the status of health of the players
function checkHealth () {
  // Reset negative health
  if (player <= 0) player = 0;
  if (opponent <= 0) opponent = 0;

  // Print winner
  if (!player || !opponent) {
    if (player == 0) alert("Oponent wins!");
    else alert("Player wins!");

    // Disable buttons until reset
    document.getElementById("attack").disabled = true;
    document.getElementById("defend").disabled = true;
  }

  // Print health
  printHealth ();
}

// Print health
printHealth ();

function reset () {
  // Enable coin toss options
  document.getElementById("coin").disabled = false;
  document.getElementById("coinTosser").disabled = false;

  // Disable buttons
  document.getElementById("attack").disabled = true;
  document.getElementById("defend").disabled = true;

  // Reset player and opponent health
  player = 100;
  opponent = 100;

  // Reset player and opponent attack damage
  playerDamage = 0;
  oppDamage = 0;

  // Reset statuses
  printHealth ();
  document.getElementById('result').innerHTML = "";

  // Hide reset button
  document.getElementById("reset").style.display = "none";
}

