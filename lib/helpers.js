// @flow

const {
    path
} = require('ramda')

module.exports.rand = (max: number = 100, min: number = 0): number => (Math.random() * (max - min) | 0) + min
module.exports.path = (obj: mixed, pathspec: string): mixed => path(pathspec.split('.'), obj)
