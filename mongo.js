const mongoose = require('mongoose')

const password = process.env.MONGO_PW
const url = `mongodb+srv://eetusva:${password}@cluster0.rkq2aqw.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {})
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    if (result.length === 0) {
      console.log('No entries found')
    }
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log('Person saved:', result.name, result.number)
    mongoose.connection.close()
  })
} else {
  console.log(
    `Usage:
    "node mongo.js <password>" lists all persons in the phonebook
    "node mongo.js <password> <name> <number>" adds a new person to the phonebook
    `
  )
  process.exit(1)
}
