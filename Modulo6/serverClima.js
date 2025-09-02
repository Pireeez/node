const express = require("express");
const axios = require("axios");
const app = express();

const port = 3000;
app.use(express.json());

app.get("/clima", async (req, res) => {
    try {
        const nameCity = req.query.nome;

        if (!nameCity) {
            return res
                .status(400)
                .json({ message: "Informe o nome da cidade!" });
        }
        const data = await searchCityWeather(nameCity);

        if (data === undefined) {
            return res.status(404).json({ message: "Essa cidade não existe!" });
        } else {
            res.status(200).json(data);
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

app.listen(port, () => {
    console.log(`API: http://localhost:${port}`);
});

const searchCityWeather = async (nameCity) => {
    try {
        const cityList = [];
        const resultCity = await axios
            .get(
                `https://geocoding-api.open-meteo.com/v1/search?name=${nameCity}`
            )
            .then((item) => item.data);

        if (resultCity.results) {
            for (let city of resultCity.results) {
                const { latitude, longitude, name, timezone } = city;

                const resultCityWeather = await axios
                    .get(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${timezone}`
                    )
                    .then((item) => item.data);

                cityList.push({
                    nameCity: name,
                    temperature: `${resultCityWeather.current_weather.temperature}ºC`,
                });
            }
            return cityList;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
    }
};

// Utilizando os conceitos aplicados anteriormente,
// desenvolva uma rota para consultar o clima de uma cidade.
// Essa rota receberá o nome de uma cidade como parâmetro,
// consultará na API Meteo pelas coordenadas e depois pelos dados da
// temperatura e devolverá como resposta. Faça verificações se aquela
// cidade existe
