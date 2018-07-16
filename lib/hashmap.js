// @flow

const { createHash } = require('crypto')

function defaultHashFunction(key: string, length: number): number {
    return createHash('sha1').update(key)
        .digest()
        .readUInt32LE(0) % length
}

class HashMap<T> {
    buckets: Array<Array<[string, T]>>
    size: number
    capacity: number
    hashFunction: string => number
    loadFactor: number

    constructor(hashFunction: (string, number) => number = defaultHashFunction) {
        this.hashFunction = number => hashFunction(number, this.capacity)
        this.capacity = 32
        this.loadFactor = 0.8
        this.buckets = []
        this.size = 0
    }

    insert(key: string, value: T): HashMap<T> {
        const index = this.hashFunction(key)

        if (typeof this.buckets[index] === 'undefined') {
            this.buckets[index] = []
        }

        if (this.buckets[index].some((_, entry) => {
            const [ otherKey ] = this.buckets[index][entry]

            if (otherKey === key) {
                this.buckets[index][entry] = [ key, value ]

                return true
            }

            return false
        })){
            return this
        }

        this.buckets[index].push([ key, value ])
        this.size++

        if (this.size >= this.loadFactor * this.capacity) {
            this.resize(2 * this.size)
        }

        return this
    }

    resize(capacity: number): HashMap<T> {
        this.capacity = capacity

        if (this.size === 0) {
            this.buckets = []

            return this
        }
        this.size = 0
        const buckets = this.buckets

        this.buckets = []
        buckets.forEach(bucket => {
            bucket.forEach(([ key, value ]) => {
                this.insert(key, value)
            })
        })

        return this
    }

    find(key: string): ?T {
        const index = this.hashFunction(key)
        const bucket = this.buckets[index]

        if (!bucket) {
            return null
        }

        if (bucket.length === 1) {
            return bucket[0][1]
        }

        const found = bucket.find(([ otherKey ]) => {
            return otherKey === key
        })

        return found ? found[1] : null
    }

    remove(key: string): ?T {
        const index = this.hashFunction(key)

        const found = this.buckets[index].find(([ otherKey ], entryIndex) => {
            if (otherKey === key) {
                this.size--
                this.buckets[index].splice(entryIndex, 1)

                if (this.size < (1.0 - this.loadFactor) * this.capacity) {
                    this.resize(this.size / 2 | 0)
                }

                return true
            }

            return false
        })

        return found ? found[1] : null
    }
}

module.exports = HashMap
