// @flow

const { compare } = require('./predicates')

class Node<T> {
    value: T
    left: ?Node<T>
    right: ?Node<T>
    constructor(value: T) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree<T> {
    root: ?Node<T>
    predicate: (T, T) => number
    constructor(predicate: (T, T) => number = compare) {
        this.root = null
        this.predicate = predicate
    }

    insert(value: T): Node<T> {
        const node: Node<T> = new Node(value)
        const predicate = this.predicate

        if (!this.root) {
            this.root = node

            return node
        }

        return insertNode(this.root, node)

        function insertNode(tree, node): Node<T> {
            const comparison = predicate(node.value, tree.value)

            if (comparison === -1) {
                if (!tree.left) {
                    tree.left = node
                } else {
                    return insertNode(tree.left, node)
                }
            } else if (!tree.right) {
                tree.right = node
            } else {
                return insertNode(tree.right, node)
            }

            return node
        }
    }

    remove(value: T): ?Node<T> {
        const self: BinarySearchTree<T> = this

        this.root = removeNode(this.root, value)

        return this.root

        function removeNode(tree: ?Node<T>, value: T) {
            if (!tree) {
                return tree
            }
            const comparison = self.predicate(value, tree.value)

            if (comparison === -1) {
                tree.left = removeNode(tree.left, value)
            } else if (comparison === 1) {
                tree.right = removeNode(tree.right, value)
            } else {
                if (!tree.left && !tree.right) {
                    return null
                }

                if (!tree.right) {
                    return tree.left
                }

                if (!tree.left) {
                    return tree.right
                }

                const min: ?Node<T> = self.findMin(tree.right)

                if (!min) {
                    return null
                }

                tree.value = min.value
                tree.right = removeNode(tree.right, min.value)
            }

            return tree
        }
    }

    findMin(node: ?Node<T> = this.root): ?Node<T> {
        if (!node) {
            return null
        }

        if (!node.left) {
            return node
        }

        return this.findMin(node.left)
    }

    findMax(node: ?Node<T> = this.root): ?Node<T> {
        if (!node) {
            return null
        }

        if (!node.right) {
            return node
        }

        return this.findMax(node.right)
    }

    inorder(handler: T => mixed) {
        return inorderSub(this.root)

        function inorderSub(node) {
            if (node) {
                inorderSub(node.left)
                handler(node.value)
                inorderSub(node.right)
            }
        }
    }

    preorder(handler: T => mixed) {
        return preorderSub(this.root)

        function preorderSub(node) {
            if (node) {
                handler(node.value)
                preorderSub(node.left)
                preorderSub(node.right)
            }
        }
    }

    postorder(handler: T => mixed) {
        return postorderSub(this.root)

        function postorderSub(node) {
            if (node) {
                postorderSub(node.left)
                postorderSub(node.right)
                handler(node.value)
            }
        }
    }

    isValid(min: T, max: T): boolean {
        const predicate = this.predicate

        if (!this.root) {
            return true
        }

        return isValidBinarySearchTree(this.root, min, max)

        function isValidBinarySearchTree(tree, min: T, max: T) {
            if (!tree) {
                return true
            }
            if (predicate(tree.value, min) === -1 || predicate(tree.value, max) === 1) {
                return false
            }

            return isValidBinarySearchTree(tree.left, min, tree.value) && isValidBinarySearchTree(tree.right, tree.value, max)
        }
    }

    find(value: T): ?Node<T> {
        const predicate = this.predicate


        return findInSubtree(this.root)

        function findInSubtree(node: ?Node<T>) {
            if (!node) {
                return null
            }
            const comparison = predicate(value, node.value)

            if (comparison === -1) {
                return findInSubtree(node.left)
            } else if (comparison === 1) {
                return findInSubtree(node.right)
            }

            return node
        }
    }
}

module.exports = BinarySearchTree
