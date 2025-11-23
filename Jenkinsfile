pipeline {
  agent {
    kubernetes {
      label 'nodejs-kaniko'
      defaultContainer 'jnlp'
    }
  }

  environment {
    DOCKER_CREDS = credentials('dockerhub-credentials-id')
    GITOPS_CREDS = credentials('gitops-https-creds')

    REGISTRY = "docker.io/shalevi55344"
    IMAGE_NAME = "shalev-portfolio"
    GITOPS_REPO = "https://github.com/shalevis/portfolio-gitops.git"
  }

  stages {

    stage('Install Dependencies & Build React App') {
      steps {
        container('node') {
          sh '''
            echo "📦 Installing React app dependencies..."
            npm install

            echo "🏗️ Building Vite app..."
            npm run build
          '''
        }
      }
    }

    stage('Semgrep Security Scan') {
      steps {
        container('semgrep') {
          sh '''
            echo "🔎 Running Semgrep scan..."
            semgrep --config=auto . --error || {
              echo "❌ Semgrep found security issues. Failing pipeline."
              exit 1
            }
          '''
        }
      }
    }

    stage('Build & Push Docker Image Using Kaniko') {
      steps {
        container('kaniko') {
          withCredentials([
            usernamePassword(
              credentialsId: 'dockerhub-credentials-id',
              usernameVariable: 'DOCKER_USER',
              passwordVariable: 'DOCKER_PASS'
            )
          ]) {
            sh '''
              echo "🔐 Preparing Docker auth..."
              mkdir -p /kaniko/.docker
              cat > /kaniko/.docker/config.json <<EOF
{
  "auths": {
    "https://index.docker.io/v1/": {
      "auth": "$(echo -n "$DOCKER_USER:$DOCKER_PASS" | base64)"
    }
  }
}
EOF

              echo "🐳 Building & pushing portfolio Docker image..."
              /kaniko/executor \
                --context $WORKSPACE \
                --dockerfile $WORKSPACE/Dockerfile \
                --destination docker.io/$DOCKER_USER/$IMAGE_NAME:$BUILD_NUMBER \
                --destination docker.io/$DOCKER_USER/$IMAGE_NAME:latest \
                --cache=true
            '''
          }
        }
      }
    }

    stage('Trivy Scan') {
      steps {
        container('trivy') {
          sh '''
            echo "🛡️ Running Trivy vulnerability scan..."
            trivy image --exit-code 1 --severity CRITICAL ${REGISTRY}/${IMAGE_NAME}:${BUILD_NUMBER} || {
              echo "❌ Critical vulnerabilities found!"
              exit 1
            }
          '''
        }
      }
    }

    stage('Update GitOps Repo (ArgoCD Deploy)') {
      steps {
        container('jnlp') {
          withCredentials([
            usernamePassword(
              credentialsId: 'gitops-https-creds',
              usernameVariable: 'GIT_USER',
              passwordVariable: 'GIT_PASS'
            )
          ]) {
            sh '''
              echo "📥 Cloning GitOps repo..."
              git clone https://${GIT_USER}:${GIT_PASS}@github.com/shalevis/portfolio-gitops.git gitops

              cd gitops/helm

              echo "📝 Updating image tag..."
              sed -i 's/^  tag:.*/  tag: "'${BUILD_NUMBER}'"/' values.yaml

              git config user.email "jenkins@ci.local"
              git config user.name "Jenkins CI"

              git add .
              git commit -m "Update portfolio image tag to ${BUILD_NUMBER}"

              echo "⬆️ Pushing update..."
              git push https://${GIT_USER}:${GIT_PASS}@github.com/shalevis/portfolio-gitops.git main
            '''
          }
        }
      }
    }
  }

  post {
    always {
      echo "🧹 Cleaning workspace..."
      sh 'rm -rf gitops || true'
    }

    success {
      echo "🎉 Portfolio pipeline finished successfully!"
      echo "🚀 ArgoCD auto-sync will now deploy your updated website."
    }

    failure {
      echo "❌ Portfolio pipeline failed."
    }
  }
}
