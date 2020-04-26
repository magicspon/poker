import * as fns from "../hands"
import * as stub from "../stubs/hands.stubs"

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
