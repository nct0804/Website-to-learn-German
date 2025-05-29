import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.json({
    message: "GermanGains API is running",
    version: "1.0.0",
    routes: ["/", "/health", "/test-db"],
  });
});

app.get("/health", (_, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + " seconds",
  });
});

app.get("/test-db", async (_, res) => {
  try {
    console.log("Testing database connection...");

    // Dynamischer Import
    const { default: prisma } = await import("./lib/prisma");

    // Test query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Database test successful:", result);

    res.json({
      status: "Database connected successfully! ✅",
      result: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    res.status(500).json({
      status: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`GermanGains API running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Database test: http://localhost:${PORT}/test-db`);
});
