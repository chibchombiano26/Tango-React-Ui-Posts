import React from "react";
import {create} from 'react-test-renderer';
import Header from './index'

import { Typography } from "antd";

const { Title } = Typography;

describe('Header component',()=>{

    it('Should render the header', ()=> {
        const component = create(<Header />);
        const instance = component.root;
        const img = instance.findByType("img");

        expect(img.props.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Cc.logo.circle.svg/1024px-Cc.logo.circle.svg.png')

        const title = instance.findByType(Title);
        expect(title.props.children).toEqual('Tango Io Posts')
    })

})