require('dotenv').config()
const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, () => console.info(`App running on port http://localhost:${PORT}`))