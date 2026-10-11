import {NavLink} from 'react-router-dom'
import {
    Store,
    Package,
    Users,
    ShoppingCart,
    BarChart3,
    Fish,
    Shield,
    Share2,
    Sliders
} from 'lucide-react'
import {getCurrentUser} from '../../services/authService'

const menuItems = [
    {label: 'Balcão / Início', path: '/', icon: Store},
    {label: 'Produtos & Estoque', path: '/products', icon: Package},
    {label: 'Vendas & Pedidos', path: '/orders', icon: ShoppingCart},
    {label: 'Clientes', path: '/customers', icon: Users},
    {label: 'Encarte WhatsApp', path: '/encarte', icon: Share2},
]

function Sidebar() {
    const currentUser = getCurrentUser()

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
            {/* Brand Header */}
            <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
                    <Fish className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                        Bamba Aqua
                    </h1>
                    <p className="text-xs text-sky-700 font-medium">Gestão & Balcão</p>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="p-3">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Operação da Loja
                </p>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                className={({isActive}) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-sky-50 text-sky-800 font-semibold shadow-xs'
                                            : 'text-slate-800 hover:bg-slate-50 hover:text-slate-900'
                                    }`
                                }
                            >
                                <Icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </div>

            {/* Separator / Management Area (Discrete) */}
            <div className="mt-auto border-t border-slate-200 p-3 space-y-1">
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-600 flex items-center justify-between">
                    <span>Área Restrita</span>
                    <Shield className="h-3 w-3 text-slate-600" />
                </p>
                <NavLink
                    to="/dashboard"
                    className={({isActive}) =>
                        `flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                            isActive
                                ? 'bg-slate-900 text-white font-semibold shadow-sm'
                                : 'text-slate-800 hover:bg-slate-100'
                        }`
                    }
                >
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-4 w-4" />
                        <span>Painel Gerencial</span>
                    </div>
                    <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-800">
                        {currentUser.name}
                    </span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({isActive}) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                            isActive
                                ? 'bg-sky-50 text-sky-800 font-semibold shadow-xs'
                                : 'text-slate-800 hover:bg-slate-100'
                        }`
                    }
                >
                    <Sliders className="h-4 w-4" />
                    <span>Configurações</span>
                </NavLink>
            </div>
        </aside>
    )
}

export default Sidebar