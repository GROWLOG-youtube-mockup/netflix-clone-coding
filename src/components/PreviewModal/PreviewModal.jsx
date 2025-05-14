import '../../styles/PreviewModal.css';

import React, { useRef } from 'react';

import close from '../../assets/close.svg';
import like from '../../assets/like.svg';
import play from '../../assets/play.svg';
import plus from '../../assets/plus.svg';
import useOnClickOutside from '../../hooks/useOnClickOutside.js';

function PreviewModal({ selectedMovie, setIsModalOpen }) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsModalOpen(false));

  return (
    <div className="presentation">
      <div className="preview-modal-wrapper">
        <div className="preview-modal" ref={ref}>
          <div className="preview-title-wrapper">
            <div className="preview-title-background">
              <button
                type="button"
                className="close-button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                <img src={close} alt="" />
              </button>
              <img
                src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
                alt="modal__poster-img"
              />
              <div className="fade-overlay" />
            </div>
            <div className="preview-player-wrapper">
              <div className="preview-modal-title">
                <span>{selectedMovie?.name || selectedMovie?.title}</span>
              </div>
              <div className="preview-button-layout">
                <button type="button" className="play-button" aria-label="Play">
                  <img className="icon" src={play} alt="icon" />
                  <span>재생</span>
                </button>
                <button type="button" className="has-button" aria-label="Has">
                  <img className="icon" src={plus} alt="icon" />
                </button>
                <button type="button" className="like-button" aria-label="like">
                  <img className="icon" src={like} alt="icon" />
                </button>
              </div>
            </div>
          </div>

          <div className="preview-detail-container">
            <div className="meta-data detail-left">
              <div>{selectedMovie?.overview}</div>
            </div>
            <div className="meta-data detail-right">
              <div>
                <span className="meta-data-tag-label">type:</span>
                <span className="meta-data-tag-item">{selectedMovie?.media_type}</span>
              </div>
              <div>
                <span className="meta-data-tag-label">평점:</span>
                <span className="meta-data-tag-item">{selectedMovie?.vote_average}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
