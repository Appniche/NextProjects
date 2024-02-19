import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
// import { Button } from "react-bulma-components";

function App() {
  return (
    <div className="container p-5 form_div">
      <form action="" style={{width: 30 + 'dvw'}}>
        <div className="field">
          <label className="label">Username</label>
          <div className="control">
            <input class="input is-primary" type="text" placeholder="Name"/>
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
            <div class="control">
              <input class="input is-primary" type="email" placeholder="Email"/>
            </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
            <div class="control">
              <input class="input is-primary" type="password" placeholder="Password"/>
            </div>
        </div>
        <div class="field">
          <label class="label">Contact</label>
            <div class="control">
              <input class="input is-primary" type="number" placeholder="Contact"/>
            </div>
        </div>
        <div class="field mt-4">
          <div class="control">
            <button className="button is-primary has-text-weight-bold mr-4" type="submit">Submit</button>
            <button className="button is-danger has-text-weight-bold" type="reset">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
