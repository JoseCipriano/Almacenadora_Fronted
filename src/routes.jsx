import  { DashboardPage} from './pages/Dashboard'
import  { Auth } from './pages/auth'
import  {Category} from './pages/category'
import  { Product } from './pages/product'
import  {ProfilePage} from './pages/profile/ProfilePage.jsx'
import  {UserPage} from './pages/user/userPage.jsx'
import  {UserCard} from './components/user/UserCard.jsx'


const routes = [
    {path : '/auth', element : <Auth/>},
    {path : '/*', element : <DashboardPage/>},
    {path : '/category', element : <Category/>},	
    {path : '/products', element : <Product/>},
    {path : '/profile', element : <ProfilePage/>},
    {path : '/users-management', element: <UserPage/>},
    {path : '/users-management/:uid', element: <UserCard/>}

 



]

export default routes