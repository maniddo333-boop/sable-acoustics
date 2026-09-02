import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(function (_a) {
    var command = _a.command;
    return ({
        // GitHub Pages serves this as a project site at /sable-acoustics/, but
        // local dev should stay at the root so the existing localhost URL keeps
        // working.
        base: command === "build" ? "/sable-acoustics/" : "/",
        plugins: [react()],
    });
});
