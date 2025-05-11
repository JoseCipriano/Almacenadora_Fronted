import  { DashboardPage} from './pages/Dashboard'
import  { Auth } from './pages/auth'
import  {Category} from './pages/category'
import  { Product } from './pages/product'
<<<<<<< HEAD
import  {ProfilePage} from './pages/profile/ProfilePage.jsx'
import  {UserPage} from './pages/user/userPage.jsx'
import  {UserCard} from './components/user/UserCard.jsx'
=======
>>>>>>> 44ad2a5ab3343f2cb633796e3fb7b1a01bfe4446

const routes = [
    {path : '/auth', element : <Auth/>},
    {path : '/*', element : <DashboardPage/>},
    {path : '/category', element : <Category/>},	
<<<<<<< HEAD
    {path : '/products', element : <Product/>},
    {path : '/profile', element : <ProfilePage/>},
    {path : '/users-management', element: <UserPage/>},
    {path : '/users-management/:uid', element: <UserCard/>}

    
=======
    {path : '/products', element : <Product/>}
>>>>>>> 44ad2a5ab3343f2cb633796e3fb7b1a01bfe4446



]

export default routes