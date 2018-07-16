// @flow

const Queue = require('./queue')

module.exports = () => {
    const v: Queue<number> = new Queue()

    v.get()
    v.enqueue(1)

    // $ExpectError
    v.get(1)

    // $ExpectError
    v.enqueue('')

    // $ExpectError
    v.enqueue(1, 1)

    // $ExpectError
    v.get().prop // eslint-disable-line no-unused-expressions

    // $ExpectError
    v.enqueue(null)
}
