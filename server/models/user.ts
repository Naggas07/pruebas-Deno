import { DATA_TYPES, Model } from "https://deno.land/x/denodb/mod.ts";

class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DATA_TYPES.STRING,
    nick: DATA_TYPES.STRING,
    age: DATA_TYPES.FLOAT,
    type: DATA_TYPES.STRING,
  };

  static defaults = {
    type: "user",
  };
}

export { User };
