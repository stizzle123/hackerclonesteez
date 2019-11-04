import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";

class Index extends React.Component {
  static async getInitialProps() {
    let stories;
    try {
      const res = await fetch("https://node-hnapi.herokuapp.com/news?page=1");
      stories = await res.json();
    } catch (error) {
      console.log(error);
      stories = [];
    }
    return { stories };
  }
  render() {
    const { stories } = this.props;

    return <div>Hacker Next</div>;
  }
}

export default withRouter(Index);
