// @flow

const BinarySearchTree = require('./binary-search-tree')
const { times } = require('ramda')
const { rand, path } = require('./helpers')

describe('BinarySearchTree', () => {
    test('should initialise a correct binary search tree', () => {
        const tree = new BinarySearchTree()

        const node = tree.insert(1)

        expect(node.value).toBe(1)
        expect(tree.root).toBeDefined()
        expect(path(tree, 'root.value')).toBe(1)
    })

    test('should initialise a correct binary search tree - 2', () => {
        const tree = new BinarySearchTree()

        const node = tree.insert(1)

        tree.insert(2)

        expect(node.value).toBe(1)
        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)
    })

    test('should initialise a correct binary search tree - 3', () => {
        const tree = new BinarySearchTree()

        const node = tree.insert(1)

        tree.insert(2)
        tree.insert(3)

        expect(node.value).toBe(1)
        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)
        expect(path(tree, 'root.right.right.value')).toBe(3)
    })

    test('should initialise a correct binary search tree - 4', () => {
        const tree = new BinarySearchTree()

        tree.insert(1)
        tree.insert(2)
        tree.insert(4)
        tree.insert(3)

        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)
        expect(path(tree, 'root.right.right.value')).toBe(4)
        expect(path(tree, 'root.right.right.left.value')).toBe(3)
    })

    test('should initialise a correct binary tree - 5', () => {
        const tree = new BinarySearchTree()

        ;[ 1, 2, 3, 4, 1 ].forEach(i => {
            tree.insert(i)
        })

        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)
        expect(path(tree, 'root.right.left.value')).toBe(1)
        expect(path(tree, 'root.right.right.value')).toBe(3)
        expect(path(tree, 'root.right.right.right.value')).toBe(4)
    })

    test('should remove root node if no other nodes exist', () => {
        const tree = new BinarySearchTree()

        tree.insert(1)

        expect(path(tree, 'root.value')).toBe(1)

        tree.remove(1)

        expect(tree.root).toBe(null)
    })

    test('should remove correct node - 1', () => {
        const tree = new BinarySearchTree()

        const node = tree.insert(1)

        tree.insert(2)

        expect(node.value).toBe(1)
        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)

        tree.remove(2)

        expect(path(tree, 'root.right')).toBe(null)
    })

    test('should remove correct node - 2', () => {
        const tree = new BinarySearchTree()

        ;[ 1, 2, 3, 4 ].forEach(i => {
            tree.insert(i)
        })

        tree.remove(1)

        expect(path(tree, 'root.value')).toBe(2)
        expect(path(tree, 'root.left')).toBe(null)
        expect(path(tree, 'root.right.value')).toBe(3)
    })

    test('should find min node - 1', () => {
        const tree = new BinarySearchTree()

        ;[ 1, 2, 3, 4, 1 ].forEach(i => {
            tree.insert(i)
        })

        const min = tree.findMin()

        expect(min && min.value).toBe(1)
        expect(min && min.left).toBe(null)
        expect(path(min, 'right.value')).toBe(2)
    })

    test('should find max node - 1', () => {
        const tree = new BinarySearchTree()

        ;[ 1, 2, 3, 4, 1 ].forEach(i => {
            tree.insert(i)
        })

        const min = tree.findMax()

        expect(min && min.value).toBe(4)
    })

    test('should only generate valid binary search trees', () => {
        const tree = new BinarySearchTree()

        for (let i = 0; i !== 50; ++i) {
            const elements = times(() => rand(100, 1), rand(100, 1))

            elements.forEach(i => tree.insert(i))
            const isValid = tree.isValid(Number.MIN_VALUE, Number.MAX_VALUE)

            expect(isValid).toBe(true)
        }
    })

    test('find should return the right element', () => {
        const tree = new BinarySearchTree()

        const node = tree.insert(1)

        tree.insert(2)
        tree.insert(4)
        tree.insert(3)

        expect(node.value).toBe(1)
        expect(path(tree, 'root.value')).toBe(1)
        expect(path(tree, 'root.right.value')).toBe(2)
        expect(path(tree, 'root.right.right.value')).toBe(4)
        expect(path(tree, 'root.right.right.left.value')).toBe(3)

        const found = tree.find(2)

        expect(found).toBeTruthy()
        expect(found && found.value).toBe(2)
        expect(found && found.right && found.right.value).toBe(4)
    })
})
