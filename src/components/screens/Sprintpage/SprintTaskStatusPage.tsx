import { Header } from "../../ui/Header/Header"
import { SprintList } from "../../ui/SprintList/SprintList"
import { TaskListing } from "../../ui/TaskListing/TaskListing"
import styles from "./SprintTaskStatusPage.module.css"

export const SprintTaskStatusPage = () => {
return (
    <div className={styles.mainAdminContainer}>
        <div>
            <Header/>
        </div>
        <div className={styles.contentContainer}>
            <div className={styles.contentContainer_sprintList}>
                <SprintList/>
            </div>
            <div className={styles.contentContainer_taskListing}>
                <TaskListing/>
            </div>
        </div>
    </div>
)
}
