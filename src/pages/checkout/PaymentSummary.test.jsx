import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";

vi.mock('axios');

describe("PaymentSummary component" , () => {
    let loadCart;
    let paymentSummary;
    let user;

    beforeEach(() => {
        loadCart = vi.fn();
        paymentSummary = {
            "totalItems": 11,
            "productCostCents": 15004,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 15503,
            "taxCents": 1550,
            "totalCostCents": 17053
        }
        user = userEvent.setup();
        });

    it('checks the correct dollor amount' , () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </MemoryRouter>
        );

        const paymentSummaryRows = screen.getAllByTestId('payment-summary-row')

        expect(paymentSummaryRows[0]).toHaveTextContent('$150.04')
        expect(paymentSummaryRows[1]).toHaveTextContent('$4.99')
        expect(paymentSummaryRows[2]).toHaveTextContent('$155.03')
        expect(paymentSummaryRows[3]).toHaveTextContent('$15.50')
        expect(paymentSummaryRows[4]).toHaveTextContent('$170.53')
    })

    it('places an order' , async() => {
        function Location () {
            const location = useLocation();
            return (<div data-testid="url-path">{location.pathname}</div>)
        }

        render(
            <MemoryRouter>
                <PaymentSummary 
                paymentSummary={paymentSummary}
                loadCart={loadCart}
                />
                <Location />
            </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId('place-order-button')
        await user.click(placeOrderButton)

        expect(axios.post).toHaveBeenCalledWith('/api/orders')
        expect(loadCart).toHaveBeenCalled();
        expect(screen.getByTestId('url-path')).toHaveTextContent('/orders')
    })
})