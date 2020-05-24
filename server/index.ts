import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import { database } from "./db/db.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

(async () => {
  const port = 3000;
  const app = new expressive.App();

  const client = await new Client();

  client.connect(database)
    .then((conect) => console.log(`connected to ${conect.config.db}`))
    .catch((err) => console.log(err));

  await client.execute(`CREATE DATABASE IF NOT EXISTS enok`);

  app.use(expressive.simpleLog());
  app.use(expressive.static_("./public"));
  app.use(expressive.bodyParser.json());

  app.get("/", async (req, res) => {
    await res.json([{ name: "Buy some milk" }]);
  });

  const server = await app.listen(port);
  console.log("app listening on port " + server.port);

  //   await client.close();
})();
