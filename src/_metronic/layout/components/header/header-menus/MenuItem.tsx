import {FC} from 'react'
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {checkIsActive, KTIcon} from '../../../../helpers'
import {Button} from '@mui/material'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasArrow?: boolean
  hasBullet?: boolean
}

const MenuItemBy: FC<Props> = ({
  to,
  title,
  icon,
  fontIcon,
  hasArrow = false,
  hasBullet = false,
}) => {
  const {pathname} = useLocation()

  return (
    <Link to={to}>
      <Button
        color={checkIsActive(pathname, to) ? 'secondary' : 'primary'}
        sx={{textTransform: 'uppercase', mx: 1}}
      >
        {title}
      </Button>
    </Link>
  )
}

export {MenuItemBy}
