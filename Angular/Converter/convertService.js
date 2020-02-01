app.service("myservice", function () {
    let usdToForeignRates = {
        USD: 1,
        EUR: 0.74,
        CNY: 6.09
    };

    let currencies = ['USD', 'EUR', 'CNY']

    return {
        currencies : currencies,
        convert : function (amount, curr, changed) {
            var payment = amount * usdToForeignRates[curr] / usdToForeignRates[changed];
            console.log(usdToForeignRates[changed])
            return payment;
        }
    }
});

