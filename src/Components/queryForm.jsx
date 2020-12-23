import React, { Component } from "react";
import {
  Form,
  Button,
  Header,
  Label,
  Dropdown,
  Container,
  Divider,
  Icon,
  Pagination,
  Loader,
} from "semantic-ui-react";
import AlgoliaPlaces from "algolia-places-react";
import Result from "./result";

const _ = require('lodash');

const property_type = [
  { key: "showAll", value: "showAll", text: "Show All" },
  { key: "houses", value: "houses", text: "Houses" },
  { key: "flats", value: "flats", text: "Flats" },
  // { key: "farms", value: "farms", text: "Farms/Lands" },
];

const minimum_beds = [
  { key: "noMin", value: "0", text: "No min" },
  { key: "stdio+", value: "stdio+", text: "Stdio+" },
  { key: "1", value: "1", text: "1" },
  { key: "2", value: "2", text: "2" },
  { key: "3", value: "3", text: "3" },
  { key: "4", value: "4", text: "4" },
  { key: "5", value: "5", text: "5" },
  { key: "6", value: "6", text: "6" },
  { key: "7", value: "7", text: "7" },
  { key: "8", value: "8", text: "8" },
  { key: "9", value: "9", text: "9" },
  { key: "10", value: "10", text: "10" },
];

const maximum_beds = [
  { key: "noMax", value: "50", text: "No max" },
  { key: "stdio+", value: "stdio+", text: "Stdio+" },
  { key: "1", value: "1", text: "1" },
  { key: "2", value: "2", text: "2" },
  { key: "3", value: "3", text: "3" },
  { key: "4", value: "4", text: "4" },
  { key: "5", value: "5", text: "5" },
  { key: "6", value: "6", text: "6" },
  { key: "7", value: "7", text: "7" },
  { key: "8", value: "8", text: "8" },
  { key: "9", value: "9", text: "9" },
  { key: "10", value: "10", text: "10" },
];

const radius = [
  { key: "0", value: "0", text: "This area only" },
  { key: "0.25", value: "0.25", text: "Within 0.25 miles" },
  { key: "0.5", value: "0.5", text: "Within 0.5 miles" },
  { key: "1", value: "1", text: "Within 1 miles" },
  { key: "3", value: "3", text: "Within 3 miles" },
  { key: "5", value: "5", text: "Within 5 miles" },
  { key: "10", value: "10", text: "Within 10 miles" },
  { key: "15", value: "15", text: "Within 15 miles" },
  { key: "20", value: "20", text: "Within 20 miles" },
  { key: "30", value: "30", text: "Within 30 miles" },
  { key: "40", value: "40", text: "Within 40 miles" },
];

const sort_by = [
  { key: "highestPrice", value: "highestPrice", text: "Highest Price" },
  { key: "lowestPrice", value: "lowestPrice", text: "Lowest Price" },
  { key: "mostRecent", value: "mostRecent", text: "Most Recent" },
  { key: "mostReduced", value: "mostReduced", text: "Most Reduced" },
  { key: "mostPopular", value: "mostPopular", text: "Most Popular" },
];

const added = [
  { key: "anytime", value: "anytime", text: "Anytime" },
  { key: "1", value: "1", text: "Last 24 hrs" },
  { key: "3", value: "3", text: "Last 3 days" },
  { key: "7", value: "7", text: "Last 7 days" },
  { key: "14", value: "14", text: "Last 14 days" },
  { key: "30", value: "30", text: "Last 30 days" },
];

const minimum_price = [
  { key: "0", value: "0", text: "No min" },
  { key: "10000", value: "10000", text: "£10,000" },
  { key: "20000", value: "20000", text: "£20,000" },
  { key: "30000", value: "30000", text: "£30,000" },
  { key: "40000", value: "40000", text: "£40,000" },
  { key: "50000", value: "50000", text: "£50,000" },
  { key: "60000", value: "60000", text: "£60,000" },
  { key: "70000", value: "70000", text: "£70,000" },
  { key: "80000", value: "80000", text: "£80,000" },
  { key: "90000", value: "90000", text: "£90,000" },
  { key: "100000", value: "100000", text: "£100,000" },
];

const maximum_price = [
  { key: "0", value: "10000000", text: "No max" },
  { key: "10000", value: "10000", text: "£10,000" },
  { key: "20000", value: "20000", text: "£20,000" },
  { key: "30000", value: "30000", text: "£30,000" },
  { key: "40000", value: "40000", text: "£40,000" },
  { key: "50000", value: "50000", text: "£50,000" },
  { key: "60000", value: "60000", text: "£60,000" },
  { key: "70000", value: "70000", text: "£70,000" },
  { key: "80000", value: "80000", text: "£80,000" },
  { key: "90000", value: "90000", text: "£90,000" },
  { key: "100000", value: "100000", text: "£100,000" },
  { key: "500000", value: "500000", text: "£500,000" },
  { key: "1000000", value: "1000000", text: "£100,000" },
  { key: "5000000", value: "5000000", text: "£5,000,000" },
  { key: "10000000", value: "10000000", text: "£10,000,000" },
];

class QueryForm extends Component {
  constructor() {
    super();
    this.state = {
      searchString: "",
      minimum_price: "0",
      maximum_price: "10000000",
      minimum_beds: "0",
      maximum_beds: "50",
      radius: "0",
      property_type: "showAll",
      added: "anytime",
      // sort_by: "mostRecent",
      repossessed: false,
      needs_modernisation: false,
      quick_sale: false,
      cash_only: false,
      plot: false,
      hmo: false,
      tenanted: false,
      auction: false,
      new_build: false,
      short_lease: false,
      investment_portfolio: false,
      holiday_let: false,
      georgian: false,
      good_views: false,
      // growth_zones: false,
      // high_yield: false,
      // relisted: false,
      // reduced_price: false,

      isLoading: false,
      resultAvailable: false,
      page_number: "1",
      page_size: "20",

      numPages: "",
      search_result: "",

      details: "",
      avgDetails: ""
    };
  }

  handleInputChange = (event, data) => {
    const { name, value } = event.target;

    if (data.type === "checkbox") {
      this.setState({
        [data.name]: data.checked,
      });
    } else {
      console.log(this.state.propertyType);
      this.setState({
        [data.name]: data.value,
      });
    }
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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
  changePage = (event, data) => {
    this.setState({
      page_number: data.activePage,
    });

    this.fetchingData();
  };

  fetchingData = () => {
    //This will disable the Search button while data is being scrapped
    this.setState({
      isLoading: true,
      resultAvailable: false,
    });

    // await this.sleep(2000);
    const url = "/search/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        console.log(data["searchOutput"]);
        let pages = Math.round(
          data["searchOutput"]["result_count"] / this.state.page_size
        );
        const searchData = data["searchOutput"]["listing"].filter((row) => {
          if (
            this.state.added === "anytime" ||
            row["first_published_date"] === null
          )
            return true;
          else {
            const days = this.daysdifference(
              row["first_published_date"],
              false
            );
            return parseInt(days) <= parseInt(this.state.added);
          }
        });
        
        let a = data["searchOutput"]["listing"];
        // let b = ld.reduce(a, (agg, {num_bedrooms, price}) => { agg[num_bedrooms] = (agg[num_bedrooms] || 0) + (parseInt(price)/agg.length); return agg; }, {})
        // let c = ld.meanBy(a, (row) => row['price'])
        // const x = ld.map(b, (val,prop) => ({ num_bedrooms: prop, price: val}));
        
        let newA = _.map(a, item => {
          let newRow = _.clone(item);
          newRow['num_bedrooms'] = parseInt(newRow['num_bedrooms'], 10);
          newRow['price'] = parseInt(newRow['price'], 10);
          return newRow;
        })
        const ans = _(newA)
        .groupBy('num_bedrooms')
        .map((row, id) => {
          let x = _.filter(row, function(item){
            return item['status'] === 'for_sale'
          });
          let y = _.filter(row, function(item){
            return item['status'] === 'for_rent'
          });
          return {
          num_bedrooms : id,
          sale_price : _.meanBy(x, 'price'),
          rent_price : _.meanBy(y, 'price')
        }})
        .value();

        console.log(ans);

        this.setState({
          search_result: searchData,
          isLoading: false,
          resultAvailable: true,
          numPages: pages,
          details: data["detailsOutput"],
          avgDetails: ans
        });
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.fetchingData();
  };

  render() {
    return (
      <div>
        <Header as="h1" dividing>
          Property Search
        </Header>

        <Divider hidden />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Label as="a">
                <Icon name="home" />
                Address
              </Label>
              <AlgoliaPlaces
                placeholder="Write an address here"
                options={{
                  appId: "plMHK12I3ABW",
                  apiKey: "9ef4146adb4379db3c9311a626e1ca5e",
                  language: "en",
                  countries: ["gb", "in"],
                  // type: "city",
                  // Other options from https://community.algolia.com/places/documentation.html#options
                }}
                onChange={({
                  query,
                  rawAnswer,
                  suggestion,
                  suggestionIndex,
                }) => {
                  this.setState({
                    searchString: suggestion,
                  });
                  console.log(this.state.searchString);
                  console.log(
                    "Fired when suggestion selected in the dropdown or hint was validated."
                  );
                }}
                onSuggestions={({ rawAnswer, query, suggestions }) =>
                  console.log(
                    "Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed."
                  )
                }
                onCursorChanged={({
                  rawAnswer,
                  query,
                  suggestion,
                  suggestonIndex,
                }) =>
                  console.log(
                    "Fired when arrows keys are used to navigate suggestions."
                  )
                }
                onClear={() => {
                  console.log(this.state.searchString);
                  this.setState({
                    searchString: "",
                  });
                  console.log(this.state.searchString);
                  console.log("Fired when the input is cleared.");
                }}
                onLimit={({ message }) =>
                  console.log("Fired when you reached your current rate limit.")
                }
                onError={({ message }) =>
                  console.log(
                    "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
                  )
                }
              />
            </Form.Field>

            <Divider hidden />
            <Divider hidden />
            <Divider horizontal>
              <Header as="h4">
                <Icon name="options" />
                Filtering Options
              </Header>
            </Divider>

            <Form.Group widths="equal">
              <Form.Field>
                <Label>Min Price</Label>
                <Dropdown
                  selection
                  name="minimum_price"
                  value={this.state.minimum_price}
                  onChange={this.handleInputChange}
                  options={minimum_price}
                />
              </Form.Field>

              <Form.Field>
                <Label>Max Price</Label>
                <Dropdown
                  selection
                  name="maximum_price"
                  value={this.state.maximum_price}
                  onChange={this.handleInputChange}
                  options={maximum_price}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <Label>Min Bedrooms</Label>
                <Dropdown
                  selection
                  name="minimum_beds"
                  value={this.state.minimum_beds}
                  onChange={this.handleInputChange}
                  options={minimum_beds}
                />
              </Form.Field>
              <Form.Field>
                <Label>Max Bedrooms</Label>
                <Dropdown
                  selection
                  name="maximum_beds"
                  value={this.state.maximum_beds}
                  onChange={this.handleInputChange}
                  options={maximum_beds}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <Label>Property Type</Label>
                <Dropdown
                  selection
                  name="property_type"
                  value={this.state.property_type}
                  onChange={this.handleInputChange}
                  options={property_type}
                />
              </Form.Field>

              <Form.Field>
                <Label>Added</Label>
                <Dropdown
                  selection
                  name="added"
                  value={this.state.added}
                  onChange={this.handleInputChange}
                  options={added}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <Label>Distance from location</Label>
                <Dropdown
                  selection
                  name="radius"
                  value={this.state.radius}
                  onChange={this.handleInputChange}
                  options={radius}
                />
              </Form.Field>

              {/* <Form.Field>
                <Label>Sory By</Label>
                <Dropdown
                  selection
                  name="sort_by"
                  value={this.state.sort_by}
                  onChange={this.handleInputChange}
                  options={sort_by}
                />
              </Form.Field> */}
            </Form.Group>

            <Divider hidden />
            <Divider hidden />
            <Divider horizontal>
              <Header as="h4">
                <Icon name="tags" />
                Specifications
              </Header>
            </Divider>

            <Form.Group widths="equal">
              <Form.Checkbox
                type="checkbox"
                label="Needs Modernisation"
                name="needs_modernisation"
                checked={this.state.needs_modernisation}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Quick Sale"
                name="quick_sale"
                checked={this.state.quick_sale}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Cash Only"
                name="cash_only"
                checked={this.state.cash_only}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Plot/Land"
                name="plot"
                checked={this.state.plot}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Checkbox
                type="checkbox"
                label="HMO"
                name="hmo"
                checked={this.state.hmo}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Tenanted"
                name="tenanted"
                checked={this.state.tenanted}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Auction"
                name="auction"
                checked={this.state.auction}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="New Build"
                name="new_build"
                checked={this.state.new_build}
                onChange={this.handleInputChange}
              />
              {/* <Form.Checkbox
                type="checkbox"
                label="Reduced Price"
                name="reduced_price"
                checked={this.state.reduced_price}
                onChange={this.handleInputChange}
              /> */}
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Checkbox
                type="checkbox"
                label="Short Lease"
                name="short_lease"
                checked={this.state.short_lease}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Investment Portfolio"
                name="investment_portfolio"
                checked={this.state.investment_portfolio}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Holiday Let"
                name="holiday_let"
                checked={this.state.holiday_let}
                onChange={this.handleInputChange}
              />
              <Form.Checkbox
                type="checkbox"
                label="Georgian"
                name="georgian"
                checked={this.state.georgian}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Checkbox
                type="checkbox"
                label="Good Views"
                name="good_views"
                checked={this.state.good_views}
                onChange={this.handleInputChange}
              />
              {/* <Form.Checkbox
                type="checkbox"
                label="Growth Zones"
                name="growth_zones"
                checked={this.state.growth_zones}
                onChange={this.handleInputChange}
              /> */}
              {/* <Form.Checkbox
                type="checkbox"
                label="High Yield"
                name="high_yield"
                checked={this.state.high_yield}
                onChange={this.handleInputChange}
              /> */}
              <Form.Checkbox
                type="checkbox"
                label="Repossessed"
                name="repossessed"
                checked={this.state.repossessed}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            {/* <Form.Group widths="equal">
              <Form.Checkbox
                type="checkbox"
                label="Relisted"
                name="relisted"
                checked={this.state.relisted}
                onChange={this.handleInputChange}
              />
            </Form.Group> */}

            <Divider hidden />

            <Container textAlign="center">
              <Button
                disabled={this.state.isLoading}
                animated
                primary
                type="submit"
                size="big"
              >
                <Button.Content visible> Search </Button.Content>
                <Button.Content hidden>
                  <Icon name="search" />
                </Button.Content>
              </Button>
            </Container>
          </Form>
        </Container>

        {this.state.isLoading ? (
          <Container>
            <Divider hidden />
            <Loader active inline="centered" size="big">
              Loading
            </Loader>
          </Container>
        ) : null}

        {this.state.resultAvailable ? (
          <Container>
            <Result
              resultAvailable={this.state.resultAvailable}
              searchResults={this.state.search_result}
              avgResults={this.state.avgDetails}
              details={this.state.details}
            ></Result>
            <Pagination
              defaultActivePage={this.state.page_number}
              totalPages={this.state.numPages}
              onPageChange={this.changePage}
            />
          </Container>
        ) : null}

        {/* <Result /> */}
      </div>
    );
  }
}

export default QueryForm;
