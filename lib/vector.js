// @flow

const { times } = require('ramda')

type VectorContainer<T> = {[string]: T}
type VectorConvertible<T> = Array<T> | T | VectorContainer<T>

// this class emulates arrays
// do not cheat using Array; instead we use plain objects and provide an array-like interface
class Vector<T> {
    values: VectorContainer<T>
    length: number
    constructor(values: ?VectorConvertible<T>) {
        if (Array.isArray(values)) {
            this.values = values.reduce((acc, i, k) => {
                acc[Vector.indexToKey(k)] = i

                return acc
            }, {})
        } else if (values instanceof Vector) {
            this.values = { ...values.values }
        } else if (typeof values === 'object' && values !== null) {
            this.values = values
        } else {
            this.values = {}
        }
        this.length = Object.keys(this.values).length
    }

    push(value: T) {
        this.values[Vector.indexToKey(this.length)] = value
        this.length++
    }

    static indexToKey(index: number): string {
        // map a numerical index to zero-padded string to guarantee order in case keys are sorted
        const unpaddedKey = index.toString()
        const digits = Math.ceil(Math.log10(Number.MAX_SAFE_INTEGER)) | 0

        const chars = times(() => '0', digits - unpaddedKey.length)

        return chars.join('') + unpaddedKey
    }

    static keyToIndex(key: string): number {
        return Number(key)
    }

    at(index: number): T {
        return this.values[Vector.indexToKey(index)]
    }

    map(fn: (T, number) => T): Vector<T> {
        const result: Vector<T> = new Vector()

        for (const k in this.values) {
            const index = Vector.keyToIndex(k)

            result.push(fn(this.values[k], index))
        }

        return result
    }

    reduce<V>(fn: (V, T, number) => V, init: V): V {
        for (const k in this.values) {
            const index = Vector.keyToIndex(k)

            init = fn(init, this.values[k], index)
        }

        return init
    }

    reduceRight<V>(fn: (V, T, number) => V, init: V): V {
        for (let i = this.length - 1; i >= 0; --i) {
            const k = Vector.indexToKey(i)

            init = fn(init, this.values[k], i)
        }

        return init
    }

    unshift(): ?T {
        if (!this.length) {
            return null
        }

        const zero = Vector.indexToKey(0)
        const first = this.values[zero]

        this.reduce((acc, i, index) => {
            acc[Vector.indexToKey(index - 1)] = i

            return acc
        }, this.values)

        delete this.values[Vector.indexToKey(this.length - 1)]

        this.length--

        return first
    }

    reverse(): Vector<T> {
        return this.reduceRight((acc, i) => {
            acc.push(i)

            return acc
        }, new Vector())
    }

    toArray(): Array<T> {
        return this.reduce((acc, i) => {
            acc.push(i)

            return acc
        }, [])
    }

    sort(): Vector<T> {
        const values = { ...this.values }

        return new Vector(quicksort(0, this.length - 1))

        function quicksort(start: number, end: number): VectorContainer<T> {
            if (start < end) {
                const p = partition(start, end)

                quicksort(start, p)
                quicksort(p + 1, end)
            }

            return values

            function partition(start: number, end: number): number {
                const pivot = values[Vector.indexToKey(start)]
                let i = start - 1
                let j = end + 1

                while (true) {
                    do {
                        i++
                    } while (values[Vector.indexToKey(i)] < pivot)

                    do {
                        j--
                    } while (values[Vector.indexToKey(j)] > pivot)

                    if (i >= j) {
                        return j
                    }

                    swap(i, j)
                }

                // this is unreachable but flow does not currently support this
                return 0 // eslint-disable-line no-unreachable
            }

            function swap(...args) {
                const [ a, b ] = args.map(Vector.indexToKey)
                const t = values[b]

                values[b] = values[a]
                values[a] = t
            }
        }
    }
}


module.exports = Vector
