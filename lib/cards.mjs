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