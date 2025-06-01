import { readConfig, setUser } from "./config.js";

function main() {
    setUser('Tai');
    console.log(readConfig());
}

main();
