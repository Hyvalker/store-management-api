import {useMemo} from 'react'
import {
    CheckCircle2,
    ArrowDown,
    ArrowUp,
    AlertTriangle,
    AlertOctagon,
    Info
} from 'lucide-react'
import type {AquariumType} from '../../types/aquarium'
import {
    evaluateParameter,
    type WaterParameterKey,
    type WaterParameterSettings
} from '../../services/waterParameterRulesService'

interface ParameterBadgeProps {
    paramKey: WaterParameterKey
    value: number | null | undefined
    aquariumType: AquariumType
    customSettings?: WaterParameterSettings
    size?: 'sm' | 'md'
    className?: string
}

export function ParameterBadge({
    paramKey,
    value,
    aquariumType,
    customSettings,
    size = 'md',
    className = ''
}: ParameterBadgeProps) {
    const evaluation = useMemo(() => {
        return evaluateParameter(aquariumType, paramKey, value, customSettings)
    }, [aquariumType, paramKey, value, customSettings])

    if (value === undefined || value === null || !evaluation) {
        return null
    }

    const {
        status,
        shortLabel,
        unit,
        tag,
        borderClass,
        textClass,
        bgClass,
        iconType,
        targetRangeText
    } = evaluation

    const unitSuffix = unit ? ` ${unit}` : ''

    return (
        <div
            title={`${evaluation.label}: ${value}${unitSuffix}\nStatus: ${tag}\n${targetRangeText}`}
            className={`relative rounded-xl border transition-all p-2.5 flex flex-col justify-between ${bgClass} ${borderClass} ${className}`}
        >
            {/* Header: Label + Status Tag/Icon */}
            <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider truncate">
                    {shortLabel}
                </span>

                {iconType === 'check' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                        <span>Ideal</span>
                    </span>
                )}

                {iconType === 'arrow-down' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                        <ArrowDown className="h-2.5 w-2.5 text-amber-600 stroke-[3]" />
                        <span>Baixo</span>
                    </span>
                )}

                {iconType === 'arrow-up' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orange-100 text-orange-800">
                        <ArrowUp className="h-2.5 w-2.5 text-orange-600 stroke-[3]" />
                        <span>Alto</span>
                    </span>
                )}

                {iconType === 'critical' && status === 'CRITICAL_LOW' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-rose-200 text-rose-900 animate-pulse">
                        <AlertTriangle className="h-2.5 w-2.5 text-rose-700" />
                        <span>Crítico ↓</span>
                    </span>
                )}

                {iconType === 'critical' && status === 'CRITICAL_HIGH' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-red-200 text-red-900 animate-pulse">
                        <AlertOctagon className="h-2.5 w-2.5 text-red-700" />
                        <span>Crítico ↑</span>
                    </span>
                )}

                {status === 'DISABLED' && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-medium bg-slate-100 text-slate-500">
                        <Info className="h-2.5 w-2.5 text-slate-400" />
                        <span>Info</span>
                    </span>
                )}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-1 my-0.5">
                <span
                    className={`font-mono font-bold tracking-tight ${
                        size === 'sm' ? 'text-sm' : 'text-base'
                    } ${textClass}`}
                >
                    {value}
                </span>
                {unit && (
                    <span className="text-[10px] text-slate-500 font-medium">
                        {unit}
                    </span>
                )}
            </div>

            {/* Footer: Ideal target range */}
            <div className="mt-1 pt-1 border-t border-slate-200/50 flex items-center justify-between text-[9px] text-slate-500 font-medium">
                <span className="truncate">{targetRangeText}</span>
            </div>
        </div>
    )
}
