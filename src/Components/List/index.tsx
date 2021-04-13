import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentsActions } from "../../../src/store/slice/comments";
import { List, Button, Avatar, Card, Tooltip, Comment, Input } from "antd";
import { CommentOutlined, EditOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

type ElementProps = {
  item: any;
  onnAddCart: (item: any) => void;
};

export const Post = (props: ElementProps) => {
  const dispatch = useDispatch();
  const { item } = props;
  const [showComments, setShowComments] = useState(false);
  const [showAddComments, setshowAddComments] = useState(false);

  const getComments = () => {
    setShowComments(!showComments);
    if (!showComments) dispatch(commentsActions.getComments(item));
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const addComment = (name, email, value) => {
    dispatch(
      commentsActions.addComment({
        postId: item.id,
        id: getRandomInt(10000, 20000),
        name: name,
        email: email,
        body: value
      })
    );
  };

  return (
    <>
      <Card
        style={{ width: "94vw" }}
        cover={
          <img
            alt={item.id}
            src={`https://picsum.photos/600/600?random=${item.id}`}
          />
        }
        actions={[
          <CommentOutlined onClick={getComments} />,
          <EditOutlined onClick={() => setshowAddComments(!showAddComments)} />
        ]}
      >
        <Meta
          avatar={
            <Avatar src={`https://picsum.photos/50/50?random=${item.id}`} />
          }
          title={item.title}
          description={item.body}
        />
      </Card>
      {showComments && <Comments />}
      {showAddComments && <NewComment onSubmit={addComment} />}
    </>
  );
};

const UserComment = (props: any) => {
  const { item } = props;
  return (
    <Comment
      author={<a>{item.name}</a>}
      avatar={
        <Avatar
          src={`https://picsum.photos/50/50?random=${item.id}`}
          alt={`image_comment_${item.id}`}
        />
      }
      content={<p>{item.body}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

const Comments = () => {
  const { comments: data } = useSelector((state: any) => {
    return state.comments;
  });

  return data.map((comment: any, idx: number) => <UserComment key={`comment_${idx}`} item={comment} />);
};

export const NewComment = (props: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");

  const submit = () => {
    props.onSubmit(name, email, value);
    setValue("");
    setEmail("");
    setName("");
  };

  return (
    <>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        style={{ marginTop: "10px" }}
      />
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ marginTop: "10px" }}
      />
      <TextArea
        style={{ marginTop: "10px" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new comment"
      />
      
      <button onClick={submit}>Submit</button>
    </>
  );
};

const ListComponent = () => {
  const { posts: data } = useSelector((state: any) => {
    return state.posts;
  });

  return (
    <List
      grid={{
        gutter: 24,
        column: 1
      }}
      pagination={{
        defaultPageSize: 20
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Post item={item} />
        </List.Item>
      )}
    />
  );
};

export default ListComponent;
