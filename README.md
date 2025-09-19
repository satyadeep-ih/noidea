# Node.js Docker GitHub Action Deployment

This project demonstrates a complete CI/CD pipeline using GitHub Actions to build and deploy a Node.js application with Docker to a remote host.

##  Features

- **Automated Builds**: Triggers on pull requests and pushes to main/develop branches
- **Docker Integration**: Multi-stage Docker build for optimized production images
- **Remote Deployment**: Automatic deployment to remote hosts via SSH
- **Preview Environments**: Each PR gets its own preview deployment
- **Production Deployment**: Automatic deployment to production on main branch pushes
- **Container Registry**: Uses GitHub Container Registry (ghcr.io) for image storage
- **Health Checks**: Built-in health monitoring endpoints

##  Prerequisites

### Remote Host Requirements
- Docker installed and running
- SSH access configured
- User with Docker permissions

### GitHub Secrets Required

Add these secrets to your GitHub repository settings:

#### For Preview Deployments (Pull Requests)
- `REMOTE_HOST`: IP address or hostname of your preview server
- `REMOTE_USER`: SSH username for the preview server
- `REMOTE_SSH_KEY`: Private SSH key for authentication
- `REMOTE_PORT`: SSH port (optional, defaults to 22)
- `APP_PORT`: Port for the application (optional, defaults to 3000)

##  Setup Instructions

### 1. Clone and Install Dependencies
```bash
git clone <your-repo-url>
cd nodejsdockergithubaction
npm install
```

### 2. Configure GitHub Secrets
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add all the required secrets listed above

### 4. Test Locally
```bash
# Start development server
npm run dev

# Build and test Docker image
docker build -t nodejs-app .
docker run -p 3000:3000 nodejs-app
```

##  Workflow Details

### Pull Request Workflow
1. **Trigger**: Opens, synchronizes, or reopens PRs to main/develop
2. **Build**: Installs dependencies, runs tests, builds application
3. **Docker**: Creates and pushes Docker image to GitHub Container Registry
4. **Deploy**: Deploys to preview environment on remote host
5. **Comment**: Updates PR with deployment URL and status

### Production Workflow
1. **Trigger**: Pushes to main branch
2. **Build**: Same build process as PR workflow
3. **Deploy**: Deploys to production environment
4. **Cleanup**: Removes old Docker images

##  API Endpoints

- `GET /` - Welcome message with service info
- `GET /health` - Health check endpoint
- `GET /api/status` - Detailed service status

##  Docker Configuration

The project uses a multi-stage Docker build:
- **deps**: Installs production dependencies
- **builder**: Builds the application
- **runner**: Creates optimized production image

##  Environment Variables

- `NODE_ENV`: Environment (development/production)
- `PORT`: Application port (default: 3000)
- `HOSTNAME`: Host binding (default: 0.0.0.0)

##  Monitoring

The application includes:
- Health check endpoint (`/health`)
- Request logging with Morgan
- Graceful shutdown handling
- Memory usage monitoring


##  Customization

### Modify Application
- Edit `server.js` for your application logic
- Update `package.json` for dependencies
- Modify `Dockerfile` for specific requirements
- Use `npm install <package>` to add new dependencies

### Adjust Workflow
- Edit `.github/workflows/build-and-deploy.yml`
- Modify triggers, build steps, or deployment logic
- Add additional environments or steps

MIT License - see LICENSE file for details
