import * as R from "ramda"
// import * as cards from "./utils/cards"
// import { shuffle } from "./utils/shuffle"
import * as HANDS from "./utils/stubs/hands.stubs"
import * as TEST from "./utils/hands"

// const deck = shuffle(Math.random, cards.DECK)

// const hand = R.take(7, deck)

const rf = R.compose(TEST.testHighestCards, TEST.testFlush)(HANDS.royalFlush) // ?
const sf = R.compose(TEST.testStraight, TEST.testFlush)(HANDS.straighFlush) // ?
const fk = TEST.testMatchingCards(HANDS.fourOfAKind)
const fh = TEST.testMatchingCards(HANDS.fullHouse) // ?
const st = TEST.testStraight(HANDS.straight) // ?
const tk = TEST.testMatchingCards(HANDS.threeOfAKind) // ?
const tp = TEST.testMatchingCards(HANDS.twoPair) // ?
const op = TEST.testMatchingCards(HANDS.onePair) // ?
