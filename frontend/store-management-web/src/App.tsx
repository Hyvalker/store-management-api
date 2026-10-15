import {lazy, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout'
import {ToastProvider} from './contexts/ToastContext'
import {AuthProvider} from './contexts/AuthContext'
import {ProtectedRoute} from './components/auth/ProtectedRoute'

const Home = lazy(() => import('./pages/Home/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const Products = lazy(() => import('./pages/Products/Products'))
const Customers = lazy(() => import('./pages/Customers/Customers'))
const CustomerDetail = lazy(() => import('./pages/Customers/CustomerDetail'))
const Orders = lazy(() => import('./pages/Orders/Orders'))
const Catalog = lazy(() => import('./pages/Catalog/Catalog'))
const Settings = lazy(() => import('./pages/Settings/Settings'))
const Login = lazy(() => import('./pages/Login/Login'))

function PageLoadingFallback() {
    return (
        <div className="flex h-[50vh] w-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-500">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
                <span className="text-sm font-medium">Carregando...</span>
            </div>
        </div>
    )
}

function App() {
    return (
        <ToastProvider>
            <AuthProvider>
                <Suspense fallback={<PageLoadingFallback />}>
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
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/encarte" element={<Navigate to="/catalog" replace />} />

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
                </Suspense>
            </AuthProvider>
        </ToastProvider>
    )
}

export default App