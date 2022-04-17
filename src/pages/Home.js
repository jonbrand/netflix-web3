import React, { useState } from 'react';
import "./Home.css";
import { Logo } from '../images/Netflix';
import { ConnectButton, TabList, Tab, Button, Icon, Modal, useNotification } from 'web3uikit';
import { movies } from '../helpers/library';
import { Link } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

const Home = () => {
  const [visible, setVisible] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState();
  const { isAuthenticated } = useMoralis();

  const dispatch = useNotification();

  const handleNewNotification = () => {
    dispatch({
      type:'error',
      message:'Please Connect Your Crypto Wallet',
      title:'Not Authenticated',
      position:'topL'
    });
  };

  return(
    <>
    <div className='logo'>
      <Logo />
      
    </div>
    <div className='connect'>
      <Icon fill='#ffffff' size={24} svg='bell' />
      <ConnectButton />
    </div>
    <div className='topBanner'>
      <TabList defaultActiveKey={1} taStyle='bar'>
        <Tab tabKey={1} tabName={'Movies'}>
          <div className='scene'>
            <img src={movies[0].Scene} className='sceneImg' alt='movies scene'></img>
            <img src={movies[0].Logo} className='sceneLogo' alt='movies logo'></img>
            <p className='sceneDesc'>{movies[0].Description}</p>
            <div className='playButton'>
              <Button
                color='red'
                icon='chevronRightX2'
                text='Play'
                theme='colored'
                type='button'
              />
              <Button
                icon='plus'
                text='Add to My List'
                theme='translucent'
                type='button'
                onClick={() => console.log(isAuthenticated)}
              />
            </div>
          </div>
          <div className='title'>
            Movies
          </div>
          <div className='thumbs'>
            {movies &&
            movies.map((e) => {
              return(
                <img
                  src={e.Thumnbnail}
                  className='thumbnail'
                  alt='thumbnails'
                  onClick={() => {
                    setSelectedFilm(e);
                    setVisible(true);
                  }}
                >
                </img>
              )
            })
            }
          </div>
        </Tab>
        <Tab tabKey={2} tabName={'Series'}>
        <div className='ownListContent'>
            <div className='title'>
              Series
            </div>
          </div>
        </Tab>
        <Tab tabKey={3} tabName={'MyList'}>
          <div className='ownListContent'>
            <div className='title'>
              Your Library
            </div>
          </div>
        </Tab>
      </TabList>
      {selectedFilm && (
        <div className='modal'>
          <Modal
            onCloseButtonPressed={() => setVisible(false)}
            isVisible={visible}
            hasFooter={false}
            width='1000px'
          >
            <div className='modalContent'>
              <img src={selectedFilm.Scene} className='modalImg' alt='movies scene'></img>
              <img src={selectedFilm.Logo} className='modalLogo' alt='movies logo'></img>
              <div className='modalPlayButton'>
                {isAuthenticated ? (
                  <>
                    <Link to='/player' state={selectedFilm.Movie} style={{ textDecoration: 'none'}}>
                      <Button
                        color='red'
                        icon='chevronRightX2'
                        text='Play'
                        theme='colored'
                        type='button'
                      />
                    </Link>
                    <Button
                      icon='plus'
                      text='Add to My List'
                      theme='translucent'
                      type='button'
                    />
                  </>
                ) : (
                  <>
                      <Button
                        color='red'
                        icon='chevronRightX2'
                        text='Play'
                        theme='colored'
                        type='button'
                        onClick={handleNewNotification}
                      />
                    <Button
                      icon='plus'
                      text='Add to My List'
                      theme='translucent'
                      type='button'
                      onClick={handleNewNotification}
                    />
                  </>
                )}
              </div>
              <div className='movieInfo'>
                <div className='description'>
                  <div className='details'>
                    <span>{selectedFilm.Year}</span>
                    <span>{selectedFilm.Duration}</span>
                  </div>
                  {selectedFilm.Description}
                </div>
                <div className='detailedInfo'>
                  Genre:
                  <span className='deets'>{selectedFilm.Genre}</span>
                  <br />
                  Actors:
                  <span className='deets'>{selectedFilm.Actors}</span>
                </div>
              </div>
            </div>
          </Modal>
      
        </div>
      )}
    </div>
    </>
  )
}

export default Home;
