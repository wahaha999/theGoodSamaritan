import React from 'react'
import { Helmet } from 'react-helmet';
import { useAppDispatch, useAppSelector } from 'src/app/store/hook';


const Subscription = () => {
  const {email} = useAppSelector(({user}) => user.user)
  const {dbkey} = useAppSelector(({account}) => account.dbkey)
    return (
    <>
      <Helmet>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Helmet>
      <stripe-pricing-table
          pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
          customer-email={email}
          client-reference-id={dbkey}
          publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
      ></stripe-pricing-table>
    </>
  )
}

export default Subscription