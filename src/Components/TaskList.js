/*
 * @Author: melon
 * @Date: 2020-08-05 04:54:11
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-05 07:23:16
 */

import React, { useState, useEffect } from 'react'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './TaskList.css'
const useListStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

const TaskList = ({ list, getActions }) => {
  const listClasses = useListStyles()
  // 拖拽数据
  const [dragStartIndex, setDragStartIndex] = useState(null)
  const [dragStartData, setDragStartData] = useState(null)
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    setDataList(list)
  }, [list])
  /**
   *
   * @param {*} arr 原始数据
   * @param {*} startIndex 开始排序下标
   * @param {*} endIndex 结束排序下标
   */
  const getListAfterDrag = (arr, startIndex, endIndex) => {
    const result = Array.from(arr)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  // 拖动事件
  const domDragstart = (data, index, ee) => {
    setDragStartIndex(index)
    setDragStartData(data)
  }
  // 拖动后鼠标进入另一个可接受区域
  const dragenter = (ee) => {
    if (ee.target.draggable) {
      ee.target.style.border = '1px dashed #e91e63'
      ee.target.style.boxShadow = '0 0 8px rgba(30, 144, 255, 0.8)'
      ee.target.style.backgroundColor = '#eee'
    }
  }
  // a拖到b，离开b的时候触发
  const dragleave = (ee) => {
    ee.target.style.border = ''
    ee.target.style.boxShadow = ''
    ee.target.style.backgroundColor = ''
  }
  // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
  const drop = (data, index, ee) => {
    ee.preventDefault()
    ee.target.style.border = ''
    ee.target.style.boxShadow = ''
    ee.target.style.backgroundColor = ''
    const newList = getListAfterDrag(list, dragStartIndex, index)
    setDataList(newList)
  }
  const allowDrop = (ee) => {
    ee.preventDefault()
  }
  /**
   * 设置拖拽样式
   * @param {*} index 排序下标
   */
  const getDraggingStyle = (index) => {
    // 拖拽中的数据颜色加深
    if (index === dragStartIndex) {
      return {
        backgroundColor: '#eee',
        // transform: `translate(10px, ${offsetY}px)`,
        opacity: 0.8,
        border: '1px dashed #e91e63',
      }
    } else {
      return {}
    }
  }
  return (
    <Container className={'todo-list-wrapper ' + listClasses.demo}>
      <List className="todo-list">
        {dataList.map((item, index) => (
          <ListItem
            key={item.id}
            {...{
              draggable: 'true',
              onDragEnter: (e) => dragenter(e),
              onDragLeave: (e) => dragleave(e),
              onDragStart: (e) => domDragstart(item, index, e),
              onDrop: (e) => drop(item, index, e),
              onDragOver: (e) => allowDrop(e),
            }}
            // style={getDraggingStyle(index)}
          >
            <ListItemText
              {...{
                draggable: 'false',
              }}
              primary={item.name + item.id}
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              {getActions(item)}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {/* {dragData.dragging && (
          <div
            className="cover-mask"
            onMouseUp={(event) => {
              handleMouseUp(event)
            }}
            onMouseMove={(event) => {
              handleMouseMove(event)
            }}
          />
        )} */}
      </List>
    </Container>
  )
}
export default TaskList
