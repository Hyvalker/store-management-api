import {useState, useEffect} from 'react'
import {
    Droplets,
    RotateCcw,
    Save,
    CheckCircle2,
    AlertTriangle,
    AlertOctagon,
    Info,
    Waves,
    TreePine
} from 'lucide-react'
import type {AquariumType} from '../../types/aquarium'
import {
    getWaterParameterRules,
    fetchWaterParameterRules,
    saveWaterParameterRules,
    resetWaterParameterRules,
    type WaterParameterSettings,
    type WaterParameterKey,
    type ParameterThresholdRule
} from '../../services/waterParameterRulesService'
import {useToast} from '../../contexts/ToastContext'

export function WaterParametersSettingsCard() {
    const {toast} = useToast()
    const [settings, setSettings] = useState<WaterParameterSettings>(getWaterParameterRules())
    const [activeType, setActiveType] = useState<AquariumType>('MARINE')
    const [savedSuccess, setSavedSuccess] = useState(false)

    useEffect(() => {
        setSettings(getWaterParameterRules())
        fetchWaterParameterRules().then(setSettings)
    }, [])

    const currentRules = settings[activeType]

    function handleToggleEnabled(key: WaterParameterKey) {
        setSettings((prev) => {
            const next = {...prev}
            next[activeType] = {
                ...next[activeType],
                [key]: {
                    ...next[activeType][key],
                    enabled: !next[activeType][key].enabled
                }
            }
            return next
        })
    }

    function handleChangeField(
        key: WaterParameterKey,
        field: keyof ParameterThresholdRule,
        value: number
    ) {
        setSettings((prev) => {
            const next = {...prev}
            next[activeType] = {
                ...next[activeType],
                [key]: {
                    ...next[activeType][key],
                    [field]: isNaN(value) ? 0 : value
                }
            }
            return next
        })
    }

    async function handleSave() {
        await saveWaterParameterRules(settings)
        setSavedSuccess(true)
        toast.success(
            `Regras de parâmetros para aquário ${
                activeType === 'MARINE' ? 'Marinho' : 'Água Doce'
            } salvas e sincronizadas com sucesso!`,
            'Parâmetros Atualizados'
        )
        setTimeout(() => setSavedSuccess(false), 3500)
    }

    async function handleReset() {
        if (
            window.confirm(
                'Deseja restaurar todas as faixas e alertas de parâmetros para os valores biológicos recomendados de fábrica?'
            )
        ) {
            const defaults = await resetWaterParameterRules()
            setSettings(defaults)
            toast.info(
                'Faixas de parâmetros restauradas para os padrões recomendados de aquarismo e sincronizadas.',
                'Padrões Restaurados'
            )
        }
    }

    const parameterOrder: WaterParameterKey[] = [
        'salinity',
        'ph',
        'kh',
        'calcium',
        'magnesium',
        'temperature',
        'nitrate',
        'phosphate',
        'ammonia',
        'nitrite',
        'silicate',
        'gh'
    ]

    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Droplets className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-slate-900">
                            Alertas de Parâmetros da Água
                        </h2>
                        <p className="text-xs text-slate-500">
                            Defina as faixas ideais, limites de alerta e pontos críticos para a leitura de água dos clientes.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Restaurar Padrões</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                        <Save className="h-3.5 w-3.5" />
                        <span>Salvar Parâmetros</span>
                    </button>
                </div>
            </div>

            {savedSuccess && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium animate-in fade-in">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Faixas salvas! Os laudos e testes dos clientes já estão usando essas referências.</span>
                </div>
            )}

            {/* Aquarium Type Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-3 p-1.5 bg-slate-100/80 rounded-2xl">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => setActiveType('MARINE')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeType === 'MARINE'
                                ? 'bg-white text-sky-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <Waves className="h-4 w-4 text-sky-500" />
                        <span>Aquário Marinho</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveType('FRESHWATER')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            activeType === 'FRESHWATER'
                                ? 'bg-white text-emerald-700 shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                        <TreePine className="h-4 w-4 text-emerald-500" />
                        <span>Água Doce</span>
                    </button>
                </div>

                <div className="text-[11px] text-slate-500 px-3 py-1 bg-white/70 rounded-xl border border-slate-200/50 flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                        {activeType === 'MARINE'
                            ? 'Salinidade, pH e cálcio/magnésio possuem faixas estritas de recife.'
                            : 'pH, KH e GH vêm desativados por padrão para flexibilidade dos biótopos (ácido a alcalino).'}
                    </span>
                </div>
            </div>

            {/* Legend / Color Explanation */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    Escala de Cores e Graduação de Alerta:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-rose-100/70 border border-rose-200 text-rose-900 font-semibold">
                        <AlertOctagon className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                        <span>Crítico Baixo (&lt; mín)</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-semibold">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>Alerta Baixo</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>Faixa Ideal</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-900 font-semibold">
                        <AlertTriangle className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                        <span>Alerta Alto</span>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-red-100/70 border border-red-200 text-red-900 font-semibold">
                        <AlertOctagon className="h-3.5 w-3.5 text-red-600 shrink-0" />
                        <span>Crítico Alto (&gt; máx)</span>
                    </div>
                </div>
            </div>

            {/* Parameters Table / Cards */}
            <div className="space-y-3">
                {parameterOrder.map((key) => {
                    const rule = currentRules[key]
                    if (!rule) return null

                    return (
                        <div
                            key={key}
                            className={`p-4 rounded-xl border transition-all ${
                                rule.enabled
                                    ? 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                                    : 'bg-slate-50/70 border-slate-200/50 opacity-60'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-xs text-slate-900">
                                            {rule.label}
                                        </span>
                                        {rule.unit && (
                                            <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono">
                                                {rule.unit}
                                            </span>
                                        )}
                                        {rule.isUpperOnly && (
                                            <span className="px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 text-[10px] font-semibold">
                                                Zero é o Ideal
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        {rule.description}
                                    </p>
                                </div>

                                {/* Enabled Switch */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <label className="text-[11px] font-semibold text-slate-600 cursor-pointer">
                                        {rule.enabled ? 'Alerta Ativo' : 'Alerta Inativo'}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleEnabled(key)}
                                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                                            rule.enabled ? 'bg-teal-600' : 'bg-slate-300'
                                        }`}
                                    >
                                        <span
                                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                                rule.enabled ? 'translate-x-4' : 'translate-x-0'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Inputs Grid */}
                            {rule.enabled && (
                                <div className="pt-3">
                                    {rule.isUpperOnly ? (
                                        /* Unilateral inputs (Ammonia, Nitrite, Silicate) */
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                                            <div>
                                                <label className="block text-[10px] font-bold text-emerald-700 mb-1">
                                                    Faixa Ideal (Máximo aceitável)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'idealMax',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-1.5 bg-emerald-50/60 border border-emerald-300 rounded-lg font-mono font-bold text-xs text-emerald-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-orange-700 mb-1">
                                                    Alerta Alto (Acima de)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.warningHigh ?? rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'warningHigh',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-1.5 bg-orange-50/60 border border-orange-300 rounded-lg font-mono font-bold text-xs text-orange-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-red-700 mb-1">
                                                    Crítico Alto (Perigo Iminente &gt;)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.criticalHigh ?? rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'criticalHigh',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2.5 py-1.5 bg-red-50/60 border border-red-300 rounded-lg font-mono font-bold text-xs text-red-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        /* Bilateral inputs (pH, Salinity, KH, Ca, Mg, Temp, Nitrate, Phosphate) */
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                                            <div>
                                                <label className="block text-[10px] font-bold text-rose-700 mb-1 truncate">
                                                    Crítico Mín (&lt;)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.criticalLow ?? rule.idealMin}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'criticalLow',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-rose-50/60 border border-rose-300 rounded-lg font-mono font-bold text-xs text-rose-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-amber-700 mb-1 truncate">
                                                    Alerta Mín (&lt;)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.warningLow ?? rule.idealMin}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'warningLow',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-amber-50/60 border border-amber-300 rounded-lg font-mono font-bold text-xs text-amber-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-emerald-700 mb-1 truncate">
                                                    Ideal Mínimo
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.idealMin}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'idealMin',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-emerald-50/70 border border-emerald-400 rounded-lg font-mono font-bold text-xs text-emerald-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-emerald-700 mb-1 truncate">
                                                    Ideal Máximo
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'idealMax',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-emerald-50/70 border border-emerald-400 rounded-lg font-mono font-bold text-xs text-emerald-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-orange-700 mb-1 truncate">
                                                    Alerta Máx (&gt;)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.warningHigh ?? rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'warningHigh',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-orange-50/60 border border-orange-300 rounded-lg font-mono font-bold text-xs text-orange-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[10px] font-bold text-red-700 mb-1 truncate">
                                                    Crítico Máx (&gt;)
                                                </label>
                                                <input
                                                    type="number"
                                                    step={rule.step}
                                                    value={rule.criticalHigh ?? rule.idealMax}
                                                    onChange={(e) =>
                                                        handleChangeField(
                                                            key,
                                                            'criticalHigh',
                                                            parseFloat(e.target.value)
                                                        )
                                                    }
                                                    className="w-full px-2 py-1.5 bg-red-50/60 border border-red-300 rounded-lg font-mono font-bold text-xs text-red-900 focus:bg-white focus:outline-hidden"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Bottom Save Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restaurar Padrões Recomendados</span>
                </button>

                <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-xs cursor-pointer"
                >
                    <Save className="h-4 w-4" />
                    <span>Salvar Configurações de Parâmetros</span>
                </button>
            </div>
        </div>
    )
}
