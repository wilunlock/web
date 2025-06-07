// Global Variables
let currentSlide = 0
let currentBgImage = 0
let backgroundImages = [
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
]

const slides = [
  {
    title: "BOX&DONGLE",
    subtitle: "ACTIVATION",
    description: "INSTANT SERVICE 24/7 API",
    contact: "WORLDWIDE UNLOCK SERVICES",
  },
  {
    title: "PREMIUM",
    subtitle: "TOOLS",
    description: "PROFESSIONAL UNLOCK SOLUTIONS",
    contact: "ENTERPRISE GRADE SERVICES",
  },
]

let isLoggedIn = false
let currentUser = null
let previewIndex = 0
let editingNoticeId = null
let editingBrandId = null
let editingUserId = null

// Variables globales para contenido
let notices = [
  {
    id: 1,
    type: "important",
    title: "¡AVISO IMPORTANTE!",
    content:
      'Estimado Cliente, Todos Nuestros Servicios Funcionan de Lunes a Viernes (Sábado + Domingo es Feriado) Por Favor Antes de Realizar el Pedido Debe Contar el Tiempo Máximo de Servicio y Días Laborables "Lunes a Viernes" También Nuestro Método de Pago Funciona Manualmente, Así que Después de Completar el Pago Por Favor Contáctenos en Support Ticket O WhatsApp/Telegram',
    active: true,
  },
  {
    id: 2,
    type: "disclaimer",
    title: "¡AVISO DE DESCARGO!",
    content:
      "Desbloquear, Reparar, Cambiar IMEI Tal vez sea ilegal en tu País, así que por favor verifica las leyes y reglas de tu país antes de usar nuestros Servicios.",
    active: true,
  },
]

let brands = [
  { id: 1, name: "OCTOPUS", emoji: "🐙", gradient: "gradient-blue" },
  { id: 2, name: "Z3X", emoji: "⚡", gradient: "gradient-purple" },
  { id: 3, name: "UMT", emoji: "🔧", gradient: "gradient-green" },
  { id: 4, name: "LOCKR", emoji: "🔒", gradient: "gradient-red" },
  { id: 5, name: "XIAOMI", emoji: "📱", gradient: "gradient-orange" },
  { id: 6, name: "UNLOCKTOOL", emoji: "🔓", gradient: "gradient-indigo" },
  { id: 7, name: "SAMSUNG", emoji: "📲", gradient: "gradient-blue-dark" },
  { id: 8, name: "HUAWEI", emoji: "🌟", gradient: "gradient-red-dark" },
]

let users = [
  {
    id: 1,
    username: "admin",
    email: "admin@wilunlock.com",
    role: "admin",
    password: "Wilma3956as",
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Logo Animation Functions
function initializeLogoAnimations() {
  const logoImage = document.querySelector(".logo-image")
  const footerLogoImage = document.querySelector(".footer-logo-image")

  // Add hover animations
  if (logoImage) {
    logoImage.addEventListener("mouseenter", () => {
      logoImage.classList.add("animate")
    })

    logoImage.addEventListener("mouseleave", () => {
      logoImage.classList.remove("animate")
    })
  }

  // Animate logo on page load
  setTimeout(() => {
    if (logoImage) {
      logoImage.classList.add("animate")
      setTimeout(() => {
        logoImage.classList.remove("animate")
      }, 3000)
    }
  }, 1000)
}

// Add favicon
function addFavicon() {
  const favicon = document.createElement("link")
  favicon.rel = "icon"
  favicon.type = "image/jpeg"
  favicon.href = "assets/logo.jpeg"
  document.head.appendChild(favicon)

  // Also add apple touch icon
  const appleFavicon = document.createElement("link")
  appleFavicon.rel = "apple-touch-icon"
  appleFavicon.href = "assets/logo.jpeg"
  document.head.appendChild(appleFavicon)
}

function initializeApp() {
  loadSettings()
  loadBackgroundImages()
  loadNotices()
  loadBrands()
  loadUsers()
  initializeHero()
  initializeBrands()
  checkLoginStatus()
  initializeLogoAnimations() // Add this line
  addFavicon() // Add this line

  // Auto-change slides every 5 seconds
  setInterval(nextSlide, 5000)

  // Auto-change background images every 5 seconds
  setInterval(nextBackground, 5000)

  // Initialize admin forms
  initializeAdminForms()
}

// Settings Management
function loadSettings() {
  const savedSettings = localStorage.getItem("wilunlock-settings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    updateSiteContent(settings)
  }
}

function updateSiteContent(settings) {
  // Update site name and description
  if (settings.siteName) {
    document.getElementById("siteName").textContent = settings.siteName
    document.getElementById("footerSiteName").textContent = settings.siteName
  }
  if (settings.siteDescription) {
    document.getElementById("siteDescription").textContent = settings.siteDescription
    document.getElementById("footerSiteDescription").textContent = settings.siteDescription
  }
  if (settings.email) {
    document.getElementById("headerEmail").textContent = settings.email
    document.getElementById("heroEmail").textContent = settings.email
    document.getElementById("footerEmail").textContent = settings.email
  }

  // Update hero content
  if (settings.heroTitle) {
    document.getElementById("heroTitle").textContent = settings.heroTitle
    slides[0].title = settings.heroTitle
  }
  if (settings.heroSubtitle) {
    document.getElementById("heroSubtitle").textContent = settings.heroSubtitle
    slides[0].subtitle = settings.heroSubtitle
  }
  if (settings.heroDescription) {
    document.getElementById("heroDescription").textContent = settings.heroDescription
    slides[0].description = settings.heroDescription
  }
  if (settings.heroContact) {
    document.getElementById("heroContact").textContent = settings.heroContact
    slides[0].contact = settings.heroContact
  }
}

// Background Images Management
function loadBackgroundImages() {
  const savedImages = localStorage.getItem("wilunlock-bg-images")
  if (savedImages) {
    backgroundImages = JSON.parse(savedImages)
  }
  updateBackgroundImages()
  updateBgIndicators()
}

function updateBackgroundImages() {
  const container = document.getElementById("heroBackgrounds")
  if (!container) return

  container.innerHTML = ""

  backgroundImages.forEach((image, index) => {
    const bgDiv = document.createElement("div")
    bgDiv.className = `hero-bg ${index === currentBgImage ? "active" : ""}`
    bgDiv.innerHTML = `<img src="${image}" alt="Background ${index + 1}">`
    container.appendChild(bgDiv)
  })
}

function updateBgIndicators() {
  const container = document.getElementById("bgIndicators")
  if (!container) return

  container.innerHTML = ""

  backgroundImages.forEach((_, index) => {
    const indicator = document.createElement("button")
    indicator.className = `bg-indicator ${index === currentBgImage ? "active" : ""}`
    indicator.onclick = () => setBgImage(index)
    container.appendChild(indicator)
  })
}

function setBgImage(index) {
  currentBgImage = index
  updateBackgroundImages()
  updateBgIndicators()
}

function nextBackground() {
  currentBgImage = (currentBgImage + 1) % backgroundImages.length
  updateBackgroundImages()
  updateBgIndicators()
}

// Hero Slides Management
function initializeHero() {
  updateSlideContent()
  updateSlideIndicators()
}

function updateSlideContent() {
  const slide = slides[currentSlide]
  document.getElementById("heroTitle").textContent = slide.title
  document.getElementById("heroSubtitle").textContent = slide.subtitle
  document.getElementById("heroDescription").textContent = slide.description
  document.getElementById("heroContact").textContent = slide.contact
}

function updateSlideIndicators() {
  const indicators = document.querySelectorAll(".indicator")
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })
}

function setSlide(index) {
  currentSlide = index
  updateSlideContent()
  updateSlideIndicators()
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  updateSlideContent()
  updateSlideIndicators()
}

// Brands Management
function loadBrands() {
  const savedBrands = localStorage.getItem("wilunlock-brands")
  if (savedBrands) {
    brands = JSON.parse(savedBrands)
  }
  renderBrands()
}

function renderBrands() {
  const container = document.getElementById("brandsGrid")
  if (!container) return

  container.innerHTML = ""

  brands.forEach((brand, index) => {
    const item = document.createElement("div")
    item.className = "brand-item"
    item.setAttribute("data-delay", index * 100)
    item.innerHTML = `
      <div class="brand-icon ${brand.gradient}">${brand.emoji}</div>
      <p>${brand.name}</p>
    `
    container.appendChild(item)
  })
}

function initializeBrands() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".brand-item")
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("visible")
          }, index * 100)
        })
      }
    })
  })

  const brandsSection = document.querySelector(".brands")
  if (brandsSection) {
    observer.observe(brandsSection)
  }
}

// Notices Management
function loadNotices() {
  const savedNotices = localStorage.getItem("wilunlock-notices")
  if (savedNotices) {
    notices = JSON.parse(savedNotices)
  }
  renderNotices()
}

function renderNotices() {
  const container = document.getElementById("noticesContainer")
  if (!container) return

  container.innerHTML = ""

  notices
    .filter((notice) => notice.active)
    .forEach((notice) => {
      const item = document.createElement("div")
      item.className = `notice-card ${notice.type}`
      item.innerHTML = `
      <h3>${notice.title}</h3>
      <p>${notice.content}</p>
    `
      container.appendChild(item)
    })
}

// Users Management
function loadUsers() {
  const savedUsers = localStorage.getItem("wilunlock-users")
  if (savedUsers) {
    users = JSON.parse(savedUsers)
  }
}

// Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.classList.toggle("active")
}

// Login Modal
function openLoginModal() {
  document.getElementById("loginModal").classList.add("active")
  showLogin()
}

function closeLoginModal() {
  document.getElementById("loginModal").classList.remove("active")
  clearLoginForm()
}

function showLogin() {
  document.getElementById("modalTitle").textContent = "Iniciar Sesión"
  document.getElementById("loginForm").style.display = "block"
  document.getElementById("registerInfo").style.display = "none"
}

function showRegister() {
  document.getElementById("modalTitle").textContent = "Crear Cuenta"
  document.getElementById("loginForm").style.display = "none"
  document.getElementById("registerInfo").style.display = "block"
}

function clearLoginForm() {
  document.getElementById("username").value = ""
  document.getElementById("password").value = ""
  document.getElementById("errorMessage").classList.remove("show")
}

// Login Form Handler
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value
  const errorMessage = document.getElementById("errorMessage")

  // Check user credentials
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    currentUser = user
    isLoggedIn = true
    localStorage.setItem("wilunlock-user", JSON.stringify(currentUser))

    closeLoginModal()
    updateLoginButton()

    if (user.role === "admin") {
      showAdminPanel()
    }
  } else {
    errorMessage.textContent = "Usuario o contraseña incorrectos"
    errorMessage.classList.add("show")
  }
})

function checkLoginStatus() {
  const savedUser = localStorage.getItem("wilunlock-user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    isLoggedIn = true
    updateLoginButton()
  }
}

function updateLoginButton() {
  const loginBtn = document.querySelector(".login-btn")
  if (isLoggedIn && currentUser) {
    loginBtn.innerHTML = `
      <i class="fas fa-user"></i>
      <span>${currentUser.username}</span>
    `
    if (currentUser.role === "admin") {
      loginBtn.onclick = showAdminPanel
    }
  }
}

function logout() {
  isLoggedIn = false
  currentUser = null
  localStorage.removeItem("wilunlock-user")
  location.reload()
}

// Telegram Integration
function openTelegram() {
  window.open("https://t.me/wilunlockOficial", "_blank")
  closeLoginModal()
}

// Cookie Notice
function acceptCookies() {
  document.getElementById("cookieNotice").style.display = "none"
  localStorage.setItem("cookies-accepted", "true")
}

// Check if cookies were already accepted
if (localStorage.getItem("cookies-accepted")) {
  document.getElementById("cookieNotice").style.display = "none"
}

// Admin Panel Functions
function showAdminPanel() {
  if (!isLoggedIn || !currentUser?.role === "admin") {
    openLoginModal()
    return
  }

  document.getElementById("adminPanel").style.display = "block"
  document.getElementById("adminUsername").textContent = currentUser.username

  // Add logo to admin header if not exists
  const adminNav = document.querySelector(".admin-nav")
  if (adminNav && !adminNav.querySelector(".admin-logo")) {
    const logoImg = document.createElement("img")
    logoImg.src = "assets/logo.jpeg"
    logoImg.alt = "Wilunlock Logo"
    logoImg.className = "admin-logo"
    adminNav.insertBefore(logoImg, adminNav.firstChild)
  }

  showAdminSection("settings")
  loadAdminData()
}

function exitAdmin() {
  document.getElementById("adminPanel").style.display = "none"
}

function showAdminSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".admin-section").forEach((section) => {
    section.classList.remove("active")
  })

  // Remove active class from all menu items
  document.querySelectorAll(".admin-menu-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Show selected section
  const section = document.getElementById(sectionName + "Section")
  if (section) {
    section.classList.add("active")
  }

  // Add active class to clicked menu item
  event.target.classList.add("active")

  // Load section-specific data
  if (sectionName === "backgrounds") {
    loadAdminBackgrounds()
  } else if (sectionName === "content") {
    loadContentManagement()
  } else if (sectionName === "users") {
    loadUsersManagement()
  }
}

function loadAdminData() {
  // Load settings
  const savedSettings = localStorage.getItem("wilunlock-settings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    document.getElementById("siteNameInput").value = settings.siteName || "WILUNLOCK"
    document.getElementById("siteDescriptionInput").value = settings.siteDescription || "WORLDWIDE UNLOCK SOURCE"
    document.getElementById("siteEmailInput").value = settings.email || "wilunlock@gmail.com"
    document.getElementById("heroTitleInput").value = settings.heroTitle || "BOX&DONGLE"
    document.getElementById("heroSubtitleInput").value = settings.heroSubtitle || "ACTIVATION"
    document.getElementById("heroDescriptionInput").value = settings.heroDescription || "INSTANT SERVICE 24/7 API"
    document.getElementById("heroContactInput").value = settings.heroContact || "WORLDWIDE UNLOCK SERVICES"
  }

  // Load background images for admin
  loadAdminBackgrounds()
}

// Initialize Admin Forms
function initializeAdminForms() {
  // Settings Form
  document.getElementById("settingsForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const settings = {
      siteName: document.getElementById("siteNameInput").value,
      siteDescription: document.getElementById("siteDescriptionInput").value,
      email: document.getElementById("siteEmailInput").value,
      heroTitle: document.getElementById("heroTitleInput").value,
      heroSubtitle: document.getElementById("heroSubtitleInput").value,
      heroDescription: document.getElementById("heroDescriptionInput").value,
      heroContact: document.getElementById("heroContactInput").value,
    }

    localStorage.setItem("wilunlock-settings", JSON.stringify(settings))
    updateSiteContent(settings)

    // Update slides
    slides[0].title = settings.heroTitle
    slides[0].subtitle = settings.heroSubtitle
    slides[0].description = settings.heroDescription
    slides[0].contact = settings.heroContact

    showSuccessMessage("Configuración guardada exitosamente")
  })

  // Notice Form
  document.getElementById("noticeFormElement").addEventListener("submit", (e) => {
    e.preventDefault()

    const title = document.getElementById("noticeTitle").value.trim()
    const content = document.getElementById("noticeContent").value.trim()
    const type = document.getElementById("noticeType").value

    if (!title || !content) {
      showErrorMessage("Por favor completa todos los campos")
      return
    }

    if (editingNoticeId) {
      // Update existing notice
      const notice = notices.find((n) => n.id === editingNoticeId)
      if (notice) {
        notice.title = title
        notice.content = content
        notice.type = type
        showSuccessMessage("Aviso actualizado exitosamente")
      }
    } else {
      // Create new notice
      const newNotice = {
        id: Date.now(),
        title,
        content,
        type,
        active: true,
      }
      notices.push(newNotice)
      showSuccessMessage("Aviso creado exitosamente")
    }

    saveNotices()
    renderNoticesList()
    renderNotices()
    cancelNoticeEdit()
  })

  // Brand Form
  document.getElementById("brandFormElement").addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("brandName").value.trim()
    const emoji = document.getElementById("brandEmoji").value.trim()
    const gradient = document.getElementById("brandGradient").value

    if (!name || !emoji) {
      showErrorMessage("Por favor completa todos los campos")
      return
    }

    if (editingBrandId) {
      // Update existing brand
      const brand = brands.find((b) => b.id === editingBrandId)
      if (brand) {
        brand.name = name
        brand.emoji = emoji
        brand.gradient = gradient
        showSuccessMessage("Marca actualizada exitosamente")
      }
    } else {
      // Create new brand
      const newBrand = {
        id: Date.now(),
        name,
        emoji,
        gradient,
      }
      brands.push(newBrand)
      showSuccessMessage("Marca creada exitosamente")
    }

    saveBrands()
    renderBrandsAdmin()
    renderBrands()
    cancelBrandEdit()
  })

  // User Form
  document.getElementById("userFormElement").addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("newUsername").value.trim()
    const password = document.getElementById("newPassword").value.trim()
    const email = document.getElementById("newUserEmail").value.trim()
    const role = document.getElementById("newUserRole").value

    if (!username || !password || !email) {
      showErrorMessage("Por favor completa todos los campos")
      return
    }

    // Check if username already exists
    if (users.find((u) => u.username === username && u.id !== editingUserId)) {
      showErrorMessage("El nombre de usuario ya existe")
      return
    }

    if (editingUserId) {
      // Update existing user
      const user = users.find((u) => u.id === editingUserId)
      if (user) {
        user.username = username
        user.password = password
        user.email = email
        user.role = role
        showSuccessMessage("Usuario actualizado exitosamente")
      }
    } else {
      // Create new user
      const newUser = {
        id: Date.now(),
        username,
        password,
        email,
        role,
      }
      users.push(newUser)
      showSuccessMessage("Usuario creado exitosamente")
    }

    saveUsers()
    renderUsersList()
    cancelUserEdit()
  })
}

// Background Management Functions
function loadAdminBackgrounds() {
  updateBgGrid()
  updatePreview()
  updatePreviewIndicators()
  updateImageCount()
}

function updateBgGrid() {
  const grid = document.getElementById("bgGrid")
  if (!grid) return

  grid.innerHTML = ""

  backgroundImages.forEach((image, index) => {
    const item = document.createElement("div")
    item.className = "bg-item"
    item.innerHTML = `
      <img src="${image}" alt="Background ${index + 1}" onerror="this.src='https://via.placeholder.com/200x100?text=Error'">
      <div class="bg-item-overlay">
        <div class="bg-item-actions">
          <button onclick="setPreview(${index})" title="Ver en preview">
            <i class="fas fa-eye"></i>
          </button>
          <button onclick="removeBackground(${index})" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="bg-item-info">
        <p>Imagen ${index + 1}</p>
        <p class="text-xs">${image.startsWith("data:") ? "Subida" : "URL"}</p>
      </div>
    `
    grid.appendChild(item)
  })
}

function updatePreview() {
  const previewImage = document.getElementById("previewImage")
  if (previewImage && backgroundImages[previewIndex]) {
    previewImage.src = backgroundImages[previewIndex]
    previewImage.onerror = function () {
      this.src = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop"
    }
  }
}

function updatePreviewIndicators() {
  const container = document.getElementById("previewIndicators")
  if (!container) return

  container.innerHTML = ""

  backgroundImages.forEach((_, index) => {
    const indicator = document.createElement("button")
    indicator.className = `preview-indicator ${index === previewIndex ? "active" : ""}`
    indicator.onclick = () => setPreview(index)
    container.appendChild(indicator)
  })
}

function updateImageCount() {
  const countElement = document.getElementById("imageCount")
  const warningElement = document.getElementById("maxImagesWarning")
  const addUrlBtn = document.getElementById("addUrlBtn")
  const fileInput = document.getElementById("bgFileInput")

  if (countElement) {
    countElement.textContent = backgroundImages.length
  }

  const isMaxReached = backgroundImages.length >= 6

  if (warningElement) {
    warningElement.style.display = isMaxReached ? "block" : "none"
  }

  if (addUrlBtn) {
    addUrlBtn.disabled = isMaxReached
    addUrlBtn.textContent = isMaxReached ? "Máximo alcanzado" : "Agregar"
  }

  if (fileInput) {
    fileInput.disabled = isMaxReached
  }
}

function setPreview(index) {
  previewIndex = index
  updatePreview()
  updatePreviewIndicators()
}

function prevPreview() {
  previewIndex = previewIndex > 0 ? previewIndex - 1 : backgroundImages.length - 1
  updatePreview()
  updatePreviewIndicators()
}

function nextPreview() {
  previewIndex = previewIndex < backgroundImages.length - 1 ? previewIndex + 1 : 0
  updatePreview()
  updatePreviewIndicators()
}

function addBackgroundFromUrl() {
  const url = document.getElementById("newBgUrl").value.trim()
  if (!url) {
    showErrorMessage("Por favor ingresa una URL válida")
    return
  }

  if (backgroundImages.length >= 6) {
    showErrorMessage("Máximo 6 imágenes permitidas")
    return
  }

  // Validate image URL
  const img = new Image()
  img.onload = () => {
    backgroundImages.push(url)
    document.getElementById("newBgUrl").value = ""
    updateBgGrid()
    updateImageCount()
    showSuccessMessage("Imagen agregada exitosamente")
  }
  img.onerror = () => {
    showErrorMessage("No se pudo cargar la imagen. Verifica la URL.")
  }
  img.src = url
}

function addBackgroundFromFile(input) {
  const file = input.files[0]
  if (!file) return

  if (backgroundImages.length >= 6) {
    showErrorMessage("Máximo 6 imágenes permitidas")
    input.value = ""
    return
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    showErrorMessage("Por favor selecciona un archivo de imagen válido")
    input.value = ""
    return
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    showErrorMessage("El archivo es muy grande. Máximo 2MB permitido")
    input.value = ""
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    backgroundImages.push(e.target.result)
    updateBgGrid()
    updateImageCount()
    showSuccessMessage("Imagen subida exitosamente")
  }
  reader.onerror = () => {
    showErrorMessage("Error al leer el archivo")
  }
  reader.readAsDataURL(file)
  input.value = ""
}

function removeBackground(index) {
  if (backgroundImages.length <= 1) {
    showErrorMessage("Debe mantener al menos una imagen de fondo")
    return
  }

  if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
    backgroundImages.splice(index, 1)
    updateBgGrid()
    updateImageCount()

    // Adjust preview index if necessary
    if (previewIndex >= backgroundImages.length) {
      previewIndex = Math.max(0, backgroundImages.length - 1)
    }
    updatePreview()
    updatePreviewIndicators()
    showSuccessMessage("Imagen eliminada exitosamente")
  }
}

function saveBackgrounds() {
  localStorage.setItem("wilunlock-bg-images", JSON.stringify(backgroundImages))
  loadBackgroundImages() // Update main site
  showSuccessMessage("Imágenes de fondo guardadas exitosamente")
}

// Content Management Functions
function loadContentManagement() {
  renderNoticesList()
  renderBrandsAdmin()
}

function renderNoticesList() {
  const container = document.getElementById("noticesList")
  if (!container) return

  container.innerHTML = ""

  notices.forEach((notice) => {
    const item = document.createElement("div")
    item.className = `notice-item ${notice.type}`
    item.innerHTML = `
      <div class="notice-header">
        <div>
          <div class="notice-title">${notice.title}</div>
          <span class="notice-type-badge ${notice.type}">
            ${notice.type === "important" ? "Importante" : notice.type === "disclaimer" ? "Descargo" : "Información"}
          </span>
        </div>
        <div class="notice-actions">
          <button class="btn-edit" onclick="editNotice(${notice.id})" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-delete" onclick="deleteNotice(${notice.id})" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="notice-content">${notice.content}</div>
    `
    container.appendChild(item)
  })
}

function editNotice(id) {
  const notice = notices.find((n) => n.id === id)
  if (!notice) return

  editingNoticeId = id
  document.getElementById("noticeTitle").value = notice.title
  document.getElementById("noticeContent").value = notice.content
  document.getElementById("noticeType").value = notice.type
  document.getElementById("noticeFormTitle").textContent = "Editar Aviso"
  document.getElementById("saveNoticeText").textContent = "Actualizar Aviso"
  document.getElementById("cancelNoticeBtn").style.display = "inline-block"
}

function deleteNotice(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este aviso?")) {
    notices = notices.filter((n) => n.id !== id)
    saveNotices()
    renderNoticesList()
    renderNotices()
    showSuccessMessage("Aviso eliminado exitosamente")
  }
}

function cancelNoticeEdit() {
  editingNoticeId = null
  document.getElementById("noticeFormElement").reset()
  document.getElementById("noticeFormTitle").textContent = "Nuevo Aviso"
  document.getElementById("saveNoticeText").textContent = "Crear Aviso"
  document.getElementById("cancelNoticeBtn").style.display = "none"
}

function saveNotices() {
  localStorage.setItem("wilunlock-notices", JSON.stringify(notices))
}

// Brand Management Functions
function renderBrandsAdmin() {
  const container = document.getElementById("brandsGridAdmin")
  if (!container) return

  container.innerHTML = ""

  brands.forEach((brand) => {
    const item = document.createElement("div")
    item.className = "brand-item-admin"
    item.innerHTML = `
      <div class="brand-icon ${brand.gradient}">${brand.emoji}</div>
      <div class="brand-name">${brand.name}</div>
      <div class="brand-actions">
        <button class="btn-edit" onclick="editBrand(${brand.id})" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-delete" onclick="deleteBrand(${brand.id})" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
    container.appendChild(item)
  })
}

function showBrandForm() {
  document.getElementById("brandForm").style.display = "block"
  document.getElementById("addBrandBtn").style.display = "none"
}

function editBrand(id) {
  const brand = brands.find((b) => b.id === id)
  if (!brand) return

  editingBrandId = id
  document.getElementById("brandName").value = brand.name
  document.getElementById("brandEmoji").value = brand.emoji
  document.getElementById("brandGradient").value = brand.gradient
  document.getElementById("brandFormTitle").textContent = "Editar Marca"
  document.getElementById("saveBrandText").textContent = "Actualizar Marca"
  document.getElementById("brandForm").style.display = "block"
  document.getElementById("addBrandBtn").style.display = "none"
}

function deleteBrand(id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta marca?")) {
    brands = brands.filter((b) => b.id !== id)
    saveBrands()
    renderBrandsAdmin()
    renderBrands()
    showSuccessMessage("Marca eliminada exitosamente")
  }
}

function cancelBrandEdit() {
  editingBrandId = null
  document.getElementById("brandFormElement").reset()
  document.getElementById("brandFormTitle").textContent = "Nueva Marca"
  document.getElementById("saveBrandText").textContent = "Crear Marca"
  document.getElementById("brandForm").style.display = "none"
  document.getElementById("addBrandBtn").style.display = "block"
}

function saveBrands() {
  localStorage.setItem("wilunlock-brands", JSON.stringify(brands))
}

// Users Management Functions
function loadUsersManagement() {
  renderUsersList()
}

function renderUsersList() {
  const container = document.getElementById("usersList")
  if (!container) return

  container.innerHTML = ""

  users.forEach((user) => {
    const item = document.createElement("div")
    item.className = "user-item"
    item.innerHTML = `
      <div class="user-info">
        <h4>${user.username}</h4>
        <p>${user.email}</p>
        <span class="user-role ${user.role}">${user.role === "admin" ? "Administrador" : "Usuario"}</span>
      </div>
      <div class="user-actions">
        <button class="btn-edit" onclick="editUser(${user.id})" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        ${
          user.id !== 1
            ? `<button class="btn-delete" onclick="deleteUser(${user.id})" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>`
            : ""
        }
      </div>
    `
    container.appendChild(item)
  })
}

function showUserForm() {
  document.getElementById("userForm").style.display = "block"
  document.getElementById("addUserBtn").style.display = "none"
}

function editUser(id) {
  const user = users.find((u) => u.id === id)
  if (!user) return

  editingUserId = id
  document.getElementById("newUsername").value = user.username
  document.getElementById("newPassword").value = user.password
  document.getElementById("newUserEmail").value = user.email
  document.getElementById("newUserRole").value = user.role
  document.getElementById("userFormTitle").textContent = "Editar Usuario"
  document.getElementById("saveUserText").textContent = "Actualizar Usuario"
  document.getElementById("userForm").style.display = "block"
  document.getElementById("addUserBtn").style.display = "none"
}

function deleteUser(id) {
  if (id === 1) {
    showErrorMessage("No se puede eliminar el usuario administrador principal")
    return
  }

  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    users = users.filter((u) => u.id !== id)
    saveUsers()
    renderUsersList()
    showSuccessMessage("Usuario eliminado exitosamente")
  }
}

function cancelUserEdit() {
  editingUserId = null
  document.getElementById("userFormElement").reset()
  document.getElementById("userFormTitle").textContent = "Nuevo Usuario"
  document.getElementById("saveUserText").textContent = "Crear Usuario"
  document.getElementById("userForm").style.display = "none"
  document.getElementById("addUserBtn").style.display = "block"
}

function saveUsers() {
  localStorage.setItem("wilunlock-users", JSON.stringify(users))
}

// Notification Functions
function showSuccessMessage(message) {
  const notification = document.createElement("div")
  notification.className = "success-notification"
  notification.innerHTML = `
    <i class="fas fa-check"></i>
    <span>${message}</span>
  `
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 4000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

function showErrorMessage(message) {
  const notification = document.createElement("div")
  notification.className = "error-notification"
  notification.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    <span>${message}</span>
  `
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--error-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 4000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 4000)
}

// Keyboard shortcuts for admin
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (document.getElementById("loginModal").classList.contains("active")) {
      closeLoginModal()
    } else if (document.getElementById("adminPanel").style.display === "block") {
      exitAdmin()
    }
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})
