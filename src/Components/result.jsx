import React, { Component } from "react";
import {
  Grid,
  Button,
  Divider,
  Header,
  Icon,
  Table,
  Dropdown,
} from "semantic-ui-react";
import ReactExport from "react-export-excel";
import { Link } from "react-router-dom";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: this.props.searchResults,
      avgResults: this.props.avgResults,
      sortColumnName: "",
      sortOrder: "",
    };
  }

  setSortColumnName = (e, { value }) => {
    this.setState({ sortColumnName: value });
    console.log(value, this.state.sortColumnName);
  };
  setSortOrder = (e, { value }) => {
    this.setState({ sortOrder: value });
    console.log(value, this.state.sortOrder);
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

  sortCols = (event) => {
    const sortKey = this.state.sortColumnName;
    const sortOrder = this.state.sortOrder;
    const data = this.state.searchResults;
    console.log(sortKey, sortOrder);
    if (sortKey === "" || sortOrder === "") return;
    data.sort((a, b) => {
      if (a[sortKey] == null || b[sortKey] == null) return 0;
      if (
        sortKey === "price" ||
        sortKey === "num_bedrooms" ||
        typeof a[sortKey] == "number"
      ) {
        a[sortKey] = parseInt(a[sortKey]);
        b[sortKey] = parseInt(b[sortKey]);
        if (sortOrder === "ascending") {
          return a[sortKey] - b[sortKey];
        } else {
          return b[sortKey] - a[sortKey];
        }
      }
      if (sortKey === "first_published_date") {
        const x = this.daysdifference(a[sortKey], false);
        const y = this.daysdifference(b[sortKey], false);
        if (sortOrder === "ascending") {
          return x - y;
        } else {
          return y - x;
        }
      } else {
        return sortOrder === "ascending"
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
    });
    this.setState({ data });
  };

  storeData = (data) => {
    localStorage.setItem("searchResults", JSON.stringify(data));
    localStorage.setItem("details", JSON.stringify(this.props.details));
    window.open("/details", "_blank");
  };
  render() {
    return (
      <div>
        <Header as="h1" dividing>
          Property Results
        </Header>
        <Grid columns={4}>
          <Grid.Column>
            <ExcelFile
              filename="test"
              element={
                <Button icon labelPosition="right">
                  Download
                  <Icon name="download" />
                </Button>
              }
            >
              <ExcelSheet data={this.state.searchResults} name="Test">
                <ExcelColumn label="PostCode" value="outcode" />
                <ExcelColumn label="Town" value="post_town" />
                <ExcelColumn label="Address" value="displayable_address" />
                <ExcelColumn label="Type" value="property_type" />
                <ExcelColumn label="Agent" value="agent_name" />
                <ExcelColumn label="Bedrooms" value="num_bedrooms" />
                <ExcelColumn label="Price" value="price" />
                <ExcelColumn label="Date" value="first_published_date" />
              </ExcelSheet>
            </ExcelFile>
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="Sort By"
              fluid
              selection
              options={[
                { key: "postcode", text: "Postcode", value: "outcode" },
                { key: "town", text: "Town", value: "post_town" },
                {
                  key: "address",
                  text: "Address",
                  value: "displayable_address",
                },
                { key: "type", text: "Type", value: "property_type" },
                { key: "agent", text: "Agent", value: "agent_name" },
                { key: "bedrooms", text: "Bedrooms", value: "num_bedrooms" },
                { key: "price", text: "Price", value: "price" },
                { key: "day", text: "Day", value: "first_published_date" },
              ]}
              onChange={this.setSortColumnName}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="Order"
              fluid
              selection
              options={[
                { key: "ascending", text: "ascending", value: "ascending" },
                { key: "descending", text: "descending", value: "descending" },
              ]}
              onChange={this.setSortOrder}
            />
          </Grid.Column>
          <Grid.Column>
            <Button onClick={this.sortCols}>Sort</Button>
          </Grid.Column>
        </Grid>
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
              <Table.HeaderCell>Details</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.searchResults.map((result) => {
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
                  <Table.Cell>
                    {
                      <Link
                        // to={{
                        //   pathname: "/details",
                        //   listing: result,
                        //   details: this.props.details,
                        // }}
                        // to="/details"
                        onClick={() => {
                          this.storeData(result);
                        }}
                      >
                        Details
                      </Link>
                    }
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Table striped structured selectable celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Num of Bedrooms</Table.HeaderCell>
              <Table.HeaderCell>Average Sale Price</Table.HeaderCell>
              <Table.HeaderCell>Average Rent Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.avgResults.map((result) => {
              return (
                <Table.Row
                  key={
                    result["num_bedrooms"]
                  }
                >
                  <Table.Cell>{result["num_bedrooms"]}</Table.Cell>
                  <Table.Cell>{isNaN(result["sale_price"]) ? "N/A" : result["sale_price"]}</Table.Cell>
                  <Table.Cell>{isNaN(result["rent_price"]) ? "N/A" : result["rent_price"]}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Divider hidden />
      </div>
    );
  }
}

export default Result;
