import {useState, useEffect, useRef} from 'react'
import type {ChangeEvent} from 'react'
import {
    X,
    Save,
    Pencil,
    Upload,
    Trash2,
    Sparkles,
    AlertCircle,
    Image as ImageIcon
} from 'lucide-react'
import type {Product, ProductType, SubCategory, UpdateProductRequest} from '../../types/product'
import {updateProduct, uploadProductImage, deleteProductImage} from '../../services/productService'
import {searchMasterSpecies, type MasterSpecies} from '../../data/speciesMasterCatalog'
import {getAnimalImage, getSubCategoryLabel} from '../../utils/animalImages'
import {useToast} from '../../contexts/ToastContext'

interface EditProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
    onSaved: (updated: Product) => void
}

const SUBCATEGORIES: {value: SubCategory; label: string}[] = [
    {value: 'CORAL', label: 'Corais & Anêmonas'},
    {value: 'MARINE_FISH', label: 'Peixes Marinhos'},
    {value: 'FRESHWATER_FISH', label: 'Peixes de Água Doce'},
    {value: 'MARINE_INVERTEBRATE', label: 'Invertebrados Marinhos'},
    {value: 'FRESHWATER_INVERTEBRATE', label: 'Invertebrados de Água Doce'},
    {value: 'INVERTEBRATE', label: 'Invertebrados Gerais'},
    {value: 'PLANT', label: 'Plantas Aquáticas'},
    {value: 'OTHER_LIVING', label: 'Outros Seres Vivos'},
    {value: 'EQUIPMENT', label: 'Equipamentos'},
    {value: 'SUPPLY', label: 'Suprimentos & Alimentos'},
    {value: 'OTHER_PRODUCT', label: 'Outros Produtos'},
]

export default function EditProductModal({
    product,
    isOpen,
    onClose,
    onSaved
}: EditProductModalProps) {
    const {toast} = useToast()

    const [name, setName] = useState('')
    const [type, setType] = useState<ProductType>('PRODUCT')
    const [subCategory, setSubCategory] = useState<SubCategory | ''>('')
    const [barcode, setBarcode] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [salePrice, setSalePrice] = useState('')
    const [profitMargin, setProfitMargin] = useState('')
    const [imageSlug, setImageSlug] = useState('')
    const [customImagePreview, setCustomImagePreview] = useState<string | null>(null)
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
    const [photoRemoved, setPhotoRemoved] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Master Catalog Suggestions
    const [speciesSuggestions, setSpeciesSuggestions] = useState<MasterSpecies[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (product && isOpen) {
            setName(product.name)
            setType(product.type)
            setSubCategory(product.subCategory || (product.type === 'LIVING' ? 'OTHER_LIVING' : 'OTHER_PRODUCT'))
            setBarcode(product.barcode || '')
            setCostPrice(String(product.costPrice ?? ''))
            setSalePrice(String(product.salePrice ?? ''))
            setProfitMargin(product.profitMargin != null ? String(product.profitMargin) : '')
            setImageSlug(product.imageSlug || '')
            setSelectedImageFile(null)
            setPhotoRemoved(false)
            setCustomImagePreview(
                product.imageSlug
                    ? getAnimalImage({name: product.name, imageSlug: product.imageSlug})
                    : null
            )
            setError(null)
            setShowSuggestions(false)
        }
    }, [product, isOpen])

    useEffect(() => {
        function handleClickOutside(evt: MouseEvent) {
            if (suggestionsRef.current && !suggestionsRef.current.contains(evt.target as Node)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!isOpen || !product) return null

    function handleNameChange(val: string) {
        setName(val)
        if (val.trim().length >= 2) {
            const results = searchMasterSpecies(val, 6)
            setSpeciesSuggestions(results)
            setShowSuggestions(results.length > 0)
        } else {
            setSpeciesSuggestions([])
            setShowSuggestions(false)
        }
    }

    function handleSelectSpecies(sp: MasterSpecies) {
        setName(sp.name)
        setType('LIVING')
        if (sp.subCategory) {
            setSubCategory(sp.subCategory)
        }
        if (sp.imageSlug) {
            setImageSlug(sp.imageSlug)
            setCustomImagePreview(getAnimalImage({name: sp.name, imageSlug: sp.imageSlug}))
        }
        setShowSuggestions(false)
        toast.info(`Espécie vinculada: ${sp.name}`, 'Catálogo Mestre')
    }

    function handleCostPriceChange(val: string) {
        setCostPrice(val)
        const cost = Number(val)
        const margin = Number(profitMargin)
        if (cost > 0 && margin >= 0) {
            const sale = cost * (1 + margin / 100)
            setSalePrice(sale.toFixed(2))
        }
    }

    function handleSalePriceChange(val: string) {
        setSalePrice(val)
        const sale = Number(val)
        const cost = Number(costPrice)
        if (cost > 0 && sale >= cost) {
            const margin = ((sale - cost) / cost) * 100
            setProfitMargin(margin.toFixed(2))
        }
    }

    function handleProfitMarginChange(val: string) {
        setProfitMargin(val)
        const margin = Number(val)
        const cost = Number(costPrice)
        if (cost > 0 && margin >= 0) {
            const sale = cost * (1 + margin / 100)
            setSalePrice(sale.toFixed(2))
        }
    }

    // Curated photo upload by store operator (Marcelo)
    function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('O arquivo selecionado deve ser uma imagem válida (JPG, PNG, WEBP).', 'Arquivo Inválido')
            return
        }

        setSelectedImageFile(file)
        setPhotoRemoved(false)

        const reader = new FileReader()
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string
            setCustomImagePreview(dataUrl)
            toast.success('Foto carregada! Clique em "Salvar Alterações" para gravar.', 'Curadoria de Imagem')
        }
        reader.readAsDataURL(file)
    }

    function handleRemovePhoto() {
        setSelectedImageFile(null)
        setPhotoRemoved(true)
        setImageSlug('')
        setCustomImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        toast.info('Foto removida. O produto usará o card visual da categoria ao salvar.', 'Foto Removida')
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!product) return
        setError(null)
        setLoading(true)

        try {
            const cost = Number(costPrice)
            const sale = salePrice ? Number(salePrice) : undefined
            const margin = profitMargin ? Number(profitMargin) : undefined

            const updateData: UpdateProductRequest = {
                name: name.trim(),
                type,
                subCategory: subCategory ? (subCategory as SubCategory) : undefined,
                barcode: barcode.trim() || null,
                costPrice: cost,
                salePrice: sale,
                profitMargin: margin,
                imageSlug: imageSlug.trim() || undefined,
            }

            let updated = await updateProduct(product.id, updateData)

            if (selectedImageFile) {
                updated = await uploadProductImage(product.id, selectedImageFile)
            } else if (photoRemoved) {
                updated = await deleteProductImage(product.id)
            }

            toast.success(`"${updated.name}" foi atualizado com sucesso!`, 'Produto Atualizado')
            onSaved(updated)
            onClose()
        } catch (err: unknown) {
            console.error('Falha ao atualizar produto:', err)
            const data = (err as {response?: {data?: {message?: string; error?: string}}})?.response?.data
            const msg = data?.message || data?.error || 'Não foi possível salvar as alterações.'
            setError(msg)
            toast.error(msg, 'Erro ao Atualizar')
        } finally {
            setLoading(false)
        }
    }

    const currentDisplayImage = customImagePreview || getAnimalImage({name, imageSlug, subCategory: subCategory || undefined, type})

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
                {/* Header */}
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                            <Pencil className="h-4 w-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Editar Produto / Ser-Vivo</h3>
                            <p className="text-xs text-slate-500">ID #{product.id} • Modifique taxonomia, preços ou imagem oficial</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Nome & Sugestões */}
                    <div className="relative" ref={suggestionsRef}>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nome do Produto / Espécie <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            placeholder="Ex: Peixe-palhaço Comum (Amphiprion ocellaris)"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
                        />
                        {showSuggestions && speciesSuggestions.length > 0 && (
                            <div className="absolute z-20 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                                <div className="p-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center gap-1">
                                    <Sparkles className="h-3 w-3 text-amber-500" />
                                    <span>Correspondência no Catálogo Mestre</span>
                                </div>
                                {speciesSuggestions.map((sp) => (
                                    <button
                                        key={sp.id}
                                        type="button"
                                        onClick={() => handleSelectSpecies(sp)}
                                        className="w-full text-left px-3 py-2 text-xs hover:bg-sky-50 transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
                                    >
                                        <div>
                                            <div className="font-semibold text-slate-800">{sp.name}</div>
                                            <div className="text-[10px] text-slate-400">{sp.section} • {sp.familyGroup}</div>
                                        </div>
                                        <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded-full">
                                            {getSubCategoryLabel(sp.subCategory)}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tipo & Subcategoria */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Tipo de Item
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as ProductType)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500"
                            >
                                <option value="LIVING">Ser-vivo (Animais, Corais, Plantas)</option>
                                <option value="PRODUCT">Produto Físico (Rações, Filtros, Equipamentos)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Subcategoria Taxonômica
                            </label>
                            <select
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value as SubCategory)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500"
                            >
                                <option value="">Automática / Não definida</option>
                                {SUBCATEGORIES.map((sc) => (
                                    <option key={sc.value} value={sc.value}>
                                        {sc.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Preços e Margem */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Preço de Custo (R$) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={costPrice}
                                onChange={(e) => handleCostPriceChange(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Margem Desejada (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={profitMargin}
                                onChange={(e) => handleProfitMarginChange(e.target.value)}
                                placeholder="Ex: 50.0"
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Preço de Venda (R$)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={salePrice}
                                onChange={(e) => handleSalePriceChange(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700 focus:bg-white focus:outline-hidden focus:border-sky-500"
                            />
                        </div>
                    </div>

                    {/* Código de Barras */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Código de Barras (Opcional)
                        </label>
                        <input
                            type="text"
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Ex: 7891234567890"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500"
                        />
                    </div>

                    {/* Curadoria de Foto & Autonomia da Loja */}
                    <div className="pt-2 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                                <ImageIcon className="h-4 w-4 text-sky-600" />
                                <span>Curadoria Visual & Foto do Produto</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-normal">
                                Autonomia do Operador
                            </span>
                        </label>

                        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                            {/* Preview */}
                            <div className="h-20 w-24 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800 flex items-center justify-center">
                                {currentDisplayImage ? (
                                    <img
                                        src={currentDisplayImage}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-2 text-[10px] text-slate-400">
                                        Card sem foto
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex-1 space-y-2">
                                <div className="text-xs text-slate-600">
                                    {imageSlug ? (
                                        <span>Slug ativo: <code className="font-mono text-[11px] text-slate-800 bg-white px-1.5 py-0.5 rounded-md border border-slate-200">{imageSlug}</code></span>
                                    ) : (
                                        <span className="text-slate-400 italic">Nenhuma foto vinculada (renderiza card ilustrado)</span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        id="edit-photo-upload"
                                    />
                                    <label
                                        htmlFor="edit-photo-upload"
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                                    >
                                        <Upload className="h-3.5 w-3.5 text-sky-600" />
                                        <span>Subir Foto Personalizada</span>
                                    </label>

                                    {imageSlug && (
                                        <button
                                            type="button"
                                            onClick={handleRemovePhoto}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors"
                                            title="Remover foto atual"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            <span>Remover</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-1.5 px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                        >
                            <Save className="h-4 w-4" />
                            <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
