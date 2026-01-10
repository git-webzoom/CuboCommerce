
import { ExternalLink, QrCode, Smartphone } from 'lucide-react';

export const StorePreview = () => {
    return (
        <div className="form-section">
            <div className="section-header">
                <span className="section-title">Visualizar Loja</span>
            </div>

            <div className="preview-actions">
                <div className="preview-card" role="button">
                    <ExternalLink size={32} className="text-muted" />
                    <div>
                        <strong>Abrir em nova aba</strong>
                        <p className="text-sm text-muted">Acessar link da loja</p>
                    </div>
                </div>

                <div className="preview-card" role="button">
                    <QrCode size={32} className="text-muted" />
                    <div>
                        <strong>Ver no Celular</strong>
                        <p className="text-sm text-muted">Escanear QR Code</p>
                    </div>
                </div>

                <div className="preview-card" role="button">
                    <Smartphone size={32} className="text-muted" />
                    <div>
                        <strong>Modo Mobile</strong>
                        <p className="text-sm text-muted">Simular tela de celular</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
