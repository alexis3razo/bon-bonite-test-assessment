# Bon-Bonite E2E Test Automation

![Playwright](https://img.shields.io/badge/-Playwright-45ba4b?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

---

## English

### Project Overview
This repository contains the automated testing suite for the **Bon-Bonite** e-commerce platform. The project is built using **Playwright** and **TypeScript**, focusing on ensuring the quality, reliability, and functionality of the initial release of the web application. 

The test suite covers critical business flows, including user registration, account management, and the end-to-end checkout process, alongside smoke tests to validate module navigation (Shoes, Bags, Belts, Accessories, Outlet).

### Architecture & Design Patterns
To ensure scalability, maintainability, and clean code, this framework implements the following patterns:
* **Page Object Model (POM):** UI interactions are abstracted into separate classes (`Pages` and `Components`), keeping the test logic clean and separating business rules from DOM manipulation.
* **Custom Fixtures (Dependency Injection):** Playwright's fixture system is extended to automatically inject Page Objects into the tests, eliminating repetitive instantiation.
* **Dynamic Data Generation:** Integration with `@faker-js/faker` to dynamically generate unique user data for registration and checkout flows, preventing state collision between test runs.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)
* npm (comes with Node.js)

### Installation
1. Clone the repository.
2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Install the Playwright browsers:
    ```bash
   npx playwright install --with-deps
   ```

### Running the Tests
* Execute all tests in headless mode:
    ```bash
   npx playwright test
   ```

* Run tests with the UI mode (interactive test runner):
    ```bash
   npx playwright test --ui
   ```

* Run a specific test suite (e.g., only the checkout flow):
    ```bash
   npx playwright test checkout-flow.spec.ts
   ```

### Reporting
Playwright generates a detailed HTML report after execution. To view it, run:
    ```bash
    npx playwright show-report
    ```

## Español

### Descripción del Proyecto
Este repositorio contiene la suite de pruebas automatizadas para la plataforma de comercio electrónico **Bon-Bonite**. El proyecto está desarrollado utilizando **Playwright** y **TypeScript**, con el objetivo de garantizar la calidad, fiabilidad y correcto funcionamiento de la primera versión de la aplicación web.

La suite cubre los flujos críticos de negocio, incluyendo el registro de usuarios, la gestión de la cuenta y el proceso de compra de extremo a extremo (Checkout), junto con pruebas de humo (*smoke tests*) para validar la navegación entre los distintos módulos (Zapatos, Bolsos, Cinturones, Accesorios, Outlet).

### Arquitectura y Patrones de Diseño
Para asegurar la escalabilidad, mantenibilidad y limpieza del código, este framework implementa los siguientes patrones:
* **Page Object Model (POM):** Las interacciones de la interfaz de usuario se abstraen en clases separadas (`Pages` y `Components`), manteniendo la lógica de prueba limpia y separando las reglas de negocio de la manipulación del DOM.
* **Fixtures Personalizadas (Inyección de Dependencias):** Se extiende el sistema de *fixtures* de Playwright para inyectar automáticamente los Page Objects en las pruebas, eliminando la instanciación manual repetitiva.
* **Generación Dinámica de Datos:** Integración con `@faker-js/faker` para generar datos de usuario únicos y dinámicos para los flujos de registro y pago, evitando colisiones de estado entre las ejecuciones.

### Requisitos Previos
* [Node.js](https://nodejs.org/) (v16 o superior)
* npm (incluido con Node.js)

### Instalación
1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Instalar los navegadores de Playwright:
   ```bash
   npx playwright install --with-deps
   ```

### Ejecución de Pruebas
* Ejecutar todas las pruebas en modo headless (sin interfaz gráfica):
    ```bash
   npx playwright test
   ```
* Ejecutar las pruebas en modo UI (corredor interactivo):
    ```bash
   npx playwright test --ui
   ```
* Ejecutar una suite de pruebas específica (por ejemplo, solo el flujo de compra):
    ```bash
   npx playwright test checkout-flow.spec.ts
   ```

### Reportes
- Playwright genera un reporte HTML detallado después de la ejecución. Para visualizarlo, ejecuta:
    ```bash
    npx playwright show-report
    ```

### Project Structure / Estructura del Proyecto
```text
bonbonite-automation/
├── src/
│   ├── pages/            # Page Object classes (HomePage, CheckoutPage, etc.)
│   ├── components/       # Reusable UI components (Header, Nav)
│   ├── utils/            # Helper functions and data generators
│   └── fixtures/         # Playwright custom fixtures for dependency injection
├── tests/
│   ├── e2e/              # End-to-End core business tests
│   └── smoke/            # Fast navigation and UI smoke tests
├── playwright.config.ts  # Playwright global configuration
└── package.json          # Project metadata and dependencies
```