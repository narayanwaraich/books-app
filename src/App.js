import React, {Component} from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      hasLoaded: false,
      bookList: []
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  handleSearchTextChange(searchText) {
    this.setState({searchText: searchText});
  }

  handleSearchFormSubmit(e) {
    e.preventDefault();
    this.setState({hasLoaded: false});
    this.getBooks(this.state.searchText);
  }

  componentDidMount(){
    this.getBooks('Harry Potter');
  }

  getBooks(searchText){
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+searchText).then((response) => {
      console.log(response);
      this.setState({bookList: response.data.items, hasLoaded: true});
    });
  }

  render(){
    const loadingGif = <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>;
    return (
      <div className="App">
        <SearchBar
          searchText={this.state.searchText}
          onSearchTextChange={this.handleSearchTextChange}
          onSearchFormSubmit={this.handleSearchFormSubmit}
        />
        {this.state.hasLoaded ? <BookList searchText={this.state.searchText} books={this.state.bookList}/> : loadingGif }
      </div>
    );
  }
}

export default App;
