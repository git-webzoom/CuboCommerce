import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, CheckCircle, MapPin, Package, AlertTriangle, Loader2 } from 'lucide-react';
import styles from './DashboardHome.module.css';
import { dashboardService } from '../../services/dashboardService';

export const DashboardHome: React.FC = () => {
    const [dateRange, setDateRange] = useState('30d');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        averageTicket: 0,
        conversionRate: '0%',
        totalProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [topProducts, setTopProducts] = useState<any[]>([]);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                // Parallel fetch
                const [statsData, ordersData, productsData] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getRecentOrders(),
                    dashboardService.getTopProducts()
                ]);

                if (statsData) setStats(statsData);
                if (ordersData) setRecentOrders(ordersData);
                if (productsData) setTopProducts(productsData);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [dateRange]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '400px', color: 'var(--color-text-muted)' }}>
                <Loader2 size={32} className="animate-spin" />
            </div>
        );
    }

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
                    <div className={styles.statValue} style={{ color: 'var(--color-text-brand)' }}>{formatCurrency(stats.totalSales)}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Pedidos</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-info)' }}>{stats.totalOrders}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Ticket Médio</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-warning)' }}>{formatCurrency(stats.averageTicket)}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statLabel}>Produtos Ativos</div>
                    <div className={styles.statValue} style={{ color: 'var(--color-success)' }}>{stats.totalProducts}</div>
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
                        {recentOrders.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                Nenhum pedido recente
                            </div>
                        ) : (
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
                                            <td className={styles.td}>#{order.id.toString().slice(0, 8)}</td>
                                            <td className={styles.td} style={{ fontWeight: 500 }}>
                                                {order.customer?.name || order.customer_name || 'Cliente'}
                                            </td>
                                            <td className={styles.td}>{formatCurrency(order.total || order.amount || 0)}</td>
                                            <td className={styles.td}>
                                                <span className={`badge ${order.status === 'confirmed' || order.status === 'paid' ? 'badge-success' :
                                                        order.status === 'pending' ? 'badge-warning' : 'badge-info'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className={styles.td} style={{ color: 'var(--color-text-muted)' }}>
                                                {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
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
                    <h3 className={styles.cardTitle} style={{ marginBottom: 'var(--spacing-md)' }}>Produtos em Destaque</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {topProducts.map((product, index) => (
                            <div key={index} className={styles.productRow}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--color-text-muted)', width: '20px' }}>{index + 1}.</span>
                                    <span style={{ fontWeight: 500 }}>{product.name}</span>
                                </div>
                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Visualizar</span>
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
                                <div style={{ fontWeight: 500 }}>{stats.totalProducts} produtos ativos</div>
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
