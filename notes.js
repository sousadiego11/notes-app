const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()
    console.log('Alright, your notes are:')
        
    notes.forEach((note, i) => {
        
        console.log(chalk.inverse(`${i + 1}- ${note.title}`))
    });
}

const readNote = (title)=> {
    const notes = loadNotes()
    const match = notes.find(note => note.title === title)

    if(!match){
        console.log(chalk.red.inverse('Sorry, no note found :('))
    }else {
        console.log(chalk.inverse('Title: ',match.title))
        console.log(match.body)
    }
}

const addNote = (title, body)=> {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('Anotação feita com sucesso!'))
    }else{
        console.log(chalk.red.inverse('Este título já está em uso! :('))
    }
}

const removeNote = title=> {
    const notes = loadNotes()
    const filtered = notes.filter(note => note.title !== title)

    if(filtered.length < notes.length) {
        console.log(chalk.green.inverse('Anotação removida com sucesso!'))
        saveNotes(filtered)
    }else {
        console.log(chalk.red.inverse('Este título não existe :('))
    }
}

const saveNotes = (notes)=> {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = ()=> {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}