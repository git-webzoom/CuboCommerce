
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';

export const ImagesTab = () => {
    return (
        <div className="form-section">
            <div className="section-header">
                <span className="section-title">Imagens da Loja</span>
            </div>

            <div className="input-group">
                <label>Logo</label>
                <div className="upload-preview-container">
                    <div className="logo-preview">
                        <ImageIcon size={40} className="text-muted" />
                    </div>
                    <div className="upload-actions">
                        <button className="btn btn-primary" type="button">
                            <Upload size={16} style={{ marginRight: 8 }} />
                            Alterar Logo
                        </button>
                        <button className="btn btn-ghost" type="button" style={{ color: 'var(--color-danger)' }}>
                            <Trash2 size={16} style={{ marginRight: 8 }} />
                            Remover
                        </button>
                    </div>
                </div>
                <p className="helper-text">Recomendado: 200x200px, PNG com fundo transparente</p>
            </div>

            <div className="input-group" style={{ marginTop: '2rem' }}>
                <label>Banner Principal</label>
                <div className="upload-preview-container">
                    <div className="banner-preview">
                        <ImageIcon size={60} className="text-muted" />
                    </div>
                    <div className="upload-actions">
                        <button className="btn btn-primary" type="button">
                            <Upload size={16} style={{ marginRight: 8 }} />
                            Alterar Banner
                        </button>
                        <button className="btn btn-ghost" type="button" style={{ color: 'var(--color-danger)' }}>
                            <Trash2 size={16} style={{ marginRight: 8 }} />
                            Remover
                        </button>
                    </div>
                </div>
                <p className="helper-text">Recomendado: 1200x400px, JPG ou PNG de alta qualidade</p>
            </div>
        </div>
    );
};
