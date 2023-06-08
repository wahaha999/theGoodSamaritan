import {AppBar, Toolbar} from '@mui/material'
import clsx from 'clsx'
import React from 'react'

const ToolbarLayout = (props) => {
  return (
    <AppBar
      id='fuse-toolbar'
      className={clsx('flex relative z-20 shadow-md', props.className)}
      color='default'
      //   sx={{
      //     backgroundColor: (theme) =>
      //       theme.palette.mode === 'light'
      //         ? toolbarTheme.palette.background.paper
      //         : toolbarTheme.palette.background.default,
      //   }}
      position='static'
    >
      <Toolbar className='p-0 min-h-48 md:min-h-64'>
        hello
        {/* <div className='flex flex-1 px-16'>
          {config.navbar.display && config.navbar.position === 'left' && (
            <>
              <Hidden lgDown>
                {(config.navbar.style === 'style-3' || config.navbar.style === 'style-3-dense') && (
                  <NavbarToggleButton className='w-40 h-40 p-0 mx-0' />
                )}

                {config.navbar.style === 'style-1' && !navbar.open && (
                  <NavbarToggleButton className='w-40 h-40 p-0 mx-0' />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className='w-40 h-40 p-0 mx-0 sm:mx-8' />
              </Hidden>
            </>
          )}

          <Hidden lgDown>
            <NavigationShortcuts />
          </Hidden>
        </div>

        <div className='flex items-center px-8 h-full overflow-x-auto'>
          <LanguageSwitcher />

          <AdjustFontSize />

          <FullScreenToggle />

          <NavigationSearch />

          <Hidden lgUp>
            <ChatPanelToggleButton />
          </Hidden>

          <QuickPanelToggleButton />

          <NotificationPanelToggleButton />

          <UserMenu />
        </div>

        {config.navbar.display && config.navbar.position === 'right' && (
          <>
            <Hidden lgDown>
              {!navbar.open && <NavbarToggleButton className='w-40 h-40 p-0 mx-0' />}
            </Hidden>

            <Hidden lgUp>
              <NavbarToggleButton className='w-40 h-40 p-0 mx-0 sm:mx-8' />
            </Hidden>
          </>
        )} */}
      </Toolbar>
    </AppBar>
  )
}

export default ToolbarLayout
