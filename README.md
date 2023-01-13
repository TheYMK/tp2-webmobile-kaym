# OVERVIEW

Le but de ce projet est de créer une application web/mobile qui permet de visualiser et de gérer des données générer par des objects connectés.<br/>
Les fonctionnalites de l'application sont les suivantes:
<br/>

- Afficher les données en temps réel sur une carte
- Ajouter/Modifier/Supprimer des objects connectés
- Authentifier les utilisateurs

## TECHNOS FRONTEND:

- Svelte / SvelteKit
- TailwindCSS
- Mapbox

## TECHNOS BACKEND:

- NestJS
- PostgreSQL (TypeORM)

<br/>

# API PROJECT

Steps to run the `api` project:

1- Clone the repository on your local machine <br/>
2- Run the command `npm install` to install all the dependencies <br/>
3- Install postgresql on your machine <br/>
4- Create a database named "dashboarddevdb" in postgresql <br/>
5- Update the database url in the .env file to match your own local database url <br/>
6- Run the command `npm run typeorm migration:run` to run the migrations and create the tables in the database <br/>
7- Run the command `npm run start:dev` to start the server <br/>

<br/>
<br/>

# CLIENT PROJECT

Steps to run the `client` project:

1- Clone the repository on your local machine <br/>
2- Run the command `npm install` to install all the dependencies <br/>
3- Run the command `npm run dev` to start the server <br/>
4- The server will be running on port 5173 (might change so check your terminal for the port number) <br/>

<br/>
<br/>

DEMO <br/>

<video src="https://user-images.githubusercontent.com/22744551/198595598-2ffa8d3b-4c78-4a79-8477-b6ef327d5613.mov"></video> <br/>

Responsive <br/>

<video src="https://user-images.githubusercontent.com/22744551/212308496-20fcf310-16d4-4daa-96a9-961ece312df4.mov"></video>


