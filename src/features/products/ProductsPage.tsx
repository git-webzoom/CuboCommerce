import React, { useState } from 'react';
import {
    Search,
    Plus,
    Filter,
    Download,
    Upload,
    Trash2,
    MoreVertical,
    Eye,
    ShoppingCart,
    Package,
    CheckCircle,
    XCircle,
    Star,
    AlertTriangle
} from 'lucide-react';
import styles from './ProductsPage.module.css';
import { ProductModal } from './ProductModal';
import { Pagination } from '../../components/ui/Pagination';

interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number | 'inf';
    status: 'active' | 'warning' | 'inactive';
    isHighlight?: boolean;
    views: number;
    sales: number;
    image: string;
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Camiseta Branca',
        sku: 'CAM-001',
        category: 'Camisetas',
        price: 59.90,
        stock: 'inf',
        status: 'active',
        views: 234,
        sales: 12,
        image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG' // Placeholder
    },
    {
        id: '2',
        name: 'Calça Jeans Azul',
        sku: 'CAL-002',
        category: 'Calças',
        price: 129.00,
        stock: 8,
        status: 'active',
        views: 156,
        sales: 8,
        image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
    },
    {
        id: '3',
        name: 'Tênis Esportivo',
        sku: 'TEN-003',
        category: 'Calçados',
        price: 299.00,
        stock: 3,
        status: 'warning',
        views: 98,
        sales: 5,
        image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
    },
    {
        id: '4',
        name: 'Vestido Floral',
        sku: 'VES-004',
        category: 'Vestidos',
        price: 89.90,
        stock: 'inf',
        status: 'inactive',
        views: 67,
        sales: 2,
        image: 'https://placehold.co/48x48/e2e8f0/1e293b?text=IMG'
    }
];

export const ProductsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Todos');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const mockTotalPages = 5;

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
    };

    const getStatusBadge = (status: Product['status']) => {
        switch (status) {
            case 'active': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>🟢 Ativo</span>;
            case 'warning': return <span className={`${styles.badge} ${styles.badgeWarning}`}>🟡 Baixo Estoque</span>;
            case 'inactive': return <span className={`${styles.badge} ${styles.badgeDanger}`}>🔴 Inativo</span>;
            default: return null;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <ProductModal
                isOpen={isProductModalOpen}
                onClose={() => setIsProductModalOpen(false)}
            />

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    Produtos <span style={{ color: 'var(--color-text-muted)', fontSize: '1rem', fontWeight: 'normal' }}>(24)</span>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchContainer}>
                        <Search size={18} className={styles.searchIcon} />
                        <input type="text" placeholder="Buscar produto..." className={styles.searchInput} />
                    </div>
                    <button
                        className={styles.mobileFilterBtn}
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        style={{
                            display: 'none', /* Hidden on desktop via CSS, but we'll inline styles loop for now or add to module */
                            padding: '0.5rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            background: showMobileFilters ? 'var(--color-primary-light)' : 'var(--color-bg-card)',
                            color: showMobileFilters ? 'white' : 'var(--color-text-main)',
                            cursor: 'pointer'
                        }}
                    >
                        <Filter size={20} />
                    </button>
                    <button className={styles.btnPrimary} onClick={() => setIsProductModalOpen(true)}>
                        <Plus size={18} /> <span className={styles.btnText}>Novo Produto</span>
                    </button>
                </div>
            </div>

            {/* Filters & Actions */}
            <div className={`${styles.filterSection} ${showMobileFilters ? styles.showMobile : ''}`}>
                <div className={styles.filterRow}>
                    <div className={styles.filterGroup}>
                        <label>Categoria:</label>
                        <select className={styles.selectInput}>
                            <option>Todas</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Status:</label>
                        <select className={styles.selectInput}>
                            <option>Todos</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label>Ordenar:</label>
                        <select className={styles.selectInput}>
                            <option>Mais recentes</option>
                        </select>
                    </div>
                </div>

                <div className={styles.filterRow}>
                    <div className={styles.tagGroup}>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500, marginRight: '8px' }}>Tags:</span>

                        {/* Desktop: Buttons */}
                        <div className={styles.desktopTags}>
                            {['Todos', 'Promoção', 'Novidade', 'Destaque', 'Esgotado'].map(tag => (
                                <button
                                    key={tag}
                                    className={`${styles.tag} ${activeTab === tag ? styles.active : ''}`}
                                    onClick={() => setActiveTab(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Mobile: Dropdown */}
                        <select
                            className={`${styles.selectInput} ${styles.mobileTagSelect}`}
                            value={activeTab}
                            onChange={(e) => setActiveTab(e.target.value)}
                        >
                            {['Todos', 'Promoção', 'Novidade', 'Destaque', 'Esgotado'].map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.filterRow} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <div className={styles.actionsGroup}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', cursor: 'pointer' }}>
                            <input type="checkbox" /> Selecionar todos
                        </label>
                        <button className={styles.btnSecondary}><Upload size={16} /> Exportar</button>
                        <button className={styles.btnSecondary}><Download size={16} /> Importar CSV</button>
                        <button className={styles.btnSecondary} style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
                            <Trash2 size={16} /> Excluir selecionados
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><Package size={16} className="text-muted" /> Total</div>
                    <div className={styles.statValue}>24</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><CheckCircle size={16} style={{ color: 'var(--color-success)' }} /> Ativos</div>
                    <div className={styles.statValue}>20</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><XCircle size={16} style={{ color: 'var(--color-danger)' }} /> Inativos</div>
                    <div className={styles.statValue}>4</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statTitle}><Star size={16} style={{ color: 'var(--color-warning)' }} /> Destaque</div>
                    <div className={styles.statValue}>6</div>
                </div>
            </div>

            {/* Product Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.th} style={{ width: '40px' }}><input type="checkbox" /></th>
                            <th className={styles.th}>Produto</th>
                            <th className={styles.th}>Categoria</th>
                            <th className={styles.th}>Preço</th>
                            <th className={styles.th}>Estoque</th>
                            <th className={styles.th}>Status</th>
                            <th className={styles.th} style={{ width: '50px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map((product) => (
                            <tr key={product.id}>
                                <td className={styles.td}><input type="checkbox" /></td>
                                <td className={styles.td}>
                                    <div className={styles.productCell}>
                                        <img src={product.image} alt={product.name} className={styles.productImg} />
                                        <div className={styles.productInfo}>
                                            <div className={styles.productName}>{product.name}</div>
                                            <div className={styles.productSku}>SKU: {product.sku}</div>
                                            <div className={styles.productStats}>
                                                <Eye size={12} style={{ display: 'inline', marginRight: 2 }} /> {product.views} •
                                                <ShoppingCart size={12} style={{ display: 'inline', margin: '0 2px 0 6px' }} /> {product.sales}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className={styles.td}>{product.category}</td>
                                <td className={styles.td}>
                                    <div style={{ fontWeight: 500 }}>{formatCurrency(product.price)}</div>
                                </td>
                                <td className={styles.td}>
                                    {product.stock === 'inf' ? (
                                        <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>∞</span>
                                    ) : (
                                        <div>
                                            {product.stock} un.
                                            {product.stock < 5 && (
                                                <div style={{ color: 'var(--color-danger)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                    <AlertTriangle size={10} /> Baixo
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className={styles.td}>
                                    {getStatusBadge(product.status)}
                                </td>
                                <td className={styles.td}>
                                    <button className={styles.btnSecondary} style={{ padding: '4px', border: 'none' }}>
                                        <MoreVertical size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {/* Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={mockTotalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};
