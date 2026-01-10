import { Globe, ExternalLink, QrCode, Eye, Lock, Copy } from 'lucide-react';

export const DomainTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>

            {/* DOMÍNIO ATUAL */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Domínio Atual</span>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Globe size={24} />
                        </div>
                        <div>
                            <div className="text-xl font-bold text-gray-800">cubo.com/minhaloja</div>
                            <div className="text-sm text-gray-500">Seu domínio padrão gratuito</div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="btn btn-secondary flex items-center gap-2">
                            <Copy size={16} /> Copiar Link
                        </button>
                        <button className="btn btn-secondary flex items-center gap-2">
                            <Eye size={16} /> Visualizar
                        </button>
                        <button className="btn btn-secondary flex items-center gap-2">
                            <QrCode size={16} /> QR Code
                        </button>
                    </div>
                </div>
            </div>

            {/* DOMÍNIO PERSONALIZADO */}
            <div className="form-section relative">
                <div className="absolute top-0 right-0 p-2 z-10">
                    <div className="badge bg-purple-100 text-purple-700 font-bold border border-purple-200">PRO</div>
                </div>
                <div className="section-header">
                    <span className="section-title">Domínio Personalizado</span>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-bold mb-2">🎯 Use seu próprio domínio!</h3>
                    <div className="flex gap-2 mb-2">
                        <div className="flex-1 flex items-center border border-gray-300 rounded-md bg-white overflow-hidden focus-within:ring-2 ring-blue-500 ring-opacity-50">
                            <span className="pl-3 pr-1 text-gray-500 bg-gray-50 h-full flex items-center border-r border-gray-200">www.</span>
                            <input type="text" className="flex-1 p-2 outline-none" placeholder="minhaloja.com.br" />
                        </div>
                        <button className="btn btn-primary">Verificar Disponibilidade</button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span className="w-2 h-2 rounded-full bg-gray-300"></span> Status: Não configurado
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <ExternalLink size={16} /> Instruções de configuração:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                        <li>Compre seu domínio (Registro.br, GoDaddy, etc)</li>
                        <li>Adicione estes registros DNS:
                            <div className="ml-5 mt-1 bg-white p-2 rounded border border-blue-200 font-mono text-xs">
                                <div>Tipo: CNAME</div>
                                <div>Nome: www</div>
                                <div>Valor: cubo.com</div>
                            </div>
                        </li>
                        <li>Aguarde propagação (até 48h)</li>
                    </ol>
                </div>

                {/* PRO Lock Overlay */}
                {/*  Making it subtle instead of full blocking for visibility in this demo */}
                <div className="mt-6 border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Lock size={16} />
                        <span>Disponível no plano PRO</span>
                    </div>
                    <button className="btn btn-sm btn-outline-primary text-purple-600 border-purple-200 hover:bg-purple-50">Fazer Upgrade →</button>
                </div>
            </div>
        </form>
    );
};
