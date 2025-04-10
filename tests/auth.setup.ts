import { test as setup } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const USERNAME = "tester@example.com";
const PASSWORD = "Kop@digipath1";

setup("authenticate", async ({ page }) => {
    // Check if auth file already exists
    if (fs.existsSync(authFile)) return;

    // Navigate to login page
    await page.goto("http://127.0.0.1:3000/authentication/login");

    const emailInput = page.getByTestId("email").locator("input");
    const passwordInput = page.getByTestId("password").locator("input");

    await emailInput.waitFor({ state: "visible" });
    await passwordInput.waitFor({ state: "visible" });

    await emailInput.fill(USERNAME);
    await passwordInput.fill(PASSWORD);

    await page.getByTestId("submit").click();

    console.log("Waiting for .dashboard");
    await page.waitForURL("http://127.0.0.1:3000");
    const dashboard = page.getByTestId("dashboard");
    if (!dashboard) throw "Could not find dashboard";

    // Save authenticated state
    console.log("Storing storage state");
    await page.context().storageState({ path: authFile });
});
