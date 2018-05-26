import React, {Component} from 'react';
import AppBarLayout from './AppBarLayout';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Banner from './Resources/fsjudoBanner.jpg'; //Change this after DB is working
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class Introduction extends Component {
  render(){
    return(
      <div style={{padding:"10px", maxWidth:"1000px"}}>
        <Card>
          <CardHeader title="富善柔道會" subheader="Fu Shin Judo" style={{fontWeight:"bold"}}/>
          <CardMedia style={{paddingTop:'40.25%'}}
                     image={Banner}
                     title="Fu Shin Judo"/>
          <CardContent>
            <div style={{width:"fit-content", marginBottom:"10px"}}>
              <Typography variant="title">有關我們</Typography>
              <Divider light />
            </div>
            <Typography paragraph style={{fontSize:"15px"}}>
            本 會 為 中 國 香 港 柔 道 總 會 及 香 港 政 府 註 冊 團 體 ， 始 創 於 1 9 8 7 年 並 由 <strong>鍾 廣 強 </strong> 師 傅 教 授 ，致 力 於 推 廣 柔 道 運 動。 除 了 於 本 地 主 辦 各 柔 道 課 堂 ， 提 升 學 員 的 柔 道 技 術 外， 並 經 常 到 海 外 進 行 技 術 交 流。本 會 亦 非 常 注 重 學 員 之 間 的 友 誼 ， 務 求 令 每 一 位 學 員 都 能 在 歡 樂 的 環 境 下 學 習 柔 道 ， 共 同 從 中 尋 找 樂 趣 ， 培 養 友 情 。
            </Typography>

            <Typography paragraph style={{fontSize:"15px"}}>
            本 柔 道 會 練 習 道 埸 位 於 大 埔 區：
            </Typography>

            <Typography paragraph style={{fontSize:"15px"}}>
            富 善 道 埸 – 位 於 大 埔 富 善 村 巴 士 總 站 旁 之 多 層 停 車 場 6 字 樓 , <strong>富 善 體 育 館</strong> 內
            </Typography>

            <Typography paragraph style={{fontSize:"15px"}}>
            <strong>教 練 :</strong>
            </Typography>

            <Typography paragraph style={{fontSize:"15px"}}>
            本 會 主 教 練 為 中 國 香 港 柔 道 總 會 註 冊 教 練 ． 亦 為 前 香 港 柔 道 代 表 隊 成 員， 代 表 香 港 參 加 不 少 大 型 國 際 賽 事 ， 曾 於 國 際 上 獲 得 不 少 獎 項，成 績 裴 然 ． 任 教 經 驗 豐 富 ，曾 於 各 青 少 年 中 心 、 康 體 柔 道 班 、國 際 學 校 等 地 任 教 柔 道。
            </Typography>

          </CardContent>
        </Card>
      </div>
    );
  }
}

class Timeable extends Component {

  constructor(props){
    super(props);
    this.state = {
      lastUpdate: moment().format("YYYY-MM-DD") //Change this when the DB is ready
    }
    BigCalendar.momentLocalizer(moment);
  }

  getMonth=()=>{
    var month = moment().format("M");
    return month;
  }

  render(){
    return (
      <div style={{padding:"10px", maxWidth:"1000px"}}>
        <Card>
          <CardHeader title={this.getMonth()+"月 上課時間表"} subheader={"Last Update: " + this.state.lastUpdate}/>
          <CardContent>
            <BigCalendar
              style={{minHeight:"300px"}}
              events={[]}
              toolbar={false}
              views={['month']}
              startAccessor='startDate'
              endAccessor='endDate'
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

class Location extends Component {
  constructor(props){
    super(props);
    this.MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: 22.453966, lng: 114.174246 }}
      >
        <Marker
          position={{ lat: 22.453966, lng: 114.174246 }}
        />
      </GoogleMap>
    ));
  }

  render(){
    return (
      <div style={{padding:"10px", maxWidth:"1000px"}}>
        <Card>
          <CardHeader title="富善體育館" subheader="Fu Shin Sport Centre"/>
          <CardContent>
            <div>
            <this.MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAJHn4Tr0qzAz_IFmi4rPJk0jUbFdPMKyI&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

class Main extends Component {
  render(){
    return(
      <div>
        <div>
          <AppBarLayout/>
        </div>
        <div>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Introduction/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Timeable/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Location/>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;
