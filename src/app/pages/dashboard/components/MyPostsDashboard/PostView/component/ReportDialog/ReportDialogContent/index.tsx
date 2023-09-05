import React from 'react'
import Reason from './Reason'
import {styled} from '@mui/material'
import Wants from './Wants'
import ReportEdit from './ReportEdit'
import Attachment from './Attachment'

type Props = {}

const Root = styled('div')(() => ({
  padding: 24,
}))
const ReportDialogContent = (props: Props) => {
  return (
    <Root>
      <Reason />
      <Wants />
      <ReportEdit />
      <Attachment />
    </Root>
  )
}

export default ReportDialogContent
