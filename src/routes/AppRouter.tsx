

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Administration } from '../components/screens/Administration/Administration'
import { SprintTaskStatusPage } from '../components/screens/Sprintpage/SprintTaskStatusPage'


export const AppRouter = () => {

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={
                <Administration/>
            }/>
            <Route path='/sprints/:sprintId' element={
              <SprintTaskStatusPage/>
            }
            />
        </Routes>
    </BrowserRouter>
  )
}
