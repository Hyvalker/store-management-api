import {useMemo} from 'react'
import {AlertTriangle, AlertOctagon, CheckCircle2, ShieldAlert} from 'lucide-react'
import type {AquariumType, WaterParameterTest} from '../../types/aquarium'
import {
    evaluateTest,
    type WaterParameterSettings
} from '../../services/waterParameterRulesService'

interface ParameterTestSummaryAlertProps {
    test: WaterParameterTest
    aquariumType: AquariumType
    customSettings?: WaterParameterSettings
    className?: string
}

export function ParameterTestSummaryAlert({
    test,
    aquariumType,
    customSettings,
    className = ''
}: ParameterTestSummaryAlertProps) {
    const summary = useMemo(() => {
        return evaluateTest(aquariumType, test, customSettings)
    }, [aquariumType, test, customSettings])

    if (summary.totalEvaluated === 0) return null

    // Caso 1: Há parâmetros em nível Crítico
    if (summary.hasCritical) {
        return (
            <div
                className={`p-3 rounded-xl border bg-rose-50/90 border-rose-200 text-rose-950 text-xs space-y-1.5 shadow-2xs ${className}`}
            >
                <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px] uppercase tracking-wider">
                    <ShieldAlert className="h-4 w-4 text-rose-600 animate-pulse" />
                    <span>
                        Atenção Imediata: {summary.criticalCount}{' '}
                        {summary.criticalCount === 1 ? 'parâmetro crítico' : 'parâmetros críticos'}
                        {summary.warningCount > 0 && ` e ${summary.warningCount} em alerta`}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {summary.criticalItems.map((item) => (
                        <span
                            key={item.rule.key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-100/90 border border-rose-300 text-[11px] font-bold text-rose-900"
                        >
                            <AlertOctagon className="h-3 w-3 text-rose-700 shrink-0" />
                            <strong>{item.shortLabel}:</strong> {item.value}
                            {item.unit ? ` ${item.unit}` : ''} ({item.tag})
                        </span>
                    ))}
                    {summary.warningItems.map((item) => (
                        <span
                            key={item.rule.key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-100/80 border border-amber-300 text-[11px] font-semibold text-amber-900"
                        >
                            <AlertTriangle className="h-3 w-3 text-amber-700 shrink-0" />
                            <strong>{item.shortLabel}:</strong> {item.value}
                            {item.unit ? ` ${item.unit}` : ''}
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    // Caso 2: Não há críticos, mas há alertas moderados (Warning Low ou Warning High)
    if (summary.hasWarning) {
        return (
            <div
                className={`p-3 rounded-xl border bg-amber-50/80 border-amber-200 text-amber-950 text-xs space-y-1.5 shadow-2xs ${className}`}
            >
                <div className="flex items-center gap-1.5 font-bold text-amber-900 text-[11px] uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>
                        Ajuste Recomendado: {summary.warningCount}{' '}
                        {summary.warningCount === 1 ? 'parâmetro fora da faixa ideal' : 'parâmetros fora da faixa ideal'}
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {summary.warningItems.map((item) => (
                        <span
                            key={item.rule.key}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-100/90 border border-amber-300 text-[11px] font-bold text-amber-900"
                        >
                            <strong>{item.shortLabel}:</strong> {item.value}
                            {item.unit ? ` ${item.unit}` : ''} ({item.tag})
                        </span>
                    ))}
                </div>
            </div>
        )
    }

    // Caso 3: Todos os parâmetros estão dentro da faixa ideal!
    return (
        <div
            className={`p-2.5 rounded-xl border bg-emerald-50/80 border-emerald-200 text-emerald-900 text-xs flex items-center justify-between gap-2 shadow-2xs ${className}`}
        >
            <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Parâmetros Estáveis — Todos os {summary.totalEvaluated} itens monitorados estão na faixa ideal</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100/70 px-2 py-0.5 rounded-full">
                100% Equilibrado
            </span>
        </div>
    )
}
