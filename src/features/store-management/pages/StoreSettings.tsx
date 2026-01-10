import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import { GeneralTab } from '../components/SettingsTabs/GeneralTab';
import { PaymentsTab } from '../components/SettingsTabs/PaymentsTab';
import { ShippingTab } from '../components/SettingsTabs/ShippingTab';
import { EmailTab } from '../components/SettingsTabs/EmailTab';
import { NotificationsTab } from '../components/SettingsTabs/NotificationsTab';
import { AppearanceTab } from '../components/SettingsTabs/AppearanceTab';
import { DomainTab } from '../components/SettingsTabs/DomainTab';
import { ApiTab } from '../components/SettingsTabs/ApiTab';
import { TeamTab } from '../components/SettingsTabs/TeamTab';
import { AdvancedTab } from '../components/SettingsTabs/AdvancedTab';
import './styles.css';

export const StoreSettings: React.FC = () => {
    return (
        <div className="store-container">
            <div className="store-header">
                <h1>Configurações</h1>
                <p>Gerencie todas as preferências da sua loja em um só lugar</p>
            </div>

            <Tabs defaultValue="general">
                <TabsList className="mb-8 flex-wrap h-auto gap-y-2">
                    <TabsTrigger value="general">🏪 Geral</TabsTrigger>
                    <TabsTrigger value="payments">💳 Pagamentos</TabsTrigger>
                    <TabsTrigger value="shipping">📦 Frete</TabsTrigger>
                    <TabsTrigger value="email">📧 Email</TabsTrigger>
                    <TabsTrigger value="notifications">🔔 Notificações</TabsTrigger>
                    <TabsTrigger value="appearance">🎨 Aparência</TabsTrigger>
                    <TabsTrigger value="domain">🌐 Domínio</TabsTrigger>
                    <TabsTrigger value="api">🔐 API</TabsTrigger>
                    <TabsTrigger value="team">👥 Equipe</TabsTrigger>
                    <TabsTrigger value="advanced">⚙️ Avançado</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <GeneralTab />
                </TabsContent>

                <TabsContent value="payments">
                    <PaymentsTab />
                </TabsContent>

                <TabsContent value="shipping">
                    <ShippingTab />
                </TabsContent>

                <TabsContent value="email">
                    <EmailTab />
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationsTab />
                </TabsContent>

                <TabsContent value="appearance">
                    <AppearanceTab />
                </TabsContent>

                <TabsContent value="domain">
                    <DomainTab />
                </TabsContent>

                <TabsContent value="api">
                    <ApiTab />
                </TabsContent>

                <TabsContent value="team">
                    <TeamTab />
                </TabsContent>

                <TabsContent value="advanced">
                    <AdvancedTab />
                </TabsContent>
            </Tabs>
        </div>
    );
};
