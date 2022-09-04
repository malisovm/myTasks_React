import React from 'react'
import './Help.css'

export function Help() {
  return (
    <>
      <div id="helpHeader">What is this app all about?</div>
      <div className="help">
        This is a Kanban-style task board. You create tasks and drag'n'drop them
        into columns by type. You can also highlight certain tasks assigning
        colors to them (click/tap on a task and select "Change color" from the
        menu).
      </div>
      <div className="help">
        You can also create new columns and rename them. To remove a column,
        click/tap on its header and a button will appear below.
      </div>
    </>
  )
}
