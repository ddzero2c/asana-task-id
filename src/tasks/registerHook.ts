import args from "args";
import dotenv from "dotenv";
import { Asana } from "../services";

dotenv.config();

const { ASANA_PROJECT_ID } = process.env;

args
  .option(
    "projectId",
    "The project identifier to listen for with the webhook",
    ASANA_PROJECT_ID
  )
  .option("url", "The webhook endpoint to be registered");

const { projectId, url } = args.parse(process.argv);

(async () => {
  console.log(`Creating hook for '${projectId}' on '${url}'`);
  try {
    await Asana.createHook(projectId, url);
  } catch (err) {
    console.log(err.value.errors);
    process.exit(1);
  }
  console.log(`Webhook created!`);
})();

