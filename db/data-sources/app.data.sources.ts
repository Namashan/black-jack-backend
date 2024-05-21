import { DataSource } from "typeorm"

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cp6dr163e1ms73a9a7ig-a',
  port: 5432,
  username: 'john',
  password: '1yrsd0MNVft411BT2gB5GYuNEIa4tTFQ',
  database: 'black_jack_db',
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
