// Function to fetch currency data and populate dropdowns
function populateDropdowns() {
    fetch('https://freetestapi.com/api/v1/currencies')
      .then(response => response.json())
      .then(data => {
        const selectFrom = document.getElementById('fromCurrency');
        const selectTo = document.getElementById('toCurrency');
  
        // Populate currency dropdowns
        data.forEach(currency => {
          const optionFrom = document.createElement('option');
          optionFrom.value = currency.code;
          optionFrom.textContent = `${currency.name} (${currency.code})`;
          selectFrom.appendChild(optionFrom);
  
          const optionTo = document.createElement('option');
          optionTo.value = currency.code;
          optionTo.textContent = `${currency.name} (${currency.code})`;
          selectTo.appendChild(optionTo);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Function to perform currency conversion
  function convert() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    // Fetch exchange rate for the 'fromCurrency' from the API
    fetch('https://freetestapi.com/api/v1/currencies')
      .then(response => response.json())
      .then(data => {
        // Find the selected currency data from the API response
        const fromCurrencyData = data.find(currency => currency.code === fromCurrency);
        const toCurrencyData = data.find(currency => currency.code === toCurrency);
  
        if (fromCurrencyData && toCurrencyData) {
          // Perform currency conversion
          const exchangeRate = toCurrencyData.exchange_rate / fromCurrencyData.exchange_rate;
          const result = amount * exchangeRate;
          document.getElementById('result').innerHTML = `${amount} ${fromCurrencyData.code} = ${result.toFixed(2)} ${toCurrencyData.code}`;
        } else {
          document.getElementById('result').innerHTML = 'Currency data not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'An error occurred while fetching currency data. Please try again later.';
      });
  }
  
  // Call populateDropdowns function when the page loads
  window.onload = function() {
    populateDropdowns();
  };
  