import '../../styles/PreviewModal.css';

import React from 'react';

import like from '../../assets/like.svg';
import play from '../../assets/play.svg';
import plus from '../../assets/plus.svg';

function PreviewModal({ selectedMovie, setModalOpen }) {
  console.log(selectedMovie);
  console.log(setModalOpen);

  return (
    <div className="presentation">
      <div className="preview-modal">
        <div className="preview-title-wrapper">
          <div className="preview-title-background">
            <img
              src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
              alt="modal__poster-img"
            />
          </div>

          <div className="button-layout">
            <button type="button" className="square-button play-button" aria-label="Paly">
              <img src={play} alt="icon" />
              <span>재생</span>
            </button>
            <button type="button" className=" has-button" aria-label="Has">
              <img src={plus} alt="icon" />
            </button>
            <button type="button" className="like-button" aria-label="like">
              <img src={like} alt="icon" />
            </button>
          </div>
        </div>

        <div className="preview-detail-container">
          <div className="meta-data">
            <span>detail</span>
          </div>
          <div>
            <span>detail</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
