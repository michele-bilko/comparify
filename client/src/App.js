import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;

    if (token) {
      console.log("Token: " + token)
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      username: "",
      userArt: "",
      topTrack: "",
      trackArt: ""
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }


  getYourTaste(){
    var self = this;
    spotifyApi.getMe({},
      function(error,response){
        console.log(response)
        console.log(error)
        self.setState({
            username: response.display_name,
            userArt: response.images[0].url
        })
      });

    {/*spotifyApi.getMyTopTracks({},
     function(error, response){
       console.log(response)
       console.log(error)
          self.setState({
            topTrack: response.items[0].name,
            trackArt: response.items.album.images[0].url
          });
        });*/}
  }

  
  
  render() {
    return (
      <div className="App">
        <div class="header">
        { this.state.loggedIn &&
          <button class="stats" onClick={() => this.getYourTaste()}>
            Check Stats
          </button>
        }
        </div>
        <div class="user-name">
          Data for: {this.state.username}
        </div>
        <div class ="user-photo">
          <img src={this.state.userArt} style={{ height: 150, width: 160}} alt="user" class="user-photo"/>
        </div>
        <div class="top-track">
          Top tracks:
          {/*Top track: {this.state.topTrack}*/}
        </div>
        <div class="top-track">
          Top tracks:
        </div>
        <div class="top-track">
          Top genres:
        </div>
        <div class="footer">
        { this.state.loggedIn &&
          <button class="get-taste">
            This button doesn't work :)
          </button>
        }
        </div>
      </div>
    );
  }
}

export default App;