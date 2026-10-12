import {Route, Routes, Navigate} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Products from './pages/Products/Products'
import Customers from './pages/Customers/Customers'
import CustomerDetail from './pages/Customers/CustomerDetail'
import Orders from './pages/Orders/Orders'
import Encarte from './pages/Encarte/Encarte'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import {ToastProvider} from './contexts/ToastContext'
import {AuthProvider} from './contexts/AuthContext'
import {ProtectedRoute} from './components/auth/ProtectedRoute'

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Routes>
                    {/* Rota Pública de Autenticação */}
                    <Route path="/login" element={<Login />} />

                    {/* Rotas Protegidas dentro do Layout Principal */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* Safe Home / Operação de Balcão e Caixa */}
                        <Route path="/" element={<Home />} />

                        {/* Operações da Loja (Acesso para qualquer operador autenticado) */}
                        <Route path="/products" element={<Products />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/customers/:id" element={<CustomerDetail />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/encarte" element={<Encarte />} />

                        {/* Área Restrita - Exige papel ADMIN */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute requiredRole="ADMIN">
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Redirecionamento de rotas desconhecidas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App