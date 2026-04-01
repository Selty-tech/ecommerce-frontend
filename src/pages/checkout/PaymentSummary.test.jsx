import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios'
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 1,
      productCostCents: 1090,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 1090,
      taxCents: 109,
      totalCostCents: 1199,
    };

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays the correct details', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );
  // solution 1 
  //   expect(
  //     screen.getByText(`Items (${paymentSummary.totalItems}):`),
  //   ).toBeInTheDocument();

  //   expect(
  //     within(screen.getByTestId('payment-summary-product-cost')).getByText(
  //       '$10.90',
  //     ),
  //   ).toBeInTheDocument();
  // });

  // solution 2 

  expect(
  screen.getByTestId('payment-summary-shipping-cost')
  ).toHaveTextContent('$0.00');
  

  expect(
    screen.getByTestId('payment-summary-total-before-tax')
  ).toHaveTextContent('$10.90');

  expect(
    screen.getByTestId('payment-summary-tax')
  ).toHaveTextContent('$1.09');

  expect(
    screen.getByTestId('payment-summary-total')
  ).toHaveTextContent('$11.99');
});

  it('places an order', async () => {
  function Location() {
    const location = useLocation();
    return <div data-testid="url-path">
      {location.pathname}</div>;
  }

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
        <Location />
      </MemoryRouter>
    );
    const placeOrderButton = screen.getByTestId('place-order-button');
      await user.click(placeOrderButton);

      expect(axios.post).toHaveBeenCalledWith('/api/orders');
      expect(loadCart).toHaveBeenCalled();
      expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
 })
});