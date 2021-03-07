FROM node:14-alpine AS base
ARG HYPERSYSURL
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
ARG HYPERSYSURL
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:14-alpine AS production
ENV NODE_ENV=production
ARG HYPERSYSURL
ENV NEXT_PUBLIC_HYPERSYS_BASE_URL=$HYPERSYSURL
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

RUN echo "NEXT_PUBLIC_HYPERSYS_BASE_URL: ${NEXT_PUBLIC_HYPERSYS_BASE_URL}"
EXPOSE 3000
CMD npm run start