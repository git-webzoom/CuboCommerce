
import React, { useState } from 'react';
import {
    Users, MessageCircle, Mail, ShoppingCart, LogOut, Bell,
    BarChart2, Search, Download, Trash2, Send, MoreVertical, Phone, DollarSign, Filter
} from 'lucide-react';
import { Pagination } from '../../components/ui/Pagination';
import { LeadModal } from './LeadModal';
import styles from './LeadsPage.module.css';

// Mock Data
const mockLeads = [
    {
        id: '1',
        name: 'Maria Silva',
        date: 'Hoje às 14:32',
        contact: { phone: '+55 83 99999-9999', email: 'maria@email.com' },
        source: 'WhatsApp Click',
        status: 'warning', // warning = Não contactado
        statusLabel: 'Não contactado',
        interest: [
            { name: 'Camiseta Branca (Vermelho / M)', price: 'R$ 59,90' },
            { name: 'Boné Preto', price: 'R$ 30,00' }
        ],
        cartTotal: 'R$ 89,90',
        session: { pages: 5, time: '3min' }
    },
    {
        id: '2',
        name: 'João Santos',
        date: 'Ontem às 16:20',
        contact: { phone: '+55 83 98888-8888', email: 'joao@email.com' },
        source: 'Formulário de Contato',
        status: 'success', // success = Contactado
        statusLabel: 'Contactado',
        message: 'Gostaria de saber sobre opções de pagamento e prazo de entrega para João Pessoa.',
        session: { pages: 2, time: '1min' }
    },
    {
        id: '3',
        name: 'Ana Oliveira',
        date: '02/01 às 10:15',
        contact: { phone: '+55 83 97777-7777', email: 'ana@email.com' },
        source: 'Carrinho Abandonado',
        status: 'warning',
        statusLabel: 'Não contactado',
        interest: [
            { name: 'Vestido Floral (Verde / M)', price: 'R$ 89,90' },
            { name: 'Sandália (Nude / 37)', price: 'R$ 109,10' }
        ],
        cartTotal: 'R$ 199,00',
        abandonedTime: '2 dias',
        session: { pages: 8, time: '12min' }
    },
    {
        id: '4',
        name: 'Carlos Souza',
        date: '01/01 às 22:45',
        contact: { phone: '+55 83 96666-6666', email: 'carlos@email.com' },
        source: 'Exit Intent',
        status: 'warning',
        statusLabel: 'Não contactado',
        interest: [
            { name: 'Tênis Esportivo (Preto / 42)', price: 'R$ 159,90', views: 3 },
            { name: 'Meias Kit 3 Pares', price: 'R$ 29,90', views: 1 }
        ],
        session: { pages: 4, time: '10min' }
    }
];

const chartData = [
    { day: 'Dom', value: 30 },
    { day: 'Seg', value: 45 },
    { day: 'Ter', value: 60 },
    { day: 'Qua', value: 80 },
    { day: 'Qui', value: 50 },
    { day: 'Sex', value: 90 },
    { day: 'Sab', value: 70 },
];

export const LeadsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedLead, setSelectedLead] = useState<any>(null); // For modal

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Leads</h1>
                <div className={styles.headerActions}>
                    <div className={styles.searchContainer}>
                        <Search className={styles.searchIcon} size={18} />
                        <input type="text" placeholder="Buscar por nome, telefone, email..." className={styles.searchInput} />
                    </div>
                    <button
                        className={`${styles.btnSecondary} ${styles.mobileFilterBtn} ${showMobileFilters ? styles.active : ''}`}
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <Filter size={18} />
                    </button>
                    <button className={styles.btnSecondary}><Download size={18} /> <span>Exportar</span></button>
                    <button className={styles.btnSecondary}><Send size={18} /> <span>Campanha</span></button>
                </div>
            </div>

            {/* Filters */}
            <div className={`${styles.filterSection} ${showMobileFilters ? styles.showMobile : ''}`}>
                <div className={styles.filterControls}>
                    <div className={styles.filterGroup}>
                        <label>Origem:</label>
                        <select className={styles.selectInput}>
                            <option>Todas</option>
                            <option>WhatsApp</option>
                            <option>Formulário</option>
                            <option>Carrinho</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Período:</label>
                        <select className={styles.selectInput}>
                            <option>Últimos 30 dias</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Status:</label>
                        <select className={styles.selectInput}>
                            <option>Todos</option>
                            <option>Não contactado</option>
                            <option>Contactado</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>&nbsp;</label>
                        <button className={styles.btnSecondary} style={{ color: 'var(--color-danger)' }}><Trash2 size={16} /> Limpar Filtros</button>
                    </div>
                </div>
            </div>

            {/* Resume Summary */}
            <div className={styles.summarySection}>
                <div className={styles.summaryTitle}>Resumo Rápido</div>
                <div className={styles.summaryGrid}>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><Users size={16} /> Total</div>
                        <div className={styles.cardValue}>245</div>
                        <div className={styles.cardFooter}>Este mês</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><MessageCircle size={16} /> WhatsApp</div>
                        <div className={styles.cardValue}>156</div>
                        <div className={styles.cardFooter} style={{ color: 'var(--color-success)' }}>64%</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><Mail size={16} /> Formulário</div>
                        <div className={styles.cardValue}>45</div>
                        <div className={styles.cardFooter}>18%</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><ShoppingCart size={16} /> Carrinho</div>
                        <div className={styles.cardValue}>28</div>
                        <div className={styles.cardFooter}>11%</div>
                    </div>

                    {/* Row 2 */}
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><LogOut size={16} /> Exit</div>
                        <div className={styles.cardValue}>12</div>
                        <div className={styles.cardFooter}>5%</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><Bell size={16} /> Notific.</div>
                        <div className={styles.cardValue}>4</div>
                        <div className={styles.cardFooter}>2%</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><BarChart2 size={16} /> Hoje</div>
                        <div className={styles.cardValue}>18</div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardTitle}><DollarSign size={16} /> Taxa Conv</div>
                        <div className={styles.cardValue}>12.5%</div>
                    </div>
                </div>
            </div>

            {/* Charts & Breakdown */}
            <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                    <div className={styles.chartTitle}>Gráfico de Captura (Últimos 7 dias)</div>
                    <div className={styles.chartPlaceholder}>
                        {chartData.map((d, i) => (
                            <div key={i} className={styles.chartBar} style={{ height: `${d.value}%` }}>
                                <span className={styles.chartLabel}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <div className={styles.chartTitle}>Por Origem</div>
                    <div className={styles.sourceList}>
                        <div className={styles.sourceItem}>
                            <div className={styles.sourceHeader}>
                                <span>📱 WhatsApp Click</span>
                                <span>156 (64%)</span>
                            </div>
                            <div className={styles.sourceBarBg}>
                                <div className={styles.sourceBarFill} style={{ width: '64%' }}></div>
                            </div>
                        </div>
                        <div className={styles.sourceItem}>
                            <div className={styles.sourceHeader}>
                                <span>📧 Formulário Contato</span>
                                <span>45 (18%)</span>
                            </div>
                            <div className={styles.sourceBarBg}>
                                <div className={styles.sourceBarFill} style={{ width: '18%' }}></div>
                            </div>
                        </div>
                        <div className={styles.sourceItem}>
                            <div className={styles.sourceHeader}>
                                <span>🛒 Carrinho Abandonado</span>
                                <span>28 (11%)</span>
                            </div>
                            <div className={styles.sourceBarBg}>
                                <div className={styles.sourceBarFill} style={{ width: '11%' }}></div>
                            </div>
                        </div>
                        <div className={styles.sourceItem}>
                            <div className={styles.sourceHeader}>
                                <span>🚪 Exit Intent</span>
                                <span>12 (5%)</span>
                            </div>
                            <div className={styles.sourceBarBg}>
                                <div className={styles.sourceBarFill} style={{ width: '5%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.summaryTitle}>Lista de Leads</div>

            {/* Desktop Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Nome / Data</th>
                            <th className={styles.th}>Contato</th>
                            <th className={styles.th}>Origem</th>
                            <th className={styles.th}>Interesse</th>
                            <th className={styles.th}>Sessão</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockLeads.map(lead => (
                            <tr key={lead.id} className={styles.tr}>
                                <td className={styles.td}>
                                    <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{lead.date}</div>
                                </td>
                                <td className={styles.td}>
                                    <div style={{ fontSize: '0.875rem' }}>{lead.contact.phone}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{lead.contact.email}</div>
                                </td>
                                <td className={styles.td}>
                                    {lead.source}
                                    {lead.abandonedTime && (
                                        <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', fontWeight: 500 }}>
                                            ⏰ {lead.abandonedTime}
                                        </div>
                                    )}
                                </td>
                                <td className={styles.td}>
                                    {lead.interest ? (
                                        <div style={{ fontSize: '0.75rem' }}>
                                            {lead.interest.slice(0, 1).map((item: any, i: number) => (
                                                <div key={i}>• {item.name}</div>
                                            ))}
                                            {lead.interest.length > 1 && <div style={{ color: 'var(--color-text-muted)' }}>+{lead.interest.length - 1} itens</div>}
                                            {lead.cartTotal && <div style={{ fontWeight: 600, marginTop: 2 }}>Total: {lead.cartTotal}</div>}
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: '0.75rem', fontStyle: 'italic', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            "{lead.message}"
                                        </div>
                                    )}
                                </td>
                                <td className={styles.td}>
                                    <div style={{ fontSize: '0.75rem' }}>
                                        {lead.session.pages} pgs, {lead.session.time}
                                    </div>
                                </td>
                                <td className={styles.td}>
                                    <span className={`${styles.badge} ${lead.status === 'success' ? styles.badgeSuccess : styles.badgeWarning}`}>
                                        {lead.statusLabel}
                                    </span>
                                </td>
                                <td className={styles.td}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button className={styles.btnSecondary} onClick={() => setSelectedLead(lead)} style={{ padding: '4px 8px' }}>
                                            <MoreVertical size={16} />
                                        </button>
                                        <button className={styles.btnSecondary} style={{ padding: '4px 8px', color: 'var(--color-success)' }}>
                                            <MessageCircle size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards List */}
            <div className={styles.leadsList}>
                {mockLeads.map(lead => (
                    <div
                        key={lead.id}
                        className={styles.leadCard}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedLead(lead)}
                    >
                        <div className={styles.leadHeader}>
                            <div className={styles.leadName}>
                                {lead.name} <span className={styles.leadDate}>| {lead.date}</span>
                            </div>
                            <button className={styles.btnSecondary} style={{ padding: '4px', border: 'none' }} onClick={(e) => e.stopPropagation()}>
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className={styles.leadContent}>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoColumn}>
                                    <div className={styles.infoRow}>
                                        <Phone size={14} className="text-muted" /> {lead.contact.phone}
                                    </div>
                                    <div className={styles.infoRow}>
                                        <Mail size={14} className="text-muted" /> {lead.contact.email}
                                    </div>
                                    <div className={styles.infoRow} style={{ marginTop: '4px' }}>
                                        <span className={styles.label}>🎯 Origem:</span> {lead.source}
                                    </div>
                                    {lead.abandonedTime && (
                                        <div className={styles.infoRow} style={{ color: 'var(--color-danger)' }}>
                                            <span className={styles.label}>⏰ Abandonado há:</span> {lead.abandonedTime}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.infoColumn}>
                                    {lead.interest ? (
                                        <>
                                            <span className={styles.label}>{lead.source === 'Carrinho Abandonado' ? 'Carrinho abandonado:' : 'Interesse em:'}</span>
                                            <div className={styles.productList}>
                                                {lead.interest.map((item: any, i: number) => (
                                                    <div key={i} className={styles.productItem}>
                                                        <span>• {item.name} {item.views ? `(${item.views}x)` : ''}</span>
                                                        <span>{item.price}</span>
                                                    </div>
                                                ))}
                                                {lead.cartTotal && (
                                                    <div className={styles.productItem} style={{ fontWeight: 600, borderTop: '1px solid var(--color-border)', paddingTop: '4px', marginTop: '4px' }}>
                                                        <span>Total:</span>
                                                        <span>{lead.cartTotal}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles.label}>Mensagem:</span>
                                            <div style={{ fontStyle: 'italic', color: 'var(--color-text-main)', fontSize: '0.875rem' }}>
                                                "{lead.message}"
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className={styles.infoColumn}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Sessão:</span> {lead.session.pages} páginas, {lead.session.time}
                                    </div>
                                    <div className={styles.infoRow} style={{ marginTop: 'auto' }}>
                                        <span className={styles.label}>Status:</span>
                                        <span className={`${styles.badge} ${lead.status === 'success' ? styles.badgeSuccess : styles.badgeWarning}`}>
                                            {lead.statusLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.actionRow}>
                                <button className={styles.btnSecondary} onClick={(e) => e.stopPropagation()}><MessageCircle size={16} /> WhatsApp</button>
                                <button className={styles.btnSecondary} onClick={(e) => e.stopPropagation()}><Mail size={16} /> Email</button>
                                {lead.status !== 'success' && (
                                    <button className={styles.btnSecondary} style={{ color: 'var(--color-success)', borderColor: 'var(--color-success)' }} onClick={(e) => e.stopPropagation()}>
                                        <Users size={16} /> Marcar contactado
                                    </button>
                                )}
                                <button className={styles.btnSecondary} style={{ color: 'var(--color-danger)' }} onClick={(e) => e.stopPropagation()}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={5}
                onPageChange={setCurrentPage}
            />

            <LeadModal
                isOpen={!!selectedLead}
                onClose={() => setSelectedLead(null)}
                lead={selectedLead}
            />
        </div>
    );
};
