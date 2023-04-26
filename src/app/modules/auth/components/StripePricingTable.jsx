import React from 'react';
import { Helmet } from 'react-helmet';

const StripePricingTable = () => {
  return (
    <>
      <Helmet>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Helmet>
      <stripe-pricing-table
        pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
        customer_id="abcdefg"
        publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
      ></stripe-pricing-table>
    </>
  );
};

export default StripePricingTable;
