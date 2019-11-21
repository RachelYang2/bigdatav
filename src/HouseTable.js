import React from 'react';
import { Row, Col } from 'antd';
import './HouseTable.scss';


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
                        <Col key={house.listing_id} span={8}>
                            <div className="info-block" style={{ padding: "1vw" }}>
                                <img alt="house" src={house.image_url} />
                                <div>
                                    <p style={{ fontWeight: "bold", paddingTop: "10px" }}>{house.neighbourhood_group_cleansed && house.neighbourhood_group_cleansed.split(' ')[0]}&nbsp;- Singapore</p>
                                    <p>{house.name}</p>
                                    <p>&nbsp;{house.price}&nbsp;SGD/night </p>
                                    <p>You may adjust the price to &nbsp;
                                        <span className="adjusted_price" style={{color: house.suggested_price > house.price ? "green" : "red"}}>{house.suggested_price}</span>
                                    </p>
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