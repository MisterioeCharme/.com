// Dados dos produtos
const products = [
    {
        id: "CJ-001",
        name: "Conjunto Kesila",
        price: 50.0,
        category: "Conjuntos",
        colors: ["Marinho", "Vermelho"],
        sizes: ["M", "G","GG"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/conjunto_kesila_14126_variacao_11696_1_3408545a4b9d5b18768edf90c4bcf3ec.png",
        featured: true
    },
    {
        id: "MC-002",
        name: "Conjunto Any",
        price: 55.50,
        category: "Conjuntos",
        colors: ["Aço"],
        sizes: ["M"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/conjunto_any_9992_variacao_5249_1_1ff9af0e351dcd48e981816463b53d86.jpg",
        featured: false
    },
    {
        id: "MC-003",
        name: "Calcinha Confort Cotton",
        price: 19.9,
        category: "Calcinhas",
        colors: ["rosa", "preto", "branco"],
        sizes: ["P", "M", "G", "GG"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/conjunto_musa_14059_variacao_11241_1_7bdc60ad0102f8b78856d105e13bf543.jpg",
        featured: true
    },
    {
        id: "CL-001",
        name: "Caleçon Pantera",
        price: 20.00,
        category: "Calcinhas",
        colors: ["Branco"],
        sizes: ["P"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/calecon_pantera_13759_variacao_8603_1_850c94485a6e4666074e6363a0eba637.jpg",
        featured: true
    },
    {
        id: "CL-002",
        name: "Tanga Larissa",
        price: 15.10,
        category: "Calcinhas",
        colors: ["Vermelho ", "Preto"],
        sizes: ["P", "M"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/tanga_larissa_14144_variacao_11826_1_9e08261ee454b4886e7f1589d527f67a.png",
        featured: false
    },
    {
        id: "ST-000",
        name: "Sutiã Amamentação Emanuele",
        price: 45.90,
        category: "Sutia",
        colors: ["Sanremo","Rubi"],
        sizes: ["M", "G","GG"],
        image: "https://images.tcdn.com.br/img/img_prod/1277201/sutia_amamentacao_emanuele_14128_variacao_11704_1_a881fc377a2ccb78b541ff5487701de2.png",
        featured: true
    }
];

// Formatar preço
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

// Gerar link do WhatsApp
function generateWhatsAppLink(product) {
    const message = `Olá! Tenho interesse no produto: ${product.name} (código: ${product.id}). Poderia me passar mais detalhes?`;
    return `https://wa.me/+5511952997669?text=${encodeURIComponent(message)}`;
}

// Renderizar produtos
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    
    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search"></i>
                <p>Nenhum produto encontrado com os filtros selecionados.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="highlight-badge">Destaque</span>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-details">Cores: ${product.colors.join(", ")} | Tamanhos: ${product.sizes.join(", ")}</div>
                <a href="${generateWhatsAppLink(product)}" target="_blank" class="buy-btn">
                    <i class="fab fa-whatsapp"></i> Comprar no WhatsApp
                </a>
            </div>
        </div>
    `).join('');
}

// Filtrar produtos
function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const maxPrice = parseInt(document.getElementById('priceFilter').value);
    const sortBy = document.getElementById('sortFilter').value;
    
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.id.toLowerCase().includes(searchTerm) || 
                             product.category.toLowerCase().includes(searchTerm);
        
        const matchesCategory = category === 'all' || product.category === category;
        const matchesPrice = maxPrice === 200 || product.price <= maxPrice;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    // Ordenar produtos
    switch(sortBy) {
        case 'new':
            filteredProducts.sort((a, b) => b.featured - a.featured);
            break;
        case 'lowest':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'highest':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // Relevância - mantém a ordem original para produtos destacados primeiro
            filteredProducts.sort((a, b) => b.featured - a.featured);
    }
    
    renderProducts(filteredProducts, 'productsGrid');
}

// Inicializar a página
function init() {
    // Renderizar produtos em destaque
    const featuredProducts = products.filter(product => product.featured);
    renderProducts(featuredProducts, 'featuredProducts');
    
    // Renderizar todos os produtos
    renderProducts(products, 'productsGrid');
    
    // Configurar event listeners
    document.getElementById('searchInput').addEventListener('input', filterProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterProducts);
    document.getElementById('priceFilter').addEventListener('input', function() {
        document.getElementById('priceValue').textContent = formatPrice(this.value);
        filterProducts();
    });
    document.getElementById('sortFilter').addEventListener('change', filterProducts);
    document.getElementById('applyFilters').addEventListener('click', filterProducts);
    
    // Configurar o slider de preço
    const priceSlider = document.getElementById('priceFilter');
    const priceValue = document.getElementById('priceValue');
    priceValue.textContent = formatPrice(priceSlider.value);
}

// Iniciar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', init);
