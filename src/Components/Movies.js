import React, { Component } from 'react'
import css from "./Movies.module.css";
import axios from "axios";

 class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieArray1:[]
        }
    }
    componentDidMount(){
        axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war")
        .then(response=>{
            this.setState({movieArray1:response.data})

        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    handleChange=(e)=>{
        console.log(e.target.value) 
        let title = e.target.value;
        axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${title===""?"war":title}`)
        .then(response=>{
            this.setState({movieArray1:response.data})
        })
        .catch(err=>{
            console.log(err.message)
        })    
    }
    render() {
        console.log(this.state.movieArray1)
        let {Search} = this.state.movieArray1;//destructuring
        console.log(Search)
        return (
            <div>
                <div id="input-wrapper">
                    <h1>Movie Website </h1>
                    <input onChange={this.handleChange} type="text" placeholder="Search Any Movie" id={css.input}/>
                </div>
                <div className="movie-section" id={css.container}>
                {Search !== undefined ? Search.map((item,pos)=>{
                    return <article key={`${item.imdbID}${pos}`} className={css.card}>
                                <img src={item.Poster} alt="movieImage"/>
                                <p>{item.Title}</p>
                            </article>
                }): <h3>Movie Not Found...<br/>Enter a Valid Name..!</h3> }
                </div>
                <footer>
                    <h3> Developed By Sahil Dua</h3>
                    </footer>
            </div>
        )
    }
}

export default Movies;
