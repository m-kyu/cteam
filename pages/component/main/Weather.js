import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Weather = () => {
    const [data,setData] = useState(); 
    function Api (position) {
        const apiKey = "6cab2eaf7f981918390ab25e4cbb5ee8";
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        axios.get(url).then((res => setData(res)))
    }
    
    data && console.log(data.data);
    let weatherIcon;
    let weatherTemp;
    let weatherRegion;
if(data){
     weatherIcon = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`;
     weatherTemp = data.data.main.temp + "℃";
     weatherRegion = data.data.name;
}
    useEffect(()=>{
        window.navigator.geolocation.getCurrentPosition(Api);
    },[])

    return (
        <div>
            <img src={weatherIcon} />
            <p>{weatherRegion}</p>
            <p>{weatherTemp}</p>
        </div>
    )
}

export default Weather