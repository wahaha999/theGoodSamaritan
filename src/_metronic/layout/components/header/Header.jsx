import {styled} from '@mui/material/styles'
import clsx from 'clsx'
import {memo} from 'react'
// import Logo from '../../shared-components/Logo'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import Navigation from './Navigation'

const Root = styled('div')(({theme, sx}) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  ...sx,
}))

function NavbarLayout2(props) {
  return (
    <Root
      className={clsx('flex w-full h-64 min-h-40 max-h-40 shadow-md', props.className)}
      sx={props.sx}
    >
      <div className='flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24 z-20'>
        {/* <div className='flex shrink-0 items-center px-8'> */}
        {/* <Logo /> */}
        {/* Logo
        </div> */}

        <FuseScrollbars className='flex h-full items-center'>
          <Navigation className='w-full' layout='horizontal' />
        </FuseScrollbars>
      </div>
    </Root>
  )
}

export default memo(NavbarLayout2)
