import { createBrowserRouter,
 RouterProvider,
 useLoaderData
} from 'react-router-dom'
import {Selection, Map, Strat, Error, Landing, Login, AddStrat, Register, Admin } from './pages/Index.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login.jsx'
import { loader as userLoader } from './pages/Admin.jsx'



const router = createBrowserRouter([  
  {
    path:'/',
    element:<Landing />,
    errorElement: <Error />,

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
    action: loginAction(QueryClient),
    errorElement: <Error />
  },
  {
    path:'/Register',
    element:<Register/>,
    action: registerAction,
    errorElement: <Error />
  },
  {
    path:'/AddStrat',
    element:<AddStrat/>,
    errorElement: <Error />
  },
  {
    path:'/Admin',
    element:<Admin/>,
    loader: userLoader,
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