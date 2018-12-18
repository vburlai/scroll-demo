export type Element = {
    letter: string
    options: Array<string>
}

const OPTIONS = [
    'Lorem ipsum dolor sit amet',
    'consectetur adipiscing elit',
    'sed do eiusmod tempor incididunt',
    'ut labore et dolore magna aliqua',
    'Ut enim ad minim veniam quis nostrud',
    'exercitation ullamco laboris nisi ut',
    'aliquip ex ea commodo consequat',
]
const OPTIONS_LEN = OPTIONS.length

const LETTERS = [
    'L', 'O', 'R', 'E', 'M'
]
const LETTERS_LEN = LETTERS.length

export const generator = function* () {
    while (true) {
        yield {
            letter: LETTERS[Math.round(Math.random() * (LETTERS_LEN - 1))],
            options: OPTIONS.slice(0, 1 + Math.random() * (OPTIONS_LEN - 1))
        }
    }
}
