import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../Components/Header";
import List from "../Components/List";
import { postActions } from "../store/slice/posts";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      dispatch(postActions.getPosts());
    };
    init();
  });

  return (
    <div className="App">
      <Header />
      <List />
    </div>
  );
}
