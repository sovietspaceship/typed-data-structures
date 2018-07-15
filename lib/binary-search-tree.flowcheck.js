// @flow

const BinarySearchTree = require('./binary-search-tree')

module.exports = () => {
    {
        const tree: BinarySearchTree<number> = new BinarySearchTree()

        tree.find(2)
        tree.insert(1)
        tree.findMin()
        tree.isValid(0, 100000)
        tree.findMax()

        // $ExpectError
        tree.insert()

        // $ExpectError
        tree.find('')

        // $ExpectError
        tree.find(() => true) // should provide value instead of a function

        // $ExpectError
        tree.postorder()

        // $ExpectError
        tree.isValid() // should provide min and max ranges for datatype

        // $ExpectError
        tree.isValid('', '')
    }
}
