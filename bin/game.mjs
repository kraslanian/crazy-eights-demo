// game.mjs
import * as cards from '../lib/cards.mjs';
import {question} from 'readline-sync';
import clear from 'clear';
import {readFile} from 'fs';


// if json file supplied: take starting deck, player hand, computer hand, discard pile, next card to play 

// if json file not supplied: generate a deck, shuffle the deck, deal 2 hands of 5 cards, create discard pile, draw a card from the deck to set the starter card , continue to draw if rank 8, set the next card to be played to "starter" card


//initilaizng object to hold json object consiting of the data for predefined cards

let predefinedCardsObject = null;
let deck = null;
let playerHand= null; 
let computerHand = null; 
let nextPlay = null; 
let discardPile = [];
let cardsInDeck = 0;



function interactiveGame(){

 // the interactive game

console.log(" deck =", deck );
console.log(" playerHand =", playerHand);
console.log(" computerHand=", computerHand);
console.log(" nextPlay =", nextPlay);
console.log("");



//game state:

console.log("              CR🤪ZY 8's");
console.log("-----------------------------------------------");
console.log("Next suit/rank to play: ➡️  " + nextPlay.rank + nextPlay.suit + "  ⬅️");
console.log("-----------------------------------------------");
console.log("Top of discard pile: " + nextPlay.rank + nextPlay.suit);
console.log("Number of cards left in deck: " + cardsInDeck);
console.log("-----------------------------------------------");
console.log("🤖✋ (computer hand): " + cards.handToString(computerHand));
console.log("😊✋ (player hand): " + cards.handToString(playerHand));
console.log("-----------------------------------------------");


console.log("😊 Player's turn...");

let chosenCard = null;
let drawResult = null;
let chosenNumber = null;
let chosenSuit = null;
let eightOLdSuit = null;
let newCard = {
    "rank": '',
    "suit": ''
}



if (cards.matchesAnyProperty(playerHand, nextPlay)){

    console.log("Enter the number of the card you would like to play ")
    console.log(cards.handToString(playerHand, ' ', true));

    const input = question('');
    chosenNumber = parseInt(input);

    chosenCard = playerHand[chosenNumber-1];

    while (chosenCard.suit !== nextPlay.suit && chosenCard.rank !== nextPlay.rank && chosenCard.rank !== 8){
        console.log("You chose a card that cannot be played. Choose a number again: ");
        let input_again = question('');
        chosenNumber = parseInt(input_again);

        chosenCard = playerHand[chosenNumber-1];
    }
        


} else {
    console.log("😔 You have no playable cards");
    function pauseProgramForDraw() {
        question('Press ENTER to draw cards until matching: ');}

    pauseProgramForDraw();

    //enter


    console.log(nextPlay.rank + ", " + nextPlay.suit + " , " + "8");
    console.log(".");

    process.stdout.write("Cards drawn: ");
    while (newCard.suit != nextPlay.suit && newCard.rank != nextPlay.rank && newCard.rank != 8) {
    drawResult = cards.draw(deck);
    deck = drawResult[0];
    newCard = drawResult[1][0];
    cardsInDeck -= 1;
    process.stdout.write(newCard.rank + newCard.suit + "  ");
    playerHand.push(newCard);    
    }
    chosenCard = newCard;
    /*
    if (chosenCard.rank === 8){
        playerHand.pop();
    }
    */
}

if (chosenCard.rank == 8){
    console.log("CRAZY EIGHTS! You played an 8 - choose a suit");
    process.stdout.write("  1:   ♠️");
    process.stdout.write("  2:   ❤️");
    process.stdout.write("  3:   ♣️");
    process.stdout.write("  4:   ♦️");
    console.log(">");

    const input2 = question('');
    chosenNumber = parseInt(input2);

    eightOLdSuit = chosenCard.suit;

    if (chosenSuit == 1){
        chosenCard.suit = "♠️"
    } else if (chosenSuit == 2){
        chosenCard.suit = "❤️";
    } else if (chosenSuit == 3){
        chosenCard.suit = "♣️";
    } else if (chosenSuit == 4){
        chosenCard.suit = "♦️";
    }



}

    if (chosenCard.rank == 8) {

        playerHand = playerHand.filter(card => !(card.suit === eightOLdSuit));

    } else { playerHand = playerHand.filter(card => !(card.suit === chosenCard.suit && card.rank === chosenCard.rank)); }//remove played card from hand
    process.stdout.write("Card played: " + chosenCard.rank + chosenCard.suit);
    nextPlay.suit = chosenCard.suit;
    nextPlay.rank = chosenCard.rank;

    console.log("");
    function pauseProgram() {
        question('Press Enter to continue...');
    }

    pauseProgram();

    

clear();



console.log("");

console.log("              CR🤪ZY 8's");
console.log("-----------------------------------------------");
console.log("Next suit/rank to play: ➡️  " + nextPlay.rank + nextPlay.suit + "  ⬅️");
console.log("-----------------------------------------------");
console.log("Top of discard pile: " + nextPlay.rank + nextPlay.suit);
console.log("Number of cards left in deck: " + cardsInDeck);
console.log("-----------------------------------------------");
console.log("🤖✋ (computer hand): " + cards.handToString(computerHand));
console.log("😊✋ (player hand): " + cards.handToString(playerHand));
console.log("-----------------------------------------------");

console.log("😊 Computer's turn ...");

/*

//computer turn

let computerChoice = null;
let computerOptions = [];
let newComputerCard = {
    "rank": '',
    "suit": ''
}

let computerDrawResult = null;



if (cards.matchesAnyProperty(computerHand, nextPlay)){


    for (let k = 0; k < computerHand.length; k++){

        computerOptions = computerHand.filter(card => (card.suit === nextPlay.suit || card.rank === nextPlay.rank || card.rank === 8)); 

        console.log( "options are" + computerOptions);
    }

    computerChoice.suit = computerOptions[0].suit;
    computerChoice.rank = computerOptions[0].rank;
    computerHand = computerHand.filter(card => !(card.suit === computerChoice.suit && card.rank === computerChoice.rank)); 

    if (computerChoice.rank === 8){

        computerChoice.suit = chosenCard.suit;
        console.log("Computer played an 8. The chosen suit is " + computerChoice.suit);

    }

    nextPlay.rank = computerChoice.rank;
    nextPlay.suit = computerChoice.suit;

} else {

    console.log("Computer has no playable card. It will draw cards until it gets a playable one.");
    while (newComputerCard.suit != nextPlay.suit && newComputerCard.rank != nextPlay.rank && newComputerCard.rank != 8) {
        computerDrawResult = cards.draw(deck);
        deck = computerDrawResult[0];
        newComputerCard = computerDrawResult[1][0];
        cardsInDeck -= 1;
        process.stdout.write(newComputerCard.rank + newComputerCard.suit + "  ");
        computerHand.push(newComputerCard);    
        }
        computerChoice = newComputerCard;
        if (computerChoice.rank === 8){

            computerChoice.suit = chosenCard.suit;
            console.log("Computer played an 8. The chosen suit is " + computerChoice.suit);
    
        }
    
        nextPlay.rank = computerChoice.rank;
        nextPlay.suit = computerChoice.suit;

}

*/

}

//////////////

if (process.argv.length >= 3){ //if json file is supplied

    const jsonFile =  process.argv[2];

    try {

        readFile(jsonFile, 'utf8', (err,data) => {

            if (err) throw err; 

            const jsondata = JSON.parse(data);

            console.log(jsondata);

            predefinedCardsObject = jsondata;
            deck = predefinedCardsObject.deck;
            cardsInDeck = deck.length;
            playerHand = predefinedCardsObject.playerHand;
            computerHand = predefinedCardsObject.computerHand;
            discardPile = predefinedCardsObject.discardPile;
            nextPlay = predefinedCardsObject.nextPlay;

            //game functions

            interactiveGame(); //(wrap the game in a function)

        });
       

    } catch (error){
        //console.log("There was an error loading the JSON file. ");
        console.error('Error loading predefined cards from file:', error);
        process.exit(1); // this will exit the program if an error happens here 
    }

} else { //if no JSON file was provided

    console.log("test");
    deck = cards.shuffle(cards.generateDeck());
    let handsAndNewDeckObject = cards.deal(deck);
    deck = handsAndNewDeckObject.deck; //new deck with dealt hands removed
    playerHand = handsAndNewDeckObject.hands[0];
    computerHand = handsAndNewDeckObject.hands[1];


    let drawnCardAndNewDeck = null;

    while (nextPlay === null || nextPlay.rank === '8'){
    drawnCardAndNewDeck = cards.draw(deck);
    nextPlay = drawnCardAndNewDeck[1][0];

    }

    deck = drawnCardAndNewDeck[0]; // update deck to new deck now that card is removed
    cardsInDeck = 41;

    interactiveGame();

}

