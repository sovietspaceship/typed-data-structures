// @flow

const HashMap = require('./hashmap')

module.exports = () => {
    {
        const map: HashMap<number> = new HashMap()

        // $ExpectError
        map.insert()

        // $ExpectError
        map.insert(1)

        // $ExpectError
        map.insert('k')

        // $ExpectError
        map.insert('k', 'd')

        // $ExpectError
        map.insert('a', 2, false)

        // $ExpectError
        map.remove(0)

        // $ExpectError
        map.remove()

        // $ExpectError
        map.remove([])

        // $ExpectError
        map.find()

        // $ExpectError
        map.find(null)

        // $ExpectError
        map.find(1)

        // $ExpectError
        map.find('', '')
    }
}
