import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import sequelize from "./database/database";
import userRoutes from "./routes/userRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import tournamentRoutes from "./routes/tournament/tournamentRoutes";
import leagueRoutes from "./routes/league/leagueRoutes";
import authRoutes from "./routes/oAuthRoutes"; 
import matchRoutes from "./routes/league/matchRoutes"; 
import teamRoutes from "./routes/league/teamRoutes"; 
import entryRoutes from "./routes/tournament/entryRoutes"; 
import tournamentMatchRoutes from "./routes/tournament/matchRoutes"; 
import setupAssociations from "./database/associations";
import { swaggerUi, swaggerSpec } from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/leagues", leagueRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/team", teamRoutes);
app.use("/api", entryRoutes);
app.use("/api", tournamentMatchRoutes);

setupAssociations();
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app; 