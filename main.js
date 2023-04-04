import checkCardNumber from './src/checkCardNumber.js'

const cardNumber = document.querySelector('.card-number')
const company = document.querySelector('.company')
const btnVerify = document.querySelector('.verifyButton')

const checkNumbers = (e) => {
  e.preventDefault()
  const numbers = cardNumber.value
  if (numbers === '') {
    return alert('You have to enter the card number')
  } else if (isNaN(numbers)) {
    return alert('The card number should be entered without special characters (spaces, hyphens etc.)')
  }

  try {
    const checkResult = checkCardNumber(numbers)
    company.innerHTML = checkResult
    company.innerHTML === 'Invalid card number' ? company.style.color = 'RGB(147, 57, 46)' : company.style.color = "RGB(87, 136, 107)"
    console.log(checkResult)
  } catch (error) {
    return alert(error)
  }
}

btnVerify.onclick = checkNumbers

cardNumber.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    btnVerify.click()
  }
})