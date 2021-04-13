
import React from "react";
import { Provider } from "react-redux";
import { create, act } from 'react-test-renderer';
import PostList from './PostList'
import * as reactRedux from 'react-redux'
import store from "../../src/store/store";

const renderComponent = (children) => <Provider store={store}>{children}</Provider>

describe('List screen', () => {

    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

    it('Should render the screen and get posts', async ()=>{
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
        
        await act(async () => {
             await create(renderComponent(<PostList />));
        })
        
        expect(dummyDispatch).toHaveBeenCalled()
        
    })

})