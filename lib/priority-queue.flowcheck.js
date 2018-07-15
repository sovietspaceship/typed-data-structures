// @flow

const PriorityQueue = require('./priority-queue')

module.exports = () => {
    {
        const v: PriorityQueue<number> = new PriorityQueue()

        v.insert(1)
        v.findMin()
        v.findMax()
        v.removeMax()
        v.removeMin()
        v.size()

        // $ExpectError
        v.insert('string')

        // $ExpectError
        v.findMin('')

        // $ExpectError
        v.insert(null)
    }
}
