import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  constructor(){
    super();
    console.log("Hello constructor from news")
    this.state={
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=15ba3d1979fa4eb68299a44aa415ac67&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json()

    this.setState({articles: parseData.articles, 
      totalResults:parseData.totalResults,
      loading:false
    })
  }

   handlePrevClick = async()=>{
     let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=15ba3d1979fa4eb68299a44aa415ac67&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
     this.setState({loading: true});
     let data = await fetch(url);
     let parseData = await data.json()
     
     this.setState({
      page:this.state.page - 1,
      articles: parseData.articles,
      loading: false
      })
    }
    handleNextClick = async()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({loading: true});
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=15ba3d1979fa4eb68299a44aa415ac67&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      
  
      this.setState({
        page:this.state.page + 1,
        articles: parseData.articles,
        loading: false
      })
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element) =>{
          return <div className="col-md-4" key = {element.url}>
            <NewsItem title ={element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage} newsUrl={element.url}/>
          </div>

        })}
          
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News