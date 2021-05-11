import { Component } from 'react'
import axios from 'axios';

export default class Articles extends Component {
  constructor() {
    super();
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    axios.post('/api/articles').then(response => {
      let getarticles = response.data
      this.setState({ 
        articles: getarticles
      })
    })
  }

  render() {
    return(
      <div id="articles">
        {this.state.articles.map (article => (
          <div key={article.articleid}>
            <p>{article.title}</p>
            <span>{article.content}</span>
          </div>
        ))}
      </div>
    )
  }
}