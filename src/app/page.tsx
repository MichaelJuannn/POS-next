import { db } from "../../db"
import { users } from "../../db/schema"

export default async function Page(){
  const test = await db.select().from(users);
  console.log(test) 
  return "xd"
}