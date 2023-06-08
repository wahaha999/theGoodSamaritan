import {Button, styled, useTheme} from '@mui/material'
import {ElementType, useMemo, useState} from 'react'
import {Manager, Popper, Reference} from 'react-popper'
import {useDebounce} from 'src/app/modules/hooks'
import Grow from '@mui/material/Grow'
import * as ReactDOM from 'react-dom'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import clsx from 'clsx'
import {Placement} from '@popperjs/core'
import {NavLink} from 'react-router-dom'
import NavLinkAdapter from 'src/app/modules/core/NavLinkAdapter/NavLinkAdapter'
import withRouter from 'src/app/modules/core/withRouter/withRouter'
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon'

const StyledListItem = styled(ListItem)(({theme}) => ({
  color: theme.palette.text.primary,
  '&.active, &.active:hover, &.active:focus': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    '& .fuse-list-item-text-primary': {
      color: 'inherit',
    },
    '& .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& .fuse-list-item-text': {
    padding: '0 0 0 16px',
  },
  '&.level-0': {
    minHeight: 44,
    borderRadius: 4,
    '&:hover': {
      background: 'transparent',
    },
  },
}))
function isUrlInChildren(parent, url) {
  if (!parent.children) {
    return false
  }

  for (let i = 0; i < parent.children.length; i += 1) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true
      }
    }

    if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
      return true
    }
  }

  return false
}
const HoverPopover = (props) => {
  const [opened, setOpened] = useState(false)
  const {item, nestedLevel, dense} = props
  const theme = useTheme()
  const handleToggle = useDebounce((open) => {
    setOpened(open)
  }, 150)

  return useMemo(() => {
    let popperPlacement = 'left'

    if (nestedLevel === 0) {
      popperPlacement = theme.direction === 'ltr' ? 'bottom-start' : 'bottom-end'
    } else {
      popperPlacement = theme.direction === 'ltr' ? 'right' : 'left'
    }
    return (
      <Manager>
        <Reference>
          {({ref}) => (
            <div ref={ref}>
              <StyledListItem
                className={clsx(
                  'fuse-list-item',
                  'relative',
                  `level-${nestedLevel}`
                  // isUrlInChildren(item, props.location.pathname) && 'active'
                )}
                onMouseEnter={() => handleToggle(true)}
                onMouseLeave={() => handleToggle(false)}
                aria-owns={opened ? 'menu-fuse-list-grow' : null}
                aria-haspopup='true'
                components={NavLinkAdapter}
                // components={NavLinkAdapter}
                // component={item.url ? NavLinkAdapter : 'li'}
                to={item.url}
                end={item.end}
                role='button'
                sx={item.sx}
                disabled={item.disabled}
              >
                {item.icon && (
                  <FuseSvgIcon
                    color='action'
                    className={clsx('fuse-list-item-icon shrink-0', item.iconClass)}
                  >
                    {item.icon}
                  </FuseSvgIcon>
                )}

                <ListItemText
                  className='fuse-list-item-text'
                  primary={item.title}
                  classes={{primary: 'text-13 truncate'}}
                />

                {nestedLevel > 0 && (
                  <IconButton
                    disableRipple
                    className='w-16 h-16 ltr:ml-4 rtl:mr-4 p-0'
                    color='inherit'
                    size='large'
                  >
                    <FuseSvgIcon size={16} className='arrow-icon'>
                      {theme.direction === 'ltr'
                        ? 'heroicons-outline:arrow-sm-right'
                        : 'heroicons-outline:arrow-sm-left'}
                    </FuseSvgIcon>
                  </IconButton>
                )}
              </StyledListItem>
            </div>
          )}
        </Reference>
        {ReactDOM.createPortal(
          <Popper
            placement={popperPlacement}
            // eventsEnabled={opened as boolean}
            strategy='fixed'
          >
            {({ref, style, placement, arrowProps}) =>
              opened && (
                <div
                  ref={ref}
                  style={{
                    ...style,
                    zIndex: 999 + nestedLevel,
                  }}
                  data-placement={placement}
                  className={clsx('z-999', !opened && 'pointer-events-none')}
                >
                  <Grow in={opened} id='menu-fuse-list-grow' style={{transformOrigin: '0 0 0'}}>
                    <Paper
                      className='rounded-8'
                      onMouseEnter={() => handleToggle(true)}
                      onMouseLeave={() => handleToggle(false)}
                    >
                      {item.children && (
                        <ul className={clsx('popper-navigation-list', dense && 'dense', 'px-0')}>
                          {item.children.map((_item) => (
                            <HoverPopover
                              key={_item.id}
                              type={`horizontal-${_item.type}`}
                              item={_item}
                              nestedLevel={nestedLevel}
                              dense={dense}
                            />
                          ))}
                        </ul>
                      )}
                    </Paper>
                  </Grow>
                </div>
              )
            }
          </Popper>,
          document.querySelector('#root')
        )}
      </Manager>
    )
  }, [dense, handleToggle, item, nestedLevel, opened, theme.direction])
}

export default withRouter(HoverPopover)
