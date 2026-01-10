import React, { useState } from 'react';
import {
    X, Plus, Bold, Italic, List, AlignLeft, Search, Video, Image as ImageIcon, Trash2
} from 'lucide-react';
import styles from './ProductModal.module.css';
import { supabase } from '../../lib/supabase';

interface ProductOption {
    id: string;
    name: string;
    values: string[];
}

interface ProductVariant {
    id: string;
    sku: string;
    price: string;
    stock: string; // string to handle empty input easily
    attributes: Record<string, string>;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: any;
}

export const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
    if (!isOpen) return null;

    // --- State Management ---
    const [name, setName] = useState(product?.name || '');
    const [slug, setSlug] = useState(product?.slug || '');
    const [sku, setSku] = useState(product?.sku || '');
    const [price, setPrice] = useState(product?.price || '');
    const [comparePrice, setComparePrice] = useState(product?.compare_at_price || '');
    const [stock, setStock] = useState(product?.inventory_quantity || '');
    const [description, setDescription] = useState(product?.description || '');
    const [videoUrl, setVideoUrl] = useState(product?.video_url || '');
    const [controlStock, setControlStock] = useState(product?.track_inventory ?? true);
    const [lowStockAlert, setLowStockAlert] = useState(5);
    const [isActive, setIsActive] = useState(product?.is_active ?? true);
    const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
    const [sortOrder, setSortOrder] = useState(product?.sort_order || 0);

    // Categories & Tags
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [tags, setTags] = useState<string[]>(product?.tags || []);
    const [newTag, setNewTag] = useState('');

    // Variations
    const [hasVariants, setHasVariants] = useState(product?.has_variants || false);
    const [options, setOptions] = useState<ProductOption[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [newOptionName, setNewOptionName] = useState('');
    const [newOptionValues, setNewOptionValues] = useState<Record<string, string>>({}); // keyed by option id

    // Images
    const [images, setImages] = useState<string[]>(product?.images || []);

    const addImage = () => {
        // Mock add image
        setImages([...images, 'placeholder']);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleCreateCategory = () => {
        if (newCategoryName.trim()) {
            // In real app, this would save to DB. Here we just add to list temporarily
            toggleCategory(newCategoryName); // Auto select
            setNewCategoryName('');
            setIsCreatingCategory(false);
        }
    };

    // --- Variation Helpers ---
    const addOption = () => {
        if (newOptionName.trim()) {
            const newOp: ProductOption = {
                id: Math.random().toString(36).substr(2, 9),
                name: newOptionName.trim(),
                values: []
            };
            setOptions([...options, newOp]);
            setNewOptionName('');
        }
    };

    const removeOption = (id: string) => {
        setOptions(options.filter(o => o.id !== id));
        // Clear variants if options change
        if (variants.length > 0) setVariants([]);
    };

    const addOptionValue = (optionId: string, value: string) => {
        if (!value.trim()) return;
        setOptions(options.map(op => {
            if (op.id === optionId && !op.values.includes(value.trim())) {
                return { ...op, values: [...op.values, value.trim()] };
            }
            return op;
        }));
        setNewOptionValues({ ...newOptionValues, [optionId]: '' });
    };

    const removeOptionValue = (optionId: string, valueToRemove: string) => {
        setOptions(options.map(op => {
            if (op.id === optionId) {
                return { ...op, values: op.values.filter(v => v !== valueToRemove) };
            }
            return op;
        }));
    };

    const generateVariants = () => {
        if (options.length === 0 || options.some(o => o.values.length === 0)) {
            alert("Adicione pelo menos uma opção com valores.");
            return;
        }

        const cartesian = (args: string[][]) => args.reduce((a, b) => a.flatMap(d => b.map(e => [...d, e])), [[]] as string[][]);

        const optionValues = options.map(o => o.values);
        const combinations = options.length === 1
            ? optionValues[0].map(v => [v])
            : cartesian(optionValues);

        const newVariants: ProductVariant[] = combinations.map(combo => {
            const attributes: Record<string, string> = {};
            options.forEach((op, idx) => {
                attributes[op.id] = combo[idx];
                attributes[op.name] = combo[idx];
            });

            const variantSuffix = combo.map(v => v.toUpperCase().substring(0, 3)).join('-');
            const derivedSku = sku ? `${sku}-${variantSuffix}` : variantSuffix;

            return {
                id: Math.random().toString(36).substr(2, 9),
                sku: derivedSku,
                price: price.toString(),
                stock: stock.toString(),
                attributes
            };
        });

        setVariants(newVariants);
    };

    const updateVariant = (id: string, field: keyof ProductVariant, value: string) => {
        setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const handleSave = async (status: 'active' | 'draft') => {
        try {
            const productData = {
                name,
                slug: slug || generateSlug(name),
                sku,
                description,
                price: parseFloat(price) || 0,
                compare_at_price: comparePrice ? parseFloat(comparePrice) : null,
                inventory_quantity: hasVariants ? 0 : (parseInt(stock as string) || 0),
                track_inventory: controlStock,
                is_active: status === 'active' && isActive,
                is_featured: isFeatured,
                tags: tags,
                images: images,
                has_variants: hasVariants,
                // Add other fields mapped to DB columns
            };

            let productId = product?.id;

            // 1. Insert/Update Product
            if (product) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', productId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from('products')
                    .insert([productData])
                    .select()
                    .single();
                if (error) throw error;
                productId = data.id;
            }

            // 2. Handle Variations
            if (hasVariants) {
                // Delete existing options/variants for simplicity (full replace strategy)
                // In a real app we might want to reconcile, but for MVP replace is safer
                if (product) {
                    await supabase.from('product_options').delete().eq('product_id', productId);
                    await supabase.from('product_variants').delete().eq('product_id', productId);
                }

                // Insert Options
                const optionsToInsert = options.map((opt, index) => ({
                    product_id: productId,
                    name: opt.name,
                    values: opt.values,
                    position: index
                }));

                const { error: optError } = await supabase.from('product_options').insert(optionsToInsert);
                if (optError) throw optError;

                // Insert Variants
                const variantsToInsert = variants.map(v => ({
                    product_id: productId,
                    sku: v.sku,
                    price: parseFloat(v.price) || 0,
                    inventory_quantity: parseInt(v.stock) || 0,
                    option_values: v.attributes, // Stores JSONB: { "Color": "Red", "Size": "M" }
                    // We might need to map ID keys or Name keys depending on DB preference.
                    // Implementation plan said `option_values` jsonb.
                }));

                const { error: varError } = await supabase.from('product_variants').insert(variantsToInsert);
                if (varError) throw varError;
            }

            alert('Produto salvo com sucesso!');
            onClose();
            // Refresh parent?
        } catch (error: any) {
            console.error('Error saving product:', error);
            alert('Erro ao salvar produto: ' + error.message);
        }
    };

    // --- Helpers ---
    const generateSlug = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
            .replace(/\s+/g, '-')     // Spaces to -
            .replace(/[^\w-]+/g, '')  // Remove non-word chars
            .replace(/--+/g, '-')     // Collapse multiple -
            .replace(/^-+/, '')       // Trim - from start
            .replace(/-+$/, '');      // Trim - from end
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        if (!product) { // Only auto-gen slug for new products
            setSlug(generateSlug(val));
        }
    };

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    // --- Mock Data ---
    const availableCategories = ['Roupas', 'Camisetas', 'Calças', 'Vestidos', 'Calçados', 'Acessórios'];

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.title}>{product ? 'Editar Produto' : 'Novo Produto'}</div>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>

                    {/* SEÇÃO 1: INFORMAÇÕES BÁSICAS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Informações Básicas</div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome do Produto <span className={styles.required}>*</span></label>
                            <input
                                className={styles.input}
                                value={name}
                                onChange={handleNameChange}
                                placeholder="Ex: Camiseta Básica Algodão"
                            />
                        </div>
                        <div className={styles.row + ' cols-2'}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Slug (URL)</label>
                                <input
                                    className={styles.input}
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    placeholder="camiseta-basica-algodao"
                                />
                                <div className={styles.helperText}>cubo.com/loja/produto/{slug || '...'}</div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>SKU</label>
                                <input
                                    className={styles.input}
                                    value={sku}
                                    onChange={e => setSku(e.target.value)}
                                    placeholder="CAM-001"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 2: IMAGENS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Multimídia</div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Imagens do Produto</label>
                            <div className={styles.imageGrid}>
                                <button className={styles.imageSlot} style={{ borderStyle: 'dashed' }} onClick={addImage}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                        <Plus size={24} />
                                        <span style={{ fontSize: '0.7rem' }}>Adicionar</span>
                                    </div>
                                </button>
                                {/* Images List */}
                                {images.map((img, i) => (
                                    <div key={i} className={styles.imageSlot} style={{ borderStyle: 'solid' }}>
                                        {img === 'placeholder' ? (
                                            <div className={styles.imagePlaceholder}>
                                                <ImageIcon size={24} />
                                            </div>
                                        ) : (
                                            <img src={img} alt="Product" className={styles.imagePreview} />
                                        )}
                                        <button className={styles.removeImgBtn} onClick={(e) => { e.stopPropagation(); removeImage(i); }}>
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.helperText}>Arraste para reordenar. Primeira imagem será a principal.</div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>URL de Vídeo (Opcional)</label>
                            <div className={styles.searchContainer} style={{ position: 'relative' }}>
                                <Video size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--color-text-muted)' }} />
                                <input
                                    className={styles.input}
                                    style={{ paddingLeft: 36 }}
                                    value={videoUrl}
                                    onChange={e => setVideoUrl(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 3: DESCRIÇÃO */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Descrição</div>
                        <div className={styles.richTextEditor}>
                            <div className={styles.richToolbar}>
                                <button className={styles.toolbarBtn}><Bold size={16} /></button>
                                <button className={styles.toolbarBtn}><Italic size={16} /></button>
                                <div style={{ width: 1, height: 16, background: 'var(--color-border)', margin: '0 4px' }} />
                                <button className={styles.toolbarBtn}><List size={16} /></button>
                                <button className={styles.toolbarBtn}><AlignLeft size={16} /></button>
                            </div>
                            <div
                                className={styles.richContent}
                                contentEditable
                                dangerouslySetInnerHTML={{ __html: description }}
                                onBlur={e => setDescription(e.currentTarget.innerHTML)}
                            />
                        </div>
                    </div>

                    {/* SEÇÃO 4: PREÇO */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Preço & Inventário</div>
                        <div className={styles.row + ' cols-2'}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Preço *</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    placeholder="0,00"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Preço "De" (Opcional)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    value={comparePrice}
                                    onChange={e => setComparePrice(e.target.value)}
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 5: CATEGORIAS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Categorias</div>
                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--color-text-muted)' }} />
                                    <input className={styles.input} style={{ paddingLeft: 36 }} placeholder="Buscar categoria..." />
                                </div>
                                <div className={styles.categoryList}>
                                    {availableCategories.map(cat => (
                                        <label key={cat} className={styles.categoryItem}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleCategory(cat)}
                                            />
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                                <div className={styles.selectedTags}>
                                    {selectedCategories.map(cat => (
                                        <span key={cat} className={styles.tagChip}>
                                            {cat} <X size={12} className={styles.tagRemove} onClick={() => toggleCategory(cat)} />
                                        </span>
                                    ))}
                                </div>
                                {isCreatingCategory ? (
                                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                        <input
                                            className={styles.input}
                                            style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                            value={newCategoryName}
                                            onChange={e => setNewCategoryName(e.target.value)}
                                            placeholder="Nome da categoria"
                                            autoFocus
                                        />
                                        <button className={styles.btnSave} style={{ padding: '4px 8px', fontSize: '0.8rem' }} onClick={handleCreateCategory}>OK</button>
                                        <button className={styles.closeBtn} onClick={() => setIsCreatingCategory(false)}><X size={16} /></button>
                                    </div>
                                ) : (
                                    <button
                                        className={styles.btnCancel}
                                        style={{ width: 'fit-content', padding: '4px 12px', fontSize: '0.8rem', marginTop: 8 }}
                                        onClick={() => setIsCreatingCategory(true)}
                                    >
                                        + Criar nova categoria
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 6: TAGS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Tags</div>
                        <div className={styles.formGroup}>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <input
                                    className={styles.input}
                                    value={newTag}
                                    onChange={e => setNewTag(e.target.value)}
                                    placeholder="Ex: promoção, verão..."
                                    style={{ flex: 1 }}
                                    onKeyDown={e => e.key === 'Enter' && addTag()}
                                />
                                <button className={styles.btnSecondary} onClick={addTag}>Adicionar</button>
                            </div>
                            <div className={styles.selectedTags}>
                                {tags.map(tag => (
                                    <span key={tag} className={styles.tagChip}>
                                        {tag} <X size={12} className={styles.tagRemove} onClick={() => removeTag(tag)} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SEÇÃO 7: ESTOQUE */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Controle de Estoque</div>
                        <label className={styles.toggle} style={{ marginBottom: 16 }}>
                            <input
                                type="checkbox"
                                checked={controlStock}
                                onChange={e => setControlStock(e.target.checked)}
                            />
                            Controlar estoque deste produto
                        </label>

                        {controlStock && (
                            <div className={styles.row + ' cols-2'}>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Quantidade em estoque</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={stock}
                                        onChange={e => setStock(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Avisar quando menor que</label>
                                    <input
                                        type="number"
                                        className={styles.input}
                                        value={lowStockAlert}
                                        onChange={e => setLowStockAlert(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* SEÇÃO 8: VARIAÇÕES */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Variações</div>
                        <div className={styles.formGroup}>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={hasVariants}
                                    onChange={e => setHasVariants(e.target.checked)}
                                />
                                Este produto tem variações (tamanho, cor, etc)
                            </label>
                        </div>

                        {hasVariants && (
                            <div className={styles.variationsContainer}>
                                {/* Options Builder */}
                                <div className={styles.optionsBuilder}>
                                    <div className={styles.subHeader}>1. Definir Opções</div>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                        <input
                                            className={styles.input}
                                            placeholder="Nova opção (ex: Cor, Tamanho)"
                                            value={newOptionName}
                                            onChange={e => setNewOptionName(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addOption()}
                                        />
                                        <button className={styles.btnSecondary} onClick={addOption}>Adicionar</button>
                                    </div>

                                    <div className={styles.optionsList}>
                                        {options.map(opt => (
                                            <div key={opt.id} className={styles.optionCard}>
                                                <div className={styles.optionHeader}>
                                                    <strong>{opt.name}</strong>
                                                    <button onClick={() => removeOption(opt.id)} className={styles.btnIcon}><Trash2 size={14} /></button>
                                                </div>
                                                <div className={styles.optionValues}>
                                                    {opt.values.map(val => (
                                                        <span key={val} className={styles.tagChip}>
                                                            {val} <X size={12} className={styles.tagRemove} onClick={() => removeOptionValue(opt.id, val)} />
                                                        </span>
                                                    ))}
                                                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4 }}>
                                                        <input
                                                            className={styles.inputSmall}
                                                            placeholder="Novo valor"
                                                            value={newOptionValues[opt.id] || ''}
                                                            onChange={e => setNewOptionValues({ ...newOptionValues, [opt.id]: e.target.value })}
                                                            onKeyDown={e => e.key === 'Enter' && addOptionValue(opt.id, (e.target as HTMLInputElement).value)}
                                                        />
                                                        <button
                                                            className={styles.btnSmall}
                                                            onClick={() => addOptionValue(opt.id, newOptionValues[opt.id] || '')}
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {options.length > 0 && (
                                        <button className={styles.btnPrimaryFull} onClick={generateVariants} style={{ marginTop: 16 }}>
                                            Gerar Combinações de Variantes
                                        </button>
                                    )}
                                </div>

                                {/* Variants Table */}
                                {variants.length > 0 && (
                                    <div className={styles.variantsTableContainer}>
                                        <div className={styles.subHeader}>2. Editar Variantes ({variants.length})</div>
                                        <table className={styles.variantsTable}>
                                            <thead>
                                                <tr>
                                                    <th>Variante</th>
                                                    <th>SKU</th>
                                                    <th>Preço</th>
                                                    <th>Estoque</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {variants.map(v => (
                                                    <tr key={v.id}>
                                                        <td>
                                                            {Object.values(v.attributes).filter(val => !options.map(o => o.id).includes(val)).join(' / ')}
                                                        </td>
                                                        <td>
                                                            <input
                                                                className={styles.inputTable}
                                                                value={v.sku}
                                                                onChange={e => updateVariant(v.id, 'sku', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                className={styles.inputTable}
                                                                value={v.price}
                                                                onChange={e => updateVariant(v.id, 'price', e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="number"
                                                                className={styles.inputTable}
                                                                value={v.stock}
                                                                onChange={e => updateVariant(v.id, 'stock', e.target.value)}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* SEÇÃO 9: STATUS */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>Visibilidade</div>
                        <div className={styles.row + ' cols-2'}>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={e => setIsActive(e.target.checked)}
                                />
                                Produto Ativo (Visível na loja)
                            </label>
                            <label className={styles.toggle}>
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={e => setIsFeatured(e.target.checked)}
                                />
                                Produto em Destaque
                            </label>
                        </div>
                        <div className={styles.formGroup} style={{ marginTop: 16 }}>
                            <label className={styles.label}>Ordenação (Prioridade)</label>
                            <input
                                type="number"
                                className={styles.input}
                                value={sortOrder}
                                onChange={e => setSortOrder(Number(e.target.value))}
                                style={{ maxWidth: 100 }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
                    <button className={styles.btnCancel} onClick={() => handleSave('draft')}>Salvar como Rascunho</button>
                    <button className={styles.btnSave} onClick={() => handleSave('active')}>Publicar Produto</button>
                </div>
            </div>
        </div>
    );
};
