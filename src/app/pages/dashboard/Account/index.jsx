import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  Grid,
  Paper,
  StepConnector,
  StepLabel,
  stepConnectorClasses,
  styled,
  useTheme,
} from '@mui/material'
import AccountInfo from './AccountInfo'
import {FormProvider, useForm} from 'react-hook-form'
import AboutNonProfit from './AboutNonProfit'
import Location from './Location'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {updateProfile} from '../store/accountSlice'
import Verification from './Verification'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import _ from 'src/app/modules/@lodash/@lodash'
import FuseLoading from 'src/app/modules/core/FuseLoading/FuseLoading'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {useNavigate} from 'react-router-dom'
import {toAbsoluteUrl} from 'src/_metronic/helpers'

const steps = ['Account Info', 'About Your Non Profit', 'Non Profit Verification', 'Address']

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 40,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(105,39,183) 0%, rgb(98,39,183) 50%, rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(105,39,183) 0%, rgb(98,39,183) 50%, rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
  [theme.breakpoints.down('sm')]: {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 25,
    },
  },
}))

const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 70,
  cursor: 'pointer',
  height: 70,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(105,39,183) 0%, rgb(98,39,183) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(105,39,183) 0%, rgb(98,39,183) 50%, rgb(138,35,135) 100%)',
  }),
  [theme.breakpoints.down('sm')]: {
    width: 50,
    height: 50,
  },
}))

function validateEIN(ein) {
  if (ein) {
    if (ein[2] !== '-') {
      return false
    }
    // Remove any dashes from the EIN number
    ein = ein.replace(/-/g, '')
    // Validate that the EIN number is exactly nine digits long
    if (!/^\d{9}$/.test(ein)) {
      return false
    }

    // Validate that the first two digits are between 01 and 99
    const firstTwoDigits = parseInt(ein.substring(0, 2), 10)
    if (firstTwoDigits < 1 || firstTwoDigits > 99) {
      return false
    }

    // Validate that the third digit is between 1 and 6
    const thirdDigit = parseInt(ein.substring(2, 3), 10)
    if (thirdDigit < 1 || thirdDigit > 6) {
      return false
    }
  }

  // Calculate the check digit and validate that it matches the ninth digit
  // let checkDigit = 0
  // for (let i = 0; i < 8; i++) {
  //   checkDigit += parseInt(ein.substring(i, i + 1), 10) * (9 - i)
  // }
  // checkDigit = (10 - (checkDigit % 10)) % 10

  // if (checkDigit !== parseInt(ein.substring(8, 9), 10)) {
  //   return false
  // }

  // If all checks pass, the EIN number is valid
  return true
}
yup.addMethod(yup.StringSchema, 'validateEIN', function (errorMessage) {
  return this.test('validateEIN', errorMessage, function (value) {
    const {createError} = this
    const isValid = validateEIN(value)

    return isValid || createError({message: errorMessage})
  })
})

const schema = yup.object().shape({
  non_profit_name: yup.string().required('Non Profit Name is required'),

  organize: yup
    .number()
    .min(1, 'Please select the size of your non-profit')
    .required('organize is required'),
  EIN: yup
    .string()
    .validateEIN('Please enter the correct format to enter your EIN ##-#######')
    .test(
      'EINRequired',
      'EIN is required when Non Profit Document is not loaded.',
      function (value) {
        const nonProfitDocument = this.resolve(yup.ref('doc'))

        if (
          nonProfitDocument === undefined ||
          (typeof nonProfitDocument === 'string' && JSON.parse(nonProfitDocument).length) === 0 ||
          nonProfitDocument.length === 0
        ) {
          // If Non Profit Document is not loaded, then EIN is required
          return !!value
        }
        // If Non Profit Document is loaded, then EIN is not required
        return true
      }
    ),
  address: yup.string().required('You must enter a address'),
  city: yup.string().required('You must enter a city'),
  state: yup.string().required('You must enter a state'),
  zip_code: yup.string().required('You must enter a Zip Code'),
  timezone: yup.string().required('You must select Your Timezone'),
})

function ColorlibStepIcon(props) {
  const {active, completed, className} = props

  const icons = {
    1: (
      <FuseSvgIcon className='text-blue' size={30}>
        heroicons-solid:camera
      </FuseSvgIcon>
    ),
    2: (
      <FuseSvgIcon className='text-blue' size={30}>
        heroicons-solid:document-add
      </FuseSvgIcon>
    ),
    3: (
      <FuseSvgIcon className='text-blue' size={30}>
        heroicons-solid:cloud-upload
      </FuseSvgIcon>
    ),
    4: (
      <FuseSvgIcon className='text-blue' size={30}>
        heroicons-solid:office-building
      </FuseSvgIcon>
    ),
  }

  return (
    <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

export default function Account() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})
  const [filled, setFilled] = React.useState(false)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const navigate = useNavigate()
  const user = useAppSelector(({user}) => user.user)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      fax_number: '',
      phone_number: '',
    },

    resolver: yupResolver(schema),
  })
  const {reset, watch, formState, trigger, getValues, handleSubmit} = methods
  const form = watch()
  const {isValid} = formState

  React.useEffect(() => {
    reset({...user.account})
  }, [user, reset])

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return activeStep === 4
  }

  const handleNext = () => {
    if (isLastStep() && isValid) {
      dispatch(updateProfile(getValues()))
        .then(() => {
          setFilled(true)
          // dispatch(showMessage({ message: 'Successfully updated', variant: 'success' }));
          setActiveStep(4)
        })
        .catch((err) => {
          // dispatch(showMessage({message:'Something is wrong',variant:'error'}))
        })
    } else {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1
      setActiveStep(newActiveStep)
      const newCompleted = completed
      newCompleted[activeStep] = true
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = (data) => {
    const {non_profit_name, EIN, organize} = data
    if (
      (!non_profit_name && activeStep === 0) ||
      (activeStep === 1 && !organize) ||
      (!EIN && activeStep === 2) ||
      (isValid && activeStep === 3)
    ) {
      // handleSubmit()
      const newCompleted = completed
      newCompleted[activeStep] = true
      setCompleted(newCompleted)
      if (isLastStep() && isValid) {
        dispatch(updateProfile(getValues()))
          .then(() => {
            setActiveStep(4)

            // dispatch(showMessage({message:'Successfully updated',variant:'success'}))
          })
          .catch((err) => {
            // dispatch(showMessage({message:'Something is wrong',variant:'error'}))
          })
      } else {
        handleNext()
      }
    }
  }

  const handleReset = () => {
    navigate('/dashboard')
  }

  if (_.isEmpty(form) || !user) {
    return <FuseLoading />
  }

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={handleSubmit(handleComplete)}> */}
      <Paper sx={{m: 1, p: 4}}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                onClick={handleStep(index)}
                sx={{'& .MuiStepLabel-label': {fontSize: 12, fontWeight: 600}}}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {filled ? (
            <React.Fragment>
              <Grid
                container
                justifyContent='center'
                direction='column'
                alignItems='center'
                sx={{height: '60vh'}}
              >
                <Grid item md={6}>
                  <img
                    src={toAbsoluteUrl('/media/misc/congratulation.png')}
                    width='200px'
                    alt='congratulation'
                  />
                </Grid>
                <Box>
                  <Typography
                    variant='h6'
                    sx={{mt: 2, mb: 1, color: theme.palette.success.main, textAlign: 'center'}}
                  >
                    Congratulations, All required information on your Account has been filled in.
                    You may go back to your dashboard and start networking.
                  </Typography>
                </Box>
              </Grid>
              <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Box sx={{flex: '1 1 auto'}} />
                <Button variant='contained' onClick={handleReset}>
                  Back to Dashboard
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid container justifyContent='center' alignItems='center'>
                <Box sx={{}}>{activeStep === 0 && <AccountInfo />}</Box>
                <Box sx={{}}>{activeStep === 1 && <AboutNonProfit />}</Box>
                <Box sx={{}}>{activeStep === 2 && <Verification trigger={trigger} />}</Box>
                <Box sx={{}}>{activeStep === 3 && <Location />}</Box>
              </Grid>
              <Grid container justifyContent='space-around' sx={{my: 4}}>
                {/* <AppBar
                position='relative'
                sx={{top: 'auto', bottom: 0, boxShadow: 'none'}}
                color='inherit'
              >
                <Toolbar> */}
                {/* <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}> */}
                <Button
                  color='primary'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{mr: 1}}
                  variant='contained'
                  startIcon={<ChevronLeftIcon />}
                >
                  Back
                </Button>
                {/* <Box sx={{flex: '1 1 auto'}} /> */}
                {/* <Button onClick={handleNext} sx={{mr: 1}}>
                    Next
                  </Button> */}
                {/* {activeStep !== steps.length &&
                    (completed[activeStep] ? (
                      <Typography variant='caption' sx={{display: 'inline-block'}}>
                        Step {activeStep + 1} already completed
                      </Typography>
                    ) : ( */}
                <Button
                  endIcon={<ChevronRightIcon />}
                  variant='contained'
                  onClick={handleSubmit(handleNext, handleComplete)}
                >
                  {completedSteps() === totalSteps() - 1 ? 'Update' : 'Continue'}
                </Button>
                {/* <input type="submit"/> */}
                {/* ))} */}
                {/* </Box> */}
                {/* </Toolbar>
              </AppBar> */}
                {/* <Typography sx={{mt: 2, mb: 1, py: 1}}>Step {activeStep + 1}</Typography> */}
              </Grid>
            </React.Fragment>
          )}
        </div>
      </Paper>
      {/* </form> */}
    </FormProvider>
  )
}
