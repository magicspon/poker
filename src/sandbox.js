import * as HANDS from "./utils/stubs/hands.stubs"
// import * as cards from "./utils/cards"
// import { shuffle } from "./utils/shuffle"
import * as TEST from "./utils/hands"

// const deck = shuffle(Math.random, cards.DECK)

// const hand = R.take(7, deck)

const table = [
	{ card: "NINE OF HEARTS", suit: "HEARTS", key: "NINE", score: 9 },
	{ card: "TEN OF HEARTS", suit: "HEARTS", key: "TEN", score: 10 },
	{ card: "JACK OF HEARTS", suit: "HEARTS", key: "JACK", score: 11 },
	{ card: "QUEEN OF HEARTS", suit: "HEARTS", key: "QUEEN", score: 12 },
	{ card: "KING OF HEARTS", suit: "HEARTS", key: "KING", score: 13 },
]

const player1 = {
	hand: [
		{ card: "QUEEN OF SPADES", suit: "SPADES", key: "QUEEN", score: 12 },
		{ card: "EIGHT OF HEARTS", suit: "HEARTS", key: "EIGHT", score: 8 },
		...table,
	],
	name: "p1",
}

const player2 = {
	hand: [
		{ card: "QUEEN OF CLUBS", suit: "CLUBS", key: "QUEEN", score: 12 },
		{ card: "TWO OF CLUBS", suit: "CLUBS", key: "TWO", score: 2 },
		...table,
	],
	name: "p2",
}

const player3 = {
	hand: [
		{ card: "JACK OF CLUBS", suit: "HEARTS", key: "JACK", score: 11 },
		{ card: "FIVE OF DIAMONDS", suit: "DIAMONDS", key: "FIVE", score: 5 },
		...table,
	],
	name: "p3",
}

const a = TEST.getWinningHand([player1, player2, player3]) // ?

TEST.getHand(player1.hand) // ?
TEST.getHand(player2.hand) // ?
TEST.getHand(player3.hand) // ?
