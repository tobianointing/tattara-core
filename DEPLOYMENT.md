# Deployment Guide

## Prerequisites

- Azure VM with Docker and Docker Compose installed
- GitHub repository with secrets configured
- Domain name for SSL certificates

## GitHub Secrets Setup

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

```bash
DEPLOY_SSH_KEY       - Private SSH key for VM authentication
DEPLOY_USER          - Username on Azure VM
DEPLOY_HOST          - IP address or hostname of Azure VM
DEPLOY_PATH          - Deployment directory path (e.g., /home/user/Harvest)
```

## First Time Setup on Azure VM

```bash
# 1. Create deployment directory
mkdir -p /path/to/DEPLOY_PATH
cd /path/to/DEPLOY_PATH

# 2. Clone the repository (optional, or just copy files)
git clone <your-repo-url> .

# 3. Copy docker files
cp -r docker/ .

# 4. Create .env file
cat > docker/.env << EOF
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USERNAME=tattara_user
DATABASE_PASSWORD=your_secure_password
DATABASE_NAME=tattara_db

REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

DOMAIN_NAME=yourdomain.com
CERTBOT_EMAIL=your@email.com

NODE_ENV=production
EOF

# 5. Add SSH key to authorized_keys (on VM)
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

## Automated Deployment

The deployment is fully automated via GitHub Actions:

```bash
# Just push to release branch to trigger deployment
git push origin release
```

This will:

1. Build Docker image
2. Push to GitHub Container Registry (GHCR)
3. SSH to Azure VM
4. Pull the latest image
5. Start/update services
6. Run database migrations
7. Verify deployment

## Manual Deployment (If needed)

On the Azure VM:

```bash
cd /path/to/DEPLOY_PATH/docker

# Pull latest image
docker pull ghcr.io/your-org/your-repo/app:latest

# Update services
export COMPOSE_APP_IMAGE="ghcr.io/your-org/your-repo/app:latest"
docker compose up -d app migrate

# View logs
docker compose logs -f app
```

## Verify Deployment

```bash
# Check services
docker compose ps

# View app logs
docker compose logs app

# Check migrations
docker compose logs migrate

# Test the app
curl https://yourdomain.com/api/health
```

## SSL Certificates

Certificates are auto-generated via Let's Encrypt (Certbot):

- First deployment: Certbot generates certificates
- Auto-renewal: Runs daily
- Location: `docker/certs/live/{DOMAIN_NAME}/`

## Troubleshooting

### Migration timeout

```bash
docker compose logs migrate
```

### App won't start

```bash
docker compose logs app
```

### No SSL certificate

```bash
docker compose logs certbot
```

### Clean restart (use with caution)

```bash
# Stop everything
docker compose down

# Remove volumes (WARNING: deletes data)
docker volume prune -f

# Start fresh
docker compose up -d
```

## Environment Variables

See `.env.example` for all available configuration options.
