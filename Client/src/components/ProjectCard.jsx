import React from "react";
import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, captures, heading, subtitle, viewUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <a href={viewUrl} target="_blank" rel="noopener noreferrer">
          <img src={captures} alt="capture" />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{subtitle}</span>
            <span>{heading}</span>
          </div>
        </a>
      </div>
    </Col>
  )
}
