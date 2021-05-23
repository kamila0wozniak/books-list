import './App.css'
import React from 'react'
import BooksList from './components/BooksList'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      title:'',
      author:'',
      owner:'',
      booksList:[]
    }
  }

  componentDidMount() {
    const existingBooksList = JSON.parse(localStorage.getItem('booksList'))
    console.log(existingBooksList)
    if(existingBooksList) {
      this.setState({booksList:existingBooksList})
    }
  }

  handleChange = (e,propToChange) => {
    const obj = {}
    obj[propToChange] = e.target.value
    this.setState(obj)
  }

  addToList = () => {
    const titleInputValue = this.state.title
    const authorInputValue = this.state.author
    const ownerInputValue = this.state.owner

    const bookToAdd = {
      title:titleInputValue,
      author:authorInputValue,
      owner:ownerInputValue
    }

    const newBookList = [bookToAdd, ...this.state.booksList]

    localStorage.setItem('booksList', JSON.stringify(newBookList))

    this.setState({
      booksList: newBookList,
      title:'',
      author:'',
      owner:''
    })
  }

  deleteBook = (index) => {
    const beforeBooks = this.state.booksList.slice(0,index)
    const afterBooks = this.state.booksList.slice(index + 1)

    const newBooksList = [...beforeBooks, ...afterBooks]

    localStorage.setItem('booksList', JSON.stringify(newBooksList))

    this.setState({
      booksList:newBooksList
    })
  }

  render(){
  return(
      <div className="App">
        <h1>Books List</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <input type="text"
                 name="title"
                 placeholder="Title"
                 id="title"
                 value={this.state.title}
                 onChange={(e) => this.handleChange(e,'title')}
          />
          <input type="text"
                 name="author"
                 placeholder="Author"
                 id="author"
                 value={this.state.author}
                 onChange={(e) => this.handleChange(e,'author')}
          />
          <select name="owner"
                  value={this.state.owner}
                  onChange={(e) => this.handleChange(e,'owner')}
          >
            <option value="" placeholder="Select user"></option>
            <option value="User 01">User 01</option>
            <option value="User 02">User 02</option>
          </select>
          <button type={'submit'}
                  onClick={this.addToList}
          >
            Add
          </button>
        </form>
        <br/>
        <BooksList list={this.state.booksList}
                   deleteHandler={this.deleteBook}
        />
      </div>
  )
}
}

export default App;
