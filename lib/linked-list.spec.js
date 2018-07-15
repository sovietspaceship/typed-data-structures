// @flow

const LinkedList = require('./linked-list')

describe('linked list', () => {
    test('linked list should correctly append values', () => {
        const list: LinkedList<number> = new LinkedList(0)

        list.append(1)
        list.append(2)

        const cdar = list.cdr && list.cdr.car

        expect(cdar).toEqual(1)

        const cdddar = list.cdr && list.cdr.cdr && list.cdr.cdr.car

        expect(cdddar).toEqual(2)
    })

    test('linked list should have correct length', () => {
        const list = new LinkedList(0)

        list.append(1).append(2)

        expect(list).toHaveLength(3)
    })

    test('linked list pathspec car', () => {
        const list: LinkedList<number> = new LinkedList(0)

        list.append(1).append(3)

        const v = list.path([ 'a' ])

        expect(v).toEqual(list.car)
    })

    test('LinkedList::car should get element of the node', () => {
        expect(new LinkedList(2).car).toEqual(2)
    })

    test('LinkedList::length should return correct length', () => {
        const list = new LinkedList()

        list.append(1).append(2)
        expect(list).toHaveLength(3)
    })

    test('LinkedList::nth(0) should return first element', () => {
        const list = new LinkedList(0)

        list.append(10).append(20)
        expect(list.nth(0).car).toBe(0)
    })

    test('LinkedList::nth(2) should return third element', () => {
        const list = new LinkedList(0)

        list.append(10).append(20)
        expect(list.nth(2).car).toBe(20)
    })

    test('LinkedList::middle should return correct element', () => {
        const list = new LinkedList()

        list.append(1).append(2)
        expect(list.middle().car).toBe(1)
    })

    test('LinkedList::fromArray should build a linked list from array elements', () => {
        const array = [ 1, 2, 3, 4 ]
        const list = LinkedList.fromArray(array)

        array.forEach((element, i) => {
            expect(list.nth(i).car).toBe(element)
        })
    })

    test('LinkedList::split should return two lists', () => {
        const list = LinkedList.fromArray([ 1, 2, 3, 4 ])

        const [ a, b ] = list.split(2)

        expect(a.toArray()).toEqual([ 1, 2 ])
        expect(b.toArray()).toEqual([ 3, 4 ])
    })

    test('LinkedList::clone should clone list', () => {
        const list = LinkedList.fromArray([ 1, 3, 5, 7 ])

        expect(list.clone().toArray()).toEqual([ 1, 3, 5, 7 ])
    })


    test('LinkedList::findLast should return last element', () => {
        const list = LinkedList.fromArray([ 1, 3, 5, 7 ])

        expect(list.findLast().car).toEqual(7)
    })

    test('LinkedList::map should map elements', () => {
        const list = LinkedList.fromArray([ 1, 3, 5, 7 ])

        const mapped = list.map(x => x.car * 2)

        expect(mapped.toArray()).toEqual([ 2, 6, 10, 14 ])
    })

    test('LinkedList::concat should concatenate lists', () => {
        const [ a, b ] = [
            LinkedList.fromArray([ 1, 3, 5, 7 ]),
            LinkedList.fromArray([ 2, 4, 6, 8 ])
        ]
        const sorted = a.concat(b)

        expect(sorted.toArray()).toEqual([ 1, 3, 5, 7, 2, 4, 6, 8 ])
    })

    test('LinkedList::mergeSorted should merge sorted lists', () => {
        const [ a, b ] = [
            LinkedList.fromArray([ 1, 3, 5, 7 ]),
            LinkedList.fromArray([ 2, 4, 6, 8 ])
        ]

        const sorted = LinkedList.mergeSorted(a, b)

        expect(sorted.toArray()).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8 ])
    })

    test('LinkedList::mergeSorted should merge sorted lists - 2', () => {
        const [ a, b ] = [
            LinkedList.fromArray([ 1, 3, 5 ]),
            LinkedList.fromArray([ 2, 4, 6, 8 ])
        ]

        const sorted = LinkedList.mergeSorted(a, b)

        expect(sorted.toArray()).toEqual([ 1, 2, 3, 4, 5, 6, 8 ])
    })

    test('LinkedList::sort should sort list - 1', () => {
        const list = LinkedList.fromArray([ 1, 4, 3, 2 ])

        const sorted = list.sort()

        expect(sorted.toArray()).toEqual([ 1, 2, 3, 4 ])
    })

    test('LinkedList::sort should sort list - 2', () => {
        const list = LinkedList.fromArray([ 4, 3, 2, 1 ])

        const sorted = list.sort()

        expect(sorted.toArray()).toEqual([ 1, 2, 3, 4 ])
    })
})
