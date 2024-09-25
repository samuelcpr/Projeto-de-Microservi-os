const express = require("express");
const kafka = require("kafka-node");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new kafka.Producer(client);

app.post("/user", (req, res) => {
  const { username, email } = req.body;

  const payload = [
    { topic: "user-topic", messages: JSON.stringify({ username, email }) },
  ];
  producer.send(payload, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao enviar mensagem para Kafka" });
    }
    res.json({ message: "Usuário criado com sucesso" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
