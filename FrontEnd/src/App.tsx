import { RouterProvider } from 'react-router-dom'
import { mainRouter } from './router/MainRouter'

const App = () => {
  return (
    <div>
      <RouterProvider router={mainRouter}>

      </RouterProvider>
    </div>
  )
}

export default App
