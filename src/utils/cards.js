import * as R from "ramda"

const TWO = {
	name: "TWO",
	score: 2,
	key: "2",
}
const THREE = {
	name: "THREE",
	score: 3,
	key: "3",
}
const FOUR = {
	name: "FOUR",
	score: 4,
	key: "4",
}
const FIVE = {
	name: "FIVE",
	score: 5,
	key: "5",
}
const SIX = {
	name: "SIX",
	score: 6,
	key: "6",
}
const SEVEN = {
	name: "SEVEN",
	score: 7,
	key: "7",
}
const EIGHT = {
	name: "EIGHT",
	score: 8,
	key: "8",
}
const NINE = {
	name: "NINE",
	score: 9,
	key: "9",
}
const TEN = {
	name: "TEN",
	score: 10,
	key: "10",
}
const JACK = {
	name: "JACK",
	score: 11,
	key: "J",
}
const QUEEN = {
	name: "QUEEN",
	score: 12,
	key: "Q",
}
const KING = {
	name: "KING",
	score: 13,
	key: "K",
}
const ACE = {
	name: "ACE",
	score: 14,
	key: "A",
}

export const SETS = {
	"2": TWO,
	"3": THREE,
	"4": FOUR,
	"5": FIVE,
	"6": SIX,
	"7": SEVEN,
	"8": EIGHT,
	"9": NINE,
	"10": TEN,
	J: JACK,
	Q: QUEEN,
	K: KING,
	A: ACE,
}

const SUITS = ["S", "C", "D", "H"]

// we create a deck by loop over each suit
// for each suit we when convert the sets object
// into an array of values, loop over them
// and combine the suit with the set
// use chain to flatMap
export const DECK = R.compose(
	// R.flatten,
	R.reduce((acc, curr) => ({ ...acc, [`${curr.key}${curr.suit}`]: curr }), {}),
	R.chain((suit) =>
		R.map(
			(set) => ({
				suit,
				key: set.key,
				score: set.score,
			}),
			R.values(SETS)
		)
	)
)(SUITS)
