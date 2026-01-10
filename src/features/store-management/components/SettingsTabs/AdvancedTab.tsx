import { Save, AlertTriangle, Download, UserPlus, Trash2, Lock } from 'lucide-react';

export const AdvancedTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* SEO */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">SEO</span>
                </div>

                <div className="input-group">
                    <label className="flex justify-between">
                        Meta Title <span className="text-gray-500 font-normal">(45/60)</span>
                    </label>
                    <input type="text" className="input-field" defaultValue="Minha Loja - Roupas e Acessórios" maxLength={60} />
                </div>

                <div className="input-group">
                    <label className="flex justify-between">
                        Meta Description <span className="text-gray-500 font-normal">(98/160)</span>
                    </label>
                    <textarea
                        className="input-field"
                        rows={3}
                        defaultValue="Encontre as melhores roupas e acessórios com os melhores preços. Entrega para todo Brasil."
                        maxLength={160}
                    ></textarea>
                </div>

                <div className="input-group">
                    <label>Palavras-chave (separadas por vírgula)</label>
                    <input type="text" className="input-field" defaultValue="roupas, moda, acessórios, fashion, loja online" />
                </div>
            </div>

            {/* ANALYTICS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Analytics</span>
                </div>

                <div className="input-group">
                    <label>Google Analytics ID</label>
                    <input type="text" className="input-field" placeholder="G-XXXXXXXXXX" />
                </div>

                <div className="input-group">
                    <label>Facebook Pixel ID</label>
                    <input type="text" className="input-field" placeholder="123456789012345" />
                </div>

                <div className="input-group">
                    <label>Google Tag Manager ID</label>
                    <input type="text" className="input-field" placeholder="GTM-XXXXXXX" />
                </div>
            </div>

            {/* SCRIPTS PERSONALIZADOS */}
            <div className="form-section relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 z-10">
                    <div className="badge bg-purple-100 text-purple-700 font-bold border border-purple-200">PRO</div>
                </div>
                <div className="section-header">
                    <span className="section-title">Scripts Personalizados</span>
                </div>

                <div className="space-y-4 filter blur-[1px] select-none pointer-events-none opacity-60">
                    <div className="input-group">
                        <label>Header Scripts (inserido no &lt;head&gt;)</label>
                        <textarea className="input-field font-mono text-xs" rows={3} placeholder="<!-- Google Tag Manager -->..."></textarea>
                    </div>

                    <div className="input-group">
                        <label>Footer Scripts (inserido antes do &lt;/body&gt;)</label>
                        <textarea className="input-field font-mono text-xs" rows={3} placeholder="<!-- Chat Widget -->..."></textarea>
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

            {/* DADOS E PRIVACIDADE */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Dados e Privacidade</span>
                </div>

                <div className="flex flex-col gap-sm mb-4">
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Exibir banner de cookies (LGPD)</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Coletar consentimento para marketing</span>
                    </label>
                </div>

                <div className="input-group">
                    <label>Política de Privacidade</label>
                    <div className="flex gap-2">
                        <input type="text" disabled defaultValue="https://minhaloja.com/privacidade" className="input-field flex-1" />
                        <button className="btn btn-secondary">Editar</button>
                    </div>
                </div>
                <div className="input-group">
                    <label>Termos de Uso</label>
                    <div className="flex gap-2">
                        <input type="text" disabled defaultValue="https://minhaloja.com/termos" className="input-field flex-1" />
                        <button className="btn btn-secondary">Editar</button>
                    </div>
                </div>
            </div>

            {/* ZONA DE PERIGO */}
            <div className="form-section border-red-200 bg-red-50/10">
                <div className="section-header bg-red-50 text-red-700 border-red-200">
                    <span className="section-title flex items-center gap-2"><AlertTriangle size={18} /> Zona de Perigo</span>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-bold">Exportar Todos os Dados</div>
                            <div className="text-sm text-gray-500">Baixe todos os dados da sua loja (produtos, pedidos, clientes)</div>
                        </div>
                        <button className="btn btn-secondary flex items-center gap-2">
                            <Download size={16} /> Exportar
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                        <div>
                            <div className="font-bold">Transferir Propriedade</div>
                            <div className="text-sm text-gray-500">Transfira a propriedade desta loja para outra pessoa</div>
                        </div>
                        <button className="btn btn-secondary flex items-center gap-2">
                            <UserPlus size={16} /> Transferir
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                            <div className="font-bold text-red-700">Excluir Loja</div>
                            <div className="text-sm text-red-600">⚠️ Esta ação é irreversível! Todos os dados serão perdidos.</div>
                        </div>
                        <button className="btn btn-danger bg-red-600 text-white hover:bg-red-700 border-none flex items-center gap-2">
                            <Trash2 size={16} /> Excluir Loja
                        </button>
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
