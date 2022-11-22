const currencyFormat = (amount) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount)

}

export default currencyFormat