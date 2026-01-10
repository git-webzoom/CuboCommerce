
import { supabase } from '../lib/supabase';

export const dashboardService = {
    // Busca o resumo das estatísticas
    async getStats() {
        try {
            // Count total products
            const { count: productsCount, error: prodError } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            if (prodError) throw prodError;

            // Fetch orders for sales stats
            const { data: orders, error: ordError } = await supabase
                .from('orders')
                .select('total, status');

            // If orders table doesn't exist yet or errors, return 0s but don't crash
            if (ordError) {
                console.warn("Could not fetch orders stats:", ordError.message);
                return {
                    totalSales: 0,
                    totalOrders: 0,
                    averageTicket: 0,
                    totalProducts: productsCount || 0,
                    conversionRate: "0%"
                };
            }

            const validOrders = orders || [];
            const totalSales = validOrders
                .filter(o => o.status === 'paid' || o.status === 'completed' || o.status === 'confirmed')
                .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);

            const totalOrders = validOrders.length;

            return {
                totalSales,
                totalOrders,
                averageTicket: totalOrders > 0 ? totalSales / totalOrders : 0,
                totalProducts: productsCount || 0,
                conversionRate: "N/A" // Calculator this requires visitor data usually
            };
        } catch (error) {
            console.error("Dashboard stats error:", error);
            return null;
        }
    },

    // Busca os pedidos recentes
    async getRecentOrders() {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.warn("Could not fetch recent orders:", error);
            return [];
        }
    },

    // Busca produtos (para top produtos)
    async getTopProducts() {
        try {
            // Assuming 'views' might not exist, we just get recent products for now
            // Or if 'sold_count' exists. Let's try to get just generic products.
            const { data, error } = await supabase
                .from('products')
                .select('name, images, price')
                .limit(5);

            if (error) throw error;

            // Map to the format component expects (views is mock for now)
            return data?.map(p => ({
                name: p.name,
                views: Math.floor(Math.random() * 100) + 10 // Mock views since likely not tracked yet
            })) || [];
        } catch (error) {
            console.warn("Could not fetch top products:", error);
            return [];
        }
    }
};
