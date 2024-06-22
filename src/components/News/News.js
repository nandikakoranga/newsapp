import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";
import ReactPaginate from "react-paginate";

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0); // Used for pagination

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = ` ${capitaLize(title)} - News`;

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(endpointPath(country, category, page));
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialNews = async () => {
      await fetchNews(pageNumber + 1); // Fetch initial data when component mounts
    };
    fetchInitialNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newscategory, country]); // Fetch again when category or country changes

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected); // Update pageNumber when pagination changes
  };

  useEffect(() => {
    const fetchPageNews = async () => {
      await fetchNews(pageNumber + 1); // Fetch new data when pageNumber changes
    };
    fetchPageNews();
  }, [pageNumber]); // Dependency array ensures this effect runs when pageNumber changes

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <Container>
            <Row>
              {articles.map((element) => (
                <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    publishedAt={element.publishedAt}
                    imageUrl={element.image === null ? NullImage : element.image}
                    urlNews={element.url}
                  />
                </Col>
              ))}
            </Row>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={10} // Adjust dynamically based on API response
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </Container>
        </>
      )}
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;