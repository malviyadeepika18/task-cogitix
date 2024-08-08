import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getEpisode, getEpis } from "../redux/slices/episode";
import { useParams, useNavigate, Link } from "react-router-dom";

function Episodelist() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [activeEpisodeId, setActiveEpisodeId] = useState(id || null);

  const { getEpisodeData, getEpisData } = useSelector((state) => ({
    getEpisodeData: state?.epi?.episodeData,
    getEpisData: state?.epi?.characterData,
  }));

  useEffect(() => {
    dispatch(getEpisode());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      setActiveEpisodeId(id);
      dispatch(getEpis(id));
    } else {
      dispatch(getEpis());
    }
  }, [dispatch, id]);

  const handleEpisodeClick = (id) => {
    setActiveEpisodeId(id);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getEpisData
    ? getEpisData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const totalPages = getEpisData
    ? Math.ceil(getEpisData.length / itemsPerPage)
    : 1;

  return (
    <div className="container-fluid bagcolor">
      <div className="container-xl background_style">
        <h4 className="content_style">Rick and Morty Characters</h4>
        <div className="row">
          <div className="col-3">
            <nav className="navbar navbar-light navBar_color scrollset">
              <div className="navbar-collapse" id="navbarNav">
                <ul className="navbar-nav flex-column">
                  <li>
                    <h4 className="topHead">Episodes</h4>
                  </li>
                  {getEpisodeData && getEpisodeData.length > 0 ? (
                    getEpisodeData.map((episode) => (
                      <li key={episode.id} className="nav-item">
                        <Link
                          className={`nav-link ${
                            activeEpisodeId === episode.id ? "active" : ""
                          }`}
                          to={`/list/${episode.id}`}
                          onClick={() => handleEpisodeClick(episode.id)}
                        >
                          {episode.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>No episodes available</li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-9">
            <div className="container">
              <div className="row">
                {currentItems && currentItems.length > 0 ? (
                  currentItems.map((character, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-3 col-sm-4 col-6"
                    >
                      <div className="card card-custom">
                        <img
                          src={character.image}
                          className="card-img-top"
                          alt={character.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{character.name}</h5>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No characters available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePreviousPage}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Episodelist;
