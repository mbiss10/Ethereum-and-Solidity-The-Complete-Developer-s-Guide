import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x4555A8e638eb37CB936771733aA65d10DB789EAC" // address we deployed CampaignFactory to on the testnet
);

export default instance;
