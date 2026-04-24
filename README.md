DayReady - ¡Energía para comerte el mundo!
DayReady es una plataforma digital diseñada para revolucionar la forma en que los estudiantes consumen alimentos en el instituto. El sistema permite apartar comida con antelación, eliminando las filas durante los recesos y fomentando el uso responsable del dinero digital.

Propósito del Proyecto
Optimización del Tiempo: Reduce drásticamente las esperas en filas durante los tiempos de descanso.

Transformación Digital: Incentiva a los estudiantes a manejar su saldo de forma electrónica a través de la DayWallet.

Eficiencia Operativa: Permite al personal de cafetería preparar pedidos con anticipación, mejorando el flujo de servicio.

Características Principales
Apartado de Comida: Navega por el Storefront, selecciona tu menú y apártalo antes de que suene el timbre.

DayWallet: Sistema de saldo digital integrado para pagos rápidos y seguros.

Perfil Multitarea: Interfaz centralizada para gestionar:

Información Personal: Gestión de identidad y seguridad.

Historial de Pedidos: Seguimiento de órdenes activas y pasadas.

Gestión de Pagos: Configuración de tarjetas con sistema de apodos.

Experiencia Premium: Diseño minimalista, sobrio y profesional que facilita la navegación rápida.

Stack Tecnológico
Core: React.js (Hooks, Context, Navigation).

Navegación: React Router DOM (v6+).

Estilos: Tailwind CSS (Arquitectura Utility-First).

Iconografía: SVG personalizados para una interfaz limpia y ligera.

Dependencias Instaladas
Instalaciones necesarias para el funcionamiento del entorno:

Bash
# Rutas y navegación entre pantallas
npm install react-router-dom

# Framework de diseño y utilidades CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Utilidades de animación (opcional para transiciones de modales)
npm install tailwindcss-animate

Detalles del Sistema
Arquitectura de Componentes
Storefront: Vista principal donde el estudiante aparta sus alimentos.

ProfileContainer: Un contenedor de estado único que gestiona cinco interfaces distintas (Información, Pedidos, Tarjetas, Notificaciones, Ayuda) mediante navegación interna para evitar sobrecargar el DOM con múltiples modales.

Navigation Logic: Implementación de useNavigate para transiciones seguras entre el login y la tienda.

Instalación y Uso
Clona el repositorio:

Bash
git clone https://github.com/tu-usuario/dayready.git
Instala las dependencias:

Bash
npm install
Inicia el servidor local:

Bash
npm start

DayReady: Tu comida lista, tu tiempo a salvo.
