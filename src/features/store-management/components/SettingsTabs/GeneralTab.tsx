import { Save, CheckCircle, Image } from 'lucide-react';

export const GeneralTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            {/* INFORMAÇÕES DA LOJA */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Informações da Loja</span>
                </div>

                <div className="input-group">
                    <label>Nome da Loja *</label>
                    <input
                        type="text"
                        className="input-field"
                        defaultValue="Minha Loja Virtual"
                        placeholder="Ex: Minha Loja Incrível"
                    />
                </div>

                <div className="input-group">
                    <label>URL da Loja *</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">cubo.com/</span>
                        <input type="text" defaultValue="minhaloja" placeholder="minha-loja" />
                        <div className="verify-badge">
                            <CheckCircle size={14} />
                            Disponível
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label>Descrição</label>
                    <textarea
                        className="input-field"
                        placeholder="Sua loja online de roupas e acessórios..."
                        maxLength={150}
                        defaultValue="Sua loja online de roupas e acessórios"
                    ></textarea>
                    <div className="helper-text" style={{ textAlign: 'right' }}>150 caracteres</div>
                </div>
            </div>

            {/* IMAGENS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Imagens</span>
                </div>

                <div className="input-group">
                    <label>Logo</label>
                    <div className="upload-preview-container">
                        <div className="logo-preview">
                            <Image size={32} className="text-muted" />
                        </div>
                        <div className="upload-actions">
                            <div className="flex gap-sm">
                                <button type="button" className="btn btn-secondary">Alterar Logo</button>
                                <button type="button" className="btn btn-ghost text-danger">Remover</button>
                            </div>
                            <span className="helper-text">💡 Recomendado: 200x200px, PNG com fundo transparente</span>
                        </div>
                    </div>
                </div>

                <div className="input-group">
                    <label>Banner</label>
                    <div className="upload-preview-container" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div className="banner-preview">
                            <span className="text-muted font-bold">BANNER DA LOJA</span>
                        </div>
                        <div className="upload-actions">
                            <div className="flex gap-sm">
                                <button type="button" className="btn btn-secondary">Alterar</button>
                                <button type="button" className="btn btn-ghost text-danger">Remover</button>
                            </div>
                            <span className="helper-text">💡 Recomendado: 1200x400px, JPG ou PNG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* REDES SOCIAIS */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Redes Sociais</span>
                </div>

                <div className="input-group">
                    <label>WhatsApp * (obrigatório para receber pedidos)</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">+55</span>
                        <input type="text" defaultValue="83999999999" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Instagram</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">@</span>
                        <input type="text" defaultValue="minhaloja" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Facebook</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">facebook.com/</span>
                        <input type="text" defaultValue="minhaloja" />
                    </div>
                </div>

                <div className="input-group">
                    <label>TikTok</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">@</span>
                        <input type="text" defaultValue="minhaloja" />
                    </div>
                </div>
            </div>

            {/* STATUS DA LOJA */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Status da Loja</span>
                </div>

                <div className="input-group">
                    <div className="radio-group flex flex-col gap-sm">
                        <label className="radio-option">
                            <input type="radio" name="storeStatus" defaultChecked />
                            <span className="font-bold">◉ Loja Publicada (visível para todos)</span>
                        </label>
                        <label className="radio-option">
                            <input type="radio" name="storeStatus" />
                            <span>○ Rascunho (apenas você pode ver)</span>
                        </label>
                    </div>
                </div>

                <div className="divider" style={{ borderTop: '1px solid var(--color-border)', margin: '1rem 0' }} />

                <div className="flex flex-col gap-sm">
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Indexar no Google (SEO)</span>
                    </label>
                    <label className="flex items-center gap-sm cursor-pointer">
                        <input type="checkbox" defaultChecked />
                        <span>Permitir compartilhamento em redes sociais</span>
                    </label>
                </div>
            </div>

            {/* CATÁLOGO */}
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Catálogo</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="flex flex-col gap-sm">
                        <label className="flex items-center gap-sm cursor-pointer">
                            <input type="checkbox" defaultChecked />
                            <span>Exibir preços dos produtos</span>
                        </label>
                        <label className="flex items-center gap-sm cursor-pointer">
                            <input type="checkbox" defaultChecked />
                            <span>Mostrar produtos em destaque no topo</span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-sm">
                        <label className="flex items-center gap-sm cursor-pointer">
                            <input type="checkbox" defaultChecked />
                            <span>Habilitar busca de produtos</span>
                        </label>
                        <label className="flex items-center gap-sm cursor-pointer">
                            <input type="checkbox" defaultChecked />
                            <span>Habilitar filtros por categoria</span>
                        </label>
                        <label className="flex items-center gap-sm cursor-pointer">
                            <input type="checkbox" />
                            <span>Habilitar filtros por preço</span>
                        </label>
                    </div>
                </div>

                <div className="input-group mt-4">
                    <div className="flex gap-md items-center">
                        <div className="flex-1">
                            <label>Produtos por página</label>
                            <select className="input-field">
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label>Ordenação padrão</label>
                            <select className="input-field">
                                <option value="latest">Mais recentes</option>
                                <option value="az">Nome A-Z</option>
                                <option value="price_asc">Menor preço</option>
                                <option value="price_desc">Maior preço</option>
                                <option value="featured">Destaque</option>
                            </select>
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
