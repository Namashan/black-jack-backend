import { DataSource } from "typeorm"

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'Gambling_Game',
  synchronize: true,
  entities: ['db/entities/*.ts'],
  migrations: ['db/migrations/*.ts'],
  subscribers: ['db/subscribers/*.ts'],
});

appDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
});

export default appDataSource;
