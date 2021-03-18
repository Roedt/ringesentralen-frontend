FROM node:14-alpine AS base
ARG HYPERSYSURL
ARG SENTRYURL
ARG IS_PRODUCTION
RUN echo $IS_PRODUCTION
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
ARG HYPERSYSURL
ARG SENTRYURL
ENV NEXT_PUBLIC_HYPERSYS_BASE_URL=$HYPERSYSURL
ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRYURL
ENV NEXT_PUBLIC_IS_PRODUCTION=$IS_PRODUCTION
RUN echo $NEXT_PUBLIC_IS_PRODUCTION
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

FROM node:14-alpine AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
COPY --from=build /build/pages/api/ringemanus ./pages/api/ringemanus
RUN npm install next

EXPOSE 3000
CMD npm run start