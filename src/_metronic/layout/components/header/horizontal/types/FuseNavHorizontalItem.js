import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useMemo } from 'react';
import withRouter from 'src/app/modules/core/withRouter/withRouter';
import FuseSvgIcon from 'src/app/modules/core/FuseSvgIcon/FuseSvgIcon';
import NavLinkAdapter from 'src/app/modules/core/NavLinkAdapter/NavLinkAdapter';
import { Hidden } from '@mui/material';
import { useAppSelector } from 'src/app/store/hook';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
  minHeight: 48,
  '&.active': {
    backgroundColor: `${theme.palette.primary.main}!important`,
    color: `${theme.palette.primary.contrastText}!important`,
    borderRadius:8,
    pointerEvents: 'none',
    '& .fuse-list-item-text-primary': {
      color: 'inherit',
    },
    '& .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& .fuse-list-item-icon': {},
  '& .fuse-list-item-text': {
    padding: '0 0 0 16px',
  },
}));

function FuseNavHorizontalItem(props) {
  const { item } = props;
 const { user } = useAppSelector(({ user }) => user)
  return useMemo(
    () => (
      <StyledListItem
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('fuse-list-item', item.active && 'active')}
        end={item.end}
        role="button"
        sx={item.sx}
        disabled={item.role === 'user' && user.role === 'admin'}
      >
        {item.icon && (
          <FuseSvgIcon
            className={clsx('fuse-list-item-icon shrink-0', item.iconClass)}
            color="action"
          >
            {item.icon}
          </FuseSvgIcon>
        )}
        <Hidden smDown>
          
        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          classes={{ primary: 'text-13 fuse-list-item-text-primary truncate' }}
        />
</Hidden>

        {/* {item.badge && <FuseNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />} */}
      </StyledListItem>
    ),
    [item.icon, item.iconClass, item.title, item.url,item.role,user.role,item.sx,item.end,item.active]
  );
}

FuseNavHorizontalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(memo(FuseNavHorizontalItem));

export default NavHorizontalItem;
