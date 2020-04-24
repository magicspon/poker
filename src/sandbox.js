import * as R from "ramda"
import * as cards from "./utils/cards"
import { shuffle } from "./utils/shuffle"

const deck = shuffle(Math.random, cards.DECK)

// const hand = R.take(7, deck)

const hand = [
	{ card: "JACK OF HEARTS", suit: "HEARTS", key: "JACK", score: 11 },
	{ card: "EIGHT OF HEARTS", suit: "HEARTS", key: "EIGHT", score: 8 },
	{ card: "SIX OF CLUBS", suit: "CLUBS", key: "SIX", score: 6 },
	{ card: "TEN OF SPADES", suit: "SPADES", key: "TEN", score: 10 },
	{ card: "KING OF CLUBS", suit: "CLUBS", key: "KING", score: 13 },
	{ card: "QUEEN OF HEARTS", suit: "HEARTS", key: "QUEEN", score: 12 },
	{ card: "TEN OF DIAMONDS", suit: "DIAMONDS", key: "TEN", score: 10 },
]
