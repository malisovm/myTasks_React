import React from 'react'
import './Topbar.css'
import { Link } from 'react-router-dom'

export function Topbar() {
  return (
    <table id="topbarContainer">
      <tbody>
        <tr>
          <td>
            <Link to="/" id="logo">
              MyTasks
            </Link>
          </td>
          <td>
            <Link to="/help">&#63; Help</Link>
          </td>
          <td>
            <Link to="/bgColor">BG color</Link>
          </td>
          <td id="filler"></td>
        </tr>
      </tbody>
    </table>
  )
}
