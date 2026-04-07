import { useState, useEffect } from "react";
import "./App.css";
const WEEKDAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function App(){
  const [animate,setAnimate]=useState(false);
  const [currentDate,setCurrentDate]=useState(new Date());
  const [startDate,setStartDate]=useState(null);
  const [endDate,setEndDate]=useState(null);
  const [notes,setNotes]=useState({});

  const image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
  const year=currentDate.getFullYear();
  const month=currentDate.getMonth();
  const today=new Date();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const firstDay=(new Date(year,month,1).getDay()+6)%7;
  useEffect(()=>{
    try{
      const saved=localStorage.getItem("calendar-notes");
      if(saved) setNotes(JSON.parse(saved));
    } catch{
      localStorage.removeItem("calendar-notes");}
  },[]);

  useEffect(()=>{
    localStorage.setItem("calendar-notes",JSON.stringify(notes));
  },[notes]);

  const changeMonth=(offset)=>{
  setAnimate(true);
  setTimeout(()=>{
    setCurrentDate(new Date(year,month+offset,1));
    setStartDate(null);
    setEndDate(null);
    setAnimate(false);
  },200);};

  const isSameDay=(d1,d2)=>
    d1 && d2 && d1.toDateString()===d2.toDateString();
  const isInRange=(date)=>{
    if(!startDate || !endDate) return false;
    return date>startDate && date<endDate;};
  const handleClick=(day)=>{
    const selected=new Date(year,month,day);
    if(!startDate || (startDate && endDate)){
      setStartDate(selected);
      setEndDate(null);}
    else if(selected > startDate){
      setEndDate(selected);}
    else{
      setStartDate(selected);
      setEndDate(null);}};
  const days=[];
  for(let i=0;i<firstDay;i++){
    days.push(<div key={"e"+i}></div>);}

  for(let d=1;d<=daysInMonth;d++){
    const date=new Date(year,month,d);
    const isStart=isSameDay(date,startDate);
    const isEnd=isSameDay(date, endDate);
    days.push(
  <div
    key={d}
    className={`day 
      ${isStart ? "start" : ""}
      ${isEnd ? "end" : ""}
      ${isInRange(date) ? "range" : ""}
      ${isSameDay(date, today) ? "today" : ""}
    `}
    onClick={() => handleClick(d)}
  >
    {d}

    {/* 🔥 DOT INDICATOR */}
    {Object.keys(notes).some((k) => k.includes(date.toDateString())) && (
      <div className="dot"></div>
    )}
  </div>
);
  }

  const key =
    startDate && endDate
      ? `${startDate.toDateString()}-${endDate.toDateString()}`
      : startDate
      ? startDate.toDateString()
      : "";

  return (
    <div className="container">
      <div className="calendar-card">

        {/* IMAGE */}
        <div
          className="image"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="overlay">
            <h3>{year}</h3>
            <h2>
              {currentDate.toLocaleString("default", { month: "long" })}
            </h2>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="bottom">

          {/* NOTES */}
          <div className="notes">
            <h3>Notes</h3>

            <textarea
              disabled={!key}
              placeholder={
                key
                  ? "Start writing notes..."
                  : "Select a date or a range of dates..."
              }
              value={key ? notes[key] || "" : ""}
              onChange={(e) => {
                if (!key) return;

                setNotes((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }));
              }}
            />
          </div>

          {/* CALENDAR */}
          <div className="calendar">

            <div className="controls">
              <button onClick={() => changeMonth(-1)}>←</button>

              <h3>
                {currentDate.toLocaleString("default", { month: "short" })} {year}
              </h3>

              <button onClick={() => changeMonth(1)}>→</button>
            </div>

            <div className="weekdays">
              {WEEKDAYS.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className={`grid ${animate ? "fade" : ""}`}>
  {days}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}