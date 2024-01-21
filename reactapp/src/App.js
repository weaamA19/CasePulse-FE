import './App.css';
import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;
    axios
      .get('http://127.0.0.1:8000/api/reminders/')
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <div>
        <h1>Data from Django</h1>
        {this.state.details.map((output, id) => (
          <div key={id}>
            {/* {output.case_id} */}
            {output.title}
            {output.description}
            {/* {output.date} */}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
