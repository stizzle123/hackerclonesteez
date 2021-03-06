import fetch from "isomorphic-unfetch";
import { withRouter } from "next/router";
import Error from "next/error";
import Link from "next/link";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

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
