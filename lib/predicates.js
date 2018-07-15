// @flow

module.exports.lessThan = (a: any, b: any): boolean %checks => {
    return a < b
}

module.exports.compare = (a: any, b: any): number =>{
    if (a < b) {
        return -1
    } else if (a > b) {
        return 1
    }

    return 0
}
