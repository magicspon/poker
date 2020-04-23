import * as R from "ramda"
// import * as SETS from "./cards/sets"

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

const SETS = {
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

const MATCHING_HANDS = {
	"2": "PAIR",
	"3": "THREE OF A KIND",
	"4": "FOUR OF A KIND",
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
		key: "KING",
		score: 11,
	},
	{
		suit: "CLUBS",
		key: "Ace",
		score: 10,
	},
]

/**
 * @function testFlush
 *
 */
const testFlush = R.compose(
	// flatten and map (flatMap)
	R.chain(([, v]) => v),
	R.toPairs,
	R.filter((v) => v.length === 5),
	R.groupBy((item) => item.suit)
)

// const getScoreFromHand = R.reduce((acc, curr) => acc + curr.score, {})

// this function should
/**
 *
 * @param {Array} list
 * @return {Boolean}
 * @example
 * We need to test for a royal flush first
 * R.compose(testHighestCards, testFlush)(hand) // ?
 */
const testHighestCards = (list) => {
	// the minimum score for a royal flush is 60
	const totalScore = R.reduce((acc, { score }) => acc + score, 0, list) // ?
	if (totalScore < 60) return false

	return true
}

const testStraight = (list) => {
	let count = 0 // once this reaches 5 we have a match
	let totalScore = 0

	// first remove any duplicate values
	// then arrange the cards by score
	// then  reduce over the list, getting the
	// diff for each item
	R.compose(
		// we're only using reduce here so we have
		// access to the curr/prev value
		// we aren't interested in the returned value
		R.reduce((acc, { score }) => {
			const d = Math.abs(acc - score)
			// if the gap is one,
			// increment the count
			if (d === 1) {
				count += 1
				totalScore += score
			} else {
				count = 0
			}

			return score
		}, 0),
		// sort the list by score
		R.sortBy((v) => v.score),
		// remove duplicate values
		// we're looking for sequences
		// duplicates will only confuse things
		R.uniqBy((v) => v.score)
	)(list)

	return {
		pass: count >= 4,
		score: totalScore,
	}
}

const testMatchingCards = (list) => {
	const matches = R.compose(
		// map/filter the items
		R.reduce((acc, [key, value]) => {
			if (value < 2) return acc
			return [
				...acc,
				{
					hand: MATCHING_HANDS[value],
					score: SETS[key].score * value,
					key,
				},
			]
		}, []),
		// convert the object to key/value pairs
		R.toPairs,
		// go over each group and return the length
		// we'll get an array of objects back, {key: length}
		R.map((r) => r.length),
		// group the cards by key, we're looking for matches
		R.groupBy((v) => v.key)
	)(list)

	return matches
}

// testMatchingCards(hand) // ?
// const isRoyalFlush = R.compose(testHighestCards, testFlush)
// const isFlush = R.compose(testFlush)
// const isFlush = testFlush

// isFlush(hand) // ?
