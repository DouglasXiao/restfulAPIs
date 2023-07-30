const http = require('express');
const cors = require('cors');
const axios = require('axios');

const hostname = 'localhost';
const port = 3001;

const server = http();
server.use(http.json());
server.use(http.urlencoded({ extended: true }));
server.use(cors({
        origin: "http://localhost:3000"
}));

server.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
});

server.get("/gettest/:version", (req, res, next) => {
        res.send(req.params.version);
});

server.post("/posttest/:id", (req, res) => {
        const { id } = req.params;
        const { title, book } = req.body;
        res.json(`This is a POST request and you input ${id} in the query parameter, also your title is: ${title}, you bought a book called: ${book}`);
});

server.put("/puttest/:id", (req, res) => {
        const { id } = req.params;
        res.json(`This is a PUT request and you input ${id} in the query parameter`);
});

server.delete("/deletetest/:id", (req, res) => {
        const { id } = req.params;
        res.send({ 'id': id});
});

server.get("/randomcoffee", async(_req, res) => {
        try {
                const response = await axios.get("https://coffee.alexflipnote.dev/random.json");
                console.log(response);
                res.send(response.data);
        } catch (error) {
                res.status(500).send("Error occurred while trying to retrieve coffee data.");
        }
});
