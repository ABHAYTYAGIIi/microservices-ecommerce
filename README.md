# 🛒 Microservices E-commerce on Kubernetes (AKS)

This project demonstrates a microservices-based e-commerce platform deployed on Azure Kubernetes Service (AKS).

## 🚀 Tech Stack
- **Frontend:** React + Tailwind + Nginx
- **Backend:** Node.js (Express) microservices
- **Database:** MongoDB StatefulSet
- **CI/CD:** Docker + Kubernetes manifests
- **Ingress:** NGINX Ingress Controller
- **Monitoring:** Prometheus + Grafana (planned)

## 📂 Services
| Service | Description | Port |
|----------|--------------|------|
| User Service | User signup/login API | 4001 |
| Order Service | Order management | 4002 |
| Inventory Service | Stock tracking | 4003 |
| Frontend | React UI | 80 |

## 🧱 Kubernetes Deployment
```bash
kubectl apply -f k8s-manifests/

