import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import Details from "../NewsItem/Details/Details"; // Adjust path as needed
import { Container, Header } from "./index"; // Adjust imports based on your file structure
import { useParams } from "react-router-dom";
import { endpointDetails } from "../../config/api"; // Correct import

function NewsDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const response = await axios.get(endpointDetails(id));
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading || !article) {
        return <Loading />;
    }

    return (
        <Container>
            <Header>{article.title}</Header>
            <img src={article.image || NullImage} alt={article.title} />
            <p>{article.description}</p>
            <Details channel={article.source.name} published={article.publishedAt} />
            {/* Additional details rendering as per your API response */}
        </Container>
    );
}

NewsDetails.propTypes = {
    id: PropTypes.string.isRequired,
};

export default NewsDetails;