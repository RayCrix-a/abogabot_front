import * as path from "node:path";
import * as process from "node:process";
import { generateApi } from "swagger-typescript-api";

async function main() {
    const specUrl = process.env.ABOGABOT_OPENAPI_SPEC ?? (() => { throw new Error("Environment variable ABOGABOT_OPENAPI_SPEC is not defined"); })();
    await generateApi({
        url: specUrl,
        output: path.resolve(process.cwd(), "src/generated/api"),
        cleanOutput: true,
        moduleNameFirstTag: true,
        modular: true
    } as any);
}

main().catch(console.error);