"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/// Sending a message to see if the server is online and if everything is working ok.
app.get("/", (req, res) => {
    res.send("Hello!");
});
app.use((req, res, next) => {
    res.status(500).json({ message: "Internal server error" });
});
app.listen(5000, () => {
    console.log("Server running!");
});
