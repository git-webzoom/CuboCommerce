
import React from 'react';
import {
    X,
    User,
    MapPin,
    ExternalLink,
    CheckCircle,
    Printer,
    XCircle
} from 'lucide-react';
import styles from './OrderModal.module.css';
import type { Order } from './OrdersPage';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>Pedido #{order.id}</div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>

                    {/* Timeline */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Status do Pedido</div>

                        {/* Status Change Selector (Mock) */}
                        <div className={styles.statusSelector}>
                            <span style={{ fontSize: '0.875rem' }}>Status Atual: <b>{order.status.replace('_', ' ').toUpperCase()}</b></span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--color-primary)', cursor: 'pointer', marginLeft: 'auto' }}>Alterar status ▾</span>
                        </div>

                        <div className={styles.timeline}>
                            {/* Mock Timeline Items based on status */}
                            <div className={`${styles.timelineItem} ${styles.active}`}>
                                <div className={styles.timelineStatus}>⏳ Aguardando confirmação</div>
                                <div className={styles.timelineDate}>04/01 14:32 (agora)</div>
                            </div>
                            <div className={`${styles.timelineItem} ${styles.active}`}>
                                <div className={styles.timelineStatus}>✅ Pago via {order.payment.method}</div>
                                <div className={styles.timelineDate}>{order.payment.date || '04/01 14:31'}</div>
                            </div>
                            <div className={`${styles.timelineItem} ${styles.active}`}>
                                <div className={styles.timelineStatus}>🛒 Pedido criado</div>
                                <div className={styles.timelineDate}>{order.createdAt}</div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Data */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Dados do Cliente</div>
                        <div className={styles.dataGrid}>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>Nome</div>
                                <div className={styles.dataValue}><User size={12} style={{ display: 'inline', marginRight: 4 }} /> {order.customer.name}</div>
                            </div>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>Contato</div>
                                <div className={styles.dataValue} style={{ fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📱 {order.customer.phone} <a href="#" style={{ color: 'var(--color-primary)' }}>[WhatsApp]</a></div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>📧 {order.customer.email}</div>
                                </div>
                            </div>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>CPF</div>
                                <div className={styles.dataValue}>{order.customer.cpf || 'Não informado'}</div>
                            </div>
                        </div>
                        <div className={styles.dataGroup} style={{ marginTop: '8px' }}>
                            <div className={styles.dataLabel}>Endereço de Entrega</div>
                            <div className={styles.dataValue} style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                                <MapPin size={14} style={{ marginTop: '2px' }} />
                                {order.customer.address || 'Retirada na loja'}
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Produtos</div>
                        <div className={styles.productList}>
                            {order.products.map(product => (
                                <div key={product.id} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        <img src={product.image} alt={product.name} className={styles.productImg} />
                                        <div className={styles.productDetails}>
                                            <div className={styles.productName}>{product.name}</div>
                                            <div className={styles.productVariant}>SKU: {product.sku} • {product.variant}</div>
                                        </div>
                                    </div>
                                    <div className={styles.productPrice}>
                                        {product.quantity}x {formatCurrency(product.price)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.orderTotals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal:</span>
                                <span>{formatCurrency(order.products.reduce((acc, p) => acc + (p.price * p.quantity), 0))}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Frete:</span>
                                <span>{formatCurrency(order.shipping?.cost || 0)}</span>
                            </div>
                            <div className={`${styles.totalRow} ${styles.final}`}>
                                <span>Total:</span>
                                <span>{formatCurrency(order.payment.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Pagamento</div>
                        <div className={styles.dataGrid}>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>Método</div>
                                <div className={styles.dataValue}>{order.payment.method}</div>
                            </div>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>Status</div>
                                <div className={styles.dataValue} style={{ color: order.payment.status === 'paid' ? 'var(--color-success)' : 'inherit' }}>
                                    {order.payment.status.toUpperCase()}
                                </div>
                            </div>
                            <div className={styles.dataGroup}>
                                <div className={styles.dataLabel}>Taxas (Est.)</div>
                                <div className={styles.dataValue} style={{ color: 'var(--color-danger)' }}>- {formatCurrency(order.payment.total * 0.05)}</div>
                            </div>
                        </div>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                            <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ExternalLink size={12} /> Ver no processador de pagamento
                            </a>
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Observações Internas</div>
                        <div style={{ background: 'var(--color-bg-body)', padding: 'var(--spacing-sm)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', minHeight: '60px', color: 'var(--color-text-muted)' }}>
                            {order.internalNotes?.map((note, idx) => (
                                <div key={idx}>• {note}</div>
                            )) || 'Nenhuma observação.'}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className={styles.footer}>
                    <button className={styles.btnAction} onClick={onClose}>
                        <Printer size={16} /> Imprimir
                    </button>
                    <button className={styles.btnAction} style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
                        <XCircle size={16} /> Cancelar Pedido
                    </button>
                    <button className={styles.btnAction} onClick={onClose} style={{ marginLeft: 'auto' }}>
                        Fechar
                    </button>
                    <button className={`${styles.btnAction} ${styles.btnPrimary}`} onClick={() => alert('Confirmar Pedido')}>
                        <CheckCircle size={16} /> Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};
