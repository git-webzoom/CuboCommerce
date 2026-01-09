import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Store,
    Package,
    ShoppingCart,
    Users,
    BarChart2,
    Settings,
    Palette,
    LogOut,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

const MENU_ITEMS = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/' },
    { icon: Package, label: 'Produtos', path: '/products' },
    { icon: ShoppingCart, label: 'Pedidos', path: '/orders' },
    { icon: Users, label: 'Leads', path: '/leads' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Configurações', path: '/settings' },
    { icon: Store, label: 'Minha Loja', path: '/store' },
    { icon: Palette, label: 'Aparência', path: '/appearance' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            {/* Sidebar Container */}
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isCollapsed ? styles.collapsed : ''}`}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <Store size={24} color="var(--color-accent)" />
                        </div>
                        {!isCollapsed && <span className={styles.logoText}>CuboCommerce</span>}
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <button className={styles.collapseBtn} onClick={onToggleCollapse}>
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <nav className={styles.nav}>
                    {MENU_ITEMS.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.active : ''}`
                            }
                            onClick={() => window.innerWidth < 768 && onClose()}
                            title={isCollapsed ? item.label : ''}
                        >
                            <item.icon size={20} />
                            {!isCollapsed && <span>{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.footer}>
                    <button className={styles.logoutBtn}>
                        <LogOut size={20} />
                        {!isCollapsed && <span>Sair</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};
