import { Backlog } from "../../ui/Backlog/Backlog"
import styles from "./Administration.module.css"
import { Header } from "../../ui/Header/Header"
import { SprintList } from "../../ui/SprintList/SprintList"


export const Administration = () => {
  return (
    <div className={styles.mainAdminContainer}>
        <div>
            <Header/>
        </div>
        <div className={styles.contentContainer}>
            <div className={styles.contentContainer_sprintList}>
              <SprintList/>
            </div>
            <div>
              <Backlog/>
            </div>
        </div>
    </div>
      )
    }
