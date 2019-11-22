import React from 'react';
import './HouseDetail.scss';
import { Row, Col, Icon } from 'antd';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "leaflet/dist/leaflet.css";
import { Map, CircleMarker, TileLayer } from "react-leaflet";


const client = require('./client');

class HouseDetail extends React.Component {
    state = {
        house: {},
    };

    componentDidMount(){
        window.scrollTo(0,0);
        this.fetchData();
    }

    fetchData = () => {
        let house = {}
        let self = this
        client.get('/query?id=' + this.props.match.params.id)
            .then(function (response) {
                house = response.data.result[0];
                self.setState({
                    house: house,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.fetchData()
        }
    }

    render() {
        const { house } = this.state;
        return (
            <div>
                <div className="house-detail">
                    <div style={{ margin: "2vw" }}><Link to="/" title="Back to Index">&nbsp;&nbsp;<Icon type="home" style={{ fontSize: '20px', color: '#FF5A5E' }} /></Link>
                        <span className="header">Hi {localStorage.getItem("airbnb_host")}</span>
                    </div>
                    <div className="summary-info">
                        <Row style={{ padding: "2vw" }}>
                            <Col span={12}><img src={house.picture_url} style={{ width: "95%", height: "95%" }} alt="house"/></Col>
                            <Col span={12}>
                                <div className="info">
                                    <p className="location">{house.property_type}&nbsp;<Icon type="environment" />&nbsp;{house.neighbourhood_cleansed}</p>
                                    <p style={{fontWeight: "bold", color: "#00bfa5"}}>{house.name}</p>
                                    <p>{house.bedrooms && parseInt(house.bedrooms)}&nbsp;bedrooms&nbsp;&nbsp;{house.bathrooms && parseInt(house.bathrooms)}&nbsp;bathrooms</p>
                                    <p>&nbsp;{house.price}&nbsp;/night </p>
                                    {
                                        house.price && parseInt(house.price.match(/\d+/g)) !== house.avg_price ? 
                                        <p>You may adjust the price to &nbsp;
                                            <span className="adjusted_price" style={{color: house.avg_price > parseInt(house.price.match(/\d+/g)) ? "red" : "green"}}>{house.avg_price}</span>
                                        </p> : <p>You don't need to adjust your price</p>
                                    }
                                    {house.review_scores_rating && <div>
                                        <span>{house.review_scores_rating && house.review_scores_rating / 20}&nbsp;&nbsp;</span>
                                        <StarRatings
                                            rating={house.review_scores_rating / 20}
                                            starRatedColor="#4472C4"
                                            numberOfStars={5}
                                            starDimension="15px"
                                            name='rating'
                                            starSpacing="3px"
                                        />
                                    </div>}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h2 style={{paddingTop: "2vh"}}>Here is the trend of number of tourists of Singapore last year.</h2>
                            <ReactEcharts
                                option={{
                                    xAxis: {
                                        type: 'category',
                                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                    },
                                    yAxis: {
                                        type: 'value'
                                    },
                                    series: [{ 
                                        data: 
                                            [1563359,
                                                1491970,
                                                1584406,
                                                1544248,
                                                1470891,
                                                1544679,
                                                1732896,
                                                1683122,
                                                1415149,
                                                1467380,
                                                1406985,
                                                1603217],
                                        type: 'line'
                                    }]
                                }}
                            />
                        </Row>
                        <Row>
                            <Map
                                style={{ height: "480px", width: "100%" }}
                                zoom={10}
                                center={[1.3521, 103.8198]}
                            >
                                <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    {house && 
                                        <CircleMarker
                                            center={[house.latitude || 0, house.longitude|| 0]}
                                            fillOpacity={0.8}
                                            stroke={false}
                                        />
                                    }
                            </Map>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default HouseDetail;