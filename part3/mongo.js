const mongoose = require('mongoose')

const password = process.argv[2]
const url = `mongodb+srv://fullstackO:${password}@fullstackcluster.ppwpjh2.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=FullStackCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person ({
  name: process.argv[3],
  number: process.argv[4]
})

if (person.name && person.number) {
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

