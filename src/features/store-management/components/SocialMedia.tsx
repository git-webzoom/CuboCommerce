
import { Save, Smartphone, Instagram, Facebook, Music2 } from 'lucide-react';

export const SocialMediaTab = () => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-section">
                <div className="section-header">
                    <span className="section-title">Redes Sociais</span>
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Smartphone size={16} /> WhatsApp (Obrigatório)
                    </label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">+55</span>
                        <input type="tel" placeholder="83999999999" />
                    </div>
                    <p className="helper-text">Será usado para o botão de contato principal.</p>
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Instagram size={16} /> Instagram
                    </label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">@</span>
                        <input type="text" placeholder="minha.loja" />
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Facebook size={16} /> Facebook
                    </label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">facebook.com/</span>
                        <input type="text" placeholder="minha.loja" />
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Music2 size={16} /> TikTok
                    </label>
                    <div className="input-prefix-group">
                        <span className="input-prefix">@</span>
                        <input type="text" placeholder="minha.loja" />
                    </div>
                </div>

                <div className="action-bar">
                    <button className="btn btn-primary">
                        <Save size={18} style={{ marginRight: 8 }} />
                        Salvar
                    </button>
                </div>
            </div>
        </form>
    );
};
