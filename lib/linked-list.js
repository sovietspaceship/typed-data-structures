// @flow

const { lessThan } = require('./predicates')

type PathSpecChars = 'a' | 'd'

class LinkedList<T> {
    car: T;
    cdr: ?LinkedList<T>

    constructor(element: T) {
        if (element && element instanceof LinkedList) {
            this.car = element.car
            this.cdr = element.cdr
        } else {
            this.car = element
            this.cdr = null
        }
    }

    path(pathspec: Array<PathSpecChars>): ?LinkedList<T> | T {
        return pathspec.reduce((acc: ?LinkedList<T> | T, i: PathSpecChars): ?LinkedList<T> | T => {
            if (acc == null) {
                return acc
            }
            if (i === 'a') {
                return acc instanceof LinkedList ? acc.car : null
            }
            if (i === 'd') {
                return acc.cdr ? acc.cdr : null
            }

            return acc
        }, this)
    }

    append(element: T): LinkedList<T> {
        const last = this.findLast()

        return last.setCdr(element)
    }

    setCdr(element: T): LinkedList<T> {
        if (element instanceof LinkedList) {
            this.cdr = element
        } else {
            this.cdr = new LinkedList(element)
        }

        return this.cdr
    }

    map(handler: LinkedList<T> => T): LinkedList<T> {
        let output: LinkedList<T> = new LinkedList(handler(this))
        const head = output

        for (let node = this.cdr; node; node = node.cdr) {
            const result = handler(node)

            output = output.setCdr(result)
        }

        return head
    }

    reduce<V>(handler: (V, LinkedList<T>, number) => V, init: V): V {
        for (let node = this, i = 0; node; node = node.cdr, ++i) {
            init = handler(init, node, i)
        }

        return init
    }

    find(predicate: (a: LinkedList<T>) => boolean) {
        for (let node = this; node; node = node.cdr) {
            if (predicate(node)) {
                return node
            }
        }
    }

    range(handler: (LinkedList<T>, number) => LinkedList<T>, start: number = 0, end: number = Number.MAX_VALUE): Array<LinkedList<T>> {
        const output = []

        for (let node = this, i = 0; node && i < end; node = node.cdr, i++) {
            if (i >= start) {
                output.push(handler(node, i))
            }
        }

        return output
    }

    get length(): number {
        return this.reduce(acc => acc + 1, 0)
    }

    nth(index: number): LinkedList<T> {
        return this.range(_ => _, index)[0]
    }

    middle(): LinkedList<T> {
        return this.nth(this.length / 2 - 1)
    }

    toArray(): Array<T> {
        return this.reduce((acc, i) => {
            acc.push(i.car)

            return acc
        }, [])
    }

    split(n: number): Array<LinkedList<T>> {
        const lists = [ new LinkedList(this.car), new LinkedList(this.car) ]

        this.reduce((acc, element, i) => {
            const index = i < n ? 0 : 1

            acc[index] = acc[index].setCdr(element.car)

            return acc
        }, [ ...lists ])

        return lists.map(list => list.cdr || list)
    }

    prettyPrint(): string {
        return JSON.stringify(this.toArray())
    }

    static fromArray([ first: T, ...rest: Array<T> ]: Array<T>): LinkedList<T> {
        const list: LinkedList<T> = new LinkedList(first)

        rest.reduce((acc: LinkedList<T>, i) => {
            return acc.setCdr(i)
        }, list)

        return list
    }

    clone(): LinkedList<T> {
        const list: LinkedList<T> = new LinkedList(this.car)

        if (this.cdr) {
            this.cdr.reduce((acc, i) => {
                return acc.setCdr(i.car)
            }, list)
        }

        return list
    }

    findLast(): LinkedList<T> {
        return this.reduce((acc, i) => {
            return i
        }, this)
    }

    concat(list: LinkedList<T>): LinkedList<T> {
        const result: LinkedList<T> = this.clone()

        list.reduce((acc, i) => {
            return acc.setCdr(i.car)
        }, result.findLast())

        return result
    }

    sort(predicate: (a: mixed, b: mixed) => boolean = lessThan) {
        return mergeSort(this)

        function mergeSort(list: LinkedList<T>) {
            if (list.length === 1) {
                return list
            }

            const [ a, b ] = list.split(list.length / 2)

            const mergedA = mergeSort(a)
            const mergedB = mergeSort(b)

            return LinkedList.mergeSorted(mergedA, mergedB, predicate)
        }
    }

    static mergeSorted(a: LinkedList<T>, b: LinkedList<T>, predicate = lessThan) {
        let list = new LinkedList()
        const result = list

        while (true) {
            if (predicate(a.car, b.car)) {
                list = list.setCdr(a.car)
                if (!a.cdr) {
                    return result.cdr.concat(b)
                }
                a = a.cdr
            } else {
                list = list.setCdr(b.car)
                if (!b.cdr) {
                    return result.cdr.concat(a)
                }
                b = b.cdr
            }
        }
    }
}

module.exports = LinkedList
