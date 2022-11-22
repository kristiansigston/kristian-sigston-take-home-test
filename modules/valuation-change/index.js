// extract to helper functions and then export for tests.
import PropTypes from 'prop-types';

import { ValuationData, HousePrice, ValuationContainer, PurchaseValues, PurchasePercent, Highlighted } from './style'
import formatCurrency from '../../components/helpers/format-currency'
import { InfoText } from '../property-details/style'


/// Extract all these into helper folders  //////////////////////////////////////////////////////////////

// use intl to get local month names
const ukMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// fixed years or partial years .... ?
const getNumberOfYearsSincePurchase = (purchaseDate) => {
  const today = new Date();
  const purchasedDateTime = new Date(purchaseDate);
  var timeDifference = today.getTime() - purchasedDateTime.getTime();
  const yearsSincePurchase = timeDifference / (1000 * 3600 * 24) / 365;
  return yearsSincePurchase.toFixed(1)
}

const calculatePriceDetails = (originalPurchasePrice, recentValuationAmount, purchaseDate) => {
  const sincePurchase = recentValuationAmount - originalPurchasePrice
  const sincePurchasePercentage = sincePurchase / originalPurchasePrice * 100
  const annualAppreciation = (sincePurchasePercentage / getNumberOfYearsSincePurchase(purchaseDate)).toFixed(2)
  return {
    sincePurchasePercentage,
    annualAppreciation
  }
}

const getMonth = (purchaseDate) => {
  const date = new Date(purchaseDate)
  return ukMonths[date.getMonth()]
}

const getYear = (purchaseDate) => {
  const date = new Date(purchaseDate)
  return date.getFullYear()
}

const generatePurchasePriceString = (purchaseDate, originalPurchasePrice) => {
  const month = getMonth(purchaseDate)
  const year = getYear(purchaseDate)
  return <InfoText>Purchased for <HousePrice>{formatCurrency(originalPurchasePrice)}</HousePrice> in {month} {year}</InfoText>
}

/// End of extract all these //////////////////////////////////////////////////////////////


const ValuationChange = ({ housePriceData }) => {
  const { originalPurchasePrice, recentValuationAmount, originalPurchasePriceDate } = housePriceData
  const { sincePurchasePercentage, annualAppreciation } = calculatePriceDetails(originalPurchasePrice, recentValuationAmount, originalPurchasePriceDate)

  return <ValuationData>
    {generatePurchasePriceString(originalPurchasePriceDate, originalPurchasePrice)}
    <ValuationContainer>
      <InfoText>
        Since Purchase
      </InfoText>
      <Highlighted positive={originalPurchasePrice < recentValuationAmount}>
        <PurchaseValues>
          <HousePrice>
            {formatCurrency(recentValuationAmount)}
          </HousePrice>
          <PurchasePercent>
            ({sincePurchasePercentage})%
          </PurchasePercent>
        </PurchaseValues>
      </Highlighted>
    </ValuationContainer>
    <ValuationContainer>
      <InfoText>
        Annual Appreciation
      </InfoText>
      <Highlighted positive={originalPurchasePrice < recentValuationAmount}>
        <PurchaseValues>
          {annualAppreciation}%
        </PurchaseValues>
      </Highlighted>
    </ValuationContainer>
  </ValuationData >
}

ValuationChange.propTypes = {
  housePriceData: PropTypes.shape({
    originalPurchasePrice: PropTypes.number,
    recentValuationAmount: PropTypes.number,
    originalPurchasePriceDate: PropTypes.string
  })
}

export default ValuationChange

