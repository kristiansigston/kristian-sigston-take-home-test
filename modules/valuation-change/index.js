// extract to helper functions and then export for tests.
import PropTypes from 'prop-types';

import {
  HousePrice,
  PurchaseValues,
  PurchasePercent,
  Highlighted,
  RowFlexContainer
} from './style'
import formatCurrency from '../../components/helpers/format-currency'
import { AccountListItem, InfoText } from '../property-details/style'

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

  return <>
    <AccountListItem>

      <InfoText>
        {generatePurchasePriceString(originalPurchasePriceDate, originalPurchasePrice)}
      </InfoText>
    </AccountListItem>
    <AccountListItem>
      <RowFlexContainer>
        <InfoText>
          Since Purchase
        </InfoText>
        <Highlighted positive={originalPurchasePrice < recentValuationAmount}>
          <PurchaseValues>
            <HousePrice>
              <InfoText>
                {formatCurrency(recentValuationAmount)}
              </InfoText>
            </HousePrice>
            <PurchasePercent>
              <InfoText>
                ({sincePurchasePercentage}%)
              </InfoText>
            </PurchasePercent>
          </PurchaseValues>
        </Highlighted>
      </RowFlexContainer>
    </AccountListItem>
    <AccountListItem>
      <RowFlexContainer>
        <InfoText>
          Annual Appreciation
        </InfoText>
        <Highlighted positive={originalPurchasePrice < recentValuationAmount}>
          <InfoText>
            <PurchaseValues>
              {annualAppreciation}%
            </PurchaseValues>
          </InfoText>
        </Highlighted>
      </RowFlexContainer>
    </AccountListItem>
  </>
}

ValuationChange.propTypes = {
  housePriceData: PropTypes.shape({
    originalPurchasePrice: PropTypes.number.isRequired,
    recentValuationAmount: PropTypes.number.isRequired,
    originalPurchasePriceDate: PropTypes.string.isRequired
  })
}

export default ValuationChange

