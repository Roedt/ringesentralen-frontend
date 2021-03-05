FROM node:14-alpine AS base
ARG _HYPERSYSURL
RUN echo "HypersysURL: ${_HYPERSYSURL}"
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
ARG _HYPERSYSURL
RUN echo "HypersysURL: ${_HYPERSYSURL}"
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:14-alpine AS production
ENV NODE_ENV=production
ARG _HYPERSYSURL
RUN echo "HypersysURL: ${_HYPERSYSURL}"
ENV NEXT_PUBLIC_HYPERSYS_BASE_URL=$_HYPERSYSURL
RUN echo "NEXT_PUBLIC_HYPERSYS_BASE_URL: ${NEXT_PUBLIC_HYPERSYS_BASE_URL}"
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN npm install next

EXPOSE 3000
CMD npm run start