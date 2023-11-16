import { createBrowserRouter,
 RouterProvider,
} from 'react-router-dom'
import {Selection, Map, Strat, Error, Landing, Login, AddStrat } from './pages/Index.js'




const router = createBrowserRouter([  
  {
    path:'/',
    element:<Landing />,
    errorElement: <Error />
  },
  {
    path:'/Map',
    element:<Map/>

  },
  {
    path:'/Strat',
    element:<Strat/>

  },
  {
    path:'/Selection',
    element:<Selection/>,

  },
  {
    path:'/Login',
    element:<Login/>,
    errorElement: <Error />
  },
  {
    path:'/AddStrat',
    element:<AddStrat/>,
    errorElement: <Error />
  },
])

const App = () => {

  return (

      <div>
        <RouterProvider router={router} />
        
      </div>

  )
}

export default App