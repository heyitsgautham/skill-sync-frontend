#!/bin/bash

set -e

# Configuration
PROJECT_ID="learnweave-477312"
REGION="us-central1"
SERVICE_NAME="skillsync-frontend"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}:latest"
BACKEND_URL="https://skillsync-backend-80934598149.us-central1.run.app"

echo "🚀 Deploying SkillSync Frontend to Cloud Run..."
echo "Project: ${PROJECT_ID}"
echo "Region: ${REGION}"
echo "Service: ${SERVICE_NAME}"

# Build and push Docker image
echo "📦 Building Docker image..."
gcloud builds submit --tag ${IMAGE_NAME} --project ${PROJECT_ID}

# Deploy to Cloud Run
echo "🚢 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --set-env-vars "REACT_APP_API_BASE_URL=${BACKEND_URL}/api" \
  --project ${PROJECT_ID}

# Get the service URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --platform managed --region ${REGION} --format 'value(status.url)' --project ${PROJECT_ID})

echo ""
echo "✅ Frontend deployed successfully!"
echo "🌐 Frontend URL: ${SERVICE_URL}"
echo ""
echo "⚠️  Next step: Add this URL to backend CORS allowed origins:"
echo "   ${SERVICE_URL}"
