import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import { register, unregister } from "next-offline/runtime";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;

    try {
      page = Number(query.page) || 1;
      const res = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await res.json();
    } catch (error) {
      console.log(error);
      stories = [];
    }
    return { stories, page };
  }

  componentDidMount() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "." })
        .then(registration => {
          console.log("service worker registration successful", registration);
        })
        .catch(err => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }

  // componentWillUnmount() {

  // }

  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout
        title="Hacker Next"
        description="A Hacker news clone made with Next.js"
      >
        <StoryList stories={stories} />

        <footer>
          {page > 1 && (
            <Link href={`/?page=${page - 1}`}>
              <a>Prev Page ({page - 1})</a>
            </Link>
          )}
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>

        <style jsx>{`
          footer {
            padding: 1em;
          }

          footer a {
            font-weight: bold;
            color: black;
            margin-right: 1em;
          }
        `}</style>
      </Layout>
    );
  }
}

export default withRouter(Index);
