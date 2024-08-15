# **Fullstack Application with Kubernetes**

This repository contains a full-stack application that includes a frontend, backend, and MongoDB database, all deployed using Kubernetes. The application consists of a Node.js API server (backend), an Nginx server serving a static website (frontend), and a MongoDB database.


## **Table of Contents**

- [Backend](#backend)
- [Frontend](#frontend)
- [Kubernetes Configuration Files](#kubernetes-configuration-files)
- [Getting Started](#getting-started)
- [Deploy to Kubernetes](#deploy-to-kubernetes)
- [Verify Deployments](#verify-deployments)
- [Accessing the Application](#accessing-the-application)

## **1. Backend**

- **Dockerfile**: Instructions to build the Docker image for the Node.js API server.
- **index.js**: The main file for the Node.js API server, containing the application logic.
- **package.json**: Configuration file for managing dependencies for the Node.js application.
- **package-lock.json**: Automatically generated file that locks the versions of the installed dependencies.

## **2. Frontend**

- **Dockerfile**: Instructions to build the Docker image for the Nginx server to serve the static files.
- **index.html**: Main HTML file for the frontend.
- **script.js**: JavaScript file for adding dynamic functionality to the frontend.
- **styles.css**: Stylesheet file for styling the frontend.

## **3. Kubernetes Configuration Files**

- **MongoDB**
  - `deployment.yaml`: Defines the deployment strategy for the MongoDB instance, including replica settings.
  - `service.yaml`: Exposes MongoDB as a service within the Kubernetes cluster using a ClusterIP.

- **Nginx**
  - `deployment.yaml`: Defines the deployment strategy for the Nginx server, including replica settings.
  - `service.yaml`: Exposes the Nginx server using a NodePort to make it accessible externally.

- **Node.js**
  - `deployment.yaml`: Defines the deployment strategy for the Node.js API server, including replica settings.
  - `service.yaml`: Exposes the Node.js API server within the Kubernetes cluster.
  - `configMap.yaml`: Contains environment-specific configurations for the Node.js application, such as MongoDB connection strings.

- **Persistent Volumes**
  - `pv.yaml`: PersistentVolume configuration for MongoDB to ensure data is not lost when the MongoDB pod is restarted.
  - `pvc.yaml`: PersistentVolumeClaim to dynamically provision storage for MongoDB.

- **Secrets**
  - `secret.yaml`: Stores sensitive data, such as MongoDB credentials, securely within Kubernetes.

- **ConfigMap**
  - `configMap.yaml`: Contains environment-specific configurations for the Node.js application.

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed on your local machine:

- Docker
- Kubernetes (Minikube or any Kubernetes cluster)
- kubectl

### **Build and Push Docker Images**

Before deploying to Kubernetes, ensure the Docker images for the backend and frontend are built and pushed to Docker Hub:

```bash
# Backend
cd backend
docker build -t <Your-docker-Hub-account>/node-backend .
docker push <Your-docker-Hub-account>/node-backend

# Frontend
cd frontend
docker build -t <Your-docker-Hub-account>/nginx-frontend .
docker push <Your-docker-Hub-account>/nginx-frontend
```

###Deploy to Kubernetes
Follow the steps below to deploy the application to Kubernetes:
```bash
# Create the namespace
kubectl create namespace fullstack-app

# Deploy ConfigMap
kubectl apply -f deployment/configmaps.yaml -n fullstack-app

# Deploy Persistent Volume and Persistent Volume Claim
kubectl apply -f deployment/pv.yaml -n fullstack-app
kubectl apply -f deployment/pvc.yaml -n fullstack-app

# Deploy Secrets
kubectl apply -f deployment/secrets.yaml -n fullstack-app

# Deploy MongoDB
kubectl apply -f deployment/mongodb-deployment.yaml -n fullstack-app

# Deploy Node.js backend
kubectl apply -f deployment/backend-deployment.yaml -n fullstack-app

# Deploy Nginx frontend
kubectl apply -f deployment/frontend-deployment.yaml -n fullstack-app
```
Verify Deployments
Ensure all pods are running correctly:
```
kubectl get pods -n fullstack-app
```
Accessing the Application
To access the frontend application, use the following commands:
```
kubectl get svc -n fullstack-app
minikube ip
```
Access the application using the NodePort exposed by the Nginx service:
```
http://<minikube-ip>:<node-port-nginx>
```



