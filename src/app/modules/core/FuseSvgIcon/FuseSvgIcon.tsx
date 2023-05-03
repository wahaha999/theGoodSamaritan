import clsx from 'clsx'
import {forwardRef, ForwardedRef} from 'react'
import {styled, Theme} from '@mui/material/styles'
import {Box} from '@mui/system'
import Icon from '@mui/material/Icon'
import {toAbsoluteUrl} from 'src/_metronic/helpers'

interface RootProps {
  size?: number | string
  color?: string
  theme?: Theme
}

const Root = styled(Box)(({theme, ...props}: RootProps) => ({
  width: props.size,
  height: props.size,
  minWidth: props.size,
  minHeight: props.size,
  fontSize: props.size,
  lineHeight: props.size,
  color: {
    primary: theme?.palette.primary.main,
    secondary: theme?.palette.secondary.main,
    info: theme?.palette.info.main,
    success: theme?.palette.success.main,
    warning: theme?.palette.warning.main,
    action: theme?.palette.action.active,
    error: theme?.palette.error.main,
    disabled: theme?.palette.action.disabled,
    inherit: undefined,
  }[props.color ?? 'inherit'],
}))

interface FuseSvgIconProps {
  children?: string
  size?: number | string
  sx?: object
  className?: string
  color?:
    | 'inherit'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'action'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

const FuseSvgIcon = forwardRef<HTMLDivElement, FuseSvgIconProps>((props, ref) => {
  if (!props.children?.includes(':')) {
    return <Icon ref={ref as ForwardedRef<HTMLDivElement>} {...props} />
  }

  const iconPath = props.children.replace(':', '.svg#')

  return (
    <Root
      {...props}
      component='svg'
      // fill='none'

      className={clsx('shrink-0 fill-current', props.className)}
      ref={ref}
      size={props.size}
      sx={props.sx}
      color={props.color}
    >
      <use
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        xlinkHref={toAbsoluteUrl(`/assets/icons/${iconPath}`)}
      />
    </Root>
  )
})

FuseSvgIcon.defaultProps = {
  children: '',
  size: 24,
  sx: {},
  color: 'inherit',
}

export default FuseSvgIcon
