import React from 'react';
import { Row, Col } from 'antd';
import './HouseTable.scss';
import { Link } from 'react-router-dom'


class HouseTable extends React.Component {
    
    render() {
        const { houses } = this.props;
        return (
            <div>
                <Row>
                    {houses && houses.length === 0 && <div>
                        Sorry, you don't have any houses :(
                    </div>}
                    {houses && houses.length > 0 && houses.map(house => (
                        <Col key={house.id} span={8}>
                            <div className="info-block" style={{ padding: "1vw" }}>
                                <img alt="house" src={house.picture_url} />
                                <div>
                                    <p style={{ fontWeight: "bold", paddingTop: "10px" }}>
                                        {house.property_type}&nbsp; @ &nbsp;
                                        {house.neighbourhood_cleansed && house.neighbourhood_cleansed.split(' ')[0]}&nbsp;- Singapore
                                    </p>
                                    <p><Link to={`/house/${house.id}`} style={{color: "#00bfa5", fontWeight: "bold", fontSize: "120%"}}>{house.name}</Link></p>
                                    <p>&nbsp;{house.price}&nbsp;SGD/night </p>
                                    {
                                        parseInt(house.price.match(/\d+/g)) !== house.avg_price ? 
                                        <p>You may adjust the price to &nbsp;
                                            <span className="adjusted_price" style={{color: house.avg_price > parseInt(house.price.match(/\d+/g)) ? "red" : "green"}}>{house.avg_price}</span>
                                        </p> : <p>You don't need to adjust your price</p>
                                    }
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
};

export default HouseTable;