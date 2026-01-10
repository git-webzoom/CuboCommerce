
import React, { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    Package,
    CheckCircle,
    XCircle,
    Clock,
    Truck,
    CreditCard,
    MoreVertical,
    MessageCircle,
    Share2
} from 'lucide-react';
import styles from './OrdersPage.module.css';
import { OrderModal } from './OrderModal';
import { Pagination } from '../../components/ui/Pagination';

// Types
export interface OrderProduct {
    id: string;
    name: string;
    variant: string;
    sku: string;
    quantity: number;
    price: number;
    image: string;
}

export interface Order {
    id: string;
    customer: {
        name: string;
        email: string;
        phone: string;
        cpf?: string;
        address?: string;
    };
    status: 'pending' | 'awaiting_payment' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
    payment: {
        method: 'Pix' | 'Credit Card' | 'Boleto';
        status: 'paid' | 'pending' | 'failed' | 'refunded';
        total: number;
        date?: string;
    };
    createdAt: string;
    products: OrderProduct[];
    shipping?: {
        method: string;
        trackingCode?: string;
        cost: number;
    };
    internalNotes?: string[];
}

// Mock Data
const mockOrders: Order[] = [
    {
        id: '001245',
        customer: {
            name: 'Maria Silva',
            email: 'maria@email.com',
            phone: '+55 83 99999-9999',
            cpf: '123.456.789-00',
            address: 'Rua Exemplo, 123, Centro, João Pessoa - PB'
        },
        status: 'pending',
        payment: {
            method: 'Pix',
            status: 'paid',
            total: 89.90,
            date: 'Hoje às 14:33'
        },
        createdAt: 'Hoje às 14:32',
        products: [
            {
                id: '1',
                name: 'Camiseta Branca',
                variant: 'Vermelho / M',
                sku: 'CAM-VM-M',
                quantity: 1,
                price: 59.90,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            },
            {
                id: '2',
                name: 'Boné Preto',
                variant: 'Único',
                sku: 'BON-PT',
                quantity: 1,
                price: 30.00,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            }
        ],
        shipping: {
            method: 'PAC',
            cost: 0
        }
    },
    {
        id: '001244',
        customer: {
            name: 'João Santos',
            email: 'joao@email.com',
            phone: '+55 83 98888-8888',
            address: 'Av. Principal, 456, Bancários, João Pessoa - PB'
        },
        status: 'preparing',
        payment: {
            method: 'Credit Card',
            status: 'paid',
            total: 129.00,
            date: 'Ontem às 16:21'
        },
        createdAt: 'Ontem às 16:20',
        products: [
            {
                id: '3',
                name: 'Calça Jeans',
                variant: 'Azul / 42',
                sku: 'CAL-AZ-42',
                quantity: 1,
                price: 129.00,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            }
        ],
        shipping: {
            method: 'Sedex',
            cost: 15.00
        }
    },
    {
        id: '001243',
        customer: {
            name: 'Ana Oliveira',
            email: 'ana@email.com',
            phone: '+55 83 97777-7777'
        },
        status: 'awaiting_payment',
        payment: {
            method: 'Pix',
            status: 'pending',
            total: 199.00
        },
        createdAt: '02/01 às 10:15',
        products: [
            {
                id: '4',
                name: 'Vestido Floral',
                variant: 'Verde / M',
                sku: 'VES-VE-M',
                quantity: 1,
                price: 89.90,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            },
            {
                id: '5',
                name: 'Sandália',
                variant: 'Nude / 37',
                sku: 'SAN-NU-37',
                quantity: 1,
                price: 109.10,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            }
        ]
    },
    {
        id: '001242',
        customer: {
            name: 'Carlos Souza',
            email: 'carlos@email.com',
            phone: '+55 83 96666-6666'
        },
        status: 'cancelled',
        payment: {
            method: 'Credit Card',
            status: 'failed',
            total: 45.00
        },
        createdAt: '01/01 às 08:45',
        products: [
            {
                id: '2',
                name: 'Boné',
                variant: 'Preto / Único',
                sku: 'BON-PT',
                quantity: 1,
                price: 45.00,
                image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
            }
        ],
        internalNotes: ['Cartão recusado por falta de saldo']
    }
];

export const OrdersPage: React.FC = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const mockTotalPages = 5;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const getStatusConfig = (status: Order['status']) => {
        switch (status) {
            case 'pending': return { label: 'Aguardando confirmação', class: styles.badgeWarning, icon: <Clock size={14} /> };
            case 'awaiting_payment': return { label: 'Aguardando pagamento', class: styles.badgeWarning, icon: <Clock size={14} /> };
            case 'confirmed': return { label: 'Confirmado', class: styles.badgeSuccess, icon: <CheckCircle size={14} /> };
            case 'preparing': return { label: 'Preparando envio', class: styles.badgeInfo, icon: <Package size={14} /> };
            case 'shipped': return { label: 'Enviado', class: styles.badgeInfo, icon: <Truck size={14} /> };
            case 'delivered': return { label: 'Entregue', class: styles.badgeSuccess, icon: <CheckCircle size={14} /> };
            case 'cancelled': return { label: 'Cancelado', class: styles.badgeDanger, icon: <XCircle size={14} /> };
            default: return { label: status, class: styles.badge, icon: null };
        }
    };

    const getPaymentStatusConfig = (status: Order['payment']['status']) => {
        switch (status) {
            case 'paid': return { label: 'Pago', class: styles.badgeSuccess, icon: <CheckCircle size={12} /> };
            case 'pending': return { label: 'Pendente', class: styles.badgeWarning, icon: <Clock size={12} /> };
            case 'failed': return { label: 'Falhou', class: styles.badgeDanger, icon: <XCircle size={12} /> };
            case 'refunded': return { label: 'Reembolsado', class: styles.badgeInfo, icon: <Share2 size={12} /> };
            default: return { label: status, class: styles.badge, icon: null };
        }
    };

    return (
        <div className={styles.pageContainer}>
            {selectedOrder && (
                <OrderModal
                    isOpen={!!selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    order={selectedOrder}
                />
            )}

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    Pedidos <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 'normal' }}>({mockOrders.length})</span>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchContainer}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Buscar por cliente, #pedido..." className={styles.searchInput} />
                    </div>
                    <button
                        className={`${styles.btnSecondary} ${styles.mobileFilterBtn} ${showMobileFilters ? styles.active : ''}`}
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <Filter size={20} />
                    </button>
                    <button className={styles.btnSecondary} onClick={() => alert('Notificar Clientes')}>
                        <MessageCircle size={18} /> <span className={styles.hideMobile}>Notificar</span>
                    </button>
                    <button className={styles.btnSecondary} onClick={() => alert('Exportar')}>
                        <Download size={18} /> <span className={styles.hideMobile}>Exportar</span>
                    </button>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className={`${styles.filterSection} ${showMobileFilters ? styles.showMobile : ''}`}>
                <div className={styles.filterRow}>
                    <div className={styles.filterGroup}>
                        <label>Status:</label>
                        <select className={styles.selectInput}>
                            <option>Todos</option>
                            <option>Pendentes</option>
                            <option>Confirmados</option>
                            <option>Enviados</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Pagamento:</label>
                        <select className={styles.selectInput}>
                            <option>Todos</option>
                            <option>Pago</option>
                            <option>Pendente</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Período:</label>
                        <select className={styles.selectInput}>
                            <option>Últimos 30 dias</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><Package size={16} /> Total</div>
                    <div className={styles.statValue}>156</div>
                    <div className={styles.statSubtext}>Este mês</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><Clock size={16} style={{ color: 'var(--color-warning)' }} /> Pendentes</div>
                    <div className={styles.statValue}>12</div>
                    <div className={styles.statSubtext}>Ação nec.</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><CheckCircle size={16} style={{ color: 'var(--color-success)' }} /> Confirmados</div>
                    <div className={styles.statValue}>89</div>
                    <div className={styles.statSubtext}>57%</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><Truck size={16} style={{ color: 'var(--color-primary)' }} /> Enviados</div>
                    <div className={styles.statValue}>45</div>
                    <div className={styles.statSubtext}>29%</div>
                </div>
            </div>

            {/* Order Table (Desktop) */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th}>ID</th>
                            <th className={styles.th}>Cliente</th>
                            <th className={styles.th}>Data</th>
                            <th className={styles.th}>Total</th>
                            <th className={styles.th}>Pagamento</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map(order => {
                            const status = getStatusConfig(order.status);
                            const paymentStatus = getPaymentStatusConfig(order.payment.status);

                            return (
                                <tr key={order.id}>
                                    <td className={styles.td}>
                                        <span className={styles.orderId}>#{order.id}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <div style={{ fontWeight: 500 }}>{order.customer.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.customer.email}</div>
                                    </td>
                                    <td className={styles.td}>
                                        {order.createdAt}
                                    </td>
                                    <td className={styles.td} style={{ fontWeight: 700 }}>
                                        {formatCurrency(order.payment.total)}
                                    </td>
                                    <td className={styles.td}>
                                        <div>{order.payment.method}</div>
                                        <span className={`${styles.badge} ${paymentStatus.class}`}>{paymentStatus.label}</span>
                                    </td>
                                    <td className={styles.td}>
                                        <span className={`${styles.badge} ${status.class}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            {status.icon} {status.label}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <button className={styles.btnSecondary} onClick={() => setSelectedOrder(order)} style={{ padding: '4px 8px' }}>
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Order Cards List (Mobile) */}
            <div className={styles.ordersList}>
                {mockOrders.map(order => {
                    const status = getStatusConfig(order.status);
                    const paymentStatus = getPaymentStatusConfig(order.payment.status);

                    return (
                        <div key={order.id} className={styles.orderCard}>
                            <div className={styles.orderHeader}>
                                <div>
                                    <span className={styles.orderId}>#{order.id}</span>
                                    <span style={{ fontWeight: 500 }}>{order.customer.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span className={styles.orderTime}>{order.createdAt}</span>
                                    <button className={styles.btnSecondary} style={{ padding: '2px', height: '24px', width: '24px', minWidth: 'unset', border: 'none' }}>
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className={styles.orderBody}>
                                {/* Column 1: Payment & Status */}
                                <div className={styles.orderSection}>
                                    <div className={styles.orderInfoRow}>
                                        <CreditCard size={16} className="text-muted" />
                                        <span>{order.payment.method} • <b>{formatCurrency(order.payment.total)}</b> • <span className={`${styles.badge} ${paymentStatus.class}`}>{paymentStatus.label}</span></span>
                                    </div>
                                    <div className={styles.orderInfoRow}>
                                        <Package size={16} className="text-muted" />
                                        <span>Status: <span className={`${styles.badge} ${status.class}`}>{status.label}</span></span>
                                    </div>
                                    {order.status === 'awaiting_payment' && (
                                        <div className={styles.orderInfoRow} style={{ color: 'var(--color-danger)' }}>
                                            <Clock size={16} />
                                            <span>Expira em: 23 minutos</span>
                                        </div>
                                    )}
                                </div>

                                {/* Column 2: Products */}
                                <div className={styles.orderSection}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>Produtos:</div>
                                    <ul className={styles.productsList}>
                                        {order.products.map(prod => (
                                            <li key={prod.id} className={styles.productItem}>
                                                <img src={prod.image} alt={prod.name} className={styles.productThumb} />
                                                <span>{prod.name} <span className="text-muted">({prod.variant})</span> — {prod.quantity}x <b>{formatCurrency(prod.price)}</b></span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 3: Customer Contact & Actions */}
                                <div className={styles.orderSection} style={{ alignItems: 'flex-start' }}>
                                    <div className={styles.customerContact}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📱 {order.customer.phone}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📧 {order.customer.email}</div>
                                    </div>
                                    {order.shipping?.trackingCode && (
                                        <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
                                            🚚 Rastreio: <b>{order.shipping.trackingCode}</b>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.cardActions}>
                                <button className={styles.btnSecondary} onClick={() => alert('WhatsApp')}>
                                    <MessageCircle size={16} /> <span className={styles.hideMobile}>WhatsApp</span>
                                </button>
                                {order.status === 'pending' && (
                                    <button className={styles.btnPrimary} style={{ backgroundColor: 'var(--color-success)' }}>
                                        <CheckCircle size={16} /> Confirmar
                                    </button>
                                )}
                                {order.status === 'preparing' && (
                                    <button className={styles.btnSecondary}>
                                        <Truck size={16} /> Adicionar Rastreio
                                    </button>
                                )}
                                <button className={styles.btnSecondary} onClick={() => setSelectedOrder(order)}>
                                    <Eye size={16} /> <span className={styles.hideMobile}>Ver Detalhes</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={mockTotalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};
