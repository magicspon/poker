import * as R from "ramda"
import * as fns from "../hands"
import * as stub from "../stubs/hands.stubs"

describe("game winning", () => {
	const players = [
		{ name: "highCard", hand: stub.highCard },
		{ name: "onePair", hand: stub.onePair },
		{ name: "twoPair", hand: stub.twoPair },
		{ name: "threeOfAKind", hand: stub.threeOfAKind },
		{ name: "straight", hand: stub.straight },
		{ name: "flush", hand: stub.flush },
		{ name: "fullHouse", hand: stub.fullHouse },
		{ name: "fourOfAKind", hand: stub.fourOfAKind },
		{ name: "straighFlush", hand: stub.straighFlush },
		{ name: "royalFlush", hand: stub.royalFlush },
	]

	it("should set the royal flush as the winning hand", () => {
		expect(fns.getWinningHand(players)).toBe("royalFlush")
	})

	it("should set the straight flush as the winning hand", () => {
		expect(fns.getWinningHand(R.take(9, players))).toBe("straighFlush")
	})

	it("should set the four of a kind as the winning hand", () => {
		expect(fns.getWinningHand(R.take(8, players))).toBe("fourOfAKind")
	})

	it("should set the full house as the winning hand", () => {
		expect(fns.getWinningHand(R.take(7, players))).toBe("fullHouse")
	})

	it("should set the flush as the winning hand", () => {
		expect(fns.getWinningHand(R.take(6, players))).toBe("flush")
	})

	it("should set the straight as the winning hand", () => {
		expect(fns.getWinningHand(R.take(5, players))).toBe("straight")
	})

	it("should set the three of a kind as the winning hand", () => {
		expect(fns.getWinningHand(R.take(4, players))).toBe("threeOfAKind")
	})

	it("should set the two pair as the winning hand", () => {
		expect(fns.getWinningHand(R.take(3, players))).toBe("twoPair")
	})

	it("should set the one pair as the winning hand", () => {
		expect(fns.getWinningHand(R.take(2, players))).toBe("onePair")
	})
})

describe("full house winners", () => {
	const table = ["10C", "9S", "9H", "6C", "JH"]

	const players = [
		{
			name: "b",
			hand: ["6H", "6D", ...table],
		},
		{
			name: "c",
			hand: ["6S", "9D", ...table],
		},
		{
			name: "a",
			hand: ["10H", "10D", ...table],
		},
		{
			name: "d",
			hand: ["JS", "JD", ...table],
		},
	]

	it("should find the best hand from a full house", () => {
		expect(fns.getWinningHand(players)).toBe("d")
		expect(fns.getWinningHand(R.take(2, players))).toBe("c")
		expect(fns.getWinningHand(R.take(3, players))).toBe("a")
	})
})

describe("four of a kind winners", () => {
	const table = ["6S", "9S", "9H", "6C", "JH"]

	const players = [
		{
			name: "b",
			hand: ["6H", "6D", ...table],
		},
		{
			name: "c",
			hand: ["9S", "9D", ...table],
		},
	]

	it("should find the best hand from a full house", () => {
		expect(fns.getWinningHand(players)).toBe("c")
	})
})

describe("hand matching", () => {
	it("should match royal flush hands", () => {
		expect(fns.getHand(stub.royalFlush)).toMatchObject({
			hand: {
				name: "ROYAL FLUSH",
				value: 10,
			},
		})
	})

	it("should match straight flush hands", () => {
		expect(fns.getHand(stub.straighFlush)).toMatchObject({
			hand: {
				name: "STRAIGHT FLUSH",
				value: 9,
			},
		})
	})

	it("should match four of a kind", () => {
		expect(fns.getHand(stub.fourOfAKind)).toMatchObject({
			hand: {
				name: "FOUR OF A KIND",
				value: 8,
			},
		})
	})

	it("should match full house", () => {
		expect(fns.getHand(stub.fullHouse)).toMatchObject({
			hand: {
				name: "FULL HOUSE",
				value: 7,
			},
		})
	})

	it("should match a flush", () => {
		expect(fns.getHand(stub.flush)).toMatchObject({
			hand: {
				name: "FLUSH",
				value: 6,
			},
		})
	})

	it("should match a straight", () => {
		expect(fns.getHand(stub.straight)).toMatchObject({
			hand: {
				name: "STRAIGHT",
				value: 5,
			},
		})
	})

	it("should match three of a kind", () => {
		expect(fns.getHand(stub.threeOfAKind)).toMatchObject({
			hand: {
				name: "THREE OF A KIND",
				value: 4,
			},
		})
	})

	it("should match a two pair", () => {
		expect(fns.getHand(stub.twoPair)).toMatchObject({
			hand: {
				name: "TWO PAIR",
				value: 3,
			},
		})
	})

	it("should match a pair", () => {
		expect(fns.getHand(stub.onePair)).toMatchObject({
			hand: {
				name: "PAIR",
				value: 2,
			},
		})
	})

	it("should match a high card", () => {
		expect(fns.getHand(stub.highCard)).toMatchObject({
			hand: {
				name: "HIGH CARD",
				value: 1,
			},
		})
	})
})
