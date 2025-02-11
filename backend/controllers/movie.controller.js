import { fetchFromTMDB } from "../services/tmdb.services.js";

export const getTrendingMovie = async(req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random()*data.results?.length)];
        res.status(200).json({success:true, content: randomMovie})
    } catch (error) {
        console.log('Error fetching movie from API',error)
        res.status(400).json({success:false, message:'Internal server error'})
    }
}

export const getMovieTrailers = async(req, res) =>{
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({success: true, trailers: data.results})
    } catch (error) {
        if (error.message.includes("404")) {
            console.log(error)
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export const getMovieDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success: true, content: data})
    } catch (error) {
        if (error.message.includes("404")) {
            console.log(error)
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
    
}

export const getSimilarMovies = async(req, res) =>{
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.json({success: true, similar: data.results})
    } catch (error) {
        /*
        if (error.message.includes("404")) {
            console.log(error)
			return res.status(404).send(null);
		}*/
        console.log(error)
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesByCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}