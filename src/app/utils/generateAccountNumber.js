function pad(num, width) {
  // eslint-disable-next-line prefer-template
  let formatedNumber = num + '';

  while (formatedNumber.length < width) {
    // eslint-disable-next-line prefer-template
    formatedNumber = '0' + formatedNumber;
  }

  return formatedNumber;
}

function generateAccountNumber() {
  const numberFloat = Math.random();
  const randomNumber = numberFloat * 10000;
  const numberInt = Math.floor(randomNumber);
  const accountNumber = pad(numberInt, 5);

  return accountNumber;
}

module.exports = generateAccountNumber;
