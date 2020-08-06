/*
 * @Author: melon
 * @Date: 2020-08-05 04:54:11
 * @Last Modified by: melon
 * @Last Modified time: 2020-08-06 02:17:45
 */

import React, { useState, useEffect } from 'react'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import './taskList.css'

const TaskList = ({ list, getActions, updateSequence, getList, activeTab }) => {
  // 拖拽数据
  const [dragStartIndex, setDragStartIndex] = useState(null)
  const [dragStartData, setDragStartData] = useState(null)
  const [dataList, setDataList] = useState([])
  useEffect(() => {
    if (![null, undefined].includes(list)) {
      setDataList(list)
    } else {
      setDataList([])
    }
  }, [list])
  /**
   *
   * @param {*} arr 原始数据
   * @param {*} startIndex 开始排序下标
   * @param {*} endIndex 结束排序下标
   */
  const getListAfterDrag = (startIndex, endIndex) => {
    const result = dataList.slice()
    console.log('====== startIndex console=====>')
    console.log(startIndex, endIndex)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    // if (startIndex < endIndex) {
    //   result.splice(endIndex + 1, 0, startData)
    //   result.splice(startIndex, 1)
    //   // header = result.slice(0, startIndex)
    //   // center = result.slice(startIndex + 1, endIndex + 1)
    //   // footer = result.slice(endIndex + 1)
    //   // newList = [...header, ...center, startData, ...footer]
    // } else {
    //   result.splice(endIndex, 0, startData)
    //   result.splice(startIndex + 1, 1)
    //   // header = result.slice(0, endIndex)
    //   // center = result.slice(endIndex, startIndex)
    //   // footer = result.slice(startIndex + 1)
    //   // newList = [...header, startData, ...center, ...footer]
    // }
    return result
  }
  // 拖动事件
  const domDragstart = (data, index, ee) => {
    setDragStartIndex(index)
    setDragStartData(data)
    ee.target.style.boxShadow = '0 0 8px rgba(30, 144, 255, 0.8)'
    ee.target.style.backgroundColor = '#eee'
  }
  // 拖动后鼠标进入另一个可接受区域
  const dragenter = (ee) => {
    if (ee.target.draggable) {
      // ee.target.style.border = '1px dashed #e91e63'
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
  const drop = async (data, index, ee) => {
    ee.preventDefault()
    ee.target.style.border = ''
    ee.target.style.boxShadow = ''
    ee.target.style.backgroundColor = ''
    let prevId
    let nextId
    if (dragStartIndex < index) {
      prevId = data.id
      if (index !== dataList.length - 1) {
        nextId = dataList[index + 1].id
      }
    } else {
      if (index !== 0) {
        prevId = dataList[index - 1].id
      }
      nextId = data.id
    }
    const newList = getListAfterDrag(dragStartIndex, index)

    // 派发请求
    // try {
    //   const res = await updateSequence({
    //     variables: { id: data.id, prevId, nextId },
    //   })
    //   if (!!res.data) {
    //     getList()
    //     setDragStartIndex(null)
    //     setDragStartData({})
    //   }
    // } catch (error) {
    // } finally {
    // }
    setDataList(newList)
    setDragStartIndex(null)
    setDragStartData({})
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
        // border: '1px dashed #e91e63',
      }
    } else {
      return {}
    }
  }
  console.log('======dataList console=====>')
  console.log(dataList)
  return (
    <Container fixed className={'todo-list-wrapper '}>
      <List className="todo-list">
        {dataList.map((item, index) => (
          <ListItem
            key={index}
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
              primary={item.name}
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
