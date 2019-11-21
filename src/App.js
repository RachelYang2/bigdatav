import React from 'react';
import './App.css';
import HouseTable from './HouseTable';
import { Input } from 'antd';
const client = require('./client');


class App extends React.Component{

  state = {
    host: localStorage.getItem("airbnb_host")
  }

  componentDidMount() {
    const host = localStorage.getItem("airbnb_host")
    if (host) {
      this.getHouses(host)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.host !== this.state.host && this.state.host != null) {
        this.getHouses(this.state.host)
    }
  }

  getHouses = (user) => {
    let self = this
    client.get('/query', {
      params:
      {
        "host-id": user,
      }
    })
      .then(function (response) {
        self.setState({
          houses: response.data,
          host: user
        })
        
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
        // window.scrollTo(0, 0)
      });
  }

  handleConfirm = e => {
    localStorage.setItem("airbnb_host", e.target.value)
    this.getHouses(e.target.value)
  }

  logout = () => {
    localStorage.removeItem('airbnb_host')
    this.setState({
      host: null
    })
  }

  render() {
    const { host, houses } = this.state;
    return (
      <div className="App">
        {!host && <header className="App-header">
          <p>I am a host. </p>
          <p>My ID is&nbsp;</p>
          <Input size="large" placeholder="Your host ID" className="input"
          onPressEnter={(e) => this.handleConfirm(e)} />
        </header>}
        <div className="content">
          {
            host &&
            (
              <div>
                <h2 style={{paddingTop: "5vh"}}>
                  Hi {host}&nbsp;! Here are your houses 
                  <span onClick={this.logout} style={{float: "right", paddingRight: "5vw", cursor: "pointer"}}>Logout</span>
                </h2>
                <HouseTable houses={houses}></HouseTable>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;
