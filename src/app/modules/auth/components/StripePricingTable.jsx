import React from 'react';
import { Helmet } from 'react-helmet';

const StripePricingTable = () => {
  return (
    <>
      <Helmet>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Helmet>
      <stripe-pricing-table
        pricing-table-id="prctbl_1MxFx5LnLs48ohxHNO1h1N3L"
        customer_id="abcdefg"
        publishable-key="pk_test_51MpLQpLnLs48ohxHXEEGtaBg5DEzouVe6w9Ytwj711S5ffIk27KF3oG2aTqRWIh9n7zOL1CfQmh5qH3g8GoEg1D0001h62EzRQ"
      ></stripe-pricing-table>
    </>
  );
};

export default StripePricingTable;
