import {
  Button,
  Chip,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {getBillingInfo} from '../store/billingSlice'
import moment from 'moment'

type Props = {}

const Billing = (props: Props) => {
  const {subscription, product, states} = useAppSelector(({post}) => post.billing)
  const {email} = useAppSelector(({user}) => user.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getBillingInfo())
  }, [])
  return (
    <>
      <Paper sx={{m: 1, p: 4}}>
        <Typography className='d-flex justify-content-center'>
          Billing Subscription Management
        </Typography>
        <TableContainer
          className='flex justify-content-center'
          // component={Paper}
          // sx={{overflow: 'auto'}}
        >
          <Table sx={{minWidth: 600, width: 'fit-content'}}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>Billing Information</Typography>
                  <Typography variant='body2'>Personal details and application.</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography>Stripe Customer</Typography>
                </TableCell>
                <TableCell>
                  {subscription ? (
                    <Typography>{subscription?.data[0].customer}</Typography>
                  ) : (
                    <Skeleton variant='rectangular' width={100} height={10} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Stripe Subscription</Typography>
                </TableCell>
                <TableCell>
                  {subscription ? (
                    <div className='flex flex-row d-flex space-x-2 align-items-center'>
                      <Typography>{subscription?.data[0].id}</Typography>
                      <Chip size='small' color='primary' label={subscription?.data[0].status} />
                    </div>
                  ) : (
                    <>
                      <div className='flex flex-row d-flex space-x-2 align-items-center'>
                        <Skeleton variant='rectangular' width={150} height={10} />
                        <Skeleton variant='rounded' width={40} height={20} />
                      </div>
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Plan</Typography>
                </TableCell>
                <TableCell>
                  {product ? (
                    <div className='flex flex-row d-flex space-x-2 align-items-center'>
                      <Typography>{product?.name}</Typography>
                      <img src={product?.images[0]} width={50} height={100} alt='plan' />
                    </div>
                  ) : (
                    <div className='flex flex-row d-flex space-x-2 align-items-center'>
                      <Skeleton variant='rectangular' width={100} height={10} />
                      <Skeleton variant='rectangular' width={50} height={60} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Period</Typography>
                </TableCell>
                <TableCell>
                  {subscription ? (
                    <div className='flex flex-row d-flex space-x-2 align-items-center'>
                      <Typography>
                        {
                          new Date(subscription.data[0].current_period_start * 1000)
                            .toISOString()
                            .split('T')[0]
                        }{' '}
                        ~{' '}
                        {
                          new Date(subscription.data[0].current_period_end * 1000)
                            .toISOString()
                            .split('T')[0]
                        }
                      </Typography>
                      {/* <img src={product?.images[0]} width={50} height={100} alt='plan' /> */}
                    </div>
                  ) : (
                    <Skeleton variant='rectangular' width={100} height={10} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Price</Typography>
                </TableCell>
                <TableCell>
                  {subscription ? (
                    <Typography>
                      {subscription.data[0].plan.amount / 100} {subscription.data[0].plan.currency}{' '}
                      / {subscription.data[0].plan.interval}
                    </Typography>
                  ) : (
                    <Skeleton variant='rectangular' width={100} height={10} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Email Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{email}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Manage</Typography>
                </TableCell>
                <TableCell>
                  <form
                    action='http://www.webhookstest.samaritanmarketplace.com/billing.php'
                    method='post'
                    data-turbo='false'
                  >
                    <input
                      type='hidden'
                      name='customer_id'
                      value={subscription?.data[0].customer}
                    />
                    <Button type='submit' variant='outlined'>
                      Manage
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography>Available Region</Typography>
                </TableCell>
                <TableCell>
                  <div className='flex flex-row space-x-2 space-y-2 d-flex align-items-center max-w-400 flex-wrap overflow-x-auto'>
                    {states
                      ? Object.keys(states).map((item: string, index: number) => (
                          <Chip key={index} label={states[item]} variant='outlined' color='info' />
                        ))
                      : Array(8)
                          .fill(8)
                          .map((item: number, index: number) => (
                            <Skeleton variant='rounded' width={60} height={30} key={index} />
                          ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default Billing
