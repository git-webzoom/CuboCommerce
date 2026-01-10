
import { Save, CheckCircle } from 'lucide-react';

export const BasicInfoTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Informações da Loja</span>
                </div>

                <div className="input-group">
                    <label>Nome da Loja</label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ex: Minha Loja Incrível"
                    />
                </div>

                <div className="input-group">
                    <label>Slug (URL)</label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">cubo.com/</span>
                        <input type="text" placeholder="minha-loja" />
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
                        placeholder="Descreva sua loja para os clientes..."
                    ></textarea>
                </div>

                <div className="input-group">
                    <label>Status</label>
                    <div className="status-options">
                        <label className="radio-option">
                            <input type="radio" name="status" defaultChecked />
                            <span>Publicada</span>
                        </label>
                        <label className="radio-option">
                            <input type="radio" name="status" />
                            <span>Rascunho</span>
                        </label>
                    </div>
                </div>

                <div className="action-bar">
                    <button className="btn btn-primary">
                        <Save size={18} style={{ marginRight: 8 }} />
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </form>
    );
};
