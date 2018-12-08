import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import userInstance from '../../axios-base';
//import Input from '../UI/Inputs.js';
import './displayPage.css';
import $ from 'jquery';

class DisplayPage extends Component {

  state = {
    displayData: []
  }

  componentDidMount()
  {
    userInstance.get('/fans/getfans')
    .then(response => {
      // this.setState( {loading: true});
      const displayInfo = response.data.input;
      this.setState( { displayData: displayInfo })
    });
  }

  logout() {
    localStorage.clear();
    this.history.push("/login");
  }

  authAccess() {
      let userAuth = JSON.parse(localStorage.getItem('Authenticated_User'));
      // console.log(userAuth.userID + " " + userAuth.token);
      if (userAuth.token == null) {
          this.props.history.push('/');
      }
  }



  ptCaret() {
      $('#ptcaret').toggleClass('open');
      this.ptAcc();
  }
  ptAcc(val) {
      $('#prodTypeAcc').toggleClass('hide');
  }

  tsCaret() {
      $('#tscaret').toggleClass('open');
      this.tsAcc();
  }
  tsAcc(val) {
      $('#techSpecAcc').toggleClass('hide');
  }

  airRangeVals() {
      document.getElementById('airMinT').value = document.getElementById('airMinR').value;
      document.getElementById('airMaxT').value = document.getElementById('airMaxR').value;
  }

  mpRangeVals() {
      document.getElementById('mpMinT').value = document.getElementById('mpMinR').value;
      document.getElementById('mpMaxT').value = document.getElementById('mpMaxR').value;
  }

  msRangeVals() {
      document.getElementById('msMinT').value = document.getElementById('msMinR').value;
      document.getElementById('msMaxT').value = document.getElementById('msMaxR').value;
  }

  fsRangeVals() {
      document.getElementById('fsMinT').value = document.getElementById('fsMinR').value;
      document.getElementById('fsMaxT').value = document.getElementById('fsMaxR').value;
  }

  btCaret() {
      $('#btcaret').toggleClass('open');
  }

  psCaret() {
      $('#pscaret').toggleClass('open');
      this.psAcc();
  }
  psAcc(val) {
      $('#PastSlctAcc').toggleClass('hide');
  }

  fRangeVals() {
      document.getElementById('fMinT').value = document.getElementById('fMinR').value;
      document.getElementById('fMaxT').value = document.getElementById('fMaxR').value;
  }
  gRangeVals() {
      document.getElementById('gMinT').value = document.getElementById('gMinR').value;
      document.getElementById('gMaxT').value = document.getElementById('gMaxR').value;
  }

  certCaret() {
      $('#certcaret').toggleClass('open');
  }

  doLogout()
  {
      this.confirm("Do you wish to logout?");
      if(this.confirm)
      {
        this.logout();
      }
  }

  render() {
    //debugger;
    const fanDataArray = this.state.displayData;
    return(
      <div>
               <div className="Products">
                   <img id="logo3" src={require('../images/JL.png')} />
                   <select id="productSearchDropdown">
                       <option>HVAC Fans</option>
                   </select>
                   <input type="text" id="productSearch" placeholder="   Search..."/>
                   <i id="searchIco" className="fas fa-search"></i>
                   <i id="serCaret" className="fas fa-caret-down"></i>
                   <p id="prodP">Projects</p>
                   <button id="userBtn">button?</button>
               </div>
                <div id="productMainDiv">
              <div id="sideBar">
                   <div id="prodProj">
                       <label id="searchLab">Search:</label>
                       <button id="prodSave">Save</button>
                       <button id="prodClear">Clear</button>
                   </div>
                   <div id="accordions">
                       <button id="prodBtn">Product</button>
                       <button id="projBtn">Project</button>

                       <button id="ProdTypeBtn" onClick={()=>{this.ptCaret()}} >Product Type <i id="ptcaret" className="fas fa-caret-right"></i></button>
                       <div id="prodTypeAcc" className="hide">
                           <label id="ptLab"><b>Model Year:</b></label>
                           <input type="text" id="lowYear"></input><label>&#8211;</label><input type="text" id="highYear"></input>
                       </div>

                       <button id="techSpecBtn" onClick={()=>{this.tsCaret()}} >Technical Specifications <i id="tscaret" className="fas fa-caret-right"></i></button>
                       <div id="techSpecAcc" className="hide">

                           <i className="fas fa-exchange-alt"></i><label id="airflow">Airflow</label><label id="cfm">(CFM)</label><br/>
                           <input id="airMinT" type="text" defaultValue="2000"/>
                           <span>
                               <input id="airMinR" type="range" min="2000" max="6000" defaultValue="2000" onChange={()=>{this.airRangeVals()}}/>
                               <input id="airMaxR" type="range" min="6000" max="10000" defaultValue="10000" onChange={()=>{this.airRangeVals()}}/>
                           </span>
                           <input id="airMaxT" type="text" defaultValue="10000"/>

                           <i className="fas fa-exchange-alt"></i><label id="maxpower">Max power</label><label id="watts">(W)</label><br/>
                           <input id="mpMinT" type="text" defaultValue="9.84"/>
                           <span>
                               <input id="mpMinR" type="range" min="9.84" max="53.18" defaultValue="9.84" onChange={()=>{this.mpRangeVals()}}/>
                               <input id="mpMaxR" type="range" min="53.18" max="96.52" defaultValue="96.52" onChange={()=>{this.mpRangeVals()}}/>
                           </span>
                           <input id="mpMaxT" type="text" defaultValue="96.52"/>

                           <i className="fas fa-exchange-alt"></i><label id="maxsound">Sound at max speed</label><label id="dba">(dBA)</label><br/>
                           <input id="msMinT" type="text" defaultValue="20"/>
                           <span>
                               <input id="msMinR" type="range" min="20" max="50" defaultValue="20" onChange={()=>{this.msRangeVals()}}/>
                               <input id="msMaxR" type="range" min="50" max="80" defaultValue="80" onChange={()=>{this.msRangeVals()}}/>
                           </span>
                           <input id="msMaxT" type="text" defaultValue="80"/>

                           <i className="fas fa-exchange-alt"></i><label id="fansweep">Fan sweep diameter</label><label id="inches">(in)</label><br/>
                           <input id="fsMinT" type="text" defaultValue="18"/>
                           <span>
                               <input id="fsMinR" type="range" min="18" max="57" defaultValue="18" onChange={()=>{this.fsRangeVals()}}/>
                               <input id="fsMaxR" type="range" min="57" max="96" defaultValue="96" onChange={()=>{this.fsRangeVals()}}/>
                           </span>
                           <input id="fsMaxT" type="text" defaultValue="96"/>

                       </div>

                       <button id="BrandTypeBtn" onClick={()=>{this.btCaret()}} >Brand <i id="btcaret" className="fas fa-caret-right"></i></button>

                       <button id="PastSlctBtn" onClick={()=>{this.psCaret()}} >Past Selections <i id="pscaret" className="fas fa-caret-right"></i></button>
                       <div id="PastSlctAcc" className="hide">

                           <i className="fas fa-exchange-alt"></i><label id="firm">Firm</label><br/>
                           <input id="fMinT" type="text" defaultValue="0"/>
                           <span>
                               <input id="fMinR" type="range" min="0" max="5" defaultValue="0" onChange={()=>{this.fRangeVals()}}/>
                               <input id="fMaxR" type="range" min="5" max="10" defaultValue="10" onChange={()=>{this.fRangeVals()}}/>
                           </span>
                           <input id="fMaxT" type="text" defaultValue="10"/>

                           <i className="fas fa-exchange-alt"></i><label id="global">global</label><br/>
                           <input id="gMinT" type="text" defaultValue="0"/>
                           <span>
                               <input id="gMinR" type="range" min="0" max="746" defaultValue="0" onChange={()=>{this.gRangeVals()}}/>
                               <input id="gMaxR" type="range" min="746" max="1492" defaultValue="1492" onChange={()=>{this.gRangeVals()}}/>
                           </span>
                           <input id="gMaxT" type="text" defaultValue="1492"/>

                       </div>

                       <button id="CertificationsBtn" onClick={()=>{this.certCaret()}} >Certifications <i id="certcaret" className="fas fa-caret-right"></i></button>

                   </div>
                   <div id="loginDiv">
                       <button id="logoutBtn" onClick={()=>{this.logout()}}>Logout</button>
                   </div>
              </div>
            </div>
          <div id="bigDisplay">
          <div className="displayInfo">
              {fanDataArray.map(formElement => (
                //<src: fan image>
                <div  id="displayBox">
                <p className="fanName" >{formElement.fanName}</p>
                <p className="fanSpecs" >{formElement.fanSpecs}</p>
                <p className="pastSpecs" >{formElement.pastSpecs}</p>
                <div id="chx"><input type="checkbox" class="compareCheckbox"/></div><label class="compare">Compare</label>
                <button id="addTo" className="addTo">Add To</button>
                </div>
              ))}
          </div>
          </div>
      </div>
    );
  }
}

export default DisplayPage;
