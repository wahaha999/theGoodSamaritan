import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {
  Grid,
  Paper,
  StepConnector,
  StepLabel,
  Tab,
  stepConnectorClasses,
  styled,
  useTheme,
} from '@mui/material'
import AccountInfo from './AccountInfo'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import AboutNonProfit from './AboutNonProfit'
import Location from './Location'
import {StepIconProps} from '@mui/material/StepIcon'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {updateProfile} from '../store/accountSlice'
import {getUserByToken} from 'src/app/modules/auth/core/_requests'
import Verification from './Verification'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'src/app/modules/@lodash/@lodash'
import FuseLoading from 'src/app/modules/core/FuseLoading/FuseLoading'
import { showMessage } from 'src/app/store/fuse/messageSlice'
import { getStates } from '../store/planSlice'

const steps = ['Account Info', 'About Your Non Profit', 'Non Profit Verification', 'Address']

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  cursor: 'pointer',
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}))


function validateEIN(ein) {
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

  // Calculate the check digit and validate that it matches the ninth digit
  let checkDigit = 0
  for (let i = 0; i < 8; i++) {
    checkDigit += parseInt(ein.substring(i, i + 1), 10) * (9 - i)
  }
  checkDigit = (10 - (checkDigit % 10)) % 10

  if (checkDigit !== parseInt(ein.substring(8, 9), 10)) {
    return false
  }

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
  phone_number: yup.string().required('You must enter a Phone Number'),
  address: yup.string().required('You must enter a address'),
  city: yup.string().required('You must enter a city'),
  state: yup.string().required('You must enter a state'),
  zip_code: yup.string().required('You must enter a Zip Code'),
  EIN: yup.string().required('EIN is required').validateEIN('Invalid EIN format'),
  non_profit_name: yup.string().required('Non Profit Name is required'),
})


function ColorlibStepIcon(props) {
  const {active, completed, className} = props

  const icons = {
    1: <FuseSvgIcon className='text-blue'>heroicons-solid:camera</FuseSvgIcon>,
    2: <FuseSvgIcon className='text-blue'>heroicons-solid:document-add</FuseSvgIcon>,
    3: <FuseSvgIcon className='text-blue'>heroicons-solid:cloud-upload</FuseSvgIcon>,
    4: <FuseSvgIcon className='text-blue'>heroicons-solid:office-building</FuseSvgIcon>,
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
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const user = useAppSelector(({user}) => user.user)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      fax_number: '',
      phone_number:'',
    },
     resolver: yupResolver(schema),
  })
  const {reset, watch, control, formState, getValues,handleSubmit} = methods
  const form = watch();
  const { errors, isValid } = formState;

  React.useEffect(() => {
    dispatch(getStates())
  },[])

  React.useEffect(() => {
    reset({...user})
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
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleComplete = (data) => {
    console.log('activestep==', activeStep,errors,data);
    
    const newCompleted = completed
    newCompleted[activeStep] = true
    
    setCompleted(newCompleted)
    if (isLastStep() && isValid) {
      console.log('value===', getValues())
      dispatch(updateProfile(getValues())).then(() => {
        dispatch(showMessage({message:'Successfully updated',variant:'success'}))
      }).catch(err => {
        dispatch(showMessage({message:'Something is wrong',variant:'error'}))
      })
    } else {
      handleNext()
    }
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  if (_.isEmpty(form) || !user) {
    return <FuseLoading/>
  }

  return (
    <FormProvider {...methods}>
      <Paper sx={{width: '100%', m: 1, p: 4}}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel StepIconComponent={ColorlibStepIcon} onClick={handleStep(index)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography
                variant='h6'
                sx={{mt: 2, mb: 1, color: theme.palette.success.main, textAlign: 'center'}}
              >
                Congratulations, All required information on your Account has been filled in. You
                may go back to your dashboard and start networking.
              </Typography>
              <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Box sx={{flex: '1 1 auto'}} />
                <Button onClick={handleReset}>Update Account</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Grid container justifyContent='center'>
                <Box sx={{p: 3}}>{activeStep == 0 && <AccountInfo />}</Box>
                <Box sx={{p: 3}}>{activeStep == 1 && <AboutNonProfit />}</Box>
                <Box sx={{p: 3}}>{activeStep == 2 && <Verification />}</Box>
                <Box sx={{p: 3}}>{activeStep == 3 && <Location />}</Box>
              </Grid>
              {/* <Typography sx={{mt: 2, mb: 1, py: 1}}>Step {activeStep + 1}</Typography> */}
              <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button
                  color='inherit'
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{mr: 1}}
                >
                  Back
                </Button>
                <Box sx={{flex: '1 1 auto'}} />
                {/* <Button onClick={handleNext} sx={{mr: 1}}>
                  Next
                </Button> */}
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant='caption' sx={{display: 'inline-block'}}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button disabled={completedSteps() === totalSteps() - 1 && !isValid} onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Paper>
    </FormProvider>
  )
}
