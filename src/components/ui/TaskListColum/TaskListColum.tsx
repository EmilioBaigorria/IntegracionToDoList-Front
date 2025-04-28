import { FC, useEffect, useState } from "react"
import { ITask, State } from "../../../types/ITask"
import styles from "./TaskListColum.module.css"
import { ColumTaskCard } from "../ColumTaskCard/ColumTaskCard"
interface ITaskListColum{
  typeText:String
  tasks:ITask[]
}
export const TaskListColum:FC<ITaskListColum> = ({typeText,tasks}) => {


  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContainer_content}>
        <p>
          {typeText}
        </p>
        <div className={styles.taskCoantainer}>
          {tasks && tasks.length>0  ?
            tasks.map((el) => (
              <ColumTaskCard key={el.id} task={el}/>
            )) : <p>Ningura esta asignada a este cuadrante</p>}
        </div>
      </div>
    </div>
  )
}
