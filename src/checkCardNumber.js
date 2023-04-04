const sum = (array) => {
  return array.reduce(function (x, y) {
    return x + parseInt(y);
  }, 0)
}

const firsStepLuhnAlgorithm = (numbers) => {
  let odds = []
  const evenNumbers = []

  for (const [index, char] of [...numbers.split("").reverse().join("")].entries()) {
    ((index % 2 !== 0 ) ? odds.push(String(char*2)) : evenNumbers.push(char))
  }
  const oddSum = sum(odds.join('').split(''))

  return [evenNumbers, oddSum]
}

const secondStepLuhnAlgorithm = (evenNumbers, oddSum) => {
  const evenSum = sum(evenNumbers)

  return evenSum + oddSum
}

const thirdStepLuhnAlgorithm = (number) => {
  return number % 10 === 0
}

const checkCardLength = (numbers) => {
  return numbers.length
}

const checkCardPrefix = (numbers, prefix, prefixLength) => {
  return prefix === numbers.toString().substring(0, prefixLength)
}

const checkPrefixes = (numbers, prefixes, prefixLength) => {
  let companyFound = false

  for (let i = 0; i < prefixes.length && !companyFound; i++) {
    companyFound = checkCardPrefix(numbers, prefixes[i], prefixLength)
  }

  return companyFound
}

const checkCompany = (numbers) => {
  const masterCardPrefixes = ['51', '52', '53', '54', '55']
  const VisaPrefixes = ['4']
  const americanExpressPrefixes = ['34', '37']

  if (checkCardLength(numbers) == 16 && checkPrefixes(numbers, masterCardPrefixes, 2)) {
    return 'Mastercard'
  } else if ((checkCardLength(numbers) == 16 || checkCardLength(numbers) === 13) && checkPrefixes(numbers, VisaPrefixes, 1)) {
    return 'Visa'
  } else if (checkCardLength(numbers) === 15 && checkPrefixes(numbers, americanExpressPrefixes, 2)) {
    return 'American Express'
  }
  return 'Invalid card number'
}

function checkCardNumber (numbers) {
  const [evenNumbers, oddSum] = firsStepLuhnAlgorithm(numbers)
  const secondStep = secondStepLuhnAlgorithm(evenNumbers, oddSum)

  if (thirdStepLuhnAlgorithm(secondStep)) {
    return checkCompany(numbers)
  }
  return 'Invalid card number'
}

export default checkCardNumber