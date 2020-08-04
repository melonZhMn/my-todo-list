/*
 * @Author: melon
 * @Date: 2020-08-05 00:50:45
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 07:36:57
 */
import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

// 引入常量
import { ModalType } from '../Constants/index'

// 引入样式表
import './TodoList.css'

import {
  CssBaseline,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { green, grey, lightBlue, pink, red } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import ReplyIcon from '@material-ui/icons/Reply'

import TaskDialog from '../Components/TaskDialog'
import TaskList from '../Components/TaskList'
const { VIEW, CREATE, EDIT } = ModalType

const usePaperStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
})

const TodoList = () => {
  const paperClasses = usePaperStyles()
  // 选中的tab
  const [activeValue, setActiveValue] = useState(0)
  // 添加弹出窗数据
  const [taskDialogData, setTaskDialogData] = useState({
    open: false,
    type: VIEW,
    data: {},
  })
  // 列表数据
  const list = Array.from({ length: 10 }, (v, i) => ({
    id: Math.random(100),
    name: 'I am task',
    sequence: i,
    completed: i % 2 === 0 ? true : false,
  }))

  // 切换tab
  const handleChange = (event, newValue) => {
    setActiveValue(newValue)
  }
  // 显示task弹窗
  const showTaskDialog = (type = VIEW, data = {}) => {
    setTaskDialogData({
      open: true,
      type,
      data,
    })
  }
  // 隐藏task弹窗
  const hideTaskDialog = () => {
    setTaskDialogData({
      ...taskDialogData,
      open: false,
    })
  }
  // 获取列表数据
  const getList = () => {}
  // 保存弹窗数据
  const saveTaskData = () => {}

  // 删除数据
  const onDelete = (id) => {
    // 派发删除请求
    // 重新获取数据
  }
  // 获取单个数据
  const getInfoById = () => {
    // 派发请求
  }
  // 修改完成状态
  const updateCompleteStatus = () => {
    // 派发请求
    // 重新获取数据
  }
  return (
    <div className="todo-wrapper">
      <CssBaseline />
      <Container fixed>
        <Box className="todo-header">
          <Typography variant="h3" className="todo-title">
            todo
          </Typography>
          <Tooltip title="添加一个任务">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => showTaskDialog(CREATE)}
            >
              添加{' '}
            </Button>
          </Tooltip>
        </Box>
        <Box className="todo-content">
          <Paper square className={paperClasses.root}>
            <Tabs
              value={activeValue}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="未完成" value={0} />
              <Tab label="已完成" value={1} />
            </Tabs>
          </Paper>
        </Box>
      </Container>
      <TaskDialog
        taskDialogData={taskDialogData}
        handleClose={hideTaskDialog}
        onCreate={saveTaskData}
      />
      <TaskList
        list={list}
        getActions={(data) => (
          <Box>
            <Tooltip title="编辑">
              <IconButton
                key={'edit' + data.id}
                onClick={() => showTaskDialog(EDIT, data)}
              >
                <EditIcon style={{ color: pink[400] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="查看">
              <IconButton
                key={'view' + data.id}
                onClick={() => showTaskDialog(VIEW, data)}
              >
                <RemoveRedEyeIcon style={{ color: lightBlue[500] }} />
              </IconButton>
            </Tooltip>
            {data.completed ? (
              <Tooltip title="重新打开">
                <IconButton
                  key={'reopen' + data.id}
                  onClick={() => updateCompleteStatus(data)}
                >
                  <ReplyIcon style={{ color: red[700] }} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="完成">
                <IconButton
                  key={'complete' + data.id}
                  onClick={() => updateCompleteStatus(data)}
                >
                  <PlaylistAddCheckIcon style={{ color: green[700] }} />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="删除">
              <IconButton
                key={'delete' + data.id}
                onClick={() => onDelete(data.id)}
              >
                <DeleteIcon style={{ color: grey[400] }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </div>
  )
}

export default TodoList
