import React, { useState } from 'react';
import './styles.css';

function App() {
  const [city, setCity] = useState("")
  const [weatherForecast, setWeatherForecast] = useState(null)
  const handleChange = (e) => {
    setCity(e.target.value)
  }
  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=d5d696af94234de0aef163435221708&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status == 200){
        return (response.json())
      }
    })
    .then((data) => {
      console.log(data)
      setWeatherForecast(data)
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="lead navbar-brand text-white" href="#top">
          Previsão do tempo em: <b>{city}</b>
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
          <p className="lead">Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar</p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input className="form-control"
              onChange={handleChange}
              type="text"
              value={city} />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary">
            pesquisar
          </button>

            {weatherForecast ? (
            <div>
              <div className="mt-4 d-flex align-items-center">
                <div className="align-items-center">
                  <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                  <p className="lead">
                    Temp: <b>{weatherForecast.current.temp_c}°</b> <br/>
                    Estado: <b>{weatherForecast.location.region}</b> <br />
                    Cidade: <b>{weatherForecast.location.name}</b> <br />
                    Pais: <b>{weatherForecast.location.country}</b> <br />
                    Data da consulta: <b>{weatherForecast.current.last_updated}</b>
                  </p>
                  <div>
                  <img className="img" src={weatherForecast.current.condition.icon} />
                </div>
                </div>
              </div>
            </div>
            ) : null}

        </div>
      </main>
    </div>
  );
}
export default App;