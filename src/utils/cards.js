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
				// card: `${set.name} OF ${suit}`,
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

// const hand = R.compose(R.take(7), shuffle(Math.random))(DECK)
const hand = [
	{
		suit: "CLUBS",
		key: "ACE",
		score: 14,
	},
	{
		suit: "HEARTS",
		key: "THREE",
		score: 3,
	},
	{
		suit: "SPADES",
		key: "QUEEN",
		score: 12,
	},
	{
		suit: "CLUBS",
		key: "QUEEN",
		score: 12,
	},
	{
		suit: "CLUBS",
		key: "KING",
		score: 13,
	},
	{
		suit: "CLUBS",
		key: "JACK",
		score: 11,
	},
	{
		suit: "CLUBS",
		key: "TEN",
		score: 10,
	},
]

export const testFlush = R.compose(
	R.chain(([, v]) => v),
	R.toPairs,
	R.filter((v) => v.length === 5),
	R.groupBy((item) => item.suit)
)

// this function should
/**
 *
 * @param {Array} list
 * @return {Boolean}
 * @example
 * We need to test for a royal flush first
 * R.compose(is5CardMaxScore, testFlush)(hand) // ?
 */
export const is5CardMaxScore = (list) => {
	// the minimum score for a royal flush is 60
	const totalScore = R.reduce((acc, { score }) => acc + score, 0, list) // ?
	if (totalScore < 60) return false

	return true
}

const testStraight = (list) => {
	let count = 0 // once this reaches 5 we have a match

	// first remove any duplicate values
	// then arrange the cards by score
	// then  reduce over the list, getting the
	// diff for each item
	R.compose(
		R.reduce((acc, { score }) => {
			const d = Math.abs(acc - score)
			// if the gap is one,
			// increment the count
			count = d === 1 ? count + 1 : 0
			return score
		}, 0),
		R.sortBy((v) => v.score),
		R.uniqBy((v) => v.score)
	)(list)

	return count >= 4
}

testStraight(hand) // ?
