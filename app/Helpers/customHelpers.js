'use strict'

const randomString = async (length) => {
    let result = ''
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678"
    for(let i = 0; i<characters.length; i++){
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

module.exports = randomString