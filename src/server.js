import app from './app.js';
import {sequelize,connectDB} from './config/db.js';
import config from './config/env.js';

const PORT = config.PORT || 3000;
async function startServer() {
     try {
    await connectDB();

    const isDevelopment = process.env.NODE_ENV !== "production";
    const syncOptions = isDevelopment ? { alter: true } : {};

    await sequelize.sync(syncOptions);

    console.log(
      isDevelopment
        ? "✅ Database models synced with schema auto-alter enabled (development)"
        : "✅ Database models synced"
    );

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed:", error);
    process.exit(1);
  }
}
startServer();