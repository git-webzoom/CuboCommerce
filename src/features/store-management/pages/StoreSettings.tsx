import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import { BasicInfoTab } from '../components/BasicInfo';
import { ImagesTab } from '../components/Images';
import { SocialMediaTab } from '../components/SocialMedia';
import { StorePreview } from '../components/StorePreview';
import './styles.css';

export const StoreSettings: React.FC = () => {
    return (
        <div className="store-container">
            <div className="store-header">
                <h1>Minha Loja</h1>
                <p>Gerencie as informações principais do seu estabelecimento</p>
            </div>

            <Tabs defaultValue="basic">
                <TabsList>
                    <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                    <TabsTrigger value="images">Imagens</TabsTrigger>
                    <TabsTrigger value="social">Redes Sociais</TabsTrigger>
                    <TabsTrigger value="preview">Preview da Loja</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                    <BasicInfoTab />
                </TabsContent>

                <TabsContent value="images">
                    <ImagesTab />
                </TabsContent>

                <TabsContent value="social">
                    <SocialMediaTab />
                </TabsContent>

                <TabsContent value="preview">
                    <StorePreview />
                </TabsContent>
            </Tabs>
        </div>
    );
};
