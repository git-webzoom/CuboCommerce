
import React from 'react';
import {
    Users, Eye, Clock, ShoppingCart, MessageCircle, DollarSign,
    ArrowUp, ArrowDown, ExternalLink, Search, Filter, Smartphone,
    Monitor, Tablet, Calendar, Download, TrendingUp, AlertCircle
} from 'lucide-react';
import styles from './AnalyticsPage.module.css';

// Mock Data
const metrics = {
    visitors: { value: '2.456', change: '+15%', trend: 'up' },
    unique: { value: '1.823', change: '+12%', trend: 'up' },
    pageviews: { value: '8.234', change: '+18%', trend: 'up' },
    avgTime: { value: '3min 45s', change: '-5%', trend: 'down' },
    addCart: { value: '345', change: '+23%', trend: 'up' },
    whatsapp: { value: '156', change: '+8%', trend: 'up' },
    convRate: { value: '6.4%', change: '+1.2pp', trend: 'up' },
    avgOrder: { value: 'R$ 125,50', change: '+12%', trend: 'up' },
};

const topProducts = [
    { name: 'Camiseta Branca', variant: 'Vermelho/Azul/Preto', views: 456, clicks: 234, add: 89, conv: '19.5%', revenue: 'R$ 5.3k' },
    { name: 'Calça Jeans', variant: 'Azul/Preta', views: 398, clicks: 189, add: 67, conv: '16.8%', revenue: 'R$ 8.6k' },
    { name: 'Tênis Esportivo', variant: 'Preto/Branco', views: 356, clicks: 167, add: 45, conv: '12.6%', revenue: 'R$ 13k' },
    { name: 'Vestido Floral', variant: 'Verde/Azul/Rosa', views: 289, clicks: 145, add: 38, conv: '13.1%', revenue: 'R$ 3.4k' },
    { name: 'Boné', variant: 'Preto/Branco', views: 234, clicks: 98, add: 23, conv: '9.8%', revenue: 'R$ 690' },
];

const trafficSources = [
    { name: 'Instagram', visits: '1.234', percent: 50.2, conversions: 89, convRate: '7.2%' },
    { name: 'Direto', visits: '589', percent: 24.0, conversions: 45, convRate: '7.6%' },
    { name: 'Google', visits: '356', percent: 14.5, conversions: 12, convRate: '3.4%' },
    { name: 'Facebook', visits: '178', percent: 7.2, conversions: 7, convRate: '3.9%' },
    { name: 'TikTok', visits: '99', percent: 4.0, conversions: 3, convRate: '3.0%' },
];

const daysOfWeek = [
    { day: 'Domingo', visits: 234, percent: 9.5 },
    { day: 'Segunda', visits: 156, percent: 6.4 },
    { day: 'Terça', visits: 198, percent: 8.1 },
    { day: 'Quarta', visits: 289, percent: 11.8 },
    { day: 'Quinta', visits: 356, percent: 14.5 },
    { day: 'Sexta', visits: 489, percent: 19.9 },
    { day: 'Sábado', visits: 456, percent: 18.6 },
];

const peakHours = [
    { label: '0-6', value: 5 },
    { label: '6-9', value: 15 },
    { label: '9-12', value: 35 },
    { label: '12-15', value: 45 },
    { label: '15-18', value: 60 },
    { label: '18-21', value: 100 },
    { label: '21-24', value: 80 },
];

const searchTerms = [
    { term: 'camiseta', count: 89, results: 45, ctr: '67.4%' },
    { term: 'vestido', count: 67, results: 23, ctr: '58.2%' },
    { term: 'tênis', count: 45, results: 12, ctr: '71.1%' },
    { term: 'calça jeans', count: 34, results: 18, ctr: '52.9%' },
    { term: 'promoção', count: 28, results: 67, ctr: '42.8%' },
];

export const AnalyticsPage: React.FC = () => {
    const [showFilters, setShowFilters] = React.useState(false);

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Analytics</h1>
                <div className={styles.headerActions}>
                    <button
                        className={`${styles.btnSecondary} ${styles.filterToggleBtn} ${showFilters ? styles.active : ''}`}
                        title="Filtros"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={16} />
                    </button>
                    <button className={styles.btnSecondary}>
                        <Calendar size={16} /> Últimos 30 dias
                    </button>
                    <button className={styles.btnPrimary}>
                        <Download size={16} /> Exportar
                    </button>
                </div>
            </div>

            {/* Expandable Filters Section */}
            <div className={`${styles.filterSection} ${showFilters ? styles.showFilters : ''}`}>
                <div className={styles.filterGroup}>
                    <label>Canal de Origem:</label>
                    <select className={styles.selectInput}>
                        <option>Todos</option>
                        <option>Instagram</option>
                        <option>Google</option>
                        <option>Direto</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Dispositivo:</label>
                    <select className={styles.selectInput}>
                        <option>Todos</option>
                        <option>Mobile</option>
                        <option>Desktop</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Comparar com:</label>
                    <select className={styles.selectInput}>
                        <option>Período Anterior</option>
                        <option>Ano Anterior</option>
                        <option>Nenhum</option>
                    </select>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className={styles.metricsGrid}>
                {/* Row 1 */}
                <MetricCard title="Visitas" icon={Eye} data={metrics.visitors} />
                <MetricCard title="Visitantes Únicos" icon={Users} data={metrics.unique} />
                <MetricCard title="Pageviews" icon={ExternalLink} data={metrics.pageviews} />
                <MetricCard title="Tempo Médio" icon={Clock} data={metrics.avgTime} />

                {/* Row 2 */}
                <MetricCard title="Add to Cart" icon={ShoppingCart} data={metrics.addCart} />
                <MetricCard title="WhatsApp Clicks" icon={MessageCircle} data={metrics.whatsapp} />
                <MetricCard title="Taxa Conv." icon={TrendingUp} data={metrics.convRate} />
                <MetricCard title="Valor Méd. Pedido" icon={DollarSign} data={metrics.avgOrder} />
            </div>

            {/* Main Graph Placeholder */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Gráfico de Visitas e Conversões (Últimos 30 dias)</h2>
                <div className={styles.mainChart}>
                    {/* Simplified SVG Chart Visualization */}
                    <svg viewBox="0 0 1000 250" className={styles.chartSvg}>
                        {/* Grid Lines */}
                        <line x1="0" y1="200" x2="1000" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="150" x2="1000" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="100" x2="1000" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="50" x2="1000" y2="50" stroke="#e5e7eb" strokeWidth="1" />

                        {/* Visits Line (Blue) */}
                        <polyline
                            points="0,200 100,180 200,150 300,160 400,120 500,90 600,110 700,80 800,60 900,40 1000,50"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                        />
                        {/* Conversions Line (Green) */}
                        <polyline
                            points="0,200 100,195 200,190 300,185 400,180 500,170 600,175 700,165 800,160 900,155 1000,150"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                        />

                        {/* Dots for visual appeal (sample) */}
                        <circle cx="500" cy="90" r="4" fill="#3b82f6" />
                        <circle cx="500" cy="170" r="4" fill="#10b981" />
                    </svg>
                    <div className={styles.chartLegend}>
                        <div className={styles.legendItem}><span className={styles.dot} style={{ background: '#3b82f6' }}></span> Visitas</div>
                        <div className={styles.legendItem}><span className={styles.dot} style={{ background: '#10b981' }}></span> Conversões</div>
                    </div>
                </div>
            </div>

            {/* Funnel & Traffic Grid */}
            <div className={styles.dualGrid}>
                {/* Funnel */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Funil de Conversão</h3>
                    <div className={styles.funnelContainer}>
                        <FunnelRow label="Visitantes" value="2.456" percent={100} drop="74%" highlight />
                        <FunnelRow label="Produtos Vistos" value="1.823" percent={74} drop="19%" />
                        <FunnelRow label="Adicionou Carrinho" value="345" percent={14} drop="45%" />
                        <FunnelRow label="Clicou WhatsApp" value="156" percent={6} drop="100%" />
                        <FunnelRow label="Pedidos Criados" value="156" percent={6} drop="91%" />
                        <FunnelRow label="Pedidos Pagos" value="142" percent={6} last />
                    </div>
                    <div className={styles.funnelFooter}>
                        <div>Taxa de conversão final: <strong>5.8%</strong></div>
                        <div style={{ color: 'var(--color-danger)' }}>Taxa de abandono: <strong>55%</strong></div>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Origem do Tráfego</h3>
                    <div className={styles.listContainer}>
                        {trafficSources.map((source, i) => (
                            <div key={i} className={styles.listItem}>
                                <div className={styles.listHeader}>
                                    <span className={styles.sourceName}>{source.name}</span>
                                    <span className={styles.sourceStats}>{source.visits} visitas ({source.percent}%)</span>
                                </div>
                                <div className={styles.progressBarBg}>
                                    <div className={styles.progressBarFill} style={{ width: `${source.percent}%`, backgroundColor: i === 0 ? 'var(--color-primary)' : 'var(--color-text-muted)' }}></div>
                                </div>
                                <div className={styles.listSubStats}>
                                    → {source.conversions} conversões ({source.convRate})
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Produtos Mais Vistos</h2>
                    <button className={styles.linkBtn}>Ver todos produtos →</button>
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th className="text-right">Views</th>
                                <th className="text-right">Clicks</th>
                                <th className="text-right">Add Cart</th>
                                <th className="text-right">Taxa Conv</th>
                                <th className="text-right">Receita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.map((p, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className={styles.productCell}>
                                            <div className={styles.productImgPlaceholder}>IMG</div>
                                            <div>
                                                <div className={styles.productName}>{p.name}</div>
                                                <div className={styles.productVariant}>{p.variant}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right">{p.views}</td>
                                    <td className="text-right">{p.clicks}</td>
                                    <td className="text-right">{p.add}</td>
                                    <td className="text-right">{p.conv}</td>
                                    <td className="text-right">{p.revenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Devices & Time Grid */}
            <div className={styles.triGrid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Dispositivos</h3>
                    <div className={styles.devicesContainer}>
                        <DeviceItem icon={Smartphone} label="Mobile" value="1.845" percent="75.1%" />
                        <DeviceItem icon={Monitor} label="Desktop" value="489" percent="19.9%" />
                        <DeviceItem icon={Tablet} label="Tablet" value="122" percent="5.0%" />
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Horários de Pico</h3>
                    <div className={styles.chartPeaks}>
                        {peakHours.map((peak, i) => (
                            <div key={i} className={styles.peakBarContainer}>
                                <div className={styles.peakBar} style={{ height: `${peak.value}%` }}></div>
                                <span className={styles.peakLabel}>{peak.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.insightText}>
                        <small>Pico: 20h - 22h. Melhor postar: 19h</small>
                    </div>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Dias da Semana</h3>
                    <div className={styles.daysContainer}>
                        {daysOfWeek.map((d, i) => (
                            <div key={i} className={styles.dayRow}>
                                <span className={styles.dayLabel}>{d.day}</span>
                                <div className={styles.dayBarBg}>
                                    <div className={styles.dayBarFill} style={{ width: `${d.percent * 3}%` }}></div>
                                </div>
                                <span className={styles.dayValue}>{d.visits}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className={styles.dualGrid}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}><Search size={16} style={{ display: 'inline', marginRight: 8 }} /> Termos Buscados</h3>
                    <table className={styles.miniTable}>
                        <thead>
                            <tr>
                                <th>Termo</th>
                                <th>Vezes</th>
                                <th>Resultados</th>
                                <th>CTR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerms.map((t, i) => (
                                <tr key={i}>
                                    <td>{t.term}</td>
                                    <td>{t.count}</td>
                                    <td>{t.results}</td>
                                    <td>{t.ctr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Eventos Personalizados</h3>
                    <div className={styles.eventsList}>
                        <EventRow label="Page View" value="8.234" percent="100%" />
                        <EventRow label="Product View" value="1.823" percent="22.1%" />
                        <EventRow label="Search" value="263" percent="3.2%" />
                        <EventRow label="Add to Cart" value="345" percent="4.2%" />
                        <EventRow label="WhatsApp Click" value="156" percent="1.9%" />
                    </div>
                </div>
            </div>

            {/* Insights */}
            <div className={styles.successSection}>
                <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Insights e Recomendações 💡</h2>
                <div className={styles.insightsGrid}>
                    <InsightCard title="Seu melhor dia" value="Sexta-feira às 20h" desc="Programe posts no Instagram nesse horário" type="success" />
                    <InsightCard icon={AlertCircle} title="Abandono de Carrinho" value="55% (Alto)" desc="Considere enviar lembretes ou cupons" type="warning" />
                    <InsightCard title="Produto em Alta" value="Camiseta Branca" desc="19.5% de conversão. Faça um bundle!" type="info" />
                    <InsightCard title="Tráfego Mobile" value="75%" desc="Otimize a experiência mobile" type="info" />
                </div>
            </div>
        </div>
    );
};

// Sub-components
const MetricCard = ({ title, icon: Icon, data }: any) => {
    const isPositive = data.trend === 'up';
    return (
        <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
                <span className={styles.metricTitle}>{title}</span>
                <Icon size={16} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>{data.value}</div>
            <div className={`${styles.metricChange} ${isPositive ? styles.up : styles.down}`}>
                {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {data.change}
            </div>
        </div>
    );
};

const FunnelRow = ({ label, value, percent, drop, highlight, last }: any) => (
    <div className={styles.funnelRow}>
        <div className={styles.funnelHeader}>
            <span>{label}</span>
            <span className={styles.funnelStats}>{value} ({percent}%)</span>
        </div>
        <div className={styles.funnelBarContainer}>
            <div className={styles.funnelBar} style={{ width: `${percent}%`, backgroundColor: highlight ? 'var(--color-primary)' : 'var(--color-primary-light)' }}></div>
        </div>
        {!last && <div className={styles.funnelDrop}>↓ {drop} abandonaram</div>}
    </div>
);

const DeviceItem = ({ icon: Icon, label, value, percent }: any) => (
    <div className={styles.deviceItem}>
        <Icon size={24} className={styles.deviceIcon} />
        <div className={styles.deviceInfo}>
            <div className={styles.deviceLabel}>{label}</div>
            <div className={styles.deviceValue}>{value}</div>
            <div className={styles.devicePercent}>{percent}</div>
        </div>
    </div>
);

const EventRow = ({ label, value, percent }: any) => (
    <div className={styles.eventRow}>
        <div className={styles.eventHeader}>
            <span>{label}</span>
            <span>{value} ({percent})</span>
        </div>
        <div className={styles.eventBarBg}>
            <div className={styles.eventBarFill} style={{ width: percent }}></div>
        </div>
    </div>
);

const InsightCard = ({ title, value, desc, type, icon: Icon }: any) => (
    <div className={`${styles.insightCard} ${styles[`insight${type}`]}`}>
        <div className={styles.insightTitle} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {Icon && <Icon size={14} />} {title}
        </div>
        <div className={styles.insightValue}>{value}</div>
        <div className={styles.insightDesc}>{desc}</div>
    </div>
);
