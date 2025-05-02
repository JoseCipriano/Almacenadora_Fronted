import  { DashboardPage} from './pages/Dashboard'
import  { Auth } from './pages/Auth'

const routes = [
    {path : '/auth', element : <Auth/>},
    {path : '/*', element : <DashboardPage/>},


]

export default routes