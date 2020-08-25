import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGenresList, resetGenre, selectGenre } from '../redux/actions/actions';
import ArtistsModal from './ArtistsModal';
import { history } from '../redux/actions/actions';


import './Genreslist.css';


class Genreslist extends Component {

  componentDidMount() {
    this.props.fetchGenresList().then(() => {
      this.updateSelectedGenreFromRoute(this.props.match.params.id);
    });

    this.unlisten = history.listen(({ location }) => {
      const locationIntoArray = location.pathname.split('/');
      const paramId = locationIntoArray[locationIntoArray.length - 1];

      !isNaN(paramId) ?
        this.updateSelectedGenreFromRoute(paramId) :
        this.props.resetGenre();

    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  updateSelectedGenreFromRoute(id) {
    if (id && +id !== this.props.selectedGenre.id) {
      const genre = this.props.genresList.find(genre => genre.id === +id);
      genre.id && this.props.selectGenre(genre);
    }
  }

  selectGenre(genre, e) {
    if (e) {
      e.stopPropagation();
    }

    this.props.selectGenre(genre);
  }

  render() {
    const genresCards = this.props.genresList.map(genre => (
      <div className='card' key={genre.id} onClick={(e) => this.selectGenre(genre, e)}>
        <div className='card__header'>
          <img src={genre.picture_medium} alt={genre.name} />
          <h2 className='card__title'>{genre.name}</h2>

          <button className="card__btn" onClick={(e) => this.selectGenre(genre, e)}>
            show artists
          </button>
        </div>
      </div>
    ));


    return (
      <>
        <div className={`cards__container ${(this.props.isArtistsModalOpen ? 'hideOverFlow' : '')}`}>
          {genresCards}
        </div>
        {this.props.isArtistsModalOpen && <ArtistsModal />}
      </>
    )
  }
}


Genreslist.propTypes = {
  fetchGenresList: PropTypes.func.isRequired,
  selectGenre: PropTypes.func.isRequired,
  resetGenre: PropTypes.func.isRequired,
  genresList: PropTypes.array.isRequired,
  artistsList: PropTypes.array.isRequired,
  selectedGenre: PropTypes.object.isRequired,
  isArtistsModalOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  genresList: state.genresList,
  artistsList: state.artistsList,
  selectedGenre: state.selectedGenre,
  isArtistsModalOpen: state.isArtistsModalOpen
})


export default connect(
  mapStateToProps,
  { fetchGenresList, selectGenre, resetGenre }
)(Genreslist);


