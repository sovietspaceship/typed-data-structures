// @flow

const Vector = require('./vector')

describe('Vector', () => {
    test('should map a numeric index to an object key', () => {
        const input = 12345
        const expected = '0000000000012345'

        expect(Vector.indexToKey(input)).toBe(expected)
        expect(Vector.keyToIndex(expected)).toBe(input)
    })

    test('push method should add elements', () => {
        const vector = new Vector()

        vector.push(1)

        const key = Vector.indexToKey(0)

        expect(vector.values[key]).toEqual(1)
    })

    test('should be converted to plain array', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        expect(vector.toArray()).toEqual([ 1, 2, 3 ])
    })

    test('Vector.at should return the correct element', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        expect(vector.at(0)).toBe(1)
        expect(vector.at(1)).toBe(2)
        expect(vector.at(2)).toBe(3)
    })

    test('Vector.map should give the same result as Array.map', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        const mapped = vector.map(i => 2 * i)

        expect(mapped.toArray()).toEqual([ 1, 2, 3 ].map(i => 2 * i))
    })

    test('Vector.reduce should give the same result as Array.reduce', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        const reduced = vector.reduce((acc, i) => acc + i, 0)

        expect(reduced).toEqual([ 1, 2, 3 ].reduce((acc, i) => acc + i, 0))
    })

    test('Vector.reduceRight should give the same result as Array.reduceRight', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        const reduced = vector.reduceRight((acc, i) => acc + i.toString(), 0)

        expect(reduced).toEqual([ 1, 2, 3 ].reduceRight((acc, i) => acc + i.toString(), 0))
    })

    test('Vector.reverse should reverse the elements', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(2)
        vector.push(3)

        expect(vector.reverse().toArray()).toEqual([ 3, 2, 1 ])
    })

    test('Vector.sort should sort elements', () => {
        const vector = new Vector()

        vector.push(1)
        vector.push(3)
        vector.push(5)
        vector.push(2)
        vector.push(6)
        vector.push(4)

        expect(vector.sort().toArray()).toEqual([ 1, 2, 3, 4, 5, 6 ])
    })
})
