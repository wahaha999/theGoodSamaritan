import {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {useLocation} from 'react-router-dom'

const StripePricingTable = () => {
  const {state} = useLocation()
  const account_dbkey = state?.account_dbkey
  const email = state?.email
  useEffect(() => {
    localStorage.setItem('email', email)
  }, [email])
  return (
    <>
      <Helmet>
        <script async src='https://js.stripe.com/v3/pricing-table.js'></script>
      </Helmet>
      {account_dbkey && (
        <>
          <stripe-pricing-table
            customer-email={email}
            pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
            client-reference-id={account_dbkey}
            publishable-key={process.env.REACT_APP_PUBLISHABLE_KEY}
          ></stripe-pricing-table>
        </>
      )}
    </>
  )
}

export default StripePricingTable
