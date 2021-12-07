import Weather from "./app_components/weather.component";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import { Component } from "react";
import Form from "./app_components/form.component";


// api  call to api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
const API_key="e851599701c006e327ff1d91960f2cef";

class App extends Component {
  constructor(){
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.weatherIcon ={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
    
  }

  calCelcius(temp){
    let cel=Math.floor(temp-273.15);
    return cel;
  }

  getWeatherIcon(icons, rangeId){
    switch(true){
      case rangeId>=200 && rangeId<=232:
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;
      case rangeId>=300 && rangeId<=321:
        this.setState({icon: this.weatherIcon.Drizzle});
        break;
      case rangeId>=500 && rangeId<=531:
        this.setState({icon: this.weatherIcon.Rain});
        break;
      case rangeId>=600 && rangeId<=622:
        this.setState({icon: this.weatherIcon.Snow});
        break;
      case rangeId>=701 && rangeId<=781:
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;
      case rangeId>=800:
        this.setState({icon: this.weatherIcon.Clear});
        break;
      case rangeId>=801 && rangeId<=804:
        this.setState({icon: this.weatherIcon.Clouds});
        break;
      default:
        this.setState({icon: this.weatherIcon.Clouds});
      }
  }

  getWeather = async(e) =>{

    e.preventDefault();

    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

    if(city && country){
      try{
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      
      
    const response=await api_call.json();
    //console.log(response);
    
    this.setState({
      city: `${response.name},${response.sys.country}`,
      celcius: this.calCelcius(response.main.temp),
      temp_max: this.calCelcius(response.main.temp_max),
      temp_min: this.calCelcius(response.main.temp_min),
      description: response.weather[0].description,
      error:false
    });

    this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
    }
  catch(err){
    this.setState({error:true});
  }
}
    else{
      this.setState({error:true});
    }
    
  }

  render(){
    return(
      <div className="App">
        <Form 
          loadWeather={this.getWeather}
          error={this.state.error}
        />
        <Weather 
          city={this.state.city} 
          country={this.state.country} 
          temp_celcius={this.state.celcius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}


export default App;
