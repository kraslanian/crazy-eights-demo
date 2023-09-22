// cards.mjs
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};


export const range = (...args) =>{
    // declare defaults for start, stop, and increment

    let start = 0;
    let end;
    let inc = 1;
   
    if (args.length === 1) {
      end = args[0];
    } else if (args.length === 2){
        start = args[0];
        end = args[1];
    } else if (args.length === 3){
        start =args[0];
        end = args[1];
        inc = args[2];
    }

    const arr = [];
    for (let i = start; i < end; i+=inc){
        arr.push(i);
    }

    return arr;
   }



export function generateDeck (){

    const arr = [];
    const letter_arr = ['J', 'Q', 'K', 'A'];

    for (const suit in suits){

        for (let i = 2; i <= 10; i++){

        const card = {}; // empty card object
        card.suit = suits[suit];
        card.rank = i.toString();
        arr.push(card);
        }

        for (const element of letter_arr){

        const card = {}; // empty card object
        card.suit = suits[suit];
        card.rank = element;
        arr.push(card);

        }

    }

    return arr;
}


export function shuffle(deck){

const shuffled_arr = [...deck];

// durstenfield shuffle ( https://stackoverflow.com/a/12646864)
for (let i = shuffled_arr.length -1; i>0; i--){

    let j = Math.floor(Math.random()* (i + 1));
    let temp = shuffled_arr[i];
    shuffled_arr[i] = shuffled_arr[j];
    shuffled_arr[j] = temp;
}

return shuffled_arr;
}


export function draw(cardsArray, n = 1){

    const removed_cards = [];
    const new_array = [...cardsArray];

    for (let i = 0; i < n; i++){
        removed_cards.push(new_array.pop());
    }

    const combined_array = [];
    combined_array[0] = new_array;
    combined_array[1] = removed_cards;

    return combined_array;
}


export function deal(cardsArray, numHands = 2, cardsPerHand = 5){


    const result = {};

    const new_array = [...cardsArray];
    const hands = [];
    

    for (let i = 0; i < numHands; i++){
        const sub_array = [];

        for (let j = 0; j < cardsPerHand; j++){

            sub_array.push(new_array.pop());
        }

        hands.push(sub_array);
    }

    result.deck = new_array;
    result.hands = hands;

    return result;
}


export function handToString(hand, sep = '  ', numbers =false){

    let result = '';
    let i = 1;
    let length = hand.length;
    let count = 0;
    result += sep;
        
    
    for (const cardObject of hand){

        count +=1;

        

        if (numbers == true){
        result += i + ': ';
        i +=1; 
        }

        
        
        result += cardObject.rank.toString();
        result += cardObject.suit.toString();

        if(numbers == true) {
            result += "\n";
        }

        if (count != length){
        result += sep;
        }
    }


return result;

}

export function matchesAnyProperty(hand, nextPlay){

let result = false;

for (const card of hand){

    if (card.suit === nextPlay.suit || card.rank === nextPlay.rank || card.rank === 8){
        return true;
    }
    }

return result;
}


export function drawUntilPlayable(deck, matchObject){

    let result = [];
    let newDeck = [...deck];
    let cardFound = false;
    let drawnCards = [];
    while (cardFound == false && newDeck.length != 0){
        let current;
        current = newDeck.pop();
        drawnCards.push(current);
        if (current['suit'] == matchObject['suit'] || current['rank'] == matchObject['rank'] || current['rank'] == 8){
            cardFound = true;
        }

    }

    result[0] =  newDeck;
    result[1] = drawnCards;

    return result;

}