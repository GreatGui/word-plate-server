
const vowels = ['a', 'e', 'i', 'o', 'u']

const consonants = [
  'b',
  'c',
  'd',
  'f',
  'g',
  'h',
  'j',
  'l',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'v',
  'x',
  'z',
]

export function generateRandomLetters() {
  const letters = []

  const vowelIndex = Math.floor(Math.random() * vowels.length);
  letters.push(vowels[vowelIndex])

  const consonantIndex = Math.floor(Math.random() * consonants.length);
  letters.push(consonants[consonantIndex])

  const consonantIndex2 = Math.floor(Math.random() * consonants.length);
  letters.push(consonants[consonantIndex2])

  return letters.sort()
}
