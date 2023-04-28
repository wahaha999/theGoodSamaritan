import { Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router-dom';

const StripePricingTable = () => {
    const  {state}  = useLocation();
  const customer_id = state?.customer_id
  return (
    <>
      <Helmet>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Helmet>
      {
        customer_id &&
        <>
      <stripe-pricing-table
        pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
        customer-email={customer_id}
        publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
      ></stripe-pricing-table>
      <Typography>{ customer_id}</Typography>
        </>
      }
    </>
  );
};

export default StripePricingTable;
