import { DATA_TYPES, Database, Model } from "https://deno.land/x/denodb/mod.ts";
import { database } from "../db/db.ts";

const db = new Database("mysql", database);

class Flight extends Model {
  static table = "flights";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    departure: DATA_TYPES.STRING,
    destination: DATA_TYPES.STRING,
    flightDuration: DATA_TYPES.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}

db.link([Flight]);

await db.sync({ drop: true });

await Flight.create([
  {
    departure: "Paris",
    destination: "Tokyo",
  },
  {
    departure: "London",
    destination: "San Francisco",
  },
]);

await Flight.select("destination").all();
// [ { destination: "Tokyo" }, { destination: "San Francisco" } ]

await Flight.where("destination", "Tokyo").delete();

await Flight.all();
// [
//  {
//    id: 2,
//    departure: "London",
//    destination: "San Francisco",
//    flightDuration: 2.5,
//    created_at: 2020-05-17T13:16:32.333Z,
//    updated_at: 2020-05-17T13:16:32.333Z
//   }
// ]

await Flight.select("destination").find("2");
// [ { destination: "San Francisco" } ]

await Flight.count();
// 1

await Flight.select("id", "destination").orderBy("id").get();
// [ { id: "2", destination: "San Francisco" } ]

await db.close();
