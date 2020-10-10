import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const Features = (props) => {
  return (
    <> 
      {/* <div>
        <h2 className="feature-box__header">How it works</h2>
        <div className="feature-box__header--indicator"></div>
      </div> */}
      <Tabs >
      <div>
        <h2 className="feature-box__header">How it works</h2>
        <div className="feature-box__header--indicator"></div>
      </div>
      <TabList>
              <Tab>Drivers</Tab>
              <Tab>Riders</Tab>
              <div ref={props.refProp}></div>
            </TabList>
        <section class="section-features" >
          <TabPanel>
            <div class="row">
              <div class="col-1-of-3">
                <div className="feature-box__number feature-box__number--one">
                  <span className="feature-box__number--text">1</span>
                </div>
              </div>
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="feature-box__title">
                    Post a ride
                  </h3>
                  <p class="feature-box__text">
                    Enter your origin, destination, date of departure, available seats, and publish your trip!
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="feature-box__title">
                      Accept people in
                  </h3>
                  <p class="feature-box__text">
                      Chat with your passengers to confirm or deny their requests for your trip
                  </p>
                </div>
              </div>
              <div class="col-1-of-3">
                <div className="feature-box__number feature-box__number--two">
                  <span className="feature-box__number--text">2</span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
          <div class="row">
              <div class="col-1-of-3">
                <div className="feature-box__number feature-box__number--one">
                  <span className="feature-box__number--text">1</span>
                </div>
              </div>
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="feature-box__title">
                    Plan ahead
                  </h3>
                  <p class="feature-box__text">
                    Decide where you want to go and mind your budget!
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="feature-box__title">
                    Find a ride
                  </h3>
                  <p class="feature-box__text">
                    Pick your destination, send your trip's driver a request message, and
                    get notified of their response through chat.
                  </p>
                </div>
              </div>
              <div class="col-1-of-3">
                <div className="feature-box__number feature-box__number--two">
                  <span className="feature-box__number--text">2</span>
                </div>
              </div>
            </div>
          </TabPanel>
        </section>
      </Tabs>
    </>
  );
};

export default Features;
