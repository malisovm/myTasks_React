import React from 'react'
import './Column.css'
import { Droppable } from '@hello-pangea/dnd'
import { IDroppable, ITask, ITaskType } from '../../interfaces'
import { Task } from '../Task/Task'
// @ts-ignore
import { LightenDarkenColor } from 'lighten-darken-color'

export function Column(props: IDroppable) {
  var bgColorOnDrag = LightenDarkenColor(props.bodyBgColor, 30)

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? bgColorOnDrag
              : props.bodyBgColor,
            gridColumn: props.column,
          }}
          {...provided.droppableProps}
          className="column"
        >
          <span className="deleteButtonContainer">
            <input defaultValue={props.title} className="columnHeader"></input>
            <button
              className="deleteColumnButton"
              onClick={() => {
                const newTaskGrid: ITaskType[] = [...props.currTaskGrid]
                newTaskGrid.splice(props.column - 1, 1)
                newTaskGrid.forEach((column) => {
                  column.column = newTaskGrid.indexOf(column) + 1
                })
                console.log(newTaskGrid)
                props.setCurrTaskGrid(newTaskGrid)
              }}
            >
              Delete task type
            </button>
          </span>

          {props.tasks.map((task) => {
            return (
              <Task
                draggableId={task._id}
                column={props.column}
                key={task._id}
                index={task.row}
                text={task.text}
                color={task.color}
                currTaskGrid={props.currTaskGrid}
                setCurrTaskGrid={props.setCurrTaskGrid}
                setDarkenLayer={props.setDarkenLayer}
              />
            )
          })}

          {provided.placeholder}

          <div>
            <button
              className="add"
              onClick={() => {
                const newTaskGrid: ITaskType[] = [...props.currTaskGrid]
                const column: ITaskType = newTaskGrid[props.column - 1]
                const newTask: ITask = {
                  _id: String(Math.random()).substring(1).replace(/\./g, ''), // this is a placeholder id
                  column: props.column,
                  row: column.tasks.length + 1,
                  text: '',
                  color: '#ffffff',
                }
                column.tasks.push(newTask)
                console.log(newTaskGrid)
                props.setCurrTaskGrid(newTaskGrid)
              }}
            >
              + Add task
            </button>
          </div>
        </div>
      )}
    </Droppable>
  )
}
