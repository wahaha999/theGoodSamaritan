import React, {FC, useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import {Button, Menu} from '@mui/material'
import clsx from 'clsx'
import {checkIsActive, KTIcon, WithChildren} from '../../../../helpers'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  menuTrigger?: 'click' | `{default:'click', lg: 'hover'}`
  menuPlacement?: 'right-start' | 'bottom-start' | 'left-start'
  hasArrow?: boolean
  hasBullet?: boolean
  isMega?: boolean
}

const MenuInnerWithSub: FC<Props & WithChildren> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  menuTrigger,
  menuPlacement,
  hasArrow = false,
  hasBullet = false,
  isMega = false,
}) => {
  const menuItemRef = useRef<HTMLDivElement>(null)
  const {pathname} = useLocation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        // onMouseLeave={handleClose}
        color={checkIsActive(pathname, to) ? 'secondary' : 'primary'}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{textTransform: 'uppercase', mx: 1}}
      >
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {children}
      </Menu>
    </>
    // <div ref={menuItemRef} className='menu-item menu-lg-down-accordion me-lg-1'>
    //   <span
    //     className={clsx('menu-link py-3', {
    //       active: checkIsActive(pathname, to),
    //     })}
    //   >
    //     {hasBullet && (
    //       <span className='menu-bullet'>
    //         <span className='bullet bullet-dot'></span>
    //       </span>
    //     )}

    //     {icon && (
    //       <span className='menu-icon'>
    //         <KTIcon iconName={icon} className='fs-2' />
    //       </span>
    //     )}

    //     {fontIcon && (
    //       <span className='menu-icon'>
    //         <i className={clsx('bi fs-3', fontIcon)}></i>
    //       </span>
    //     )}

    //     <span className='menu-title'>{title}</span>

    //     {hasArrow && <span className='menu-arrow'></span>}
    //   </span>
    //   <div
    //     className={clsx(
    //       'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown',
    //       isMega ? 'w-100 w-lg-850px p-5 p-lg-5' : 'menu-rounded-0 py-lg-4 w-lg-225px'
    //     )}
    //     data-kt-menu-dismiss='true'
    //   >
    //     {children}
    //   </div>
    // </div>
  )
}

export {MenuInnerWithSub}
