import {NavLink} from 'react-router-dom'

const menuItems = [
    {label: 'Dashboard', path: '/'},
    {label: 'Produtos', path: '/products'},
    {label: 'Clientes', path: '/customers'},
    {label: 'Pedidos', path: '/orders'},
]

function Sidebar() {
    return (
        <aside className="flex h-screen w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <h1 className="text-xl font-bold">Store Management</h1>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({isActive}) =>
                            `block rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Sidebar