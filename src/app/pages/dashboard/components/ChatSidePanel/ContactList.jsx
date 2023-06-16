import React, {useMemo, useRef} from 'react'
import {styled} from '@mui/material/styles'
import FuseScrollbars from 'src/app/modules/core/FuseScrollbars/FuseScrollbars'
import {motion} from 'framer-motion'
import ContactButton from './ContactButton'
const Root = styled(FuseScrollbars)(({theme}) => ({
  background: theme.palette.background.paper,
}))

const ContactList = (props) => {
  const contactListScroll = useRef(null)

  return (
    <Root
      className='flex shrink-0 flex-col overflow-y-auto overscroll-contain h-screen'
      ref={contactListScroll}
      option={{suppressScrollX: true, wheelPropagation: false}}
    >
      {useMemo(() => {
        const container = {
          show: {
            transition: {
              staggerChildren: 0.05,
            },
          },
        }
        const variant = {
          hidden: {opacity: 0, scale: 0.6},
          show: {opacity: 1, scale: 1},
        }
        return (
          <>
            <motion.div
              variants={container}
              initial='hidden'
              animate='show'
              className='flex flex-col shrink-0'
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                <motion.div variants={variant} key={index}>
                  <ContactButton />
                </motion.div>
              ))}
            </motion.div>
          </>
        )
      }, [])}
    </Root>
  )
}

export default ContactList
