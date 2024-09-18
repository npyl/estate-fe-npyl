const RED_ANSI = "\x1b[31m";
const RESET_ANSI = "\x1b[0m";

/**
 * Do NOT allow using other than `npm` as package manager.
 */
if (process.env.npm_execpath.indexOf("npm") !== 0) {
    console.error(
        `\n\n${RED_ANSI}Property Pro:${RESET_ANSI} Currently, only NPM is supported. ${RED_ANSI}Please use that instead!${RESET_ANSI}\n\n`
    );
    process.exit(1);
}
