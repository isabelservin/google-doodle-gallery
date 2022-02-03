import React from "react"

const DoodleTile = (props) => {
    //destructuring props so we can access the data w/o props keyword
    const {photo, link, date, title, color} = props

    return(
        <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img id="myimg"className="activator" src={photo}/>
            </div>

            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">expand_less</i></span>
                {/* target property opens the link in a different tab with _blank */}
                <a href={link} target="_blank" className="button" id={color}>What in the Doodle?</a>
            </div>

            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">expand_more</i></span>
                {/* displays the current date selected NOT the actual date of the doodle - if i want to render day with all the years that had a doodle this would show as the same date  */}
                <p>{date.toDateString()}</p>
            </div>
      </div>
    )
}

export default DoodleTile