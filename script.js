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

let currentUser = null
let previewIndex = 0
let editingNoticeId = null
let editingToolId = null
let editingUserId = null
let pendingToolImage = null

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

let tools = [
  { id: 1, name: "OCTOPUS", image: null, gradient: "gradient-blue" },
  { id: 2, name: "Z3X", image: null, gradient: "gradient-purple" },
  { id: 3, name: "UMT", image: null, gradient: "gradient-green" },
  { id: 4, name: "LOCKR", image: null, gradient: "gradient-red" },
  { id: 5, name: "XIAOMI", image: null, gradient: "gradient-orange" },
  { id: 6, name: "UNLOCKTOOL", image: null, gradient: "gradient-indigo" },
  { id: 7, name: "SAMSUNG", image: null, gradient: "gradient-blue-dark" },
  { id: 8, name: "HUAWEI", image: null, gradient: "gradient-red-dark" },
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
  loadSiteLogo()
  loadBackgroundImages()
  loadNotices()
  loadTools()
  loadUsers()
  initializeHero()
  initializeTools()
  checkLoginStatus()
  initializeLogoAnimations()
  addFavicon()

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

// Logo Management Functions
let currentLogoUrl = "assets/logo.jpeg"
let pendingLogoUrl = null

function loadSiteLogo() {
  const savedLogo = localStorage.getItem("wilunlock-logo")
  if (savedLogo) {
    currentLogoUrl = savedLogo
    updateAllLogos(currentLogoUrl)
  }
}

function updateAllLogos(logoUrl) {
  // Update main header logo
  const headerLogo = document.querySelector(".logo-image")
  if (headerLogo) {
    headerLogo.src = logoUrl
  }

  // Update footer logo
  const footerLogo = document.querySelector(".footer-logo-image")
  if (footerLogo) {
    footerLogo.src = logoUrl
  }

  // Update admin logo
  const adminLogo = document.querySelector(".admin-logo")
  if (adminLogo) {
    adminLogo.src = logoUrl
  }

  // Update favicon
  updateFavicon(logoUrl)

  // Update preview in admin
  const previewLogo = document.getElementById("currentLogoPreview")
  if (previewLogo) {
    previewLogo.src = logoUrl
  }
}

function updateFavicon(logoUrl) {
  // Remove existing favicons
  const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')
  existingFavicons.forEach((favicon) => favicon.remove())

  // Add new favicon
  const favicon = document.createElement("link")
  favicon.rel = "icon"
  favicon.type = "image/x-icon"
  favicon.href = logoUrl
  document.head.appendChild(favicon)

  // Add apple touch icon
  const appleFavicon = document.createElement("link")
  appleFavicon.rel = "apple-touch-icon"
  appleFavicon.href = logoUrl
  document.head.appendChild(appleFavicon)
}

function previewLogoFromUrl() {
  const url = document.getElementById("logoUrlInput").value.trim()
  if (!url) {
    showErrorMessage("Por favor ingresa una URL válida")
    return
  }

  const previewImage = document.getElementById("currentLogoPreview")
  previewImage.classList.add("logo-loading")

  // Validate image URL
  const img = new Image()
  img.onload = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-success")
    previewImage.src = url
    pendingLogoUrl = url

    setTimeout(() => {
      previewImage.classList.remove("logo-success")
    }, 2000)

    showSuccessMessage("Vista previa cargada. Guarda los cambios para aplicar.")
  }

  img.onerror = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-error")

    setTimeout(() => {
      previewImage.classList.remove("logo-error")
    }, 2000)

    showErrorMessage("No se pudo cargar la imagen. Verifica la URL.")
  }

  img.src = url
}

function previewLogoFromFile(input) {
  const file = input.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith("image/")) {
    showErrorMessage("Por favor selecciona un archivo de imagen válido")
    input.value = ""
    return
  }

  // Validate file size (1MB max)
  if (file.size > 1024 * 1024) {
    showErrorMessage("El archivo es muy grande. Máximo 1MB permitido")
    input.value = ""
    return
  }

  const previewImage = document.getElementById("currentLogoPreview")
  previewImage.classList.add("logo-loading")

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-success")
    previewImage.src = e.target.result
    pendingLogoUrl = e.target.result

    setTimeout(() => {
      previewImage.classList.remove("logo-success")
    }, 2000)

    showSuccessMessage("Vista previa cargada. Guarda los cambios para aplicar.")
  }

  reader.onerror = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-error")

    setTimeout(() => {
      previewImage.classList.remove("logo-error")
    }, 2000)

    showErrorMessage("Error al leer el archivo")
  }

  reader.readAsDataURL(file)
  input.value = ""
}

function saveSiteLogo() {
  if (pendingLogoUrl) {
    currentLogoUrl = pendingLogoUrl
    localStorage.setItem("wilunlock-logo", currentLogoUrl)
    updateAllLogos(currentLogoUrl)
    pendingLogoUrl = null

    // Clear inputs
    document.getElementById("logoUrlInput").value = ""

    return true
  }
  return false
}

function resetLogoToDefault() {
  if (confirm("¿Estás seguro de que quieres restaurar el logo predeterminado?")) {
    currentLogoUrl = "assets/logo.jpeg"
    localStorage.removeItem("wilunlock-logo")
    updateAllLogos(currentLogoUrl)
    pendingLogoUrl = null

    // Clear inputs
    document.getElementById("logoUrlInput").value = ""

    showSuccessMessage("Logo restaurado al predeterminado")
  }
}

// Background Images Management - FIXED VERSION
function loadBackgroundImages() {
  const savedImages = localStorage.getItem("wilunlock-bg-images")
  if (savedImages) {
    backgroundImages = JSON.parse(savedImages)
  }
  updateBackgroundImages()
  updateBgIndicators()
  updateAdminBackgrounds()
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

function updateAdminBackgrounds() {
  const bgGrid = document.getElementById("bgGrid")
  const imageCount = document.getElementById("imageCount")
  const maxWarning = document.getElementById("maxImagesWarning")
  const addUrlBtn = document.getElementById("addUrlBtn")
  const bgFileInput = document.getElementById("bgFileInput")

  if (imageCount) {
    imageCount.textContent = backgroundImages.length
  }

  if (maxWarning && addUrlBtn && bgFileInput) {
    if (backgroundImages.length >= 6) {
      maxWarning.style.display = "block"
      addUrlBtn.disabled = true
      bgFileInput.disabled = true
    } else {
      maxWarning.style.display = "none"
      addUrlBtn.disabled = false
      bgFileInput.disabled = false
    }
  }

  if (!bgGrid) return

  bgGrid.innerHTML = ""

  backgroundImages.forEach((image, index) => {
    const item = document.createElement("div")
    item.className = "bg-item"
    item.innerHTML = `
      <img src="${image}" alt="Background ${index + 1}">
      <div class="bg-item-overlay">
        <div class="bg-item-actions">
          <button class="btn-edit" onclick="previewBgImage(${index})" title="Vista Previa">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-delete" onclick="removeBackgroundImage(${index})" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `
    bgGrid.appendChild(item)
  })

  updatePreviewIndicators()
}

function updatePreviewIndicators() {
  const container = document.getElementById("previewIndicators")
  if (!container) return

  container.innerHTML = ""

  backgroundImages.forEach((_, index) => {
    const indicator = document.createElement("button")
    indicator.className = index === previewIndex ? "active" : ""
    indicator.onclick = () => setPreviewImage(index)
    container.appendChild(indicator)
  })
}

function setPreviewImage(index) {
  if (index >= 0 && index < backgroundImages.length) {
    previewIndex = index
    const previewImage = document.getElementById("previewImage")
    if (previewImage) {
      previewImage.src = backgroundImages[index]
    }
    updatePreviewIndicators()
  }
}

function prevPreview() {
  const newIndex = previewIndex > 0 ? previewIndex - 1 : backgroundImages.length - 1
  setPreviewImage(newIndex)
}

function nextPreview() {
  const newIndex = previewIndex < backgroundImages.length - 1 ? previewIndex + 1 : 0
  setPreviewImage(newIndex)
}

function previewBgImage(index) {
  setPreviewImage(index)
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

function addBackgroundFromUrl() {
  if (backgroundImages.length >= 6) {
    showErrorMessage("Máximo 6 imágenes permitidas")
    return
  }

  const url = document.getElementById("newBgUrl").value.trim()
  if (!url) {
    showErrorMessage("Por favor ingresa una URL válida")
    return
  }

  // Validate image URL
  const img = new Image()
  img.onload = () => {
    backgroundImages.push(url)
    document.getElementById("newBgUrl").value = ""
    updateAdminBackgrounds()
    showSuccessMessage("Imagen agregada correctamente. Recuerda guardar los cambios.")
  }

  img.onerror = () => {
    showErrorMessage("No se pudo cargar la imagen. Verifica la URL.")
  }

  img.src = url
}

function addBackgroundFromFile(input) {
  if (backgroundImages.length >= 6) {
    showErrorMessage("Máximo 6 imágenes permitidas")
    input.value = ""
    return
  }

  const file = input.files[0]
  if (!file) return

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
    updateAdminBackgrounds()
    showSuccessMessage("Imagen agregada correctamente. Recuerda guardar los cambios.")
  }

  reader.onerror = () => {
    showErrorMessage("Error al leer el archivo")
  }

  reader.readAsDataURL(file)
  input.value = ""
}

function removeBackgroundImage(index) {
  if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
    backgroundImages.splice(index, 1)

    // Adjust current indices if necessary
    if (currentBgImage >= backgroundImages.length) {
      currentBgImage = Math.max(0, backgroundImages.length - 1)
    }
    if (previewIndex >= backgroundImages.length) {
      previewIndex = Math.max(0, backgroundImages.length - 1)
    }

    updateAdminBackgrounds()
    setPreviewImage(previewIndex)
    showSuccessMessage("Imagen eliminada correctamente. Recuerda guardar los cambios.")
  }
}

function saveBackgrounds() {
  localStorage.setItem("wilunlock-bg-images", JSON.stringify(backgroundImages))
  updateBackgroundImages()
  updateBgIndicators()
  showSuccessMessage("Fondos guardados correctamente")
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

// Tools Management
function loadTools() {
  const savedTools = localStorage.getItem("wilunlock-tools")
  if (savedTools) {
    tools = JSON.parse(savedTools)
  }
  renderTools()
}

function renderTools() {
  const container = document.getElementById("brandsGrid")
  if (!container) return

  container.innerHTML = ""

  tools.forEach((tool, index) => {
    const item = document.createElement("div")
    item.className = "brand-item"
    item.setAttribute("data-delay", index * 100)

    const iconContent = tool.image ? `<img src="${tool.image}" alt="${tool.name}">` : tool.name.charAt(0)

    item.innerHTML = `
      <div class="brand-icon ${tool.gradient}">${iconContent}</div>
      <p>${tool.name}</p>
    `
    container.appendChild(item)
  })
}

function initializeTools() {
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

  const toolsSection = document.querySelector(".brands")
  if (toolsSection) {
    observer.observe(toolsSection)
  }
}

// Tool Image Management Functions
function previewToolImageFromUrl() {
  const url = document.getElementById("toolImageUrl").value.trim()
  if (!url) {
    showErrorMessage("Por favor ingresa una URL válida")
    return
  }

  const previewImage = document.getElementById("currentToolPreview")
  previewImage.classList.add("logo-loading")

  // Validate image URL
  const img = new Image()
  img.onload = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-success")
    previewImage.src = url
    pendingToolImage = url

    setTimeout(() => {
      previewImage.classList.remove("logo-success")
    }, 2000)

    showSuccessMessage("Vista previa cargada.")
  }

  img.onerror = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-error")

    setTimeout(() => {
      previewImage.classList.remove("logo-error")
    }, 2000)

    showErrorMessage("No se pudo cargar la imagen. Verifica la URL.")
  }

  img.src = url
}

function previewToolImageFromFile(input) {
  const file = input.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith("image/")) {
    showErrorMessage("Por favor selecciona un archivo de imagen válido")
    input.value = ""
    return
  }

  // Validate file size (1MB max)
  if (file.size > 1024 * 1024) {
    showErrorMessage("El archivo es muy grande. Máximo 1MB permitido")
    input.value = ""
    return
  }

  const previewImage = document.getElementById("currentToolPreview")
  previewImage.classList.add("logo-loading")

  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-success")
    previewImage.src = e.target.result
    pendingToolImage = e.target.result

    setTimeout(() => {
      previewImage.classList.remove("logo-success")
    }, 2000)

    showSuccessMessage("Vista previa cargada.")
  }

  reader.onerror = () => {
    previewImage.classList.remove("logo-loading")
    previewImage.classList.add("logo-error")

    setTimeout(() => {
      previewImage.classList.remove("logo-error")
    }, 2000)

    showErrorMessage("Error al leer el archivo")
  }

  reader.readAsDataURL(file)
  input.value = ""
}

// Notices Management
function loadNotices() {
  const savedNotices = localStorage.getItem("wilunlock-notices")
  if (savedNotices) {
    notices = JSON.parse(savedNotices)
  }
  renderNotices()
}

// Login and Authentication Functions
function openLoginModal() {
  const modal = document.getElementById("loginModal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
    clearLoginForm()
  }
}

function clearLoginForm() {
  document.getElementById("username").value = ""
  document.getElementById("password").value = ""
  hideErrorMessage()
}

function showErrorMessage(message) {
  const errorDiv = document.getElementById("errorMessage")
  if (errorDiv) {
    errorDiv.textContent = message
    errorDiv.classList.add("show")
  }
}

function hideErrorMessage() {
  const errorDiv = document.getElementById("errorMessage")
  if (errorDiv) {
    errorDiv.classList.remove("show")
  }
}

function showSuccessMessage(message) {
  // Create a temporary success notification
  const notification = document.createElement("div")
  notification.className = "success-notification"
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: var(--success-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none"
  document.getElementById("registerInfo").style.display = "block"
  document.getElementById("modalTitle").textContent = "Crear Cuenta"
}

function showLogin() {
  document.getElementById("loginForm").style.display = "block"
  document.getElementById("registerInfo").style.display = "none"
  document.getElementById("modalTitle").textContent = "Iniciar Sesión"
}

function openTelegram() {
  window.open("https://t.me/wilunlockOficial", "_blank")
}

function checkLoginStatus() {
  const loggedInUser = localStorage.getItem("wilunlock-logge-user")
  if (loggedInUser) {
    const user = JSON.parse(loggedInUser)
    if (user.role === "admin") {
      // User is already logged in as admin
      currentUser = user
    }
  }
}

// Mobile Menu Functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  if (mobileMenu) {
    mobileMenu.classList.toggle("active")
  }
}

// Cookie Functions
function acceptCookies() {
  const cookieNotice = document.getElementById("cookieNotice")
  if (cookieNotice) {
    cookieNotice.style.display = "none"
    localStorage.setItem("cookies-accepted", "true")
  }
}

// Admin Panel Functions
function showAdminPanel() {
  document.getElementById("adminPanel").style.display = "block"
  document.body.style.overflow = "hidden"

  // Load admin data
  setTimeout(() => {
    renderToolsAdmin()
    renderNoticesAdmin()
    renderUsersAdmin()
    updateAdminBackgrounds()
    setPreviewImage(0)
  }, 100)
}

function exitAdmin() {
  document.getElementById("adminPanel").style.display = "none"
  document.body.style.overflow = "auto"
}

function logout() {
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
    localStorage.removeItem("wilunlock-logged-user")
    currentUser = null
    exitAdmin()
    showSuccessMessage("Sesión cerrada correctamente")
  }
}

function showAdminSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".admin-section")
  sections.forEach((section) => section.classList.remove("active"))

  // Show selected section
  const targetSection = document.getElementById(sectionName + "Section")
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update menu items
  const menuItems = document.querySelectorAll(".admin-menu-item")
  menuItems.forEach((item) => item.classList.remove("active"))

  // Find and activate the clicked menu item
  const activeMenuItem = document.querySelector(`[onclick="showAdminSection('${sectionName}')"]`)
  if (activeMenuItem) {
    activeMenuItem.classList.add("active")
  }
}

// Initialize Admin Forms
function initializeAdminForms() {
  // Settings Form
  const settingsForm = document.getElementById("settingsForm")
  if (settingsForm) {
    settingsForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveSettings()
    })
  }

  // Login Form
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleLogin()
    })
  }

  // Notice Form
  const noticeForm = document.getElementById("noticeFormElement")
  if (noticeForm) {
    noticeForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveNotice()
    })
  }

  // Tool Form
  const toolForm = document.getElementById("toolFormElement")
  if (toolForm) {
    toolForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveTool()
    })
  }

  // User Form
  const userForm = document.getElementById("userFormElement")
  if (userForm) {
    userForm.addEventListener("submit", (e) => {
      e.preventDefault()
      saveUser()
    })
  }
}

function handleLogin() {
  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()

  if (!username || !password) {
    showErrorMessage("Por favor completa todos los campos")
    return
  }

  // Find user
  const user = users.find((u) => u.username === username && u.password === password)

  if (user) {
    // Login successful
    localStorage.setItem("wilunlock-logged-user", JSON.stringify(user))
    currentUser = user
    closeLoginModal()

    if (user.role === "admin") {
      showAdminPanel()
      document.getElementById("adminUsername").textContent = user.username
    }

    showSuccessMessage(`Bienvenido, ${user.username}!`)
  } else {
    showErrorMessage("Usuario o contraseña incorrectos")
  }
}

function saveSettings() {
  const settings = {
    siteName: document.getElementById("siteNameInput").value,
    siteDescription: document.getElementById("siteDescriptionInput").value,
    email: document.getElementById("siteEmailInput").value,
    heroTitle: document.getElementById("heroTitleInput").value,
    heroSubtitle: document.getElementById("heroSubtitleInput").value,
    heroDescription: document.getElementById("heroDescriptionInput").value,
    heroContact: document.getElementById("heroContactInput").value,
  }

  // Save logo if there's a pending one
  const logoSaved = saveSiteLogo()

  localStorage.setItem("wilunlock-settings", JSON.stringify(settings))
  updateSiteContent(settings)

  showSuccessMessage("Configuración guardada correctamente")
}

// Tool Management Functions
function renderToolsAdmin() {
  const container = document.getElementById("toolsGridAdmin")
  if (!container) return

  container.innerHTML = ""

  tools.forEach((tool) => {
    const item = document.createElement("div")
    item.className = "tool-item-admin"

    const iconContent = tool.image ? `<img src="${tool.image}" alt="${tool.name}">` : tool.name.charAt(0)

    item.innerHTML = `
      <div class="brand-icon ${tool.gradient}">${iconContent}</div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-actions">
        <button class="btn-edit" onclick="editTool(${tool.id})" title="Editar">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn-delete" onclick="deleteTool(${tool.id})" title="Eliminar">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `
    container.appendChild(item)
  })
}

function showToolForm() {
  document.getElementById("toolForm").style.display = "block"
  document.getElementById("addToolBtn").style.display = "none"
  clearToolForm()
}

function hideToolForm() {
  document.getElementById("toolForm").style.display = "none"
  document.getElementById("addToolBtn").style.display = "block"
  clearToolForm()
}

function clearToolForm() {
  document.getElementById("toolName").value = ""
  document.getElementById("toolImageUrl").value = ""
  document.getElementById("toolImageFile").value = ""
  document.getElementById("toolGradient").value = "gradient-blue"
  document.getElementById("currentToolPreview").src = "https://via.placeholder.com/80x80?text=Tool"
  document.getElementById("toolFormTitle").textContent = "Nueva Herramienta"
  document.getElementById("saveToolText").textContent = "Crear Herramienta"
  editingToolId = null
  pendingToolImage = null
}

function saveTool() {
  const name = document.getElementById("toolName").value.trim()
  const gradient = document.getElementById("toolGradient").value

  if (!name) {
    showErrorMessage("Por favor ingresa el nombre de la herramienta")
    return
  }

  const toolData = {
    name: name,
    image: pendingToolImage,
    gradient: gradient,
  }

  if (editingToolId) {
    // Update existing tool
    const index = tools.findIndex((t) => t.id === editingToolId)
    if (index !== -1) {
      tools[index] = { ...tools[index], ...toolData }
      showSuccessMessage("Herramienta actualizada correctamente")
    }
  } else {
    // Create new tool
    const newTool = {
      id: Date.now(),
      ...toolData,
    }
    tools.push(newTool)
    showSuccessMessage("Herramienta creada correctamente")
  }

  localStorage.setItem("wilunlock-tools", JSON.stringify(tools))
  renderTools()
  renderToolsAdmin()
  hideToolForm()
}

function editTool(id) {
  const tool = tools.find((t) => t.id === id)
  if (!tool) return

  editingToolId = id
  document.getElementById("toolName").value = tool.name
  document.getElementById("toolGradient").value = tool.gradient

  if (tool.image) {
    document.getElementById("currentToolPreview").src = tool.image
    pendingToolImage = tool.image
  } else {
    document.getElementById("currentToolPreview").src = "https://via.placeholder.com/80x80?text=Tool"
    pendingToolImage = null
  }

  document.getElementById("toolFormTitle").textContent = "Editar Herramienta"
  document.getElementById("saveToolText").textContent = "Actualizar Herramienta"
  showToolForm()
}

function deleteTool(id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta herramienta?")) {
    tools = tools.filter((t) => t.id !== id)
    localStorage.setItem("wilunlock-tools", JSON.stringify(tools))
    renderTools()
    renderToolsAdmin()
    showSuccessMessage("Herramienta eliminada correctamente")
  }
}

function cancelToolEdit() {
  hideToolForm()
}

// Notice Management Functions
function renderNoticesAdmin() {
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
          <span class="notice-type-badge ${notice.type}">${notice.type}</span>
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

function saveNotice() {
  const title = document.getElementById("noticeTitle").value.trim()
  const content = document.getElementById("noticeContent").value.trim()
  const type = document.getElementById("noticeType").value

  if (!title || !content) {
    showErrorMessage("Por favor completa todos los campos")
    return
  }

  const noticeData = {
    title: title,
    content: content,
    type: type,
    active: true,
  }

  if (editingNoticeId) {
    // Update existing notice
    const index = notices.findIndex((n) => n.id === editingNoticeId)
    if (index !== -1) {
      notices[index] = { ...notices[index], ...noticeData }
      showSuccessMessage("Aviso actualizado correctamente")
    }
  } else {
    // Create new notice
    const newNotice = {
      id: Date.now(),
      ...noticeData,
    }
    notices.push(newNotice)
    showSuccessMessage("Aviso creado correctamente")
  }

  localStorage.setItem("wilunlock-notices", JSON.stringify(notices))
  renderNotices()
  renderNoticesAdmin()
  clearNoticeForm()
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
    localStorage.setItem("wilunlock-notices", JSON.stringify(notices))
    renderNotices()
    renderNoticesAdmin()
    showSuccessMessage("Aviso eliminado correctamente")
  }
}

function clearNoticeForm() {
  document.getElementById("noticeTitle").value = ""
  document.getElementById("noticeContent").value = ""
  document.getElementById("noticeType").value = "important"
  document.getElementById("noticeFormTitle").textContent = "Nuevo Aviso"
  document.getElementById("saveNoticeText").textContent = "Crear Aviso"
  document.getElementById("cancelNoticeBtn").style.display = "none"
  editingNoticeId = null
}

function cancelNoticeEdit() {
  clearNoticeForm()
}

// User Management Functions
function renderUsersAdmin() {
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
        <span class="user-role ${user.role}">${user.role}</span>
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
  clearUserForm()
}

function hideUserForm() {
  document.getElementById("userForm").style.display = "none"
  document.getElementById("addUserBtn").style.display = "block"
  clearUserForm()
}

function clearUserForm() {
  document.getElementById("newUsername").value = ""
  document.getElementById("newPassword").value = ""
  document.getElementById("newUserEmail").value = ""
  document.getElementById("newUserRole").value = "user"
  document.getElementById("userFormTitle").textContent = "Nuevo Usuario"
  document.getElementById("saveUserText").textContent = "Crear Usuario"
  editingUserId = null
}

function saveUser() {
  const username = document.getElementById("newUsername").value.trim()
  const password = document.getElementById("newPassword").value.trim()
  const email = document.getElementById("newUserEmail").value.trim()
  const role = document.getElementById("newUserRole").value

  if (!username || !password || !email) {
    showErrorMessage("Por favor completa todos los campos")
    return
  }

  // Check if username already exists
  const existingUser = users.find((u) => u.username === username && u.id !== editingUserId)
  if (existingUser) {
    showErrorMessage("El nombre de usuario ya existe")
    return
  }

  const userData = {
    username: username,
    password: password,
    email: email,
    role: role,
  }

  if (editingUserId) {
    // Update existing user
    const index = users.findIndex((u) => u.id === editingUserId)
    if (index !== -1) {
      users[index] = { ...users[index], ...userData }
      showSuccessMessage("Usuario actualizado correctamente")
    }
  } else {
    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
    }
    users.push(newUser)
    showSuccessMessage("Usuario creado correctamente")
  }

  localStorage.setItem("wilunlock-users", JSON.stringify(users))
  renderUsersAdmin()
  hideUserForm()
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
  showUserForm()
}

function deleteUser(id) {
  if (id === 1) {
    showErrorMessage("No se puede eliminar el usuario administrador principal")
    return
  }

  if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    users = users.filter((u) => u.id !== id)
    localStorage.setItem("wilunlock-users", JSON.stringify(users))
    renderUsersAdmin()
    showSuccessMessage("Usuario eliminado correctamente")
  }
}

function cancelUserEdit() {
  hideUserForm()
}

// Load Users
function loadUsers() {
  const savedUsers = localStorage.getItem("wilunlock-users")
  if (savedUsers) {
    users = JSON.parse(savedUsers)
  }
}

// Complete the renderNotices function
function renderNotices() {
  const container = document.getElementById("noticesContainer")
  if (!container) return

  container.innerHTML = ""

  notices.forEach((notice) => {
    if (notice.active) {
      const item = document.createElement("div")
      item.className = `notice-card ${notice.type}`

      item.innerHTML = `
        <h3>${notice.title}</h3>
        <p>${notice.content}</p>
      `
      container.appendChild(item)
    }
  })
}
