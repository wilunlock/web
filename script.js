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

// Variables globales para contenido
let notices = [
  {
    id: 1,
    type: "important",
    title: "AVISO IMPORTANTE!",
    content:
      'Estimado Cliente, Todos Nuestros Servicios Funcionan de Lunes a Viernes (Sábado + Domingo es Feriado) Por Favor Antes de Realizar el Pedido Debe Contar el Tiempo Máximo de Servicio y Días Laborables "Lunes a Viernes" También Nuestro Método de Pago Funciona Manualmente, Así que Después de Completar el Pago Por Favor Contáctenos en Support Ticket O WhatsApp/Telegram',
    active: true,
  },
  {
    id: 2,
    type: "disclaimer",
    title: "AVISO DE DESCARGO!",
    content:
      "Desbloquear, Reparar, Cambiar IMEI Tal vez sea ilegal en tu País, así que por favor verifica las leyes y reglas de tu país antes de usar nuestros Servicios.",
    active: true,
  },
]

const brands = [
  { id: 1, name: "OCTOPUS", emoji: "🐙", gradient: "gradient-blue" },
  { id: 2, name: "Z3X", emoji: "⚡", gradient: "gradient-purple" },
  { id: 3, name: "UMT", emoji: "🔧", gradient: "gradient-green" },
  { id: 4, name: "LOCKR", emoji: "🔒", gradient: "gradient-red" },
  { id: 5, name: "XIAOMI", emoji: "📱", gradient: "gradient-orange" },
  { id: 6, name: "UNLOCKTOOL", emoji: "🔓", gradient: "gradient-indigo" },
  { id: 7, name: "SAMSUNG", emoji: "📲", gradient: "gradient-blue-dark" },
  { id: 8, name: "HUAWEI", emoji: "🌟", gradient: "gradient-red-dark" },
]

let editingNoticeId = null

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  loadSettings()
  loadBackgroundImages()
  initializeHero()
  initializeBrands()
  checkLoginStatus()

  // Auto-change slides every 5 seconds
  setInterval(nextSlide, 5000)

  // Auto-change background images every 5 seconds
  setInterval(nextBackground, 5000)
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

// Brands Animation
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

  // Check admin credentials
  if (username === "admin" && password === "Wilma3956as") {
    currentUser = {
      username: "admin",
      isAdmin: true,
    }
    isLoggedIn = true
    localStorage.setItem("wilunlock-user", JSON.stringify(currentUser))

    closeLoginModal()
    showAdminPanel()
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
    loginBtn.onclick = showAdminPanel
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
  if (!isLoggedIn || !currentUser?.isAdmin) {
    openLoginModal()
    return
  }

  document.getElementById("adminPanel").style.display = "block"
  document.getElementById("adminUsername").textContent = currentUser.username
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
  if (event && event.target) {
    event.target.classList.add("active")
  }

  // Load section-specific data
  if (sectionName === "backgrounds") {
    loadAdminBackgrounds()
  } else if (sectionName === "content") {
    loadContentManagement()
  }
}

function loadAdminData() {
  // Load settings
  const savedSettings = localStorage.getItem("wilunlock-settings")
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    document.getElementById("siteName").value = settings.siteName || "WILUNLOCK"
    document.getElementById("siteDescription").value = settings.siteDescription || "WORLDWIDE UNLOCK SOURCE"
    document.getElementById("siteEmail").value = settings.email || "wilunlock@gmail.com"
    document.getElementById("heroTitleInput").value = settings.heroTitle || "BOX&DONGLE"
    document.getElementById("heroSubtitleInput").value = settings.heroSubtitle || "ACTIVATION"
    document.getElementById("heroDescriptionInput").value = settings.heroDescription || "INSTANT SERVICE 24/7 API"
  }

  // Load background images for admin
  loadAdminBackgrounds()
}

// Settings Form Handler
document.getElementById("settingsForm").addEventListener("submit", (e) => {
  e.preventDefault()

  const settings = {
    siteName: document.getElementById("siteName").value,
    siteDescription: document.getElementById("siteDescription").value,
    email: document.getElementById("siteEmail").value,
    heroTitle: document.getElementById("heroTitleInput").value,
    heroSubtitle: document.getElementById("heroSubtitleInput").value,
    heroDescription: document.getElementById("heroDescriptionInput").value,
  }

  localStorage.setItem("wilunlock-settings", JSON.stringify(settings))
  updateSiteContent(settings)

  // Update slides
  slides[0].title = settings.heroTitle
  slides[0].subtitle = settings.heroSubtitle
  slides[0].description = settings.heroDescription

  // Show success message
  showSuccessMessage("Configuración guardada exitosamente")
})

function showSuccessMessage(message) {
  // Create and show success notification
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
      <img src="${image}" alt="Background ${index + 1}" onerror="this.src='/placeholder.svg?height=100&width=200&text=Error'">
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

  // Validar que sea una URL de imagen
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

  // Validar tipo de archivo
  if (!file.type.startsWith("image/")) {
    showErrorMessage("Por favor selecciona un archivo de imagen válido")
    input.value = ""
    return
  }

  // Validar tamaño (2MB máximo)
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

    // Ajustar preview index si es necesario
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
  loadBackgroundImages() // Actualizar sitio principal
  showSuccessMessage("Imágenes de fondo guardadas exitosamente")
}

// Funciones de gestión de contenido
function loadContentManagement() {
  loadNotices()
  loadBrandsData()
}

function loadNotices() {
  const savedNotices = localStorage.getItem("wilunlock-notices")
  if (savedNotices) {
    notices = JSON.parse(savedNotices)
  }
  renderNoticesList()
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

// Event listener para el formulario de avisos
document.addEventListener("DOMContentLoaded", () => {
  const noticeForm = document.getElementById("noticeFormElement")
  if (noticeForm) {
    noticeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const title = document.getElementById("noticeTitle").value.trim()
      const content = document.getElementById("noticeContent").value.trim()
      const type = document.getElementById("noticeType").value

      if (!title || !content) {
        showErrorMessage("Por favor completa todos los campos")
        return
      }

      if (editingNoticeId) {
        // Actualizar aviso existente
        const notice = notices.find((n) => n.id === editingNoticeId)
        if (notice) {
          notice.title = title
          notice.content = content
          notice.type = type
          showSuccessMessage("Aviso actualizado exitosamente")
        }
      } else {
        // Crear nuevo aviso
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
      cancelNoticeEdit()
    })
  }
})

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
    animation: slideIn 0.3s ease-out;
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

function loadBrandsData() {
  const container = document.getElementById("brandsList")
  if (!container) return

  container.innerHTML = ""

  brands.forEach((brand) => {
    const item = document.createElement("div")
    item.className = `brand-item ${brand.gradient}`
    item.innerHTML = `
      <span class="brand-emoji">${brand.emoji}</span>
      <span class="brand-name">${brand.name}</span>
    `
    container.appendChild(item)
  })
}
