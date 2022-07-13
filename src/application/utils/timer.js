export const waitMilliseconds = (time = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}