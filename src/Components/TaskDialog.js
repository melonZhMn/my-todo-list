/*
 * @Author: melon
 * @Date: 2020-08-05 04:54:19
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 22:13:08
 */
import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

// 引入常量
import { ModalType } from '../constants/index'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@material-ui/core'
const { VIEW, CREATE, EDIT } = ModalType
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: '300px',
      maxWidth: '500px',
    },
  },
}))

const TaskDialog = ({
  handleClose,
  taskDialogData: { open, type, data },
  createTask,
  updateTask,
  getList,
  activeTab,
}) => {
  const [loading, setLoading] = useState('false')
  let input
  const isView = [VIEW].includes(type)
  let typeText = '查看'
  switch (type) {
    case CREATE:
      typeText = '新增'
      break
    case EDIT:
      typeText = '编辑'
      break
    default:
      break
  }
  const classes = useStyles()
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{typeText}任务</DialogTitle>
      <DialogContent>
        <form className={classes.root} autoComplete="off">
          <TextField
            inputRef={(node) => {
              input = node
            }}
            name="name"
            required
            id="outlined-helperText"
            label="任务名字"
            defaultValue={data.name}
            InputProps={{
              readOnly: isView,
            }}
            variant="outlined"
            color="secondary"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        {!isView ? (
          <Button
            onClick={async () => {
              setLoading('true')
              try {
                const res = [CREATE].includes(type)
                  ? await createTask({
                      variables: { name: input.value, completed: 0 },
                    })
                  : await updateTask({
                      variables: { ...data, name: input.value },
                    })

                if (!!res.data) {
                  await getList()
                  handleClose()
                }
              } catch (error) {
              } finally {
                setLoading('false')
              }
            }}
            color="secondary"
            type="submit"
            loading={loading}
          >
            {typeText}
          </Button>
        ) : (
          ''
        )}
      </DialogActions>
    </Dialog>
  )
}

export default TaskDialog
