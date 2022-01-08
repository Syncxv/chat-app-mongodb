export function randomNumberBetweenDecimalToo(min: number, max: number) {
    return (Math.random() * (max - min) + min).toFixed(3)
}
