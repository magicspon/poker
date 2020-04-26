import * as R from "ramda"
import { SETS, DECK } from "./cards"

const HIGH_CARD = { name: "HIGH CARD", value: 1 }
const PAIR = { name: "PAIR", value: 2 }
const TWO_PAIR = { name: "TWO PAIR", value: 3 }
const THREE_OF_A_KIND = { name: "THREE OF A KIND", value: 4 }
const STRAIGHT = { name: "STRAIGHT", value: 5 }
const FLUSH = { name: "FLUSH", value: 6 }
const FULL_HOUSE = { name: "FULL HOUSE", value: 7 }
const FOUR_OF_A_KIND = { name: "FOUR OF A KIND", value: 8 }
const STRAIGHT_FLUSH = { name: "STRAIGHT FLUSH", value: 9 }
const ROYAL_FLUSH = { name: "ROYAL FLUSH", value: 10 }

const mapHandToDeck = R.map((card) => DECK[card])

const MATCHING_HANDS = {
	"2": PAIR.name,
	"3": THREE_OF_A_KIND.name,
	"4": FOUR_OF_A_KIND.name,
}

/**
 * @function testFlush
 *
 */
const testFlush = R.compose(
	// flatten and map (flatMap)
	R.chain(([, v]) => v),
	R.toPairs,
	R.filter((v) => v.length >= 5),
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
 * R.compose(testHighestCards, testFlush)(hand)
 */
const testHighestCards = (list) => {
	// the minimum score for a royal flush is 60
	const totalScore = R.compose(
		R.reduce((acc, { score }) => acc + score, 0),
		R.filter(({ score }) => score >= 10)
	)(list)

	if (totalScore < 60) return false

	return testHighestCards
}

const testStraight = (list) => {
	// start the counter as 1
	// the first delta is always
	// going to be 0
	// once this reaches 5 we have a match
	let count = 1
	let totalScore = 0
	let cards = []

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
		R.reduce((acc, curr) => {
			const { score } = curr
			const d = Math.abs(acc - score)
			// if the gap is one,
			// increment the count
			if (d === 1) {
				count += 1
				totalScore += score
				cards.push(curr)
			} else {
				count = 1
				cards = [curr]
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

	if (count >= 5) {
		return { score: totalScore, cards }
	}

	return false
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
					score: SETS[key].score,
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

	const num = R.length(matches)
	const four = R.find(({ hand }) => hand === FOUR_OF_A_KIND.name, matches)
	const three = R.find(({ hand }) => hand === THREE_OF_A_KIND.name, matches)
	const pair = R.filter(({ hand }) => hand === PAIR.name, matches)

	if (four) {
		return {
			hand: FOUR_OF_A_KIND,
			score: [four.score],
		}
	}

	if (three && num === 1) {
		return {
			hand: THREE_OF_A_KIND,
			score: [three.score],
		}
	}

	if (pair && three) {
		return {
			hand: FULL_HOUSE,
			score: [three.score, pair[0].score],
		}
	}

	if (pair && num === 2) {
		return {
			hand: TWO_PAIR,
			score: [
				Math.max(pair[0].score, pair[1].score),
				Math.min(pair[0].score, pair[1].score),
			],
		}
	}

	if (pair.length) {
		return {
			hand: PAIR,
			score: [pair[0].score],
		}
	}

	return false
}

export const getHand = (input) => {
	const hand = mapHandToDeck(input)
	const flush = testFlush(hand)
	const royalFlush = R.compose(testHighestCards, testFlush)
	const straightFlush = R.compose(testStraight, testFlush)
	const matches = testMatchingCards(hand)
	const st = testStraight(hand)
	const [card1, card2] = R.take(2, hand)
	const highCard = Math.max(card1.score, card2.score)
	const lowCard = Math.min(card1.score, card2.score)

	// royal flush
	if (royalFlush(hand)) {
		return {
			hand: ROYAL_FLUSH,
			highCard,
			lowCard,
		}
	}

	// straight flush
	if (straightFlush(hand)) {
		return {
			hand: STRAIGHT_FLUSH,
			highCard,
			lowCard,
		}
	}

	// straight
	if (st) {
		return {
			hand: STRAIGHT,
			highCard,
			lowCard,
		}
	}

	// pairs, two pairs, three of a kind, four of a kind
	if (matches) {
		return {
			...matches,
			type: "matches",
			highCard,
			lowCard,
		}
	}

	if (flush.length) {
		return {
			hand: FLUSH,
			highCard,
			lowCard,
		}
	}

	return {
		hand: HIGH_CARD,
		highCard,
		lowCard,
	}
}

const getTopHands = R.compose(
	R.head,
	R.reverse,
	R.sortBy((v) => v.key),
	R.map(([key, value]) => ({ key: Number(key), value })),
	R.toPairs
)

export const getWinningHand = (input) => {
	const hands = R.map(({ name, hand }) => ({
		player: name,
		...getHand(hand),
	}))(input)

	// group all of the hands by score
	// create a key, value object
	// sort by key
	// reverse it
	// grab the first row
	const bestHands = R.compose(
		getTopHands,
		R.groupBy((v) => v.hand.value)
	)(hands)

	const winningHands = bestHands.value

	// only one hand in the winning group
	// we have a winner
	if (winningHands.length === 1) {
		// const [winner] = winningHands
		return winningHands[0].player
	}

	// get the type, this could be a match
	// all of the items will have the same
	// type so we can just grab the first one
	const [{ type }] = winningHands

	if (type === "matches") {
		const highScore = R.compose(
			getTopHands,
			R.groupBy((v) => v.score[0])
		)(winningHands)

		const highHands = highScore.value

		// only one hand in the winning group
		// we have a winner
		if (highHands.length === 1) {
			// const [winner] = highHands
			return highHands[0].player
		}

		const lowHands = R.compose(
			getTopHands,
			R.groupBy((v) => v.highCard)
		)(highHands)

		if (lowHands.value.length === 1) {
			return lowHands.value[0].player
		}
	}

	const highHands = R.compose(
		getTopHands,
		R.groupBy((v) => v.highCard)
	)(hands)

	// only one hand in the winning group
	// we have a winner
	if (highHands.value.length === 1) {
		// const [winner] = winningHands
		return highHands.value[0].player
	}

	const lowHands = R.compose(
		getTopHands,
		R.groupBy((v) => v.lowCard)
	)(highHands.value)

	console.log(lowHands)

	if (lowHands.value.length === 1) {
		return lowHands.value[0].player
	}
}
