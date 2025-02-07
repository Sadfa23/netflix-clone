import express from 'express'
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import searchRoutes from './routes/search.routes.js';
import tvRoutes from './routes/tv.routes.js';
import ENV_VARS from './config/envVars.js';
import connectToDb from './config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';
import path from "path";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie',protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute ,searchRoutes);


const __dirname = path.resolve(); 
if (ENV_VARS.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}



app.listen(ENV_VARS.PORT, ()=>{
    console.log('hello from server: http://localhost:5000');
    connectToDb();
})