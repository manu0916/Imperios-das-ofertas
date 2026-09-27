const products = [
  {
    id: "camiseta-orbita",
    name: "Camiseta Órbita Oversized",
    category: "unissex",
    price: 69.9,
    badge: "Novo",
    position: ["0%", "0%"],
    description: "Malha encorpada, toque macio e modelagem ampla para um visual limpo que funciona em qualquer combinação.",
    composition: "100% algodão",
  },
  {
    id: "vestido-aurora",
    name: "Vestido Aurora Midi",
    category: "feminino",
    price: 119.9,
    badge: "Mais vendido",
    position: ["-33.3333%", "0%"],
    description: "Cintura marcada na medida e caimento leve. Uma peça prática para sair do dia para a noite sem esforço.",
    composition: "Viscose com elastano",
  },
  {
    id: "calca-nomade",
    name: "Calça Nômade Cargo",
    category: "unissex",
    price: 139.9,
    badge: "Edição limitada",
    position: ["-66.6667%", "0%"],
    description: "Modelagem reta, bolsos utilitários e tecido resistente com movimento. Feita para acompanhar rotinas intensas.",
    composition: "Sarja 100% algodão",
  },
  {
    id: "jaqueta-horizonte",
    name: "Jaqueta Horizonte Jeans",
    category: "masculino",
    price: 179.9,
    badge: "Últimas unidades",
    position: ["0%", "-50%"],
    description: "Jeans escuro com construção clássica e acabamento versátil. A terceira peça que resolve o look em segundos.",
    composition: "Denim 100% algodão",
  },
  {
    id: "short-linha",
    name: "Short Linha Alfaiataria",
    category: "feminino",
    price: 89.9,
    badge: "−15%",
    position: ["-33.3333%", "-50%"],
    description: "Cintura alta, pregas frontais e estrutura suave. Elegante sem perder a leveza dos dias quentes.",
    composition: "Linho misto",
  },
  {
    id: "tricot-lume",
    name: "Blusa Lume Tricot",
    category: "feminino",
    price: 99.9,
    badge: "Favorito",
    position: ["-66.6667%", "-50%"],
    description: "Trama delicada, textura macia e comprimento equilibrado. Uma base clara para sobreposições e looks tonais.",
    composition: "Tricot de viscose",
  },
];

const infoPages = {
  sobre: {
    eyebrow: "Quem somos",
    title: "Moda boa deve fazer sentido.",
    body: `
      <p>A Império das Ofertas nasceu para aproximar peças atuais de quem busca se vestir bem sem complicar a rotina nem o orçamento.</p>
      <p>Nossa curadoria valoriza caimento, versatilidade e preço justo. Cada coleção é pensada para combinar entre si e render mais possibilidades no dia a dia.</p>
      <h3>Atendimento de verdade</h3>
      <p>Da escolha do tamanho ao pós-compra, a proposta é oferecer informação clara e apoio em cada etapa.</p>`,
  },
  entrega: {
    eyebrow: "Informações",
    title: "Entregas e prazos",
    body: `
      <p>Entregamos para todo o Brasil. O prazo e o valor do frete são calculados no checkout conforme o CEP informado.</p>
      <h3>Frete grátis</h3><p>Pedidos acima de R$ 199 recebem frete grátis na modalidade econômica.</p>
      <h3>Acompanhamento</h3><p>Após a confirmação, o cliente recebe atualizações do pedido até a entrega.</p>`,
  },
  trocas: {
    eyebrow: "Compra tranquila",
    title: "Trocas e devoluções",
    body: `
      <p>A primeira troca é gratuita e pode ser solicitada em até 30 dias corridos após o recebimento.</p>
      <p>A peça deve estar sem sinais de uso, com etiquetas e embalagem original. Em caso de arrependimento, a devolução pode ser solicitada em até 7 dias corridos.</p>`,
  },
  pagamento: {
    eyebrow: "Pagamento",
    title: "Escolha como pagar",
    body: `
      <p>O checkout foi pensado para aceitar Pix, boleto e cartões de crédito em até 6x sem juros.</p>
      <p><strong>Importante:</strong> este site é um protótipo front-end. Nenhuma cobrança ou transação real é realizada nesta versão.</p>`,
  },
  privacidade: {
    eyebrow: "Seus dados",
    title: "Privacidade",
    body: `
      <p>Esta demonstração não envia informações pessoais para servidores. Os itens da sacola ficam salvos apenas no navegador do visitante.</p>
      <p>Em uma versão comercial, a política definitiva detalharia finalidade, armazenamento e direitos relacionados a cada dado coletado.</p>`,
  },
  termos: {
    eyebrow: "Transparência",
    title: "Termos de compra",
    body: `
      <p>Os produtos, preços, prazos e pedidos exibidos neste protótipo são ilustrativos. Confirmar um pedido não cria cobrança, reserva de estoque ou obrigação comercial.</p>
      <p>A versão final deve ser conectada ao estoque, gateway de pagamento e operação logística da loja.</p>`,
  },
  tamanhos: {
    eyebrow: "Guia de medidas",
    title: "Encontre seu tamanho",
    body: `
      <p>Use as medidas abaixo como referência geral. A descrição de cada peça pode indicar particularidades do caimento.</p>
      <table class="size-table">
        <thead><tr><th>Tamanho</th><th>Busto/Tórax</th><th>Cintura</th><th>Quadril</th></tr></thead>
        <tbody>
          <tr><td>PP</td><td>78–82 cm</td><td>60–64 cm</td><td>86–90 cm</td></tr>
          <tr><td>P</td><td>83–88 cm</td><td>65–70 cm</td><td>91–96 cm</td></tr>
          <tr><td>M</td><td>89–96 cm</td><td>71–78 cm</td><td>97–104 cm</td></tr>
          <tr><td>G</td><td>97–104 cm</td><td>79–86 cm</td><td>105–112 cm</td></tr>
          <tr><td>GG</td><td>105–114 cm</td><td>87–96 cm</td><td>113–122 cm</td></tr>
        </tbody>
      </table>`,
  },
};

const state = {
  activeFilter: "todos",
  search: "",
  sort: "destaques",
  cart: loadCart(),
  coupon: "",
  quickProductId: null,
  selectedSize: null,
};

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const productGrid = $("#productGrid");
const resultsCount = $("#resultsCount");
const emptyState = $("#emptyState");
const cartDrawer = $("#cartDrawer");
const pageOverlay = $("#pageOverlay");
const productModal = $("#productModal");
const infoModal = $("#infoModal");
const checkoutModal = $("#checkoutModal");
const toast = $("#toast");

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem("imperio-cart") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("imperio-cart", JSON.stringify(state.cart));
  } catch {
    // The experience still works when private browsing blocks local storage.
  }
}

function productImage(product, className = "sprite") {
  return `<img class="${className}" src="catalog-sprite.webp" alt="${product.name}" style="--x:${product.position[0]};--y:${product.position[1]}" />`;
}

function renderProducts() {
  const term = state.search.trim().toLocaleLowerCase("pt-BR");
  let visible = products.filter((product) => {
    const matchesFilter = state.activeFilter === "todos" || product.category === state.activeFilter;
    const haystack = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase("pt-BR");
    return matchesFilter && (!term || haystack.includes(term));
  });

  if (state.sort === "menor") visible.sort((a, b) => a.price - b.price);
  if (state.sort === "maior") visible.sort((a, b) => b.price - a.price);

  productGrid.innerHTML = visible
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-visual">
            ${productImage(product)}
            <span class="product-badge">${product.badge}</span>
            <button class="quick-button" data-quick-view="${product.id}" aria-label="Ver detalhes de ${product.name}">Ver detalhes</button>
          </div>
          <div class="product-info">
            <p class="product-category">${capitalize(product.category)}</p>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${money.format(product.price)}</p>
            <p class="product-installments">ou 3x de ${money.format(product.price / 3)} sem juros</p>
          </div>
        </article>`,
    )
    .join("");

  resultsCount.textContent = `${visible.length} ${visible.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
  emptyState.hidden = visible.length !== 0;
  productGrid.hidden = visible.length === 0;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function setFilter(filter) {
  state.activeFilter = filter;
  $$(".filter-pill").forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  state.quickProductId = productId;
  state.selectedSize = null;
  $("#quickViewContent").innerHTML = `
    <div class="quick-image">${productImage(product, "")}</div>
    <div class="quick-details">
      <p class="eyebrow">${capitalize(product.category)} · ${product.badge}</p>
      <h2>${product.name}</h2>
      <p class="quick-price">${money.format(product.price)}</p>
      <p class="quick-installments">3x de ${money.format(product.price / 3)} sem juros</p>
      <p class="quick-description">${product.description}</p>
      <div class="size-heading"><span>Escolha o tamanho</span><button type="button" data-info="tamanhos">Ver medidas</button></div>
      <div class="size-options" role="group" aria-label="Escolha o tamanho">
        ${["PP", "P", "M", "G", "GG"].map((size) => `<button class="size-option" type="button" data-size="${size}" aria-pressed="false">${size}</button>`).join("")}
      </div>
      <p class="size-feedback" id="sizeFeedback" aria-live="polite"></p>
      <button class="button button-gold button-full" type="button" id="addToCart">Adicionar à sacola</button>
      <div class="quick-features"><span>✓ Primeira troca grátis</span><span>✓ Frete grátis acima de R$ 199</span><span>Composição: ${product.composition}</span></div>
    </div>`;
  productModal.showModal();
  document.body.classList.add("is-locked");
}

function closeDialog(dialog) {
  if (dialog.open) dialog.close();
  if (![productModal, infoModal, checkoutModal].some((item) => item.open) && !cartDrawer.classList.contains("is-open")) {
    document.body.classList.remove("is-locked");
  }
}

function openInfo(key) {
  const page = infoPages[key];
  if (!page) return;
  if (productModal.open) productModal.close();
  $("#infoContent").innerHTML = `<p class="eyebrow">${page.eyebrow}</p><h2>${page.title}</h2>${page.body}`;
  infoModal.showModal();
  document.body.classList.add("is-locked");
}

function addToCart(productId, size) {
  const key = `${productId}-${size}`;
  const existing = state.cart.find((item) => item.key === key);
  if (existing) existing.quantity += 1;
  else state.cart.push({ key, productId, size, quantity: 1 });
  saveCart();
  updateCart();
  showToast("Produto adicionado à sacola.");
}

function cartDetails() {
  return state.cart
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }))
    .filter((item) => item.product);
}

function cartSubtotal() {
  return cartDetails().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function discountAmount() {
  return state.coupon === "IMPERIO10" ? cartSubtotal() * 0.1 : 0;
}

function cartTotal() {
  return Math.max(0, cartSubtotal() - discountAmount());
}

function updateCart() {
  const details = cartDetails();
  const totalQuantity = details.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartCount").textContent = totalQuantity;
  $("#cartButton").setAttribute("aria-label", `Abrir sacola, ${totalQuantity} ${totalQuantity === 1 ? "item" : "itens"}`);

  $("#cartItems").innerHTML = details
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item-image">${productImage(item.product, "")}</div>
          <div>
            <h4>${item.product.name}</h4>
            <p class="cart-item-meta">Tamanho ${item.size}</p>
            <p class="cart-item-price">${money.format(item.product.price)}</p>
            <div class="quantity-control" aria-label="Quantidade de ${item.product.name}">
              <button type="button" data-quantity="-1" data-key="${item.key}" aria-label="Diminuir quantidade">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-quantity="1" data-key="${item.key}" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <button type="button" class="remove-item" data-remove="${item.key}" aria-label="Remover ${item.product.name}">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></svg>
          </button>
        </article>`,
    )
    .join("");

  const hasItems = details.length > 0;
  $("#cartEmpty").hidden = hasItems;
  $("#cartSummary").hidden = !hasItems;
  $("#cartSubtotal").textContent = money.format(cartSubtotal());
  $("#cartTotal").textContent = money.format(cartTotal());
  $("#discountValue").textContent = `− ${money.format(discountAmount())}`;
  $("#discountLine").hidden = !discountAmount();

  const remaining = Math.max(0, 199 - cartSubtotal());
  const progress = Math.min(100, (cartSubtotal() / 199) * 100);
  $("#shippingProgress").style.width = `${progress}%`;
  $("#shippingMessage").textContent = remaining > 0 ? `Faltam ${money.format(remaining)} para o frete grátis` : "Você ganhou frete grátis";
  $("#shippingValue").textContent = remaining > 0 ? money.format(199) : "✓";
}

function changeQuantity(key, delta) {
  const item = state.cart.find((entry) => entry.key === key);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) state.cart = state.cart.filter((entry) => entry.key !== key);
  saveCart();
  updateCart();
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => item.key !== key);
  saveCart();
  updateCart();
  showToast("Produto removido da sacola.");
}

function openCart() {
  pageOverlay.hidden = false;
  requestAnimationFrame(() => pageOverlay.classList.add("is-visible"));
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  $("#closeCart").focus();
}

function closeCart() {
  pageOverlay.classList.remove("is-visible");
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!cartDrawer.classList.contains("is-open")) pageOverlay.hidden = true;
  }, 210);
  if (![productModal, infoModal, checkoutModal].some((item) => item.open)) document.body.classList.remove("is-locked");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function setCheckoutStep(step) {
  $$("[data-checkout-step]").forEach((section) => section.classList.toggle("is-active", Number(section.dataset.checkoutStep) === step));
  $$("[data-step-indicator]").forEach((item) => item.classList.toggle("is-active", Number(item.dataset.stepIndicator) <= step));
  if (step === 3) renderCheckoutReview();
}

function validateCheckoutStep(step) {
  const section = $(`[data-checkout-step="${step}"]`);
  const fields = $$(`input[required]`, section);
  for (const field of fields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }
  return true;
}

function renderCheckoutReview() {
  const form = $("#checkoutForm");
  const data = new FormData(form);
  const paymentNames = { pix: "Pix", card: "Cartão em até 6x", boleto: "Boleto" };
  const itemLabel = cartDetails().reduce((sum, item) => sum + item.quantity, 0);
  $("#checkoutReview").innerHTML = `
    <div class="review-line"><span>Itens</span><strong>${itemLabel}</strong></div>
    <div class="review-line"><span>Entrega</span><strong>${cartSubtotal() >= 199 ? "Grátis" : "Calculada após a demonstração"}</strong></div>
    <div class="review-line"><span>Pagamento</span><strong>${paymentNames[data.get("payment")]}</strong></div>
    <div class="review-line"><span>Enviar para</span><strong>${data.get("city") || "Endereço informado"}</strong></div>
    ${discountAmount() ? `<div class="review-line"><span>Cupom IMPERIO10</span><strong>− ${money.format(discountAmount())}</strong></div>` : ""}
    <div class="review-line review-total"><strong>Total</strong><strong>${money.format(cartTotal())}</strong></div>`;
}

function openCheckout() {
  if (!state.cart.length) return;
  closeCart();
  window.setTimeout(() => {
    $("#checkoutForm").hidden = false;
    $("#orderSuccess").hidden = true;
    setCheckoutStep(1);
    checkoutModal.showModal();
    document.body.classList.add("is-locked");
  }, 220);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.matches("[data-quick-view]")) openProduct(target.dataset.quickView);

  if (target.matches("[data-info]")) {
    event.preventDefault();
    openInfo(target.dataset.info);
  }

  if (target.matches("[data-close-dialog]")) closeDialog(target.closest("dialog"));

  if (target.matches(".size-option")) {
    state.selectedSize = target.dataset.size;
    $$(".size-option", target.parentElement).forEach((button) => {
      const selected = button === target;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    $("#sizeFeedback").textContent = "";
  }

  if (target.id === "addToCart") {
    if (!state.selectedSize) {
      $("#sizeFeedback").textContent = "Escolha um tamanho antes de adicionar.";
      return;
    }
    addToCart(state.quickProductId, state.selectedSize);
    closeDialog(productModal);
    openCart();
  }

  if (target.matches("[data-quantity]")) changeQuantity(target.dataset.key, Number(target.dataset.quantity));
  if (target.matches("[data-remove]")) removeFromCart(target.dataset.remove);

  if (target.matches("[data-next-step]")) {
    const current = Number(target.closest("[data-checkout-step]").dataset.checkoutStep);
    if (validateCheckoutStep(current)) setCheckoutStep(Number(target.dataset.nextStep));
  }
  if (target.matches("[data-prev-step]")) setCheckoutStep(Number(target.dataset.prevStep));
});

$$(".filter-pill").forEach((button) => button.addEventListener("click", () => setFilter(button.dataset.filter)));

$("#sortSelect").addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

$("#searchToggle").addEventListener("click", () => {
  const search = $("#headerSearch");
  search.classList.toggle("is-open");
  if (search.classList.contains("is-open")) $("#searchInput").focus();
});

$("#searchInput").addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
  if (state.search && !isElementInViewport($("#catalogo"))) $("#catalogo").scrollIntoView({ behavior: "smooth" });
});

$("#clearSearch").addEventListener("click", () => {
  $("#searchInput").value = "";
  state.search = "";
  renderProducts();
  $("#searchInput").focus();
});

$("#showAllButton").addEventListener("click", () => {
  $("#searchInput").value = "";
  state.search = "";
  setFilter("todos");
});

$$("[data-filter-link]").forEach((link) =>
  link.addEventListener("click", () => {
    setFilter(link.dataset.filterLink);
    $("#mainNav").classList.remove("is-open");
  }),
);

$("#menuButton").addEventListener("click", () => {
  const nav = $("#mainNav");
  const open = nav.classList.toggle("is-open");
  $("#menuButton").setAttribute("aria-expanded", String(open));
});

$("#cartButton").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", closeCart);
pageOverlay.addEventListener("click", closeCart);
$("#checkoutButton").addEventListener("click", openCheckout);

$("#couponForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const code = $("#couponInput").value.trim().toUpperCase();
  if (code === "IMPERIO10") {
    state.coupon = code;
    $("#couponFeedback").textContent = "Cupom aplicado: 10% de desconto.";
  } else {
    state.coupon = "";
    $("#couponFeedback").textContent = code ? "Cupom inválido. Tente IMPERIO10." : "Digite um cupom para aplicar.";
  }
  updateCart();
});

$("#newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Cadastro demonstrativo concluído. Boas-vindas ao Império!");
  event.currentTarget.reset();
});

$("#checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  const orderNumber = `#IO${String(Date.now()).slice(-6)}`;
  $("#orderNumber").textContent = orderNumber;
  event.currentTarget.hidden = true;
  $("#orderSuccess").hidden = false;
  state.cart = [];
  state.coupon = "";
  saveCart();
  updateCart();
});

$("#finishOrder").addEventListener("click", () => {
  closeDialog(checkoutModal);
  $("#checkoutForm").reset();
  window.scrollTo({ top: $("#catalogo").offsetTop - 90, behavior: "smooth" });
});

$$('dialog').forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => {
    if (![productModal, infoModal, checkoutModal].some((item) => item.open) && !cartDrawer.classList.contains("is-open")) {
      document.body.classList.remove("is-locked");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

renderProducts();
updateCart();
