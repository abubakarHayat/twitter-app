import React from "react";
import { Timeline } from 'react-twitter-widgets'
import './WidgetColumn.css'


const WidgetColumn = () => {

  return (
    <div className="widgets">
      <div className="widgets__input">
        <span className="material-icons widgets__searchIcon"> </span>
        <input type="text" placeholder="Search Twitter" />
      </div>
      <div className="widgets__widgetContainer">
        <ul className="list-group">
          <li className="list-group-item list-head"><Timeline
            dataSource={{
              sourceType: 'profile',
              screenName: 'elonmusk'
            }}
            options={{
              height: '300'
            }}
          /></li>
        </ul>
      </div>

      <div className="widgets__widgetContainer">
        <ul className="list-group trend-list">
          <li className="list-group-item list-head">Trends for you</li>
          <li className="list-group-item"><p className="text-end"><span className="trend-holder">Trending in Pakistan</span><i className="bi bi-three-dots"></i></p>#SavePalestine</li>
          <li className="list-group-item text-end"><p className="text-start"><i className="bi bi-three-dots"></i><span className="trend-holder-right">Trending in Pakistan</span></p>#وہ_غدار_باجوہ_تھا</li>
          <li className="list-group-item"><p className="text-end"><span className="trend-holder">Trending in Pakistan</span><i className="bi bi-three-dots"></i></p>#SayNoToImportedGovernment</li>
          <li className="list-group-item"><p className="text-end"><span className="trend-holder">Trending in Pakistan</span><i className="bi bi-three-dots"></i></p>South Africa</li>
          <li className="list-group-item"><p className="text-end"><i className="bi bi-three-dots"></i></p>#WinterIsComing</li>
        </ul>
      </div>

    </div>
  )
}

export default WidgetColumn
