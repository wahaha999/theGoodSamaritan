import {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/theme'
import Provider from 'react-redux/es/components/Provider';
import store from './store'
import { SnackbarProvider } from 'notistack'
import setupAxios from './setup/axios/SetupAxios'
import axios from 'axios'
import AuthInit from './modules/auth/core/Auth'
import FuseMessage from './modules/core/FuseMessage/FuseMessage'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
        <I18nProvider>
          <LayoutProvider>
            <ThemeProvider theme={theme}>
              <AuthInit>
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                  }}
                  >
                    
                  <Outlet />
                <MasterInit />
                <FuseMessage/>
                </SnackbarProvider>
              </AuthInit>
            </ThemeProvider>
          </LayoutProvider>
        </I18nProvider>
    </Suspense>
  )
}

export {App}
