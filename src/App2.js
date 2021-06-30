import React from "react";
import ReactDOM from "react-dom";
const styles = theme => ({
  root: {
    flexGrow: 1
  },

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});
class MyForm extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.setState({
      res: stringifyFormData(data),
    });
    
    // console.log(serialize(event.target)); 
    
  
    

     fetch('/WaveEdu/IndexExecute', {
       method: 'POST',
              
       body: data,
     });
  }


  render() {
    return (
    	<div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Enter username</label>
          <input id="username" name="username" value="123" type="text" />
          <input id="username" name="username" value="1122" type="text" />
          <label htmlFor="email">Enter your email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="birthdGate">Enter your birth date</label>
          <input id="birthdate" name="birthdate" type="text" />

          <button>Send data!</button>
        </form>
        
        {this.state.res && (
        	<div className="res-block">
            <h3>Data to be sent:</h3>
            <pre>FormData {this.state.res}</pre>
        	</div>
        )}
    	</div>
    );
  }
}

function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}

export default (MyForm);

