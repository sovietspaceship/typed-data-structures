// @flow

const Vector = require('./vector')

module.exports = () => {
    {
        const v: Vector<number> = new Vector()

        // $ExpectError
        v.push('string')

        // $ExpectError
        v.push()

        // $ExpectError
        v.reduce(1)

        // $ExpectError
        v.at('1')

        // $ExpectError
        v.at([])

        // $ExpectError
        v.reduceRight()

        // $ExpectError
        v.map(() => null)
    }
}
