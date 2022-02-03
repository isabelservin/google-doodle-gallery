import Calendar from "react-calendar"
import React, { useEffect, useState} from "react"
import axios from 'axios'

import DoodleTile from "./DoodleTile"

const DoodleList = (props) => {
    //state for date selected
    const [date, setDate] = useState(new Date())

    //state for retrieved doodles
    const [doodles, setDoodles] = useState([])

    useEffect(() =>{
        getDoodles(date.getFullYear(), date.getMonth() + 1)
            .then((response) => {   //if our response is successful do this
                console.log(response.data)
                setDoodles(response.data)
            })
            .catch((error) => {   //else log the error
                console.log(`ERROR: ${error}`)
            })

    }, [date])  //useEffect is run only when the value of date changes

    //axios get request to google doodle proxy
    function getDoodles(year, month){
        console.log(`SELECTED:  Year: ${year} Month: ${month}`)
        let config = {
            method: "GET",
            url: `https://google-doodles.herokuapp.com/doodles/${year}/${month}` //api requires at year and month passed for retrieval
        }
        return axios(config)
    }

    //renders each doodle that matched the current day selected
    const listOfDoodles = doodles.filter(filteredDoodlesByDay).map((doodle) => {
        let btnLink = `https://www.google.com/search?q=${doodle.query}`
        let idColor = randColorId()
        return(
            <DoodleTile 
                photo={doodle.url}
                title={doodle.query}
                date={date}     //NOTE: this passes the current date to my tile not the actual doodle date from the api
                link={btnLink}
                color={idColor}
                />
        )
    })

    //callback function that returns the doodle that matches the current date selected
    function filteredDoodlesByDay(doodle){
        if(doodle.run_date_array[2] === date.getDate()){
            return doodle
        }
    }

    // random button random google colors
    function randColorId(){
		let colorList = ['light-orange', 'light-yellow', 'light-red' ];
		let randIndex = Math.floor(Math.random() * colorList.length);

		return colorList[randIndex]
	}

    return(
        <>
         <div className="row featurette">
            <div className="col-md-7">
                <h1 className="featurette-heading main-h1">Google Doodle Gallery</h1>
                <p className="lead">The doodle aims to celebrate interesting events and anniversaries that reflect Google's personality and love for innovation.</p>
            </div>

            <div className="col-md-5">
                <Calendar 
                onChange={setDate}
                value={date}/>
            </div>
        </div>

        <div className="doodle-cards">
            {listOfDoodles}
        </div>
        </>
    )
}

export default DoodleList