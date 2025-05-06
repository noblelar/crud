# Simple CRUD with T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

The projec is docker compose with postgres SQL. Some other technologies used are as listed below:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) 
- [Docker](https://create.t3.gg/en/deployment/docker) 

## To run the project:
- Configure the docker-compose.yml network properly 
- If you do not have an already existing pgAdmin Server, create one by adding the config below to your docker-compose.yml: 
      
  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    restart: always
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=root
    ports:
      - "5050:80"
    depends_on:
      - fanal.database
    networks:
      - fanal_network

