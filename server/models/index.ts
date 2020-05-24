import { Database } from "https://deno.land/x/denodb/mod.ts";
import { database } from "../db/db.ts";

//models

import { User } from "./user.ts";

const models = [User];

export { models };
