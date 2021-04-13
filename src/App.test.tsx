
import React from "react";
import { create } from 'react-test-renderer';
import { Router } from "react-router-dom";
import App from './App'


describe('App', () => {

    it('Should render a router', async ()=>{
        const component = create(<App />);
        const router = component.root.findAllByType(Router);
        
        expect(router.length).toEqual(1)
    })

})