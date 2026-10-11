import {Waves, CircleDot} from 'lucide-react'

function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-800">
                    <Waves className="h-5 w-5 text-sky-600" />
                    <span className="text-sm font-semibold text-slate-800">
                        Bamba Aqua
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-xs text-slate-600">
                        Aquarismo Marinho & Água Doce
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 border border-emerald-200/60">
                    <CircleDot className="h-3 w-3 text-emerald-700 animate-pulse" />
                    <span>Sistema Operacional</span>
                </div>
            </div>
        </header>
    )
}

export default Header