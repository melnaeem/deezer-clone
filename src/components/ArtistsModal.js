import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { selectGenre, resetGenre } from '../redux/actions/actions';

import './ArtistsModal.css';


function ArtistsModal(props) {

  const artists = props.artistsList.map(artist => (
    <div className="artists__item" key={artist.id}>
      <img src={artist.picture_small} alt={artist.name} />
      <h5>{artist.name}</h5>
    </div>
  ));

  const closeModal = () => {
    props.resetGenre();
  }

  return (
    <div className='modal__container' onClick={closeModal}>
      <div className='modal'>
        <div className='modal__header'>
          <h4>{props.selectedGenre.name} Related Artists</h4>
          <button onClick={closeModal} title="close modal">
            X
          </button>
        </div>

        <div className='artists__list'>
          {artists}
        </div>
      </div>
    </div>
  )
}

ArtistsModal.propTypes = {
  artistsList: PropTypes.array.isRequired,
  selectedGenre: PropTypes.object.isRequired,
  selectGenre: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  artistsList: state.artistsList,
  selectedGenre: state.selectedGenre
})

export default connect(mapStateToProps, { selectGenre, resetGenre })(ArtistsModal);
