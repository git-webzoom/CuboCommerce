
import React, { useState } from 'react';
import { ArrowRight, Calendar, CheckCircle, MapPin, Package, AlertTriangle } from 'lucide-react';
import styles from './DashboardHome.module.css';

export const DashboardHome: React.FC = () => {
    const [dateRange, setDateRange] = useState('30d');

    const recentOrders = [
        { id: '#001', customer: 'Maria Silva', amount: 'R$ 129,90', status: 'Pendente', date: 'Hoje', statusClass: 'badge-warning' },
        { id: '#002', customer: 'João Santos', amount: 'R$ 89,00', status: 'Confirmado', date: 'Ontem', statusClass: 'badge-info' },
        { id: '#003', customer: 'Ana Oliveira', amount: 'R$ 199,00', status: 'Pendente', date: '2d', statusClass: 'badge-warning' },
        { id: '#004', customer: 'Carlos Souza', amount: 'R$ 45,00', status: 'Entregue', date: '3d', statusClass: 'badge-success' },
        { id: '#005', customer: 'Fernanda Lima', amount: 'R$ 320,00', status: 'Confirmado', date: '4d', statusClass: 'badge-info' },
    ];

    return (
        <div>
            {/* Header */}
            <div className={styles.pageHeader}>
                <h2 className={styles.title}>Visão Geral</h2>

                <div className={styles.dateFilter}>
                    <Calendar size={16} color="var(--color-text-muted)" />
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className={styles.dateSelect}
                    >
                        <option value="today">Hoje</option>
                        <option value="yesterday">Ontem</option>
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                        <option value="month">Este Mês</option>
                        <option value="last_month">Mês Passado</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards - Grid Layout (4 desktop, 2 mobile) */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Vendas Totais</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-text-brand)' }}>R$ 5.432,00</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Pedidos</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-info)' }}>123</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Ticket Médio</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-warning)' }}>R$ 44,17</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Conversão</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-success)' }}>3,2%</div>
                </div>
            </div>

            {/* Charts & Recent Orders */}
            <div className={styles.contentGrid}>
                {/* Sales Chart */}
                <div className={styles.wideCard}>
                    <h3 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-md)' }}>Gráfico de Vendas</h3>
                    <div className={styles.placeholderChart}>
                        <span className={styles.textMuted}>Gráfico será implementado aqui</span>
                    </div>
                </div>

                {/* Recent Orders Section */}
                <div className={styles.wideCard}>
                    <div className={styles.cardHeader}>
                        <h3 className={styles.cardTitle}>Pedidos Recentes</h3>
                    </div>

                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.th}>ID</th>
                                    <th className={styles.th}>Cliente</th>
                                    <th className={styles.th}>Valor</th>
                                    <th className={styles.th}>Status</th>
                                    <th className={styles.th}>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={styles.td}>{order.id}</td>
                                        <td className={styles.td} style={{ fontWeight: 500 }}>{order.customer}</td>
                                        <td className={styles.td}>{order.amount}</td>
                                        <td className={styles.td}>
                                            <span className={`badge ${order.statusClass}`}>{order.status}</span>
                                        </td>
                                        <td className={styles.td} style={{ color: 'var(--color-text-muted)' }}>{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: 'var(--spacing-md)', textAlign: 'right' }}>
                        <button className="btn btn-ghost" style={{ fontSize: '0.875rem', gap: 'var(--spacing-xs)', display: 'inline-flex', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--color-text-brand)', cursor: 'pointer' }}>
                            Ver todos os pedidos <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className={styles.bottomGrid}>
                {/* Top Products */}
                <div className={styles.wideCard}>
                    <h3 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-md)' }}>Produtos Mais Vistos</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {[
                            { name: 'Camiseta Básica Branca', views: 234 },
                            { name: 'Calça Jeans Skinny', views: 198 },
                            { name: 'Tênis Esportivo', views: 156 },
                            { name: 'Vestido Floral', views: 143 },
                            { name: 'Jaqueta de Couro', views: 121 },
                        ].map((product, index) => (
                            <div key={index} className={styles.productRow}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)', width: '20px' }}>{index + 1}.</span>
                                    <span style={{ fontWeight: 500 }}>{product.name}</span>
                                </div>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{product.views} visualizações</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Store Status */}
                <div className={styles.wideCard}>
                    <h3 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-md)' }}>Status da Loja</h3>

                    <div className={styles.storeStatusAlert}>
                        <CheckCircle size={20} />
                        Sua loja está PUBLICADA
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className={styles.infoRow}>
                            <MapPin size={20} color="var(--color-text-muted)" />
                            <div>
                                <div className={`${styles.textMuted} ${styles.statLabel}`}>Endereço</div>
                                <div style={{ fontWeight: 500 }}>cubo.com/minhaloja</div>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <Package size={20} color="var(--color-text-muted)" />
                            <div>
                                <div className={`${styles.textMuted} ${styles.statLabel}`}>Produtos</div>
                                <div style={{ fontWeight: 500 }}>12 produtos ativos</div>
                            </div>
                        </div>

                        <div className={styles.checklist}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-success)' }}>
                                <CheckCircle size={16} /> Logo configurado
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-success)' }}>
                                <CheckCircle size={16} /> WhatsApp configurado
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-warning)' }}>
                                <AlertTriangle size={16} /> Banner não configurado
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
