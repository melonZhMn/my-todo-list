/*
 * @Author: melon
 * @Date: 2020-08-05 00:50:45
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 18:33:37
 */
import React, { useState, useEffect } from 'react'

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

import TaskDialog from '../components/TaskDialog'
import TaskList from '../components/TaskList'

import { makeStyles } from '@material-ui/core/styles'

// 引入常量
import { ModalType } from '../constants/index'

// 引入样式表
import './todoList.css'
// 引入apollo-client
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
// 引入 查询和修改语句
import {
  GET_TASK_LIST,
  CREATE_TASK,
  UPDATE_TASK,
  UPDATE_SEQUENCE,
  DELETE_TASK,
  GET_TASK,
} from '../request/task'

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
  const [activeTab, setActiveValue] = useState(0)
  // 添加弹出窗数据
  const [taskDialogData, setTaskDialogData] = useState({
    open: false,
    type: VIEW,
    data: {},
  })
  // 获取列表
  const {
    loading,
    error,
    data: taskListData,
    refetch,
  } = useQuery(GET_TASK_LIST, { variables: { completed: activeTab } })
  // 获取单个
  const [getTaskInfo, { data: taskInfo }] = useLazyQuery(GET_TASK)
  // 新增
  const [createTask, { data: addData }] = useMutation(CREATE_TASK)
  // 编辑
  const [updateTask, { data: updateData }] = useMutation(UPDATE_TASK)
  // 删除
  const [deleteTask, { data: deleteData }] = useMutation(DELETE_TASK)
  // 排序
  const [updateSequence, { data: updateSequenceData }] = useMutation(
    UPDATE_SEQUENCE
  )
  const tasks = taskListData ? taskListData.tasks : []
  if (taskInfo && taskInfo.task && taskInfo.id) {
    setTaskDialogData({
      ...taskDialogData,
      data: taskInfo,
    })
  }
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
    if (data.id) {
      getTaskInfo({ variables: { id: data.id } })
    }
  }
  // 隐藏task弹窗
  const hideTaskDialog = () => {
    setTaskDialogData({
      ...taskDialogData,
      open: false,
    })
  }

  useEffect(() => {
    refetch()
  }, [activeTab, refetch])
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
              value={activeTab}
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
        createTask={createTask}
        updateTask={updateTask}
        getList={refetch}
        activeTab={activeTab}
      />
      <TaskList
        list={tasks}
        updateSequence={updateSequence}
        getList={refetch}
        activeTab={activeTab}
        getActions={(data) => {
          const btnActions = [
            <Tooltip title="编辑">
              <IconButton
                key={'edit' + data.id}
                onClick={() => showTaskDialog(EDIT, data)}
              >
                <EditIcon style={{ color: pink[400] }} />
              </IconButton>
            </Tooltip>,
            <Tooltip title="查看">
              <IconButton
                key={'view' + data.id}
                onClick={() => showTaskDialog(VIEW, data)}
              >
                <RemoveRedEyeIcon style={{ color: lightBlue[500] }} />
              </IconButton>
            </Tooltip>,
            <Tooltip title="删除">
              <IconButton
                key={'delete' + data.id}
                onClick={async () => {
                  try {
                    const res = await deleteTask({
                      variables: { id: data.id },
                    })
                    if (!!res.data) {
                      refetch()
                    }
                  } catch (error) {
                  } finally {
                  }
                }}
              >
                <DeleteIcon style={{ color: grey[400] }} />
              </IconButton>
            </Tooltip>,
          ]
          if (data.completed === 1) {
            btnActions.push(
              <Tooltip title="重新打开">
                <IconButton
                  key={'reopen' + data.id}
                  onClick={async () => {
                    try {
                      const res = await updateTask({
                        variables: { ...data, completed: 0 },
                      })
                      if (!!res.data) {
                        refetch()
                      }
                    } catch (error) {
                    } finally {
                    }
                  }}
                >
                  <ReplyIcon style={{ color: red[700] }} />
                </IconButton>
              </Tooltip>
            )
          }
          if (data.completed === 0) {
            btnActions.push(
              <Tooltip title="完成">
                <IconButton
                  key={'complete' + data.id}
                  onClick={async () => {
                    try {
                      const res = await updateTask({
                        variables: { ...data, completed: 1 },
                      })
                      if (!!res.data) {
                        refetch()
                      }
                    } catch (error) {
                    } finally {
                    }
                  }}
                >
                  <PlaylistAddCheckIcon style={{ color: green[700] }} />
                </IconButton>
              </Tooltip>
            )
          }
          return btnActions
        }}
      />
    </div>
  )
}

export default TodoList
