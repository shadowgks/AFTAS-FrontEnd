FROM node:20.8.1 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/angular-tailwind/ /usr/share/nginx/html 
EXPOSE 80
