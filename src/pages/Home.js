import React, { useState } from 'react';
import "./Home.css";
import { Logo } from '../images/Netflix';
import { ConnectButton, TabList, Tab, Button, Icon, Modal } from 'web3uikit';
import { movies } from '../helpers/library';

const Home = () => {
  const [visible, setVisible] = useState(false)
  const [selectedFilm, setSelectedFilm] = useState();

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
        <Tab tabKey={2} tabName={'Series'}></Tab>
        <Tab tabKey={3} tabName={'MyList'}></Tab>
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
                />
              </div>
              <div className='movieInfo'>
                <div className='description'>
                  <div className='details'>
                    <span>{selectedFilm.Year}</span>
                    <span>{selectedFilm.Duration}</span>
                  </div>
                  {selectedFilm.Description}
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
