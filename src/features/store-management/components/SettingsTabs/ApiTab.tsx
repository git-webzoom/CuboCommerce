import { Key, Plus, Eye, Trash2, CheckCircle, BookOpen, Activity, Edit2, BarChart2 } from 'lucide-react';

export const ApiTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* SUAS CHAVES DE API */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Suas Chaves de API</span>
                </div>

                <div className="mb-4">
                    <button className="btn btn-primary flex items-center gap-2">
                        <Plus size={16} /> Criar Nova Chave
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Key 1 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="font-bold flex items-center gap-2">
                                    <Key size={16} className="text-gray-500" /> Chave de Produção
                                </div>
                                <div className="code-block bg-gray-100 p-2 rounded mt-1 font-mono text-sm flex items-center gap-2">
                                    cubo_aBcD...
                                    <button className="text-gray-400 hover:text-gray-600 ml-2" title="Mostrar"><Eye size={14} /></button>
                                    <button className="text-gray-400 hover:text-red-500 ml-1" title="Revogar"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                            <div><span className="block font-semibold">Criada:</span> 04/01/2026</div>
                            <div><span className="block font-semibold">Último uso:</span> 2 horas atrás</div>
                            <div>
                                <span className="block font-semibold">Permissões:</span>
                                <span className="flex items-center gap-1 text-green-600"><CheckCircle size={10} /> Leitura</span>
                                <span className="flex items-center gap-1 text-green-600"><CheckCircle size={10} /> Escrita</span>
                            </div>
                            <div><span className="block font-semibold">Requests:</span> 1.234 / mês</div>
                        </div>
                    </div>

                    {/* Key 2 */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm opacity-75">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="font-bold flex items-center gap-2">
                                    <Key size={16} className="text-gray-500" /> Chave de Teste
                                </div>
                                <div className="code-block bg-gray-100 p-2 rounded mt-1 font-mono text-sm flex items-center gap-2">
                                    cubo_xYz1...
                                    <button className="text-gray-400 hover:text-gray-600 ml-2" title="Mostrar"><Eye size={14} /></button>
                                    <button className="text-gray-400 hover:text-red-500 ml-1" title="Revogar"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                            <div><span className="block font-semibold">Criada:</span> 01/01/2026</div>
                            <div><span className="block font-semibold">Último uso:</span> Nunca</div>
                            <div>
                                <span className="block font-semibold">Permissões:</span>
                                <span className="flex items-center gap-1 text-green-600"><CheckCircle size={10} /> Leitura</span>
                                <span className="flex items-center gap-1 text-gray-400">⚪ Escrita</span>
                            </div>
                            <div><span className="block font-semibold">Requests:</span> 0 / mês</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCUMENTAÇÃO DA API */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Documentação da API</span>
                </div>

                <div className="bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-sm mb-4">
                    <div className="mb-2 text-green-400">Base URL: https://api.cubo.com/v1</div>
                    <div className="space-y-1">
                        <div className="flex gap-2"><span className="text-blue-400 w-12 text-right">GET</span> /products <span className="text-gray-500">- Listar produtos</span></div>
                        <div className="flex gap-2"><span className="text-yellow-400 w-12 text-right">POST</span> /products <span className="text-gray-500">- Criar produto</span></div>
                        <div className="flex gap-2"><span className="text-blue-400 w-12 text-right">GET</span> /orders <span className="text-gray-500">- Listar pedidos</span></div>
                        <div className="flex gap-2"><span className="text-yellow-400 w-12 text-right">POST</span> /orders <span className="text-gray-500">- Criar pedido</span></div>
                        <div className="flex gap-2"><span className="text-blue-400 w-12 text-right">GET</span> /customers <span className="text-gray-500">- Listar clientes</span></div>
                    </div>
                </div>

                <a href="#" className="btn btn-secondary w-full justify-center flex items-center gap-2">
                    <BookOpen size={16} /> Ver Documentação Completa →
                </a>
            </div>

            {/* WEBHOOKS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Webhooks</span>
                </div>

                <p className="mb-4 text-sm text-gray-600">Receba notificações em tempo real quando eventos acontecerem</p>
                <div className="mb-4">
                    <button className="btn btn-secondary flex items-center gap-2">
                        <Plus size={16} /> Adicionar Webhook
                    </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                        <div className="font-bold flex items-center gap-2">
                            <Activity size={16} className="text-orange-500" /> Webhook de Pedidos
                        </div>
                        <div className="badge badge-success text-xs">✅ Ativo</div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div><span className="font-semibold">URL:</span> https://meusite.com/webhook</div>
                        <div><span className="font-semibold">Eventos:</span> <span className="bg-gray-200 px-1 rounded text-xs">order.created</span> <span className="bg-gray-200 px-1 rounded text-xs">order.paid</span></div>
                        <div className="text-xs text-gray-500 mt-1">Última chamada: Hoje às 14:32 (200 OK)</div>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-sm btn-ghost border border-gray-300 flex items-center gap-1"><Edit2 size={12} /> Editar</button>
                        <button className="btn btn-sm btn-ghost border border-gray-300 text-red-500 flex items-center gap-1"><Trash2 size={12} /> Excluir</button>
                        <button className="btn btn-sm btn-ghost border border-gray-300 text-blue-500 flex items-center gap-1"><BarChart2 size={12} /> Ver Logs</button>
                    </div>
                </div>
            </div>
        </form>
    );
};
