import { Save, Mail, MessageSquare, Clock } from 'lucide-react';

export const NotificationsTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* NOTIFICAÇÕES PARA VOCÊ (LOJISTA) */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Notificações para Você (Lojista)</span>
                </div>

                <div className="input-group">
                    <label className="flex items-center gap-2 mb-2">
                        <Mail size={16} /> Email para notificações:
                    </label>
                    <input type="email" defaultValue="dono@loja.com" className="input-field" />
                </div>

                <div className="input-group">
                    <label className="flex items-center gap-2 mb-2">
                        <MessageSquare size={16} /> WhatsApp para notificações:
                    </label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">+55</span>
                        <input type="text" defaultValue="83999999999" />
                    </div>
                </div>

                <div className="divider" style={{ borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }} />

                <div className="mb-4 font-medium text-gray-700">Receber notificação quando:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {/* Events */}
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Novo pedido recebido</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Pagamento aprovado</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Pagamento falhou</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Novo lead capturado</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Produto com estoque baixo (menos de 5)</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" /> Produto esgotado</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" /> Novo comentário/avaliação</label>
                </div>

                <div className="mb-4 font-medium text-gray-700 flex items-center gap-2">
                    <Clock size={16} /> Resumos periódicos:
                </div>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Resumo diário (8h da manhã)</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Resumo semanal (segunda-feira, 9h)</label>
                    <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" /> Resumo mensal</label>
                </div>
            </div>

            {/* NOTIFICAÇÕES PARA CLIENTES */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Notificações para Clientes</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <div className="mb-4 font-bold flex items-center gap-2 text-green-700">
                            <MessageSquare size={18} /> Via WhatsApp:
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Confirmação de pedido</label>
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Pagamento aprovado</label>
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Pedido enviado</label>
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Pedido entregue</label>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4 font-bold flex items-center gap-2 text-blue-700">
                            <Mail size={18} /> Via Email:
                        </div>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Confirmação de pedido</label>
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Nota fiscal (se disponível)</label>
                            <label className="flex items-center gap-sm cursor-pointer"><input type="checkbox" defaultChecked /> Código de rastreio</label>
                        </div>
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
