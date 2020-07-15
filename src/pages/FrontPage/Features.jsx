import React from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const Features = (props) => {
  return (
    <>
      
      <Tabs>
        <section class="section-features" ref={props.refProp}>
            <TabList>
              <Tab>First Tab</Tab>
              <Tab>Second Tab</Tab>
            </TabList>
          <TabPanel>
            <div class="row">
              <div class="col-1-of-3">
                <div className="feature-box__number">
                  <span className="feature-box__number--text">1</span>
                </div>
              </div>
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="heading-feature u-margin-bottom-small">
                    Post a ride
                  </h3>
                  <p class="feature-box__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi impedit aspernatur adipisci illum placeat dolorem
                    corrupti eaque reprehenderit asperiores, deleniti ut!
                    Pariatur tenetur itaque ex non. Dolorum quidem consequuntur
                    architecto.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="heading-feature u-margin-bottom-small">
                    Accept people in
                  </h3>
                  <p class="feature-box__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, eaque. Dolor deserunt ullam alias neque atque?
                    Quis sint ipsam natus aspernatur dolorem debitis vero
                    pariatur inventore magnam! Adipisci, suscipit doloribus?
                  </p>
                </div>
              </div>
              <div class="col-1-of-3">
                <div className="feature-box__number">
                  <span className="feature-box__number--text">2</span>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
          <div class="row">
              <div class="col-1-of-3">
                <div className="feature-box__number">
                  <span className="feature-box__number--text">1</span>
                </div>
              </div>
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="heading-feature u-margin-bottom-small">
                    Plan ahead
                  </h3>
                  <p class="feature-box__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Modi impedit aspernatur adipisci illum placeat dolorem
                    corrupti eaque reprehenderit asperiores, deleniti ut!
                    Pariatur tenetur itaque ex non. Dolorum quidem consequuntur
                    architecto.
                  </p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2-of-3">
                <div class="feature-box">
                  <i class="feature-box__icon icon-basic-signs"></i>
                  <h3 class="heading-feature u-margin-bottom-small">
                    Find a ride
                  </h3>
                  <p class="feature-box__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis, eaque. Dolor deserunt ullam alias neque atque?
                    Quis sint ipsam natus aspernatur dolorem debitis vero
                    pariatur inventore magnam! Adipisci, suscipit doloribus?
                  </p>
                </div>
              </div>
              <div class="col-1-of-3">
                <div className="feature-box__number">
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
