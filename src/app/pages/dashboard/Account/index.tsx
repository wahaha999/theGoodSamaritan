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
import Verification from './Verification'
import Location from './Location'
import {StepIconProps} from '@mui/material/StepIcon'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'
import {useAppDispatch, useAppSelector} from 'src/app/store/hook'
import {updateProfile} from '../store/accountSlice'
import {getUserByToken} from 'src/app/modules/auth/core/_requests'

const steps = ['Account Info', 'About Your Non Profit', 'Noe Profit Verification', 'Address']

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

const ColorlibStepIconRoot = styled('div')<{
  ownerState: {completed?: boolean; active?: boolean}
}>(({theme, ownerState}) => ({
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

function ColorlibStepIcon(props: StepIconProps) {
  const {active, completed, className} = props

  const icons: {[index: string]: React.ReactElement} = {
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
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean
  }>({})
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const user = useAppSelector(({user}) => user.user)
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    //  resolver: yupResolver(schema),
  })
  const {reset, watch, control, formState, getValues} = methods
  const form = watch()

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

  const handleStep = (step: number) => () => {
    setActiveStep(step)
  }

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    if (isLastStep()) {
      console.log('value===', getValues())
      dispatch(updateProfile(getValues()))
    } else {
      handleNext()
    }
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <FormProvider {...methods}>
      <Paper sx={{width: '100%', m: 4, p: 4}}>
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
                <Button onClick={handleReset}>Reset</Button>
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
                    <Button onClick={handleComplete}>
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
