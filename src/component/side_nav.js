import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getEpisode, getCharacters } from "../redux/slices/episode";
import { useNavigate } from "react-router-dom";

function Navsidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { getEpisodeData, getCharactersData } = useSelector((state) => ({
    getEpisodeData: state?.epi?.episodeData,
    getCharactersData: state?.epi?.characterData,
  }));
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
  const currentItems = getCharactersData
    ? getCharactersData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = getCharactersData
    ? Math.ceil(getCharactersData.length / itemsPerPage)
    : 1;

  useEffect(() => {
    dispatch(getEpisode());
    dispatch(getCharacters());
  }, [dispatch]);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index, episodeId) => {
    setActiveIndex(index);
    navigate(`/list/${episodeId}`);
  };

  return (
    <div>
      <div className="container-fluid bagcolor">
        <div className="container-xl background_style">
          <h4 className="content_style">Rick and Morty Character</h4>
          <div className="row">
            <div className="col-3">
              <nav className="navbar navbar-light navBar_color scrollset">
                <div className="container-fluid">
                  <div className="navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-column">
                      <li>
                        <h4 className="topHead">Episodes</h4>
                      </li>
                      {getEpisodeData && getEpisodeData.length > 0 ? (
                        getEpisodeData.map((episode, index) => (
                          <li className="nav-item" key={episode.id}>
                            <a
                              className={`nav-link ${
                                activeIndex === index ? "active" : ""
                              }`}
                              href="#"
                              onClick={() => handleClick(index, episode.id)}
                            >
                              {episode.name}
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>No episodes available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-9">
              <div className="container">
                <div className="row">
                  {currentItems &&
                    currentItems.map((character, index) => (
                      <div
                        className="col-lg-3 col-md-3 col-sm-4 col-6"
                        key={character.id}
                      >
                        <div className="card card-custom">
                          <img
                            src={character.image}
                            className="card-img-top"
                            alt={character.name}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePreviousPage()}
                >
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
                <button className="page-link" onClick={() => handleNextPage()}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navsidebar;
