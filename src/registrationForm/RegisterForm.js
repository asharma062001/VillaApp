import React from 'react';
import ContentEditable from 'react-contenteditable'
import './style.css';


class RegisterForm extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {username: '',dov: '',Pincode: '',Owner: '',noteSurround: '',noteConst: '',noteDecore: ''},
        errors: {},
        fromLocal:'',
        showEnterNote: false,
        showReview: false
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
      this.handleContentEditable = this.handleContentEditable.bind(this);
    };

    // Delete from local storage .
    handleDeleteClick(e) {
        localStorage.removeItem('registerData');
        this.setState({
            showReview: !this.state.showReview 
          });
          this.setState({
            showEnterNote: !this.state.showEnterNote 
          });
    }

    // Delete from local storage .
    handleContentEditable(e) {
      console.log("onchange",e);
    }


    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });
    }

    //Submit values .
    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
        localStorage.setItem('registerData', JSON.stringify(this.state));
          let fields = {};
          fields["username"] = "";
          fields["dov"] = "";
          fields["Pincode"] = "";
          fields["Owner"] = "";
          fields["noteSurround"] = "";
          fields["noteConst"] = "";
          fields["noteDecore"] = "";
          this.setState({fields:fields});
          //alert("Form submitted");
          this.setState({
            showReview: !this.state.showReview 
          });
          this.setState({
            showEnterNote: !this.state.showEnterNote 
          });



      }
    }

    // forms fields validation .
    validateForm() {
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter name of the villa.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }


      if (!fields["dov"]) {
        formIsValid = false;
        errors["dov"] = "*Please enter date of visit.";
      }

      if (!fields["Pincode"]) {
        formIsValid = false;
        errors["Pincode"] = "*Please enter pincode.";
      }

      if (!fields["noteSurround"]) {
        formIsValid = false;
        errors["noteSurround"] = "*A note about the surrounding area of the villa.";
      }


      if (!fields["noteConst"]) {
        formIsValid = false;
        errors["noteConst"] = "*A note about the construction quality of the villa.";
      }

      if (!fields["noteDecore"]) {
        formIsValid = false;
        errors["noteDecore"] = "*A note about the villa decore.";
      }

      this.setState({
        errors: errors
      });
      return formIsValid;

    }

    componentDidMount(){
    //const myData = localStorage.getItem('registerData');
    // set the state with the data
    //this.setState({myData});
    this.setState({
            showEnterNote: !this.state.showEnterNote 
          });
    }


  render() {

    
    let isLoggedIn =  JSON.parse(localStorage.getItem('registerData'));
    let uname;
    let dateOfVisit;
    let pincode;
    let Owner;
    let noteSurround;
    let noteConst;
    let noteDecore;


    if (isLoggedIn) {
        //console.log("uname", isLoggedIn.fields.username);
        //Set value in local storage;
        uname =  isLoggedIn.fields.username;
        dateOfVisit = isLoggedIn.fields.dov;
        pincode = isLoggedIn.fields.Pincode;
        Owner = isLoggedIn.fields.Owner;
        noteSurround= isLoggedIn.fields.noteSurround;
        noteConst= isLoggedIn.fields.noteConst;
        noteDecore =  isLoggedIn.fields.noteDecore;
    } else {
        //local storage is empty";
        uname =  "-";
        dateOfVisit = "-";
        pincode = "-";
        Owner =  "-";
        noteSurround=  "-";
        noteConst=  "-";
        noteDecore =   "-";
    }

    return (
              <div id="main-registration-container">
                    <div id="register" style={{ display: this.state.showEnterNote ? "block" : "none" }}>
                        <h3>Create structure note</h3>
                          <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >

                                <label>Name of the villa </label>
                                <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.username}</div>
        
                                <label>Date of visit</label>
                                <input type="date" name="dov" value={this.state.fields.dov} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.dov}</div>
        
                                <label>Pincode</label>
                                <input type="number" pattern="/^\d{6}$/"  name="Pincode" value={this.state.fields.Pincode} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.Pincode}</div>
        

                                <label>Owner's name (optional)</label>
                                <input type="text" name="Owner" value={this.state.fields.Owner} onChange={this.handleChange} />
        
                                <label>A note about the surrounding area of the villa</label>
                                <input type="text" name="noteSurround" value={this.state.fields.noteSurround} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.noteSurround}</div>
        
                                <label>A note about the construction quality of the villa</label>
                                <input type="text" name="noteConst" value={this.state.fields.noteConst} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.noteConst}</div>
        
                                <label>A note about the villa decore</label>
                                <input type="text" name="noteDecore" value={this.state.fields.noteDecore} onChange={this.handleChange} />
                                <div className="errorMsg">{this.state.errors.noteDecore}</div>
        
                                <input type="submit" className="button"  value="Save Note"/>
                          </form>
                    </div>

                    <div className= "viewNote"  style={{ display: this.state.showReview ? "block" : "none" }} >
                        
                        <h3>Review structure note</h3>

                                <div className="textAlign" > <label><b>Name of the villa : </b> {uname}</label> <br/> </div>
                                <div  className="textAlign" > <label><b>Date of visit : </b> {dateOfVisit} </label><br/></div>
                                <div  className="textAlign" > <label><b>Pincode : </b> {pincode} </label><br/></div>
                                <div  className="textAlign" > <label><b>Owner : </b> {Owner} </label><br/></div>

                                <div title="I" className="textAlign tooltip" ><b> A note about the surrounding area of the villa : </b>
                                  
                                    <ContentEditable
                                        html={noteSurround}
                                        className="content-editable"
                                        onChange={this.handleContentEditable}
                                      />
                                </div>

                                <div  title="I" className="textAlign tooltip" > <b>A note about the construction quality of the villa :</b> 
                                    
                                      <ContentEditable
                                        html={noteConst}
                                        className="content-editable"
                                        onChange={this.handleContentEditable}
                                      />
                                </div>

                                <div  title="I" className="textAlign tooltip" ><b> A note about the villa decore :</b> 
                                      
                                      <ContentEditable
                                        html={noteDecore}
                                        className="content-editable"
                                        onChange={this.handleContentEditable}
                                      />
                                </div>

                                <button className="btn" onClick={this.handleDeleteClick}>Delete All</button>
                    </div>
              </div>

            );
    }
}

export default RegisterForm;
