import axios from "axios";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateRandomLetters } from "./word-generate.js";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://word-plate.netlify.app"
  }
});

const apiWord = axios.create({
  baseURL: "https://api.dicionario-aberto.net/",
})

const words = []
const challengeOfDay = []



io.on("connection", (socket) => {
  console.log('new connection', socket.id)

  let username = ''

  socket.on('username', (name) => {
    username = name
  })

  socket.on('challenge-of-day', () => {
    console.log('challenge-of-day')
    socket.emit('list-words-of-day', words)
    socket.emit('letters-of-day', challengeOfDay)

    socket.on('try-word', async (word) => {
      console.log('try-word', word)

      if (words.includes(word)) {
        socket.emit('word-used', words)
      }

      await apiWord.get(`/word/${word}`)
        .then(({ data }) => {
          if (data.length) {
            words.push(word)

            socket.emit('word-correct')
          } else {
            socket.emit('word-wrong')
          }
        }).catch((err) => {
          socket.emit('word-error', err)
        }).finally(() => {
          socket.emit('list-words-of-day', words)
        })
    })
  })
});

httpServer.listen(3000, () => {
  challengeOfDay.push(...generateRandomLetters())

  console.log('start', process.env.SOCKET_PORT)
});
