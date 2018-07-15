// @flow

const PriorityQueue = require('./priority-queue')

describe('PriorityQueue', () => {
    test('should retrieve min elements in asc order', () => {
        const queue = new PriorityQueue()

        ;[ 1, 6, 3, 5, 4, 2, 9, 8, 7 ].map(i => {
            return queue.insert(i)
        }).map((value, i) => {
            return expect(queue.removeMin()).toBe(i + 1)
        })
    })

    test('should retrieve max elements in desc order', () => {
        const queue = new PriorityQueue()

        ;[ 1, 6, 3, 5, 4, 2, 9, 8, 7 ].map(i => {
            return queue.insert(i)
        }).map((value, i) => {
            return expect(queue.removeMax()).toBe(9 - i)
        })
    })
})
