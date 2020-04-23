import * as R from "ramda"

export const SUITS = ["SPADES", "CLUBS", "DIAMONDS", "HEARTS"]

export const SETS = [
	{
		name: "TWO",
		score: 2,
	},
	{
		name: "THREE",
		score: 3,
	},
	{
		name: "FOUR",
		score: 4,
	},
	{
		name: "FIVE",
		score: 5,
	},
	{
		name: "SIX",
		score: 6,
	},
	{
		name: "SEVEN",
		score: 7,
	},
	{
		name: "EIGHT",
		score: 8,
	},
	{
		name: "NINE",
		score: 9,
	},
	{
		name: "TEN",
		score: 10,
	},
	{
		name: "JACK",
		score: 11,
	},
	{
		name: "QUEEN",
		score: 12,
	},
	{
		name: "KING",
		score: 13,
	},
	{
		name: "ACE",
		score: 14,
	},
]

export const DECK = R.compose(
	R.flatten,
	R.map((suit) =>
		R.map(
			(set) => ({
				card: `${set.name} OF ${suit}`,
				suit,
				key: set.name,
				score: set.score,
			}),
			SETS
		)
	)
)(SUITS)

/**
 * @function shuffle
 * @param {Function} random
 * @param {Array} list
 * @return {Function}
 * @example
 *
 * const shuffler = shuffle(Math.random)
 *
 * shuffler([1,2,3,4,5,6])
 */
export const shuffle = R.curry((random, list) => {
	var idx = -1
	var len = list.length
	var position
	var result = []
	while (++idx < len) {
		position = Math.floor((idx + 1) * random())
		result[idx] = result[position]
		result[position] = list[idx]
	}
	return result
})
