import {useEffect, useState} from 'react'
import {getProducts} from '../../services/productService'
import type { Product } from '../../types/product'
import ProductForm from './ProductForm'


function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch {
                setError('Não foi possível carregar os produtos.')
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    if (loading) {
        return <p>Carregando produtos...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className="space-y-8">
            <div>
            <h1 className="mb-6 text-4xl font-bold">Produtos</h1>

            <p>Total de produtos: {products.length}</p>
        </div>

            <ProductForm />
        </div>
    )
}

export default Products
