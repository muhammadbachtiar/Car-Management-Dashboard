import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

interface CardWhyUsProps {
  title: string;
  description: string;
  iconClass: string;
  spanBackgroundColor: string;
}

const CardWhyUs: React.FC<CardWhyUsProps> = ({ title, description, iconClass, spanBackgroundColor }) => {
  return (
    <div className="col-lg-3 list-card">
      <Card>
        <Card.Body>
          <div className="row whyUsContent-Content-Card">
            <div className="col-md-12">
              <span
                style={{
                  backgroundColor: spanBackgroundColor,
                  color: "white",
                  borderRadius: "50%",
                  padding: "10px",
                  width: "32px",
                  height: "32px",
                }}
              >
                <i className={`${iconClass}`}></i>
              </span>
            </div>
            <div className="col-md-12">
              <h5 className="card-title" style={{ margin: '25px 0' }}>
                {title}
              </h5>
              <p className="card-text">{description}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

CardWhyUs.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  spanBackgroundColor: PropTypes.string.isRequired,
};

export default CardWhyUs;
