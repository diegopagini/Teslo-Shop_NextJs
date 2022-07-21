<!-- @format -->

# Next.js Teslo Shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

- MongoDB URL Local

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

## Reconstrutir los módulos de node y levantar Next en dev mode

```
yarn install
yarn dev
```

## Llenar la base de datos con infromación de pruebas

Llamar a:

```
http://localhost:3000/api/seed
```

## Crear la version de producción

```
yarn build
yarn start
```
