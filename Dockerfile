FROM node:16
# App directory
WORKDIR /app
# Copy dependencies first
COPY package*.json ./
# then install them (for optimization)
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
        then npm install --only=production; fi \
        else npm install; \
    fi

COPY . .

CMD [ "npm", "start" ]