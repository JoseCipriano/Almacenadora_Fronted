import  { DashboardPage} from './pages/Dashboard'
import  { Auth } from './pages/auth'
import  {Category} from './pages/category'
import { Product } from './pages/product'

const routes = [
    {path : '/auth', element : <Auth/>},
    {path : '/*', element : <DashboardPage/>},
    {path : '/category', element : <Category/>},	
    {path : '/product', element : < Product/>}



]

export default routes