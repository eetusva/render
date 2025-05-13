const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.env.MONGO_PW
const nimi = process.argv[3]
const numero = process.argv[4]

const url = `mongodb+srv://reinosva:${password}@cluster0.fzshbvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

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
