
const HashMap = require('./hashmap')

describe('HashMap', () => {
    test('should insert values correctly', () => {
        const map: HashMap<number> = new HashMap()

        map.insert('a', 1)

        const hash = Object.keys(map.buckets)[0] | 0

        expect(map.buckets[hash][0][1]).toBe(1)
    })

    test('should find previously inserted values correctly', () => {
        const map: HashMap<number> = new HashMap()
        const testValues = 'abcdefghijklmnopqrstuvwxyz'.split('')

        testValues.map((key, i) => {
            map.insert(key, i)

            return key
        })
            .forEach((key, i) => {
                expect(key).toBe(testValues[i])
                expect(map.find(key)).toBe(i)
            })
    })

    test('should replace previous value at the same key with the new one', () => {
        const map: HashMap<number> = new HashMap()

        map.insert('k', 1)

        expect(map.find('k')).toBe(1)

        map.insert('k', 100)

        expect(map.find('k')).toBe(100)
    })

    test('should remove values - 1', () => {
        const map: HashMap<number> = new HashMap()

        map.insert('k', 1)

        expect(map.find('k')).toBe(1)

        map.remove('k')

        expect(map.find('k')).toBe(null)
    })

    test('should remove values - 2', () => {
        const map: HashMap<number> = new HashMap()

        map.insert('k', 1).insert('c', 20)

        expect(map.find('k')).toBe(1)

        map.remove('k')

        expect(map.find('k')).toBe(null)
    })
})
