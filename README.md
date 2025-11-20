# TinyLink Frontend
TinyLink Frontend is a clean and responsive UI built with React + Vite, communicating with a backend powered by Node.js + Express.js and NeonDB PostgreSQL for data storage.
It provides:
- Dashboard to create, list, and delete short links
- Stats page for viewing analytics of each link

---

[![Live App](https://img.shields.io/badge/Live-App-red)](https://tiny-link-web-v1.vercel.app/)
[![Swagger Docs](https://img.shields.io/badge/Swagger-API%20Docs-green?logo=swagger)](https://tiny-link-backend.onrender.com/api-docs)
[![Backend Repo](https://img.shields.io/badge/GitHub-Backend%20Repo-blue?logo=github)](https://github.com/anurag-tarai/tiny-link-backend)


## System Architecture Overview
![](src/assets/system_arch_diagram.png)

## File Structure
```
/tiny-link-frontend/
├───index.html
├───public
└───src/
    ├───api.js
    ├───App.css
    ├───App.jsx
    ├───index.css
    ├───main.jsx
    ├───components/
    │   ├───AddLinkForm.jsx
    │   ├───ConfirmationModal.jsx
    │   ├───LinkTable.jsx
    │   ├───Navbar.jsx
    │   └───ToastContext.jsx
    └───pages/
        ├───Dashboard.jsx
        └───StatsPage.jsx
```