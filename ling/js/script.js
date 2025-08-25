// Dados dos produtos
const products = [
    {
        id: "MC-001",
        name: "Conjunto Renda Clássico",
        price: 89.9,
        category: "Conjuntos",
        colors: ["preto", "vermelho", "branco"],
        sizes: ["P", "M", "G"],
        image: "https://images.unsplash.com/photo-1582293281566-1e59b93c6773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "MC-002",
        name: "Sutiã Push-Up Luxo",
        price: 59.9,
        category: "Sutiãs",
        colors: ["nude", "preto"],
        sizes: ["P", "M", "G"],
        image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        featured: true
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
        id: "MC-004",
        name: "Body Renda Elegance",
        price: 119.9,
        category: "Bodies",
        colors: ["preto"],
        sizes: ["M", "G"],
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        featured: true
    },
    {
        id: "MC-005",
        name: "Camisola Seda Suave",
        price: 99.9,
        category: "Camisolas",
        colors: ["vino", "preto"],
        sizes: ["P", "M", "G"],
        image: "https://images.unsplash.com/photo-1594744803324-5c5c6d13f2e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        featured: false
    },
    {
        id: "MC-006",
        name: "Conjunto Strappy Bold",
        price: 109.9,
        category: "Conjuntos",
        colors: ["preto"],
        sizes: ["P", "M", "G"],
        image: "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        featured: false
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