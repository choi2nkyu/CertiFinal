module.exports = {
  'default e2e tests': (browser) => {
    browser
        .url('http://localhost:8080')
        .waitForElementVisible('body', 3000)
        .pause(3000)
        .waitForElementVisible('input[id=name]', 3000)
        .setValue('input[id=name]', 'Viaje')
        .pause(3000)
        .setValue('input[id=description]', 'Pagos viaje a PC')
        .pause(3000)
        .click('#buttonAdd')
        .pause(3000)
        .click('td[role=cell]')
        .pause(3000)
        .click('#buttonDetail')
        .pause(3000)
        .click('#buttonAddIncome')
        .pause(3000)
        .setValue('#Name', 'Cheque')
        .pause(3000)
        .setValue('#Category', 'Other')
        .pause(3000)
        .setValue('#Amount', 1000)
        .pause(3000)
        .click('#buttonCreate')
        .pause(3000)
        .click('#buttonAddOutcome')
        .pause(3000)
        .setValue('#Name', 'Boleto')
        .pause(3000)
        .setValue('#Category', 'Other')
        .pause(3000)
        .setValue('#Amount', 500)
        .pause(3000)
        .click('#buttonCreate')
        .pause(3000)
        .assert.containsText('#lblSaldo', '500')
        .end()
  },
}
