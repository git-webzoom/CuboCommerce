
import React from 'react';
import { X, Mail, Smartphone, Globe, MessageSquare, Save, Trash2, Tag } from 'lucide-react';
import styles from './LeadModal.module.css';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: any;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, lead }) => {
    if (!isOpen || !lead) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.title}>Lead: {lead.name}</div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {/* Contact Info & Session Data Grid */}
                    <div className={styles.grid2}>
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Informações de Contato</div>
                            <div className={styles.infoCard}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Nome:</span>
                                    <span className={styles.value}>{lead.name}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>WhatsApp:</span>
                                    <span className={styles.value}>
                                        {lead.contact.phone}
                                        <button className={styles.btnSecondary} style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                                            <MessageSquare size={12} /> Abrir
                                        </button>
                                    </span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Email:</span>
                                    <span className={styles.value}>
                                        {lead.contact.email}
                                        <button className={styles.btnSecondary} style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                                            <Mail size={12} /> Email
                                        </button>
                                    </span>
                                </div>
                                <div className={styles.row} style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-border)' }}>
                                    <span className={styles.label}>Capturado em:</span>
                                    <span className={styles.value}>{lead.date.split('às')[0]}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Origem:</span>
                                    <span className={styles.value}>{lead.source}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Dados da Sessão</div>
                            <div className={styles.infoCard}>
                                <div className={styles.row}>
                                    <span className={styles.label}>Session ID:</span>
                                    <span className={styles.value}>abc-def-{lead.id}23</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Tempo no site:</span>
                                    <span className={styles.value}>{lead.session.time}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Páginas visitadas:</span>
                                    <span className={styles.value}>{lead.session.pages}</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Dispositivo:</span>
                                    <span className={styles.value}><Smartphone size={14} /> Mobile (Android)</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.label}>Origem Tráfego:</span>
                                    <span className={styles.value}><Globe size={14} /> Instagram</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Visualized or Message */}
                    {lead.interest ? (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Interesse / Carrinho</div>
                            <div className={styles.infoCard}>
                                <div className={styles.productList}>
                                    {lead.interest.map((item: any, i: number) => (
                                        <div key={i} className={styles.productItem}>
                                            <div className={styles.productThumb} />
                                            <div className={styles.productInfo}>
                                                <div className={styles.productName}>{item.name}</div>
                                                <div className={styles.productMeta}>
                                                    {item.views ? `${item.views} visualizações` : 'No carrinho'}
                                                </div>
                                            </div>
                                            <div className={styles.productPrice}>{item.price}</div>
                                        </div>
                                    ))}
                                    {lead.cartTotal && (
                                        <div className={styles.row} style={{ justifyContent: 'flex-end', marginTop: 'var(--spacing-sm)', fontWeight: 700 }}>
                                            Total: {lead.cartTotal}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Mensagem</div>
                            <div className={styles.infoCard}>
                                <p style={{ fontStyle: 'italic' }}>"{lead.message}"</p>
                            </div>
                        </div>
                    )}

                    {/* Timeline */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Histórico de Interações</div>
                        <div className={styles.timeline}>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineTime}>14:40</span>
                                Clicou em "Finalizar via WhatsApp"
                            </div>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineTime}>14:38</span>
                                Adicionou produtos ao carrinho
                            </div>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineTime}>14:35</span>
                                Visualizou 5 páginas
                            </div>
                            <div className={styles.timelineItem}>
                                <span className={styles.timelineTime}>14:32</span>
                                Lead capturado via {lead.source}
                            </div>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Notas Internas</div>
                        <textarea className={styles.noteArea} placeholder="Adicione uma nota sobre este lead..." defaultValue="Cliente demonstrou alto interesse em vestidos. Acompanhar na próxima semana." />
                        <div style={{ marginTop: 'var(--spacing-sm)' }}>
                            <button className={styles.btnSecondary} style={{ fontSize: '0.75rem' }}>
                                <Save size={14} /> Salvar Nota
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <span className={styles.label}>Status:</span>
                        <select className={styles.statusSelect} defaultValue="Não contactado">
                            <option>Não contactado</option>
                            <option>Contactado</option>
                            <option>Convertido</option>
                            <option>Descartado</option>
                        </select>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.btnPrimary}>
                            <MessageSquare size={16} /> Enviar WhatsApp
                        </button>
                        <button className={styles.btnSecondary}>
                            <Mail size={16} /> Enviar Email
                        </button>
                        <button className={styles.btnSecondary}>
                            <Tag size={16} /> Cupom
                        </button>
                        <button className={styles.btnGhost}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
