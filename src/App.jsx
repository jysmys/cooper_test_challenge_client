import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import { Segment, Button, Menu } from "semantic-ui-react";

class App extends Component {
  state = {
    distance: "",
    gender: "female",
    age: "",
    renderLoginForm: false,
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false,
    updateIndex: false,
  };

  onChangeHandler = (e, data) => {
    this.setState({ [data.name]: data.value, entrySaved: false });
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <Menu>
            <Menu.Item
              header
              name="Login"
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </Menu.Item>
            <p id="message">{message}</p>
          </Menu>
        );
        break;
      case authenticated:
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
              <button onClick={() => this.setState({ renderIndex: false })}>
                Hide past entries
              </button>
            </>
          );
        } else {
          performanceDataIndex = (
            <Button
              basic
              color="black"
              id="show-index"
              onClick={() => this.setState({ renderIndex: true })}
            >
              Show past entries
            </Button>
          );
        }
        renderLogin = (
          <p id="message">
            Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}
          </p>
        );
        break;
      default:
        performanceDataIndex = <>Can't show any performance data</>;
        renderLogin = <>Something is really wrong</>;
    }
    return (
      <>
        {renderLogin}
        <Segment placeholder padded="very" textAlign="center">
          <InputFields onChangeHandler={this.onChangeHandler} />
          <DisplayCooperResult
            distance={this.state.distance}
            gender={this.state.gender}
            age={this.state.age}
            authenticated={this.state.authenticated}
            entrySaved={this.state.entrySaved}
            entryHandler={() =>
              this.setState({ entrySaved: true, updateIndex: true })
            }
          />
          {performanceDataIndex}
        </Segment>
      </>
    );
  }
}

export default App;
