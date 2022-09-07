import React, { useState, useRef, useEffect } from 'react'
import './Task.css'
import { IDraggable, ITask, ITaskType } from '../../interfaces'
import { Draggable } from '@hello-pangea/dnd'
import { ContextMenu } from '../ContextMenu/ContextMenu'
import axios from 'axios'

export function Task(props: IDraggable) {
  const [clicked, setClicked] = useState(false)
  const [color, setColor] = useState(props.color)
  const ref = useRef<HTMLDivElement>(null)
  const [colorPicker, showColorPicker] = useState(false)

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (
        clicked &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setClicked(false)
        showColorPicker(false)
        props.setDarkenLayer('none')
        ref.current.style.zIndex = '0'
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [clicked, props])

  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div id="taskContainer" ref={ref} onClick={() => {}}>
          <div
            onClick={(event) => setClicked(true)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task" style={{ backgroundColor: color }}>
              {clicked ? (
                <textarea
                  className="textarea"
                  style={{ backgroundColor: 'inherit' }}
                  spellCheck={false}
                  autoFocus
                  defaultValue={props.text}
                  onFocus={(event) => {
                    event.currentTarget.style.height =
                      event.target.scrollHeight - 1 + 'px'
                    const end = event.currentTarget.value.length
                    event.target.setSelectionRange(end, end) // set cursor to the end of text
                    props.setDarkenLayer('block')
                    if (ref.current) {
                      ref.current.style.zIndex = '10000'
                    }
                  }}
                  onChange={(event) => {
                    event.currentTarget.style.height = '1px'
                    event.currentTarget.style.height =
                      event.currentTarget.scrollHeight + 'px'
                    const newTaskGrid: ITaskType[] = [...props.currTaskGrid]
                    const column: ITaskType = newTaskGrid[props.column - 1]
                    const task: ITask = column.tasks[props.index - 1]
                    task.text = event.currentTarget.value
                    axios
                      .put(
                        '/tasks',
                        { text: task.text },
                        { headers: { id: task._id } }
                      )
                      .then((response) => console.log(response.data))
                    props.setCurrTaskGrid(newTaskGrid) // WHY DOES IT WORK WITHOUT THIS LINE??
                  }}
                ></textarea>
              ) : (
                <div className="textarea">{props.text}</div>
              )}
            </div>
          </div>
          <ContextMenu
            currTaskGrid={props.currTaskGrid}
            setCurrTaskGrid={props.setCurrTaskGrid}
            column={props.column}
            draggableId={props.draggableId}
            clicked={clicked}
            setClicked={setClicked}
            setDarkenLayer={props.setDarkenLayer}
            color={color}
            setColor={setColor}
            colorPicker={colorPicker}
            showColorPicker={showColorPicker}
          ></ContextMenu>
        </div>
      )}
    </Draggable>
  )
}
