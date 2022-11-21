const ValuationChange = ({ housePriceData }) => {
  const { originalPurchasePrice, recentValuationAmmount } = housePriceData
  return <div>

    {originalPurchasePrice} {recentValuationAmmount}</div>
}

export default ValuationChanges