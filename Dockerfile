FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ARG AMPLITUDE_API_KEY
ARG HYPERSYSURL
ARG SENTRYURL
ARG IS_PRODUCTION
ARG SYSTEMBRUKER
ARG SYSTEMBRUKERPASSORD
ARG FRONTENDTOKENKEY
ARG NEXT_PUBLIC_RECAPTCHA_SITE_ID
ARG RECAPTCHA_SECRET
ARG TWILIO_TWIML_APP_SID
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_AUTH_TOKEN
ARG TWILIO_CALLER_ID
ARG TWILIO_SMS_ID
ARG TWILIO_SMS_NUMMER
ARG TWILIO_API_KEY
ARG TWILIO_API_SECRET
ARG COOKIE_SECRET
ARG ENCRYPTION_KEY
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:14-alpine as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG AMPLITUDE_API_KEY
ARG HYPERSYSURL
ARG SENTRYURL
ARG IS_PRODUCTION
ARG SYSTEMBRUKER
ARG SYSTEMBRUKERPASSORD
ARG FRONTENDTOKENKEY
ARG NEXT_PUBLIC_RECAPTCHA_SITE_ID
ARG RECAPTCHA_SECRET
ARG TWILIO_TWIML_APP_SID
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_AUTH_TOKEN
ARG TWILIO_CALLER_ID
ARG TWILIO_SMS_ID
ARG TWILIO_SMS_NUMMER
ARG TWILIO_API_KEY
ARG TWILIO_API_SECRET
ARG COOKIE_SECRET
ARG ENCRYPTION_KEY
ENV NEXT_PUBLIC_AMPLITUDE_API_KEY=$AMPLITUDE_API_KEY
ENV NEXT_PUBLIC_HYPERSYS_BASE_URL=$HYPERSYSURL
ENV NEXT_PUBLIC_SENTRY_DSN=$SENTRYURL
ENV NEXT_PUBLIC_IS_PRODUCTION=$IS_PRODUCTION
ENV NEXT_PUBLIC_RECAPTCHA_SITE_ID=$NEXT_PUBLIC_RECAPTCHA_SITE_ID
RUN npm run build

FROM node:14-alpine AS production
ENV NODE_ENV=production
ARG SYSTEMBRUKER
ARG SYSTEMBRUKERPASSORD
ARG FRONTENDTOKENKEY
ARG RECAPTCHA_SECRET
ARG TWILIO_TWIML_APP_SID
ARG TWILIO_ACCOUNT_SID
ARG TWILIO_AUTH_TOKEN
ARG TWILIO_CALLER_ID
ARG TWILIO_SMS_ID
ARG TWILIO_SMS_NUMMER
ARG TWILIO_API_KEY
ARG TWILIO_API_SECRET
ARG COOKIE_SECRET
ARG ENCRYPTION_KEY
ENV AMPLITUDE_API_KEY=${AMPLITUDE_API_KEY}
ENV API_AUTH_KEY=${FRONTENDTOKENKEY}
ENV SERVICEBRUKER_BRUKERNAVN=${SYSTEMBRUKER}
ENV SERVICEBRUKER_PASSORD=${SYSTEMBRUKERPASSORD}
ENV RECAPTCHA_SECRET=${RECAPTCHA_SECRET}
ENV TWILIO_TWIML_APP_SID=${TWILIO_TWIML_APP_SID}
ENV TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
ENV TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
ENV TWILIO_CALLER_ID=${TWILIO_CALLER_ID}
ENV TWILIO_SMS_ID=${TWILIO_SMS_ID}
ENV TWILIO_SMS_NUMMER=${TWILIO_SMS_NUMMER}
ENV TWILIO_API_KEY=${TWILIO_API_KEY}
ENV TWILIO_API_SECRET=${TWILIO_API_SECRET}
ENV COOKIE_SECRET=${COOKIE_SECRET}
ENV ENCRYPTION_KEY=${ENCRYPTION_KEY}
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]