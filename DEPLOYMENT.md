# Deployment Guide for HCI Team Website

## Local Development

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Building and Running Locally

1. **Build the Docker image:**
   ```bash
   docker build -t hci-team-website .
   ```

2. **Run with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

3. **Access the website:**
   - Open your browser and go to `http://localhost:8080`

### Development Commands

```bash
# Build and start the container
docker-compose up --build

# Stop the container
docker-compose down

# View logs
docker-compose logs -f

# Rebuild without cache
docker-compose build --no-cache
```

## Digital Ocean Deployment

### Option 1: Using Docker on a Droplet

1. **Create a Digital Ocean Droplet:**
   - Choose Ubuntu 22.04 LTS
   - Minimum 1GB RAM, 1 vCPU
   - Enable Docker during creation

2. **Connect to your droplet:**
   ```bash
   ssh root@your-droplet-ip
   ```

3. **Install Docker Compose (if not already installed):**
   ```bash
   apt update
   apt install docker-compose-plugin
   ```

4. **Clone your repository:**
   ```bash
   git clone https://github.com/your-username/hci-team-website.git
   cd hci-team-website
   ```

5. **Build and run:**
   ```bash
   docker-compose up -d
   ```

6. **Configure firewall:**
   ```bash
   ufw allow 8080
   ```

### Option 2: Using Digital Ocean App Platform

1. **Connect your GitHub repository to Digital Ocean App Platform**
2. **Create a new app and select your repository**
3. **Configure the build settings:**
   - Build Command: `npm run build`
   - Run Command: `nginx -g "daemon off;"`
   - Port: 8080

### Option 3: Using Digital Ocean Container Registry

1. **Build and push to registry:**
   ```bash
   # Tag the image
   docker tag hci-team-website registry.digitalocean.com/your-registry/hci-team-website

   # Push to registry
   docker push registry.digitalocean.com/your-registry/hci-team-website
   ```

2. **Deploy using Digital Ocean Kubernetes or App Platform**

## Environment Configuration

The application runs on port 8080 by default (avoiding port 3000 as requested).

### Custom Port Configuration

To change the port, modify the `docker-compose.yml` file:

```yaml
ports:
  - "YOUR_PORT:8080"
```

## Health Checks

The container includes health checks that verify the website is responding correctly.

## Security Features

- Nginx configuration includes security headers
- Gzip compression enabled
- Static asset caching
- Proper error handling

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check what's using the port
   lsof -i :8080
   
   # Kill the process or use a different port
   ```

2. **Build failures:**
   ```bash
   # Clean build
   docker-compose down
   docker system prune -a
   docker-compose up --build
   ```

3. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

```bash
# View container logs
docker-compose logs -f hci-website

# Access container shell
docker-compose exec hci-website sh

# Check nginx status
docker-compose exec hci-website nginx -t
```
