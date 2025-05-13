const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nimi = process.argv[3]
const numero = process.argv[4]

const url =
    `mongodb+srv://eetusva:${password}@fso2025.b68e4.mongodb.net/puhelinApp?retryWrites=true&w=majority&appName=FSO2025`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const puhelinSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', puhelinSchema)

const person = new Person({
  name: `${nimi}`,
  number: `${numero}`,
})

if (!nimi) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    console.log(`added ${nimi} number ${numero} to phonebook`)
    mongoose.connection.close()
  })
}