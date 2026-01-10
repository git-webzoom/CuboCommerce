import { Save, CheckCircle, Smartphone, CreditCard, Banknote, Copy, ExternalLink, Link } from 'lucide-react';

export const PaymentsTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* FORMAS DE PAGAMENTO ACEITAS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Formas de Pagamento Aceitas</span>
                </div>
                <div className="flex flex-col gap-sm">
                    <label className="flex items-center gap-sm cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <Smartphone size={18} />
                            <span className="font-medium">WhatsApp (Negociação direta)</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-green-600" style={{ fontSize: '14px' }}>❖</span>
                            <span className="font-medium">PIX</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input type="checkbox" defaultChecked className="accent-blue-600 w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <CreditCard size={18} />
                            <span className="font-medium">Cartão de Crédito</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <CreditCard size={18} />
                            <span className="font-medium">Cartão de Débito</span>
                        </div>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-200">
                        <input type="checkbox" className="accent-blue-600 w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <Banknote size={18} />
                            <span className="font-medium">Boleto Bancário</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* GATEWAYS DE PAGAMENTO */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Gateways de Pagamento</span>
                </div>

                {/* Mercado Pago */}
                <div className="gateway-card mb-6 p-4 border rounded-lg bg-blue-50/50 border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-blue-800">💚 Mercado Pago</span>
                        </div>
                        <div className="badge badge-success flex items-center gap-1">
                            <CheckCircle size={12} /> Ativo
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="input-group">
                            <label>Access Token</label>
                            <div className="flex gap-2">
                                <input type="password" value="APP_USR-***********************************" className="input-field flex-1" readOnly />
                                <button className="btn btn-ghost border border-gray-300">Mostrar</button>
                                <button className="btn btn-ghost border border-gray-300">Testar</button>
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Public Key</label>
                            <input type="password" value="APP_USR-***********************************" className="input-field w-full" readOnly />
                        </div>

                        <div className="input-group">
                            <label>Webhook URL (cole no Mercado Pago)</label>
                            <div className="flex gap-2">
                                <input type="text" value="https://cubo.com/api/webhooks/mercadopago" className="input-field flex-1 bg-gray-50" readOnly />
                                <button className="btn btn-secondary flex items-center gap-2">
                                    <Copy size={14} /> Copiar
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-3 rounded border border-green-200 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-green-700 font-medium text-sm">
                                <CheckCircle size={16} /> Status: Conectado e funcionando
                            </div>
                            <div className="text-xs text-gray-500 ml-6">
                                Última sincronização: 2 minutos atrás
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button className="btn btn-ghost text-red-600 border border-red-200 hover:bg-red-50">Desconectar</button>
                            <button className="btn btn-ghost border border-gray-300">Testar Conexão</button>
                            <a href="#" className="btn btn-ghost text-blue-600 flex items-center gap-1 ml-auto">
                                <ExternalLink size={14} /> Documentação
                            </a>
                        </div>
                    </div>
                </div>

                {/* Stripe */}
                <div className="gateway-card mb-4 p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-gray-700">💜 Stripe</span>
                        </div>
                        <div className="badge bg-gray-100 text-gray-500">⚪ Inativo</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="btn btn-primary w-fit flex items-center gap-2">
                            <Link size={16} /> Conectar Stripe
                        </button>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            💡 Com o Stripe você aceita cartões internacionalmente
                        </p>
                    </div>
                </div>

                {/* Asaas */}
                <div className="gateway-card p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-blue-900">🔵 Asaas</span>
                        </div>
                        <div className="badge bg-gray-100 text-gray-500">⚪ Inativo</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="btn btn-primary w-fit flex items-center gap-2">
                            <Link size={16} /> Conectar Asaas
                        </button>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            💡 Gateway brasileiro com PIX, boleto e cartão
                        </p>
                    </div>
                </div>

            </div>

            {/* CONFIGURAÇÕES DE CHECKOUT */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Configurações de Checkout</span>
                </div>

                <div className="flex flex-col gap-sm mb-4">
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Solicitar CPF/CNPJ no checkout</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Solicitar endereço completo</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" />
                        <span>Exigir cadastro antes de comprar</span>
                    </label>
                </div>

                <div className="input-group">
                    <label>Mensagem personalizada do checkout</label>
                    <textarea
                        className="input-field"
                        rows={3}
                        defaultValue="Obrigado por comprar conosco! Em breve você receberá confirmação do seu pedido."
                    ></textarea>
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
