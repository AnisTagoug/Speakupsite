# Backend stage
FROM node:18-alpine as backend

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install

COPY backend/ .

# Final stage - serve both frontend and backend
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend /app/backend ./backend

# Setup frontend for development
COPY package*.json ./
RUN npm install

# Copy frontend source files
COPY src/ ./src/
COPY index.html ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Expose ports
EXPOSE 4000 5173

# Create startup script that binds to all interfaces
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Starting backend server..."' >> /app/start.sh && \
    echo 'cd /app/backend && npm start &' >> /app/start.sh && \
    echo 'echo "Starting frontend server..."' >> /app/start.sh && \
    echo 'npm run dev &' >> /app/start.sh && \
    echo 'echo "Both servers started. Backend: http://0.0.0.0:4000, Frontend: http://0.0.0.0:5173"' >> /app/start.sh && \
    echo 'wait' >> /app/start.sh && \
    chmod +x /app/start.sh

CMD ["/app/start.sh"]
