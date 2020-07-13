import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const Features = (props) => {
  return (
    <>
      <div
        ref={props.refProp}
        class="u-center-text u-margin-bottom-big u-margin-top-section"
      >
        <h2 class="heading-secondary">How it works?</h2>
      </div>
      <Tabs>
        <TabList>
          <Tab>First Tab</Tab>
          <Tab>Second Tab</Tab>
        </TabList>
        <TabPanel>
          <p>1</p>
        </TabPanel>
        <TabPanel>
          <p>2</p>
        </TabPanel>
        <section class="section-features">
          <div class="row">
            <div class="col-1-of-4">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-clock"></i>
                <h3 class="heading-tertiary u-margin-bottom-small">
                  Plan ahead
                </h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid facilis laboriosam deserunt sapiente iure, alias
                  nesciunt vitae velit.
                </p>
              </div>
            </div>
            <div class="col-1-of-4">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-signs"></i>
                <h3 class="heading-tertiary u-margin-bottom-small">
                  Post a trip
                </h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid facilis laboriosam deserunt sapiente iure, alias
                  nesciunt vitae velit.
                </p>
              </div>
            </div>
            <div class="col-1-of-4">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-magnifier"></i>
                <h3 class="heading-tertiary u-margin-bottom-small">
                  Find peeps to go along
                </h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid facilis laboriosam deserunt.
                </p>
              </div>
            </div>
            <div class="col-1-of-4">
              <div class="feature-box">
                <i class="feature-box__icon icon-basic-geolocalize-05"></i>
                <h3 class="heading-tertiary u-margin-bottom-small">
                  Get to your destination
                </h3>
                <p class="feature-box__text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid facilis laboriosam deserunt sapiente iure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Tabs>
    </>
  );
};

export default Features;
