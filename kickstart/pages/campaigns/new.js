import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumControbution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault(); // upon form submittal, browser will automatically attend to send submittal to server.
    // We don't want that -- override default behavior
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumControbution)
        .send({
          from: accounts[0], // don't need to specfiy gas amount. Metamask does that inside browser
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
    Router.pushRoute("/");
  };

  render() {
    return (
      <Layout>
        <h3> Create a Campaign </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          {/* two exclamation marks (!!) to convert string to bool -- flips boolean twice */}
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumControbution}
              onChange={(event) =>
                this.setState({ minimumControbution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Uh oh!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
