import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import { YoutubeCard } from "./YoutubeCard";
import { GalleryCard } from "./GalleryCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Tabs = ({ projects = [], youtube = [], gallery = [] }) => {
  const [activeTab, setActiveTab] = useState('first');

  const handleSelect = (tabKey) => {
    setActiveTab(tabKey);
  };

  // Define content for each tab
  const tabContents = {
    first: {
      title: "Projects",
      description: "I will show all my GitHub projects that I have created.",
    },
    second: {
      title: "YouTube",
      description: "YouTube ",
    },
    third: {
      title: "Gallery",
      description: "I Am Here...",
    },
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>{tabContents[activeTab].title}</h2>
                <p>{tabContents[activeTab].description}</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first" activeKey={activeTab} onSelect={handleSelect}>
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Projects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">YouTube</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">GitHub</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                    <Row>
                      {projects.map((item) => (
            <ProjectCard
              captures={item.captures.url}
              title={item.title}
              subtitle={item.subtitle}
              viewUrl={item.viewUrl}
              id={item._id}
              key={item._id}
            />
          ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Row>
                      {youtube.map((item) => (
            <YoutubeCard
              captures={item.captures.url}
              title={item.title}
              subtitle={item.subtitle}
              viewUrl={item.viewUrl}
              id={item._id}
              key={item._id}
            />
          ))}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Row>
                      {gallery.map((item) => (
            <GalleryCard
            photograph={item.photograph.url}
              title={item.title}
              id={item._id}
              key={item._id}
            />
          ))}
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="background"></img>
    </section>
  )
}

