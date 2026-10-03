import {useState} from 'react'
import type {SubmitEvent} from 'react'
import {createProduct} from '../../services/productService'
import type {CreateProductRequest, ProductType} from '../../types/product'

function ProductForm() {
    const [name, setName] = useState('')
    const [type, setType] = useState<ProductType>('PRODUCT')
    const [quantity, setQuantity] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [profitMargin, setProfitMargin] = useState('')
    const [barcode, setBarcode] = useState('')

    const [lastEditedPriceField, setLastEditedPriceField] = useState<
        'salePrice' | 'profitMargin' | null
    >(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const data: CreateProductRequest = {
                name,
                type,
                quantity: Number(quantity),
                costPrice: Number(costPrice),
                barcode: barcode.trim() || null,
            }
        if (lastEditedPriceField === 'salePrice') {
            data.salePrice = Number(salePrice)
        }

        if (lastEditedPriceField === 'profitMargin') {
            data.profitMargin = Number(profitMargin)
        }

            await createProduct(data)

            setSuccess(true)

            setName('')
            setType('PRODUCT')
            setQuantity('')
            setCostPrice('')
            setSalePrice('')
            setProfitMargin('')
            setBarcode('')
            setLastEditedPriceField(null)
        } catch {
            setError('Não foi possível cadastrar o produto.')
        } finally {
            setLoading(false)
        }
    }

    function handleCostPriceChange(value:string) {
        setCostPrice(value)

        const cost = Number(value)

        if(!cost || cost <= 0) {
            return
        }

        if (lastEditedPriceField === 'salePrice' && salePrice) {
            const sale = Number(salePrice)
            const margin = ((sale - cost) / cost) * 100

            setProfitMargin(margin.toFixed(2))
        }
    }

    function handleSalePriceChange(value: string) {
        setSalePrice(value)
        setLastEditedPriceField('salePrice')

        const cost = Number(costPrice)
        const sale = Number(value)

        if (!cost || cost <= 0 || !sale || sale < 0) {
            return
        }

        const margin = ((sale - cost) / cost) * 100

        setProfitMargin(margin.toFixed(2))
    }

    function handleProfitMarginChange(value: string) {
        setProfitMargin(value)
        setLastEditedPriceField('profitMargin')

        const cost = Number(costPrice)
        const margin = Number(value)

        if(!cost || cost <= 0 || !margin || margin < 0) {
            return
        }

        const sale = cost * (1 + margin / 100)

        setSalePrice(sale.toFixed(2))
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold">Cadastrar produto</h2>

            <div>
                <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Nome
                </label>

                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Ex.: Peixe-palhaço (Amphiprion ocellaris)"
                />
            </div>

            <div>
                <label
                    htmlFor="type"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Tipo
                </label>

                <select
                    id="type"
                    value={type}
                    onChange={(event) =>
                        setType(event.target.value as ProductType)
                    }
                    className="w-full rounded-md border px-3 py-2"
                >
                    <option value="PRODUCT">Produto</option>
                    <option value="LIVING">Ser-vivo</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="quantity"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Quantidade
                </label>

                <input
                    id="quantity"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                />
            </div>

            <div>
                <label
                    htmlFor="costPrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Preço de custo
                </label>

                <input
                    id="costPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={costPrice}
                    onChange={(event) => handleCostPriceChange(event.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="0,00"
                />
            </div>

            <div>
                <label
                    htmlFor="profitMargin"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Margem de lucro
                </label>

                <div className="relative">
                    <input
                        id="profitMargin"
                        type="number"
                        min="0"
                        step="0.01"
                        value={profitMargin}
                        onChange={(event) =>
                            handleProfitMarginChange(event.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2 pr-10"
                        placeholder="0,00"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                %
            </span>
                </div>
            </div>

            <div>
                <label
                    htmlFor="salePrice"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Preço de venda
                </label>

                <input
                    id="salePrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={salePrice}
                    onChange={(event) => handleSalePriceChange(event.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="0,00"
                />
            </div>

            <div>
                <label
                    htmlFor="barcode"
                    className="mb-1 block text-sm font-medium text-gray-700"
                >
                    Código do produto
                </label>

                <input
                    id="barcode"
                    type="text"
                    value={barcode}
                    onChange={(event) => setBarcode(event.target.value)}
                    className="w-full rounded-md border px-3 py-2"
                    placeholder="Ex.: 7891234567890"
                />
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-600">
                    Produto cadastrado com sucesso!
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? 'Cadastrando...' : 'Cadastrar produto'}
            </button>
        </form>
    )
}

export default ProductForm