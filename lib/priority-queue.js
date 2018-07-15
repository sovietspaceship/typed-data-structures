// @flow

const BinarySearchTree = require('./binary-search-tree')

class PriorityQueue<T> {
    tree: BinarySearchTree<T>
    constructor() {
        this.tree = new BinarySearchTree()
    }
    findMax(): ?T {
        const max = this.tree.findMax()

        return max && max.value
    }
    findMin(): ?T {
        const min = this.tree.findMin()

        return min && min.value
    }
    removeMin(): ?T {
        const min = this.tree.findMin()

        if (min) {
            this.tree.remove(min.value)

            return min.value
        }
    }
    removeMax(): ?T {
        const max = this.tree.findMax()

        if (max) {
            this.tree.remove(max.value)

            return max.value
        }
    }
    insert(value: T): T {
        return this.tree.insert(value) && value
    }
    size(): number {
        let count = 0

        this.tree.preorder(() => count++)

        return count
    }
}

module.exports = PriorityQueue
