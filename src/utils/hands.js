import * as R from "ramda"
import { SETS } from "./cards"

const MATCHING_HANDS = {
	"2": "PAIR",
	"3": "THREE OF A KIND",
	"4": "FOUR OF A KIND",
}

/**
 * @function testFlush
 *
 */
export const testFlush = R.compose(
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
export const testHighestCards = (list) => {
	// the minimum score for a royal flush is 60
	const totalScore = R.reduce((acc, { score }) => acc + score, 0, list) // ?
	if (totalScore < 60) return false

	return true
}

export const testStraight = (list) => {
	// start the counter as 1
	// the first delta is always
	// going to be 0
	// once this reaches 5 we have a match
	let count = 1
	let totalScore = 0

	// first remove any duplicate values
	// then arrange the cards by score
	// then  reduce over the list, getting the
	// diff for each item
	R.compose(
		// we're only using reduce here so we have
		// access to the curr/prev value
		// we aren't interested in the returned value
		// outside of this function
		// we're doing some good ole variable
		// assignments... bite me
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
		pass: count >= 5,
		score: totalScore,
	}
}

export const testMatchingCards = (list) => {
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
