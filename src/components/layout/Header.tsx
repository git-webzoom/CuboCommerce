import React from 'react';
import { Menu, Bell, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Header.module.css';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <button className={styles.menuBtn} onClick={onMenuClick}>
                    <Menu size={24} />
                </button>
                <h1 className={styles.title}>Dashboard</h1>
            </div>

            <div className={styles.right}>
                <button className={styles.iconBtn} onClick={toggleTheme} title="Alternar Tema">
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button className={styles.iconBtn}>
                    <Bell size={20} />
                    <span className={styles.badge} />
                </button>

                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                    <span className={styles.username}>Admin User</span>
                </div>
            </div>
        </header>
    );
};
