// @flow

const LinkedList = require('./linked-list')

class Queue<T> {
    data: ?LinkedList<T>
    last: ?LinkedList<T>

    constructor() {
        this.data = null
        this.last = null
    }

    enqueue(element: T): Queue<T> {
        if (this.last) {
            this.last = this.last.append(element)
        } else {
            this.data = new LinkedList(element)
            this.last = this.data
        }

        return this
    }

    get(): ?T {
        if (this.data) {
            const front = this.data.car

            this.data = this.data.cdr

            if (!this.data) {
                this.last = null
            }

            return front
        }

        return null
    }
}

module.exports = Queue
