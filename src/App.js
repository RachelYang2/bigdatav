import React from 'react';
import './App.css';
import HouseTable from './HouseTable';
import { Input, Button } from 'antd';
const client = require('./client');


class App extends React.Component{

  state = {
    host: localStorage.getItem("airbnb_host"),
    hotHosts: []
  }

  componentDidMount() {
    const host = localStorage.getItem("airbnb_host")
    if (host) {
      this.getHouses(host)
    }
    this.getHotHost();
  }

  getHotHost = () => {
    let self = this
    client.get('/hosts')
      .then(function (response) {
        self.setState({
          hotHosts: response.data.result.map(host => host.host_id),
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
          houses: response.data.result,
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
    const { host, houses, hotHosts } = this.state;
    return (
      <div className="App">
        <header className="App-header" style={{ height: host ? "45vh" : "100vh",
        backgroundImage: host ? "url(https://www.private-travel.co/wp-content/uploads/2017/01/Singapore-Banner.jpg)" : 
        "url(https://a0.muscache.com/4ea/air/r:w775-h518-sfit,e:fjpg-c80/pictures/0ffd8594-f123-43f0-85bb-7ef88c6f0624.jpg)",
        backgroundSize: "cover"
      }}>
          <p>I am a host. </p>
          <p>My ID is&nbsp;</p>
          <Input size="large" placeholder="Your host ID" className="input"
          onPressEnter={(e) => this.handleConfirm(e)} />
          <p style={{marginBottom: 0, marginTop: "1em"}}>Here are some possible choices</p>
          <p>
            { 
              hotHosts && hotHosts.length > 0 && hotHosts.map(host => (<Button onClick={() => this.getHouses(host)}>{host}</Button>))
            }
          </p>
        </header>
        {host && <span onClick={this.logout} className="logout">Logout</span>}
        <div className="content">
          {
            houses &&
            (
              <div>
                <h2 style={{paddingTop: "5vh"}}>
                  Hi {host}&nbsp;!&nbsp; Here are your houses 
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
