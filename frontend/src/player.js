import React from "react";
import ReactDOM from "react-dom";
import { Player } from "bitmovin-player";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "./styles.css";

let getQualityLabels = function(data) {
  if (data.height <= 1440) {
    return "1440p HD";
  } else if (data.height <= 2160) {
    return "2160p 4K";
  }
};

let resizeTimeout = -1;

const config = {
  key: "",
  cast: {
    enable: true
  },
  events: {
    playerresized: function(ev) {
      let element = document.querySelector(".player-switch");

      if (!element.classList.contains("fixed-player")) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          document
            .querySelector(".player-container")
            .height(ev.height.substr(0, ev.height.indexOf("px")) - 2);
        }, 500);
      }
    }
  }
};

const videoList = [
  "The Durian",
  "The Gooseberry",
  "360",
  "4k",
  "DRM",
  "Thumbnail"
];
const playerConfigs = {
  "The Durian": {
    name: "The Durian",
    dash: "https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd",
    hls:
      "//bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
  },
  "The Gooseberry": {
    name: "The Gooseberry",
    hls:
      "https://svbps-sambavideos.akamaized.net/voda/_definst_/amlst%3Astg%3B219%2C3904%2C714e2b158595e75229c292721720cbb8%3Bhidden64np%3B3aiIJK6yR30GwWoqX_df6w5_TNEPfhxgXYfpgz5gUWi7y8R77DXkbHpgT3CSsstSTilSqc7Wu31uXUKVTC9GUO2LGAJMQ75ScRqaCIvfxeroUD6ALb7D4hXU_utgX8rjJF2G_QJhNslqmqAfKgfeuBaKNLVNLA_rUdqyMz9-Ei2R4rdpccTZ9zOS-J8f-MV11o58bGxpPY7CJuhU5tnvb_orTgC0xr5on01yQpvDcYnN3mnTSGXWlOJuZMw53qNXkqI5QlaRIA%21%21/playlist.m3u8?sts=st=1554465954~exp=1554467634~acl=/*~hmac=5e3a522704bfcd652e4873f93c1cb3aa944d3f932fcc776a91ed50e0548717bb"
  },
  "360": {
    name: "360",
    hls: "https://bitmovin.com/player-content/playhouse-vr/m3u8s/105560.m3u8",
    vr: {
      startupMode: "2d",
      startPosition: 180
    }
  },
  "4k": {
    name: "4k",
    hls: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    labeling: {
      dash: {
        qualities: getQualityLabels
      },
      hls: {
        qualities: getQualityLabels
      }
    }
  },
  Thumbnail: {
    name: "Thumbnail",
    hls:
      "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    thumbnailTrack: {
      url:
        "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/thumbnails/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.vtt"
    }
  },
  DRM: {
    name: "DRM",
    dash:
      "https://svbps-sambavideos.akamaized.net/vodd-sd/_sambaDrm_/amlst%3Astg%3B219%2C8874%2C86de099f93100bb182ed1a26b9922356%3Bhidden64np%3B3aiIOCbSwHwChCpm2xRYPmjwYzJgTr_3EQAEy2icz8SlOu1aeYZ7174sdgc8sBW07lj-0tbdVEIAmnDwtLpoPfIXWZYrPhwOs1FAYT0HzOE6wFmY7saatr_fADVtW4O4Rzk16bLUtsiSw7qBWJwbDS1NoFsB3v6ilYByej44xxV1Z7-Ilg%21%21/manifest_mvlist.mpd",
    drm: {
      widevine: {
        LA_URL:
          "https://samba-drm.live.ott.irdeto.com/licenseServer/widevine/v1/record/license?ls_session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdlN2Q5YmE4LWUzNzctNGFkMi1iZGIzLTdmOWRiOWYzZGI2ZiJ9.eyJzdWIiOiJyZWNvcmQtdXNlciIsImlzcyI6ImRpZWdvLmR1YXJ0ZUBzYW1iYXRlY2guY29tLmJyIiwianRpIjoiSUhHOUpmTVpQWkhLb0x4c28wWG95LUFkbzdtOHNaQ2Y1bk5VZ1Z4WFZJOD0iLCJleHAiOjE1NTg1NDk1NzUsImlhdCI6MTU1NTk1NzU3NSwiYWlkIjoicmVjb3JkIn0.66KX0rrx2JuZjq_ehR1z4hu63uRAIImJQdVeuaeT-os&SubContentType=Default&CrmId=record&AccountId=record&ContentId=86de099f93100bb182ed1a26b9922356"
      }
    }
  }
};

class BMPlayer extends React.Component {
  state = {
    function: "NENHUMA",
    url: "",
    dash: "",
    videoKey: "Vídeo",
    videoSource: null,
    labelWidth: 0
  };

  playerRef = React.createRef();

  handleEventPlay = () => {
    this.setState({
      function: "PLAY"
    });
    this.state.player.play();
  };

  handleEventPause = () => {
    this.setState({
      function: "PAUSE"
    });
    this.state.player.pause();
  };

  handleEventSeek = () => {
    this.setState({
      function: "SEEK 00:20"
    });
    this.state.player.seek(20);
  };

  handleEventVolume = () => {
    this.setState({
      function: "VOLUME 20%"
    });
    this.state.player.setVolume(20);
  };

  handleEventMute = () => {
    this.setState({
      function: "MUTE"
    });
    this.state.player.mute();
  };

  handleEventUnmute = () => {
    this.setState({
      function: "UNMUTE"
    });
    this.state.player.unmute();
  };

  handleChangeInput = event => {
    this.setState({
      url: event.target.value
    });
  };

  handleURLLoading = () => {
    this.state.player.load(this.state.videoSource);
  };

  handleSelect = async event => {
    let source = {
      progressive:
        "//bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4"
    };

    let videoKey = event.target.value;

    if (videoKey !== "Vídeo") {
      this.setState({
        videoKey
      });

      source = playerConfigs[videoKey];

      this.setState({
        videoSource: source
      });

      this.handleMountPlayer(source);
    }
  };

  handleMountPlayer = async videoSource => {
    let player = this.state.player;

    if (!player) {
      player = new Player(document.getElementById("player"), config);

      await this.setState({
        player
      });
    }

    if (videoSource !== null) {
      player
        .load(videoSource)
        .then(function() {
          let container = document.querySelector(".player-container");
          let playerHeight = document.querySelector("#player").scrollHeight;

          if (container.scrollHeight <= playerHeight) {
            container.scrollHeight(playerHeight);
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      player.getSupportedDRM().then(param => {
        console.log("POIS É VINICIN, SE LIGA AÍ", param);
      });
    }
  };

  componentDidMount() {
    this.handleMountPlayer(this.state.videoSource);
  }

  render() {
    return (
      <div>
        <div className="container-player">
          <div>
            <div className="container-url">
              <div>
                <InputLabel>URL</InputLabel>
                <input
                  className="input-url"
                  onChange={this.handleChangeInput}
                />
              </div>

              <FormControl variant="outlined" className="select-url">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-video-simple"
                >
                  Vídeo
                </InputLabel>
                <Select
                  className="select"
                  input={
                    <OutlinedInput
                      labelWidth={this.state.name}
                      name="video"
                      id="outlined-video-simple"
                    />
                  }
                  onChange={this.handleSelect}
                >
                  {videoList.map(function(video, index) {
                    return (
                      <MenuItem index={index} value={video}>
                        {video}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <Button
              className="url-loading"
              variant="outlined"
              color="primary"
              onClick={this.handleURLLoading}
            >
              Carregar
            </Button>
          </div>
          <div>
            <div className="player-container">
              <div className="player-switch">
                <div
                  id="player"
                  className="no-radius no-frame"
                  ref={this.playerRef}
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="btn-group">
                <Button
                  id="play"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventPlay}
                >
                  <span className="glyphicon glyphicon-play" /> Play
                </Button>
                <Button
                  id="pause"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventPause}
                >
                  <span className="glyphicon glyphicon-pause" /> Pause
                </Button>
                <Button
                  id="seek"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventSeek}
                >
                  <span className="glyphicon glyphicon-forward" /> Seek to 00:20
                </Button>
                <Button
                  id="volume"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventVolume}
                >
                  <span className="glyphicon glyphicon-volume-up" /> Volume 20%
                </Button>
                <Button
                  id="mute"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventMute}
                >
                  <span className="glyphicon glyphicon-volume-off" /> Mute
                </Button>
                <Button
                  id="unmute"
                  type="button"
                  variant="outlined"
                  color="primary"
                  className="btn btn-default"
                  onClick={this.handleEventUnmute}
                >
                  <span className="glyphicon glyphicon-volume-on" /> Unmute
                </Button>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  Função chamada: <div id="function">{this.state.function}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="panel-heading picture">Teste de Picture In Picture</p>
      </div>
    );
  }
}

export default BMPlayer;
const rootElement = document.getElementById("root");
ReactDOM.render(<BMPlayer />, rootElement);
// let scrolled = false;
let timeout;

function adjustPlayer() {
  var container = document.querySelector(".player-container");
  // extract constants for better readabilty
  var switchToMinPlayerPos =
    container.getBoundingClientRect().top + container.scrollHeight;
  var currentScrollPos =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (timeout) {
    clearTimeout(timeout);
  }

  var playerDiv = document.querySelector(".player-switch");
  var className = "fixed-player";

  // toggle the css-class responsible for the player moving to the lower right corner
  if (currentScrollPos > switchToMinPlayerPos) {
    timeout = setTimeout(function() {
      clearTimeout(timeout);
      timeout = void 0;
      playerDiv.classList.add(className);
    }, 200);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      clearTimeout(timeout);
      timeout = void 0;
      playerDiv.classList.remove(className);
    });
  }
}

// listen to scrolling events
window.onscroll = adjustPlayer;
