"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const subscriptionRoutes_1 = __importDefault(require("./routes/subscriptionRoutes"));
const tournamentRoutes_1 = __importDefault(require("./routes/tournament/tournamentRoutes"));
const leagueRoutes_1 = __importDefault(require("./routes/league/leagueRoutes"));
const oAuthRoutes_1 = __importDefault(require("./routes/oAuthRoutes"));
const matchRoutes_1 = __importDefault(require("./routes/league/matchRoutes"));
const teamRoutes_1 = __importDefault(require("./routes/league/teamRoutes"));
const entryRoutes_1 = __importDefault(require("./routes/tournament/entryRoutes"));
const matchRoutes_2 = __importDefault(require("./routes/tournament/matchRoutes"));
const associations_1 = __importDefault(require("./database/associations"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/api/users", userRoutes_1.default);
app.use("/api/subscriptions", subscriptionRoutes_1.default);
app.use("/api/tournaments", tournamentRoutes_1.default);
app.use("/api/leagues", leagueRoutes_1.default);
app.use("/api/auth", oAuthRoutes_1.default);
app.use("/api/match", matchRoutes_1.default);
app.use("/api/team", teamRoutes_1.default);
app.use("/api", entryRoutes_1.default);
app.use("/api", matchRoutes_2.default);
// Setup associations
(0, associations_1.default)();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.authenticate();
        console.log("Database connected");
        yield database_1.default.sync({ alter: true });
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
});
startServer();
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
