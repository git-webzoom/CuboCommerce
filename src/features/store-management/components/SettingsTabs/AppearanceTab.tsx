import { Save, Lock } from 'lucide-react';

export const AppearanceTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* TEMPLATE */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Template</span>
                </div>

                <p className="mb-4 text-gray-600">Escolha o template da sua loja:</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Default */}
                    <div className="border rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer ring-2 ring-blue-600">
                        <div className="bg-gray-100 aspect-video flex items-center justify-center text-gray-400 font-medium">
                            [Preview Default]
                        </div>
                        <div className="p-4 bg-white border-t">
                            <div className="font-bold mb-1">Default</div>
                            <div className="text-sm text-green-600 flex items-center gap-1">
                                ✅ Ativo
                            </div>
                        </div>
                    </div>

                    {/* Modern (PRO) */}
                    <div className="border rounded-lg overflow-hidden flex flex-col opacity-75 hover:opacity-100 transition-opacity cursor-pointer relative group">
                        <div className="absolute top-2 right-2 badge bg-purple-100 text-purple-700 font-bold z-10 border border-purple-200">PRO</div>
                        <div className="bg-gray-100 aspect-video flex items-center justify-center text-gray-400 font-medium">
                            [Preview Modern]
                        </div>
                        <div className="p-4 bg-gray-50 border-t">
                            <div className="font-bold mb-1">Modern</div>
                            <div className="text-sm text-gray-500">Elegante e espaçoso</div>
                        </div>
                        <div className="absolute inset-0 bg-white/50 hidden group-hover:flex items-center justify-center">
                            <Lock className="text-gray-600" />
                        </div>
                    </div>

                    {/* Minimal (PRO) */}
                    <div className="border rounded-lg overflow-hidden flex flex-col opacity-75 hover:opacity-100 transition-opacity cursor-pointer relative group">
                        <div className="absolute top-2 right-2 badge bg-purple-100 text-purple-700 font-bold z-10 border border-purple-200">PRO</div>
                        <div className="bg-gray-100 aspect-video flex items-center justify-center text-gray-400 font-medium">
                            [Preview Minimal]
                        </div>
                        <div className="p-4 bg-gray-50 border-t">
                            <div className="font-bold mb-1">Minimal</div>
                            <div className="text-sm text-gray-500">F foco nos produtos</div>
                        </div>
                        <div className="absolute inset-0 bg-white/50 hidden group-hover:flex items-center justify-center">
                            <Lock className="text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <Lock size={20} className="text-purple-600" />
                        </div>
                        <div>
                            <div className="font-bold text-purple-900">Desbloquear Templates PRO</div>
                            <div className="text-sm text-purple-700">Faça upgrade para acessar designs exclusivos</div>
                        </div>
                    </div>
                    <button className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-none text-white">Upgrade</button>
                </div>
            </div>

            {/* CORES */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Cores</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="input-group">
                            <label className="flex justify-between">Cor Primária <span className="text-xs text-gray-500 font-normal">Botões, links, destaques</span></label>
                            <div className="flex gap-2">
                                <input type="color" className="h-10 w-10 p-1 rounded border cursor-pointer" defaultValue="#000000" />
                                <input type="text" defaultValue="#000000" className="input-field flex-1 uppercase" maxLength={7} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="flex justify-between">Cor Secundária <span className="text-xs text-gray-500 font-normal">Fundos, cards</span></label>
                            <div className="flex gap-2">
                                <input type="color" className="h-10 w-10 p-1 rounded border cursor-pointer" defaultValue="#ffffff" />
                                <input type="text" defaultValue="#ffffff" className="input-field flex-1 uppercase" maxLength={7} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="flex justify-between">Cor de Destaque <span className="text-xs text-gray-500 font-normal">Promoções, badges</span></label>
                            <div className="flex gap-2">
                                <input type="color" className="h-10 w-10 p-1 rounded border cursor-pointer" defaultValue="#FF6B6B" />
                                <input type="text" defaultValue="#FF6B6B" className="input-field flex-1 uppercase" maxLength={7} />
                            </div>
                        </div>

                        <button type="button" className="text-sm text-blue-600 hover:text-blue-800 underline">Resetar para Padrão</button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center text-center gap-2">
                        <span className="text-sm text-gray-500 font-medium mb-2">Preview das Cores</span>
                        <div className="w-48 h-32 bg-white rounded shadow-sm border border-gray-100 relative overflow-hidden">
                            {/* Mini mockup representation */}
                            <div className="h-4 w-full bg-black mb-2"></div>
                            <div className="h-8 w-20 bg-gray-200 mx-auto rounded mb-2"></div>
                            <div className="h-6 w-16 bg-[#FF6B6B] mx-auto rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TIPOGRAFIA */}
            <div className="form-section relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                    <div className="badge bg-purple-100 text-purple-700 font-bold border border-purple-200">PRO</div>
                </div>
                <div className="section-header">
                    <span className="section-title">Tipografia</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 filter blur-[1px] select-none pointer-events-none opacity-60">
                    <div className="input-group">
                        <label>Fonte dos Títulos</label>
                        <select className="input-field" disabled><option>Poppins</option></select>
                    </div>
                    <div className="input-group">
                        <label>Fonte do Texto</label>
                        <select className="input-field" disabled><option>Inter</option></select>
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white/90 p-4 rounded-lg shadow-lg border border-gray-200 text-center">
                        <Lock className="mx-auto mb-2 text-purple-600" />
                        <p className="font-bold text-gray-800 mb-2">Disponível no plano PRO</p>
                        <button className="btn btn-sm btn-primary bg-purple-600 border-none">Fazer Upgrade →</button>
                    </div>
                </div>
            </div>

            {/* CSS CUSTOMIZADO */}
            <div className="form-section relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                    <div className="badge bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">ENTERPRISE</div>
                </div>
                <div className="section-header">
                    <span className="section-title">CSS Customizado</span>
                </div>

                <div className="input-group filter blur-[1px] select-none pointer-events-none opacity-60">
                    <label>Adicione seu próprio CSS para personalização avançada</label>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 h-32">
                        .product-card {'{'}<br />
                        &nbsp;&nbsp;border-radius: 12px;<br />
                        &nbsp;&nbsp;box-shadow: 0 4px 6px rgba(0,0,0,0.1);<br />
                        {'}'}
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white/90 p-4 rounded-lg shadow-lg border border-gray-200 text-center">
                        <Lock className="mx-auto mb-2 text-indigo-600" />
                        <p className="font-bold text-gray-800 mb-2">Disponível no plano ENTERPRISE</p>
                        <button className="btn btn-sm btn-primary bg-indigo-900 border-none">Fazer Upgrade →</button>
                    </div>
                </div>
            </div>

            {/* ACTION BAR */}
            <div className="action-bar flex justify-end gap-sm">
                <button type="button" className="btn btn-ghost">Cancelar</button>
                <button type="submit" className="btn btn-primary">
                    <Save size={18} style={{ marginRight: 8 }} />
                    Salvar Alterações
                </button>
            </div>
        </form>
    );
};
