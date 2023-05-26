import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className='my-3'>
          <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202211/it-astro-2_1_1-sixteen_nine.jpg?VersionId=a3tvB8yVtZIF083Z26lUB5nsCeHEfz1i":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
          </div>
      </div>
    )
  }
}

export default NewsItem