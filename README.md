# Ignite Call

<p align="center">
  <img width="48%" alt="Landing" title="Landing" src=".github/landing.png" />
  <img width="48%" alt="Registration Step 1" title="Registration Step 1" src=".github/registration-step-1.png" />
  <img width="48%" alt="Registration Step 2" title="Registration Step 2" src=".github/registration-step-2.png" />
  <img width="48%" alt="Registration Step 3" title="Registration Step 3" src=".github/registration-step-3.png" />
  <img width="48%" alt="Registration Step 4" title="Registration Step 4" src=".github/registration-step-4.png" />
  <img width="48%" alt="Calendar Step 1" title="Calendar Step 1" src=".github/calendar-step-1.png" />
  <img width="48%" alt="Calendar Step 2" title="Calendar Step 2" src=".github/calendar-step-2.png" />
  <img width="48%" alt="Calendar Step 3" title="Calendar Step 3" src=".github/calendar-step-3.png" />
</p>

## 🔖 Project

The Ignite Call project was built for booking appointments from a calendar with Google Calendar integration. Users can register for the app using their Google account and indicate their days of the week and times when they will be available to schedule appointments. Every schedule registered in the application has integration with Google Calendar, which allows the user to check their new appointments directly on the Google platform.

Ignite Call was built entirely on a Next.js project and used the mechanisms provided by the framework to create and integrate the front-end and back-end from a single code repository. Communication between the application and the database was done using the Prisma.io tool and using a MySQL database in a Docker container. The production database was published from the PlanetScale platform service and Vercel's service was used to host the application.

## 🚀 Technologies

This project was developed with the following technologies:

- React
- Next.js
- TypeScript
- Node.js
- Prisma.io
- Google APIs
- Google Cloud Platform
- Docker
- Axios
- Next Seo
- Nookies
- React Hook Form
- Design System
- Stitches (CSS-in-JS)
- Phosphor Icons
- ESLint
- Dayjs
- Zod

## 💻 Run

Para rodar a aplicação será necessário a conexão com um banco de dados MySQL local ou rodando em um container Docker. Além da criação do projeto no Google Cloud Platform para coletar as credenciais necessárias para login e integração com a plataforma Google que constam no arquivo `.env.example`. Este arquivo também contém a URL de conexão que deverá ser utilizada para a conexão do Prisma com o banco de dados.

Clone this repository:

```sh
$ git clone https://github.com/Sup3r-Us3r/ignite-call.git
$ cd ignite-call
```

Install dependencies:

```sh
$ npm i
```

Create `.env`:

```sh
$ cp .env.example .env
```

Configure `.env` example:

```ts
# MySQL
DATABASE_URL="mysql://root:docker@localhost:3306/ignitecall"

# Google oAuth
NEXTAUTH_SECRET="any secret"
GOOGLE_CLIENT_ID="your google client id"
GOOGLE_CLIENT_SECRET="your google client secret"
```

> **DATABASE_URL**: You can have MySQL local or running with Docker, using the command: `docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 mysql:latest`

> **NEXTAUTH_SECRET**: This secret can be anything, you can generate it with the command: `openssl rand -hex 32`

> **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: You need to generate these credentials in GCP, here are the [official instructions](https://support.google.com/cloud/answer/6158849).

Run app:

```sh
$ npm run dev
```
