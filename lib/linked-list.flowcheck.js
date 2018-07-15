// @flow

const LinkedList = require('./linked-list')

module.exports = () => {
    {
        const list: LinkedList<number> = new LinkedList(0)

        list.append(1)
        list.find(() => true)
        list.map(() => 1)
        list.reduce((acc, x) => acc + x.car, 1)
        list.nth(1)

        // $ExpectError
        list.append('string') // this gives an error, but we expect it

        // $ExpectError
        list.append()

        // $ExpectError
        list.nyaasu()

        // $ExpectError
        list.nth('')

        // $ExpectError
        list.find()

        // $ExpectError
        list.find(2)

        // $ExpectError
        list.map(() => null)

        // $ExpectError
        list.map(1)

        // $ExpectError
        list.reduce(1)

        // $ExpectError
        list.reduce((acc, x) => acc + x, 1) // because it should do x.car

        // $ExpectError
        list.reduce((acc, x) => acc + x.memes)

        // $ExpectErrors
        list.reduce((acc, x) => acc + x.car, {}) // because {} does not support +

        // $ExpectError
        list.cdr.car // eslint-disable-line no-unused-expressions

        // $ExpectError
        list.car.v // eslint-disable-line no-unused-expressions

        // $ExpectError
        list.path('ad')

        // $ExpectError
        list.path([ 'c' ])

        // $ExpectError
        list.path()

        // $ExpectError
        const list2: LinkedList<Object> = new LinkedList(0) // eslint-disable-line no-unused-vars

        const list3: LinkedList<Object> = new LinkedList({}) // eslint-disable-line no-unused-vars

        list3.car.car // eslint-disable-line no-unused-expressions
    }
}
