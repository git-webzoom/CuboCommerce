import { Save, CheckCircle, Truck, Package, RefreshCw, ExternalLink, Link, MapPin } from 'lucide-react';

export const ShippingTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* INTEGRAÇÕES DE FRETE */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Integrações de Frete</span>
                </div>

                {/* Melhor Envio */}
                <div className="gateway-card mb-6 p-4 border rounded-lg bg-blue-50/50 border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Truck size={20} className="text-blue-600" />
                            <span className="font-bold text-lg text-blue-900">Melhor Envio</span>
                        </div>
                        <div className="badge badge-success flex items-center gap-1">
                            <CheckCircle size={12} /> Ativo
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="input-group">
                            <label>Token</label>
                            <div className="flex gap-2">
                                <input type="password" value="Bearer *****************************************" className="input-field flex-1" readOnly />
                                <button className="btn btn-ghost border border-gray-300 flex items-center gap-2">
                                    <RefreshCw size={14} /> Renovar
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Serviços habilitados</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked /> PAC
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" defaultChecked /> SEDEX
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" /> SEDEX 10
                                </label>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded border border-green-200 flex items-center gap-2 text-green-700 font-medium text-sm">
                            <CheckCircle size={16} /> Status: Conectado
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button className="btn btn-ghost text-red-600 border border-red-200 hover:bg-red-50">Desconectar</button>
                            <button className="btn btn-ghost border border-gray-300">Testar</button>
                            <a href="#" className="btn btn-ghost text-blue-600 flex items-center gap-1 ml-auto">
                                <ExternalLink size={14} /> Documentação
                            </a>
                        </div>
                    </div>
                </div>

                {/* Correios */}
                <div className="gateway-card p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Package size={20} className="text-yellow-600" />
                            <span className="font-bold text-lg text-yellow-700">Correios</span>
                        </div>
                        <div className="badge bg-gray-100 text-gray-500">⚪ Inativo</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="btn btn-primary w-fit flex items-center gap-2">
                            <Link size={16} /> Conectar Correios
                        </button>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            💡 Calcule frete direto pelos Correios
                        </p>
                    </div>
                </div>
            </div>

            {/* CONFIGURAÇÕES DE ENVIO */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Configurações de Envio</span>
                </div>

                <div className="input-group">
                    <label>CEP de origem (seu endereço)</label>
                    <div className="flex gap-2">
                        <input type="text" className="input-field w-40" defaultValue="58000-000" />
                        <button className="btn btn-secondary">Buscar</button>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-200 flex items-center gap-2">
                        <MapPin size={14} /> Rua Exemplo, 123 - Centro - João Pessoa/PB
                    </div>
                </div>

                <div className="input-group">
                    <label>Dimensões padrão do pacote</label>
                    <div className="flex gap-4 items-center flex-wrap">
                        <div className="flex items-center gap-2">
                            Altura: <input type="number" className="input-field w-20" defaultValue="10" /> cm
                        </div>
                        <div className="flex items-center gap-2">
                            Largura: <input type="number" className="input-field w-20" defaultValue="20" /> cm
                        </div>
                        <div className="flex items-center gap-2">
                            Comprimento: <input type="number" className="input-field w-20" defaultValue="30" /> cm
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label>Peso padrão</label>
                    <div className="flex items-center gap-2">
                        <input type="number" className="input-field w-24" defaultValue="1.0" step="0.1" /> kg
                    </div>
                </div>

                <div className="input-group">
                    <label>Dias adicionais de manuseio</label>
                    <div className="flex items-center gap-2">
                        <input type="number" className="input-field w-24" defaultValue="2" /> dias
                    </div>
                </div>

                <div className="divider" style={{ borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }} />

                <div className="input-group">
                    <label className="flex items-center gap-sm cursor-pointer mb-2">
                        <input type="checkbox" defaultChecked />
                        <span className="font-bold">Oferecer frete grátis</span>
                    </label>
                    <div className="ml-7 flex items-center gap-2 bg-gray-50 p-3 rounded w-fit border border-gray-200">
                        └─ Para compras acima de: R$ <input type="number" className="input-field w-32" defaultValue="100.00" />
                    </div>
                </div>

                <div className="input-group mt-4">
                    <label className="flex items-center gap-sm cursor-pointer mb-2">
                        <input type="checkbox" />
                        <span className="font-bold">Permitir retirada local (sem frete)</span>
                    </label>
                    <div className="ml-7 flex items-center gap-2 bg-gray-50 p-3 rounded border border-gray-200 w-full max-w-lg">
                        └─ Endereço para retirada: <input type="text" className="input-field flex-1" placeholder="Endereço..." />
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
