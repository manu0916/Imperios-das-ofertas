// Product listings are intentionally empty until the store supplies its real collection.
const products = [];

const infoPages = {
  sobre: {
    eyebrow: "Império das Ofertas",
    title: "Compra segura. Atendimento próximo.",
    body: `
      <p>A Império das Ofertas trabalha com roupas para o dia a dia e atendimento especializado em cada etapa da compra.</p>
      <p>Consulte as informações de entrega, pagamento e troca antes de concluir seu pedido.</p>`,
  },
  entrega: {
    eyebrow: "Informações",
    title: "Entregas e prazos",
    body: `
      <p>As opções, os custos e os prazos de entrega devem ser confirmados no momento do pedido, conforme o endereço informado.</p>
      <p>O atendimento da loja pode esclarecer dúvidas sobre o envio.</p>`,
  },
  trocas: {
    eyebrow: "Informações",
    title: "Trocas e devoluções",
    body: `
      <p>Consulte com a loja as condições e os prazos para troca ou devolução antes de concluir a compra.</p>`,
  },
  pagamento: {
    eyebrow: "Pagamento",
    title: "Escolha como pagar",
    body: `
      <p>Confirme com a loja as formas de pagamento disponíveis e as condições antes de concluir o pedido.</p>
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
  cart: loadCart(),
  quickProductId: null,
  selectedSize: null,
};

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const productGrid = $("#productGrid");
const collectionEmpty = $("#collectionEmpty");
const cartDrawer = $("#cartDrawer");
const pageOverlay = $("#pageOverlay");
const productModal = $("#productModal");
const infoModal = $("#infoModal");
const checkoutModal = $("#checkoutModal");
const toast = $("#toast");

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem("imperio-cart") || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => products.some((product) => product.id === item.productId)) : [];
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

function productImage(product, className = "product-photo") {
  return `<img class="${className}" src="${product.image}" alt="${product.name}" />`;
}

function renderProducts() {
  productGrid.innerHTML = products
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
          </div>
        </article>`,
    )
    .join("");

  collectionEmpty.hidden = products.length !== 0;
  productGrid.hidden = products.length === 0;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
      <p class="quick-description">${product.description}</p>
      <div class="size-heading"><span>Escolha o tamanho</span><button type="button" data-info="tamanhos">Ver medidas</button></div>
      <div class="size-options" role="group" aria-label="Escolha o tamanho">
        ${["PP", "P", "M", "G", "GG"].map((size) => `<button class="size-option" type="button" data-size="${size}" aria-pressed="false">${size}</button>`).join("")}
      </div>
      <p class="size-feedback" id="sizeFeedback" aria-live="polite"></p>
      <button class="button button-gold button-full" type="button" id="addToCart">Adicionar à sacola</button>
      <div class="quick-features"><span>Compra segura</span><span>Atendimento especializado</span><span>Composição: ${product.composition}</span></div>
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

function cartTotal() {
  return cartSubtotal();
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
  const paymentNames = { pix: "Pix", card: "Cartão", boleto: "Boleto" };
  const itemLabel = cartDetails().reduce((sum, item) => sum + item.quantity, 0);
  $("#checkoutReview").innerHTML = `
    <div class="review-line"><span>Itens</span><strong>${itemLabel}</strong></div>
    <div class="review-line"><span>Entrega</span><strong>Conforme endereço</strong></div>
    <div class="review-line"><span>Pagamento</span><strong>${paymentNames[data.get("payment")]}</strong></div>
    <div class="review-line"><span>Enviar para</span><strong>${data.get("city") || "Endereço informado"}</strong></div>
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

renderProducts();
updateCart();
