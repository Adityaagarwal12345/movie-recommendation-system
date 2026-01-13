require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const cors = require('@fastify/cors');
const OpenAI = require('openai');
const Recommendation = require('./models/Recommendation');

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Register CORS
fastify.register(cors, {
    origin: '*', // For development, allow all. In production, lock this down.
});

// Connect to MongoDB
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        fastify.log.info('Connected to MongoDB');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

// Routes
fastify.post('/api/recommend', async (request, reply) => {
    try {
        const { genre, description } = request.body;
        const userInput = `${genre ? genre : ''} ${description ? description : ''}`.trim();

        if (!userInput) {
            return reply.status(400).send({ error: 'Please provide a genre or description.' });
        }

        // Call OpenAI
        let recommendedMovies;
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful movie recommendation assistant. 
                        User will provide a genre or description. 
                        You must return a JSON array of 3-5 movie objects. 
                        Each object must have: "title", "year", "description", "rating" (IMDb style).
                        The output must be ONLY the valid JSON array, no markdown formatting.`
                    },
                    { role: "user", content: `Recommend movies for: ${userInput}` }
                ],
                model: "gpt-3.5-turbo",
            });

            const responseContent = completion.choices[0].message.content;
            try {
                recommendedMovies = JSON.parse(responseContent);
            } catch (e) {
                const jsonMatch = responseContent.match(/\[.*\]/s);
                if (jsonMatch) {
                    recommendedMovies = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error("Failed to parse OpenAI response");
                }
            }
        } catch (apiError) {
            fastify.log.error(`OpenAI API Error: ${apiError.message}`);
            // Fallback to Mock Data if API fails (e.g. Rate Limit)
            console.log("Falling back to MOCK data due to API error.");

            const mockPool = [
                { title: "Inception", year: "2010", rating: "8.8", description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
                { title: "The Matrix", year: "1999", rating: "8.7", description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers." },
                { title: "Interstellar", year: "2014", rating: "8.6", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
                { title: "Parasite", year: "2019", rating: "8.6", description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
                { title: "The Dark Knight", year: "2008", rating: "9.0", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice." },
                { title: "Spirited Away", year: "2001", rating: "8.6", description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts." },
                { title: "Pulp Fiction", year: "1994", rating: "8.9", description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
                { title: "Everything Everywhere All At Once", year: "2022", rating: "7.8", description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save the existence by exploring other universes connecting with the lives she could have led." },
                { title: "Dune: Part Two", year: "2024", rating: "8.8", description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family." },
                { title: "Spider-Man: Into the Spider-Verse", year: "2018", rating: "8.4", description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities." }
            ];

            // Shuffle and pick 3-5 random movies
            const shuffled = mockPool.sort(() => 0.5 - Math.random());
            const count = Math.floor(Math.random() * 3) + 3; // 3 to 5
            recommendedMovies = shuffled.slice(0, count);
        }

        // Save to DB
        const recommendation = new Recommendation({
            userInput: userInput,
            recommendedMovies: recommendedMovies
        });
        await recommendation.save();

        return { success: true, movies: recommendedMovies };

    } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Internal Server Error', details: error.message });
    }
});

fastify.get('/api/history', async (request, reply) => {
    try {
        const history = await Recommendation.find().sort({ createdAt: -1 }).limit(10);
        return history;
    } catch (error) {
        return reply.status(500).send({ error: 'Failed to fetch history' });
    }
});

// Start Server
const run = async () => {
    await start();
    try {
        await fastify.listen({ port: process.env.PORT || 3000 });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

run();
