import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";
import Error from "next/error";

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

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <div>
        <h1>Hacker next</h1>
        <div>
          {stories.map(story => (
            <div key={story.id}>{story.title}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
