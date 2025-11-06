# 🛒 Microservices E-commerce Platform on Azure Kubernetes Service (AKS)

This project demonstrates a **microservices-based e-commerce dashboard** deployed on **Azure Kubernetes Service (AKS)** using Docker and Kubernetes manifests.  
It showcases a containerized architecture with NGINX ingress routing, service discovery, and persistent storage using MongoDB.

---

## 🚀 Tech Stack

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend** | React + TailwindCSS + Vite + NGINX | Static dashboard UI built with React and served through NGINX |
| **Backend** | Node.js (Express) | Microservices for User, Order, and Inventory APIs |
| **Database** | MongoDB (StatefulSet) | Persistent data layer for backend services |
| **Containerization** | Docker | Each service is built and deployed in its own image |
| **Orchestration** | Kubernetes (AKS) | Automates deployment, scaling, and management |
| **Ingress** | NGINX Ingress Controller | Routes HTTP traffic to the correct service |
| **Namespace** | `ecommerce` | Isolated Kubernetes namespace for project components |

---

## 🧩 Project Architecture


---

## ☸️ Kubernetes Overview

**Namespace:** `ecommerce`  

### Services

| Service | Type | Port | Purpose |
|----------|------|------|----------|
| user-service | ClusterIP | 4001 | Handles user data |
| order-service | ClusterIP | 4002 | Handles order data |
| inventory-service | ClusterIP | 4003 | Handles inventory data |
| frontend-service | ClusterIP | 80 | Serves the React static site |
| mongo | ClusterIP | 27017 | Database backend |

---

## 🌐 Ingress Configuration

**Ingress Resource:** `ecommerce-ingress`

| Path | Service | Port |
|------|----------|------|
| `/api/users` | user-service | 4001 |
| `/api/orders` | order-service | 4002 |
| `/api/inventory` | inventory-service | 4003 |
| `/` | frontend-service | 80 |

**Ingress Host:** `ecommerce.local` (mapped locally via `/etc/hosts`)

Example (Windows hosts file):



---

## 🧠 Architecture Diagram


             ┌──────────────────────────────┐
             │   Azure Kubernetes Cluster   │
             │         (AKS)                │
             ├──────────────────────────────┤
             │   NGINX Ingress Controller   │
             │  (LoadBalancer, Port 80/443) │
             ├──────────────┬───────────────┤
             │              │               │
   ┌─────────▼──────┐ ┌────▼────────┐ ┌─────▼────────┐
   │ user-service   │ │ order-svc   │ │ inventory-svc│
   │  Node.js (API) │ │ Node.js     │ │ Node.js      │
   └────────┬───────┘ └─────┬──────┘ └─────┬────────┘
            │                │              │
            └────────┬───────┴──────────────┘
                     │
         ┌───────────▼────────────┐
         │    MongoDB StatefulSet │
         └────────────────────────┘

                     │
                     ▼
         ┌────────────────────────┐
         │     Frontend Service   │
         │ React + Tailwind + Nginx │
         └────────────────────────┘



---

## 🧩 Key Kubernetes Concepts

- **Multi-service deployment** (frontend + 3 backend APIs)  
- **Path-based routing** via NGINX ingress  
- **Service discovery** using ClusterIP  
- **MongoDB StatefulSet** for persistence  
- **Ingress LoadBalancer** for external access  
- **Namespace isolation** for project organization  

---

## 🧰 Testing the Services

You can test APIs inside the cluster:
```bash
kubectl run testpod --image=nginx:alpine -it --rm -n ecommerce -- sh
curl -v http://user-service:4001/api/users
curl -v http://order-service:4002/api/orders
curl -v http://inventory-service:4003/api/inventory

