import ValuationChange from ".";
import { theme } from '../../theme'
import { ThemeProvider } from "styled-components";

import { render, screen } from '@testing-library/react'

const originalPurchasePrice = 100000
const recentValuationAmount = 60000
const originalPurchasePriceDate = "2022-10-10"

describe('Valuation Change', () => {
  it('should render the Component', async () => {

    const housePriceData = {
      originalPurchasePrice, recentValuationAmount, originalPurchasePriceDate
    }

    render(<ThemeProvider theme={theme}>
      <ValuationChange housePriceData={housePriceData} />
    </ThemeProvider>)

    const heading = await screen.findByText(/purchased for/i)
    expect(heading).toBeInTheDocument()

    const price = await screen.findByText(/£60,000.00/)
    expect(price).toBeInTheDocument()
  });
});

