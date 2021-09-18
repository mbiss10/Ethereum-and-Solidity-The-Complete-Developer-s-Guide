import React, { Component } from "react"; // Braces around Component bc its a property of React
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  // getInitialProps is a method unique to next.js library.
  // It allows us to run code that retreives some initial data before the server renders the html and send it to client.
  // It needs to be a static method.
  // Since we return {campaigns: campaigns}, we can treat this as an input param to our component (e.g. in render method)
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add square"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
          {/* primary == shorthand for primary = True */}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
