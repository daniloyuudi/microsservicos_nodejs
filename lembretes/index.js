const express = require ('express')
const bodyParser = require ('body-parser')
const axios = require ('axios')
const app = express()
// middleware, permite acessar o corpo (req.body) e tratá-lo como um objeto JSON
app.use(bodyParser.json())

const lembretes = {}
contador = 0

app.get('/lembretes', (req, res) => {
    res.status(200).send(lembretes)
})


app.post('/lembretes', async (req, res) => {
    contador++
    const {texto} = req.body
    lembretes[contador] = {contador: contador, texto: texto}

    await axios.post ('http://localhost:10000/eventos', {
        tipo: "Lembrete Criado",
        dados: {
            contador,
            texto
        }
    });
    res.status(201).send(lembretes[contador])
})

app.post("/eventos", (req, res) => {
    try {
        console.log(req.body);
    } catch(e) {}
    res.status(204).end();
})

app.listen(4000, () => console.log("Lembretes. Porta 4000"))