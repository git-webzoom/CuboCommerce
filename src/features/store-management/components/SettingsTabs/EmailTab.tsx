import { Save, CheckCircle, Mail, Send, RefreshCw, ExternalLink, Link } from 'lucide-react';

export const EmailTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* PROVEDOR DE EMAIL */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Provedor de Email</span>
                </div>

                {/* Mailgun */}
                <div className="gateway-card mb-6 p-4 border rounded-lg bg-red-50/50 border-red-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Mail size={20} className="text-red-600" />
                            <span className="font-bold text-lg text-red-900">Mailgun</span>
                        </div>
                        <div className="badge badge-success flex items-center gap-1">
                            <CheckCircle size={12} /> Ativo
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="input-group">
                            <label>API Key</label>
                            <div className="flex gap-2">
                                <input type="password" value="key-****************************************" className="input-field flex-1" readOnly />
                                <button className="btn btn-ghost border border-gray-300 flex items-center gap-2">
                                    <RefreshCw size={14} /> Renovar
                                </button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Domínio</label>
                            <input type="text" value="mg.minhaloja.com" className="input-field w-full" readOnly />
                        </div>

                        <div className="bg-white p-4 rounded border border-gray-200">
                            <div className="text-sm font-bold mb-2">Email remetente</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Nome</label>
                                    <input type="text" defaultValue="Minha Loja" className="input-field w-full" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 block mb-1">Email</label>
                                    <input type="text" defaultValue="noreply@minhaloja.com" className="input-field w-full" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded border border-green-200 flex items-center gap-2 text-green-700 font-medium text-sm">
                            <CheckCircle size={16} /> Status: Conectado
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button className="btn btn-ghost text-red-600 border border-red-200 hover:bg-red-50">Desconectar</button>
                            <button className="btn btn-ghost border border-gray-300 flex items-center gap-2">
                                <Send size={14} /> Enviar Email de Teste
                            </button>
                            <a href="#" className="btn btn-ghost text-blue-600 flex items-center gap-1 ml-auto">
                                <ExternalLink size={14} /> Documentação
                            </a>
                        </div>
                    </div>
                </div>

                {/* SendGrid */}
                <div className="gateway-card p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Mail size={20} className="text-blue-600" />
                            <span className="font-bold text-lg text-blue-700">SendGrid</span>
                        </div>
                        <div className="badge bg-gray-100 text-gray-500">⚪ Inativo</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="btn btn-primary w-fit flex items-center gap-2">
                            <Link size={16} /> Conectar SendGrid
                        </button>
                    </div>
                </div>
            </div>

            {/* EMAILS AUTOMÁTICOS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Emails Automáticos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
                        <span>Confirmação de pedido</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
                        <span>Pagamento aprovado</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
                        <span>Pedido enviado (com código de rastreio)</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
                        <span>Pedido entregue</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
                        <span>Carrinho abandonado (após 1 hora)</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 border border-transparent hover:border-gray-200 rounded hover:bg-gray-50">
                        <input type="checkbox" className="w-5 h-5 accent-blue-600" />
                        <span>Cupom de aniversário</span>
                    </label>
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
