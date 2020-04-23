import * as R from "ramda"
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
