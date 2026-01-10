import { User, UserPlus, Edit2, Trash2, Shield, Lock } from 'lucide-react';

export const TeamTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* MEMBROS DA EQUIPE */}
            <div className="form-section relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 z-10">
                    <div className="badge bg-indigo-100 text-indigo-700 font-bold border border-indigo-200">ENTERPRISE</div>
                </div>
                <div className="section-header">
                    <span className="section-title">Membros da Equipe</span>
                </div>

                <div className="mb-6 filter blur-[1px] select-none pointer-events-none opacity-60">
                    <div className="mb-4">
                        <button className="btn btn-primary flex items-center gap-2" disabled>
                            <UserPlus size={16} /> Convidar Membro
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Member 1 (Owner) */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">Você (Dono)</div>
                                    <div className="text-sm text-gray-500">dono@loja.com</div>
                                    <div className="text-xs text-blue-600 mt-1 flex items-center gap-1"><Shield size={10} /> Acesso total</div>
                                </div>
                            </div>
                        </div>

                        {/* Member 2 */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">João Silva (Gerente)</div>
                                    <div className="text-sm text-gray-500">joao@loja.com</div>
                                    <div className="text-xs text-gray-500 mt-1">Pode: gerenciar produtos, pedidos</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-ghost border border-gray-300"><Edit2 size={14} /></button>
                                <button className="btn btn-sm btn-ghost border border-gray-300 text-red-500"><Trash2 size={14} /></button>
                            </div>
                        </div>

                        {/* Member 3 */}
                        <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-100 p-3 rounded-full text-gray-600">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">Maria Santos (Atendimento)</div>
                                    <div className="text-sm text-gray-500">maria@loja.com</div>
                                    <div className="text-xs text-gray-500 mt-1">Pode: visualizar e responder pedidos</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn btn-sm btn-ghost border border-gray-300"><Edit2 size={14} /></button>
                                <button className="btn btn-sm btn-ghost border border-gray-300 text-red-500"><Trash2 size={14} /></button>
                            </div>
                        </div>
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
        </form>
    );
};
