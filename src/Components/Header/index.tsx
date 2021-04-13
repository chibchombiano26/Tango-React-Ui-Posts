import React from "react";
import { Row, Col, Divider } from "antd";
import styles from "../../..//src/styles/index";

import { Typography } from "antd";

const { Title } = Typography;

type HeadeProps = {};

const Header = (props: HeadeProps) => {
  return (
    <>
      <Row>
        <Col span={1} />
        <Col span={2} style={styles.headerLogo}>
          <img
            alt="logo"
            style={styles.header}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1024px-Cc.logo.circle.svg.png"
          />
        </Col>
        <Col span={8}>
          <Title level={3}>Tango Io Posts</Title>
        </Col>
      </Row>
      <Divider />
    </>
  );
};

export default Header;
