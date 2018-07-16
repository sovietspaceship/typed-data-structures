

const Queue = require('./queue')
const { path } = require('./helpers')

describe('Queue', () => {
    test('enqueue should insert data - 1', () => {
        const queue: Queue<number> = new Queue()

        queue.enqueue(4)

        expect(queue.data.car).toBe(4)
    })

    test('enqueue should insert data - 2', () => {
        const queue: Queue<number> = new Queue()

        queue.enqueue(4)
        queue.enqueue(5)

        expect(queue.data.car).toBe(4)
        expect(path(queue, 'data.cdr.car')).toBe(5)
    })

    test('get should remove data from queue - 1', () => {
        const queue: Queue<number> = new Queue()

        queue.enqueue(4)
        expect(queue.get()).toBe(4)
        expect(queue.data).toBe(null)
    })

    test('get should remove data from queue - 2', () => {
        const queue: Queue<number> = new Queue()

        queue.enqueue(4)
        queue.enqueue(5)
        queue.enqueue(6)
        queue.enqueue(7)
        expect(queue.get()).toBe(4)
        expect(queue.data.car).toBe(5)
    })

    test('get should return null if queue is empty', () => {
        const queue: Queue<number> = new Queue()

        expect(queue.get()).toBe(null)
    })

    test('get should return null if queue is empty - 2', () => {
        const queue: Queue<number> = new Queue()

        const insertedValues = [ 1, 2, 3, 4 ]

        const values = insertedValues.map(v => {
            return queue.enqueue(v)
        }).map(() => {
            return queue.get()
        })

        expect(values).toEqual(insertedValues)

        expect(queue.get()).toBe(null)
    })
})
