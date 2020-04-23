import * as R from "ramda"

const TWO = {
	name: "TWO",
	score: 2,
}
const THREE = {
	name: "THREE",
	score: 3,
}
const FOUR = {
	name: "FOUR",
	score: 4,
}
const FIVE = {
	name: "FIVE",
	score: 5,
}
const SIX = {
	name: "SIX",
	score: 6,
}
const SEVEN = {
	name: "SEVEN",
	score: 7,
}
const EIGHT = {
	name: "EIGHT",
	score: 8,
}
const NINE = {
	name: "NINE",
	score: 9,
}
const TEN = {
	name: "TEN",
	score: 10,
}
const JACK = {
	name: "JACK",
	score: 11,
}
const QUEEN = {
	name: "QUEEN",
	score: 12,
}
const KING = {
	name: "KING",
	score: 13,
}
const ACE = {
	name: "ACE",
	score: 14,
}

export const SETS = {
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
	TEN,
	JACK,
	QUEEN,
	KING,
	ACE,
}

const SUITS = ["SPADES", "CLUBS", "DIAMONDS", "HEARTS"]

export const DECK = R.compose(
	R.flatten,
	R.map((suit) =>
		R.map(
			(set) => ({
				// card: `${set.name} OF ${suit}`,
				suit,
				key: set.name,
				score: set.score,
			}),
			R.values(SETS)
		)
	)
)(SUITS)
