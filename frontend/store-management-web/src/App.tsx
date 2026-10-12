import {Route, Routes} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Customers from './pages/Customers/Customers'
import CustomerDetail from './pages/Customers/CustomerDetail'
import Orders from './pages/Orders/Orders'
import Encarte from './pages/Encarte/Encarte'
import Settings from './pages/Settings/Settings'
import {ToastProvider} from './contexts/ToastContext'

function App() {
    return (
        <ToastProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    {/* Safe Home / Operational Counter View */}
                    <Route path="/" element={<Home/>}/>

                    {/* Operations */}
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/customers" element={<Customers/>}/>
                    <Route path="/customers/:id" element={<CustomerDetail/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/encarte" element={<Encarte/>}/>

                    {/* Private Store Manager Dashboard & Settings */}
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Route>
            </Routes>
        </ToastProvider>
    )
}

export default App