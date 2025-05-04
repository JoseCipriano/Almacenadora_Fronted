import  { DashboardPage} from './pages/Dashboard'
import  { Auth } from './pages/auth'
import  {Category} from './pages/category'

const routes = [
    {path : '/auth', element : <Auth/>},
    {path : '/*', element : <DashboardPage/>},
    {path : '/category', element : <Category/>},	



]

export default routes