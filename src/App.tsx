import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import styles from "./styles/index";

import store, { persistor } from "../src/store/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PostList from "./Screens/PostList";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App" style={styles.app}>
          <Router>
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route path="/posts" component={PostList} />
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </ReduxProvider>
  );
}
