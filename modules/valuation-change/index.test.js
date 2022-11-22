import ValuationChange from ".";

import { render, screen } from '@testing-library/react'

describe('Valuation Change', () => {
  it('should render the Component', () => {
    render(<ValuationChange />)
    screen.findByRole('heading', { name: /lo/ }).toBeInTheDocument()
  });
});