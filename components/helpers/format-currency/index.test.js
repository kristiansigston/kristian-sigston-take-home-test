import currencyFormat from ".";

describe('currencyFormat', () => {
  it('formats the currency correctly when the currency is an integer', () => {
    expect(currencyFormat(54)).toEqual("£54.00")
  });

  it('formats the currecny correctly when the number is a float', () => {
    expect(currencyFormat(54.122)).toEqual("£54.12")
  });

  it.todo('test when 0')
  it.todo('test when undefined')
  it.todo("test when null")
});

