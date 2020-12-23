import React, { Component } from "react";
// import { SliderBox } from "react-native-image-slider-box";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Table,
} from "semantic-ui-react";

class DetailsPage extends Component {
  constructor(props) {
    super(props);
    const Details = JSON.parse(localStorage.getItem("details"));
    this.state = {
      listing: JSON.parse(localStorage.getItem("searchResults")),
      details: Details,
      selectedItem: "propertyDetails",
      graphs: [
        Details["education_graph_url"],
        Details["council_tax_graph_url"],
        Details["crime_graph_url"],
        Details["people_graph_url"],
        Details["average_values_graph_url"],
        Details["value_ranges_graph_url"],
        Details["value_trend_graph_url"],
        Details["home_values_graph_url"],
      ],
    };
  }

  daysdifference(date1, flag) {
    let ONEDAY = 1000 * 60 * 60 * 24;
    let ONEMONTH = ONEDAY * 30;
    let ONEYEAR = ONEMONTH * 12;

    let date1_ms = Date.parse(date1);
    let today = new Date();
    let date2 =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let date2_ms = Date.parse(date2);
    let difference_ms = Math.abs(date1_ms - date2_ms);

    let days = Math.round(difference_ms / ONEDAY);

    if (flag) {
      let numYears = Math.round(difference_ms / ONEYEAR);

      difference_ms = difference_ms - numYears * ONEYEAR;

      let numMonths = Math.round(difference_ms / ONEMONTH);

      difference_ms = difference_ms - numMonths * ONEMONTH;

      let numDays = Math.round(difference_ms / ONEDAY);

      if (numYears === 0) {
        if (numMonths === 0) {
          return numDays > 1 ? numDays + " days" : numDays + " day";
        } else {
          return numMonths > 1 ? numMonths + " months" : numMonths + " month";
        }
      } else {
        return numYears > 1 ? numYears + " years" : numYears + " year";
      }
    } else {
      return days;
    }
  }

  handleItemClick = (e, { name }) => this.setState({ selectedItem: name });
  render() {
    const menuSelectedItem = this.state.selectedItem;

    return (
      <Container style={{ marginTop: "3em" }}>
        <Header as="h1" dividing>
          {this.state.listing["num_bedrooms"] +
            " bedrooms " +
            this.state.listing["property_type"] +
            " " +
            this.state.listing["status"]}
        </Header>

        <Grid columns={2}>
          <Grid.Column>
            <Image
              src={this.state.listing["image_645_430_url"]}
              size="massive"
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h1" dividing>
              Agent Details
            </Header>
            <Container textAlign="center">
              <List size="massive">
                <Image src={this.state.listing["agent_logo"]} />
              </List>
              <List size="massive">{this.state.listing["agent_name"]}</List>
              <List size="massive">{this.state.listing["agent_address"]}</List>
              <List size="massive">{this.state.listing["agent_phone"]}</List>
            </Container>
          </Grid.Column>
        </Grid>

        <Grid columns={1}>
          <Grid.Column>
            <Menu>
              <Menu.Item
                name="propertyDetails"
                active={menuSelectedItem === "propertyDetails"}
                onClick={this.handleItemClick}
              >
                Property Details
              </Menu.Item>

              <Menu.Item
                name="floorPlan"
                active={menuSelectedItem === "floorPlan"}
                onClick={this.handleItemClick}
              >
                Floor Plan
              </Menu.Item>
            </Menu>

            <div>
              {menuSelectedItem === "propertyDetails" && (
                <Container textAlign="center">
                  <List>
                    <Icon name="bed" />
                    {this.state.listing["num_bedrooms"] + " bedrooms"}
                  </List>
                  <List>
                    <Icon name="bath" />
                    {this.state.listing["num_bathrooms"] + " bathrooms"}
                  </List>
                  <List>
                    <Icon name="road" />
                    {this.state.listing["num_floors"] + " floors "}
                  </List>
                </Container>
              )}
              {menuSelectedItem === "floorPlan" && (
                <div>
                  <Image
                    src={
                      this.state.listing["floor_plan"] !== undefined
                        ? this.state.listing["floor_plan"].filter(
                            (el) => !el.endsWith(".pdf")
                          )[0]
                        : ""
                    }
                    alt="Not Available"
                    size="large"
                  />
                </div>
              )}
            </div>
          </Grid.Column>
        </Grid>
        <Container textAlign="center">
          {this.state.listing["description"]}
        </Container>
        <Container style={{ marginTop: "7em" }}>
          <Carousel>
            <div>
              <img src={this.state.graphs[0]} alt="" />
              <p className="legend">Education Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[1]} alt="" />
              <p className="legend">Council Tax Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[2]} alt="" />
              <p className="legend">Crime Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[3]} alt="" />
              <p className="legend">People Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[4]} alt="" />
              <p className="legend">Average Values Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[5]} alt="" />
              <p className="legend">Value Ranges Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[6]} alt="" />
              <p className="legend">Value Trend Graph</p>
            </div>
            <div>
              <img src={this.state.graphs[7]} alt="" />
              <p className="legend">Home Values Graph</p>
            </div>
          </Carousel>
        </Container>
        <Header as="h1" dividing>
          Similar Sold Properties
        </Header>
        <Table striped structured selectable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PostCode</Table.HeaderCell>
              <Table.HeaderCell>Town</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Agent</Table.HeaderCell>
              <Table.HeaderCell>Bedrooms</Table.HeaderCell>
              <Table.HeaderCell>Guide Price</Table.HeaderCell>
              <Table.HeaderCell>Days</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.details["similar_sold_props"].map((result) => {
              return (
                <Table.Row
                  key={
                    result["outcode"] +
                    result["post_town"] +
                    result["displayable_address"] +
                    result["property_type"] +
                    result["agent_name"] +
                    result["num_bedrooms"] +
                    result["price"] +
                    result["first_published_date"]
                  }
                >
                  <Table.Cell>{result["outcode"]}</Table.Cell>
                  <Table.Cell>{result["post_town"]}</Table.Cell>
                  <Table.Cell>{result["displayable_address"]}</Table.Cell>
                  <Table.Cell>{result["property_type"]}</Table.Cell>
                  <Table.Cell>{result["agent_name"]}</Table.Cell>
                  <Table.Cell>{result["num_bedrooms"]}</Table.Cell>
                  <Table.Cell>{result["price"]}</Table.Cell>
                  <Table.Cell>
                    {this.daysdifference(result["first_published_date"], true)}
                    {/* {result["first_published_date"]} */}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Header as="h1" dividing>
          Similar For Sale Properties
        </Header>
        <Table striped structured selectable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PostCode</Table.HeaderCell>
              <Table.HeaderCell>Town</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Agent</Table.HeaderCell>
              <Table.HeaderCell>Bedrooms</Table.HeaderCell>
              <Table.HeaderCell>Guide Price</Table.HeaderCell>
              <Table.HeaderCell>Days</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.details["similar_for_sale"].map((result) => {
              return (
                <Table.Row
                  key={
                    result["outcode"] +
                    result["post_town"] +
                    result["displayable_address"] +
                    result["property_type"] +
                    result["agent_name"] +
                    result["num_bedrooms"] +
                    result["price"] +
                    result["first_published_date"]
                  }
                >
                  <Table.Cell>{result["outcode"]}</Table.Cell>
                  <Table.Cell>{result["post_town"]}</Table.Cell>
                  <Table.Cell>{result["displayable_address"]}</Table.Cell>
                  <Table.Cell>{result["property_type"]}</Table.Cell>
                  <Table.Cell>{result["agent_name"]}</Table.Cell>
                  <Table.Cell>{result["num_bedrooms"]}</Table.Cell>
                  <Table.Cell>{result["price"]}</Table.Cell>
                  <Table.Cell>
                    {this.daysdifference(result["first_published_date"], true)}
                    {/* {result["first_published_date"]} */}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Header as="h1" dividing>
          Similar For Rent Properties
        </Header>
        <Table striped structured selectable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PostCode</Table.HeaderCell>
              <Table.HeaderCell>Town</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Agent</Table.HeaderCell>
              <Table.HeaderCell>Bedrooms</Table.HeaderCell>
              <Table.HeaderCell>Guide Price</Table.HeaderCell>
              <Table.HeaderCell>Days</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.details["similar_for_rent"].map((result) => {
              return (
                <Table.Row
                  key={
                    result["outcode"] +
                    result["post_town"] +
                    result["displayable_address"] +
                    result["property_type"] +
                    result["agent_name"] +
                    result["num_bedrooms"] +
                    result["price"] +
                    result["first_published_date"]
                  }
                >
                  <Table.Cell>{result["outcode"]}</Table.Cell>
                  <Table.Cell>{result["post_town"]}</Table.Cell>
                  <Table.Cell>{result["displayable_address"]}</Table.Cell>
                  <Table.Cell>{result["property_type"]}</Table.Cell>
                  <Table.Cell>{result["agent_name"]}</Table.Cell>
                  <Table.Cell>{result["num_bedrooms"]}</Table.Cell>
                  <Table.Cell>{result["price"]}</Table.Cell>
                  <Table.Cell>
                    {this.daysdifference(result["first_published_date"], true)}
                    {/* {result["first_published_date"]} */}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default DetailsPage;
