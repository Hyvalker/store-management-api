import {Route, Routes} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Products from './pages/Products/Products.tsx'
import Customers from './pages/Customers/Customers.tsx'
import Orders from './pages/Orders/Orders'

function App() {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/customers" element={<Customers/>}/>
                <Route path="/orders" element={<Orders/>}/>
            </Route>
        </Routes>
    )
}

export default App