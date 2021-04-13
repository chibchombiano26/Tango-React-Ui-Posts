import React from "react";
import { create, act } from 'react-test-renderer';
import ListComponent, {Post, NewComment} from './index'
import { CommentOutlined, EditOutlined } from "@ant-design/icons";
import * as reactRedux from 'react-redux'
import { List, Card, Comment } from "antd";

import { Provider } from "react-redux";

import store from "../../../src/store/store";


const state = {
    posts: [
        {
            userId: 1,
            id: 1,
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            userId: 1,
            id: 2,
            title: "qui est esse",
            body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
            userId: 1,
            id: 3,
            title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
        },
        {
            userId: 1,
            id: 4,
            title: "eum et est occaecati",
            body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit"
        }
    ],
    comments: [
        {
            postId: 1,
            id: 1,
            name: "id labore ex et quam laborum",
            email: "Eliseo@gardner.biz",
            body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
        },
        {
            postId: 1,
            id: 2,
            name: "quo vero reiciendis velit similique earum",
            email: "Jayne_Kuhic@sydney.com",
            body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et"
        },
        {
            postId: 1,
            id: 3,
            name: "odio adipisci rerum aut animi",
            email: "Nikita@garfield.biz",
            body: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione"
        },
        {
            postId: 1,
            id: 4,
            name: "alias odio sit",
            email: "Lew@alysha.tv",
            body: "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati"
        }
    ]
}


const renderComponent = (children) => <Provider store={store}>{children}</Provider>

describe('List component', () => {
    let component;
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

    beforeEach(() => {
        jest.spyOn(reactRedux, 'useSelector').mockImplementation(() => (state));
        useDispatchMock.mockClear()
        component = create(renderComponent(<ListComponent />));
    })

    it('Should render the post list with comments', async () => {
        const ListComponent = component.root.findByType(List)
        expect(ListComponent.props.dataSource).toEqual(state.posts)

        const Cards = component.root.findAllByType(Card)

        Cards.forEach((e, i) => {
            expect(e.props.children.props.title).toEqual(state.posts[i].title)
            expect(e.props.children.props.description).toEqual(state.posts[i].body)
        })

        let comments = component.root.findAllByType(Comment);
        expect(comments.length).toEqual(0)

        const ShowComments = component.root.findAllByType(CommentOutlined)
        const showComment = ShowComments[0];

        await act(async () => {
            await showComment.props.onClick({})
        });

        comments = component.root.findAllByType(Comment);
        expect(comments.length).toEqual(state.comments.length)

        comments.forEach((comment, index)=>{
            expect(comment.props.author.props.children).toEqual(state.comments[index].name)
            expect(comment.props.content.props.children).toEqual(state.comments[index].body)
        })
    })

    it('Should add a new post', async () => {

        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)


        const ListComponent = component.root.findByType(List)
        expect(ListComponent.props.dataSource).toEqual(state.posts)

        const Cards = component.root.findAllByType(Card)

        Cards.forEach((e, i) => {
            expect(e.props.children.props.title).toEqual(state.posts[i].title)
            expect(e.props.children.props.description).toEqual(state.posts[i].body)
        })

        let newComments = component.root.findAllByType(NewComment);
        expect(newComments.length).toEqual(0)

        const addComments = component.root.findAllByType(EditOutlined)
        const addComment = addComments[0];


        await act(async () => {
            await addComment.props.onClick({})
        });
        
        newComments = component.root.findAllByType(NewComment);
        expect(newComments.length).toEqual(1)

        const btn = component.root.findAllByType("button")[0];

        await act(async () => {
            await btn.props.onClick({})
        });

        // Add comment was triggered
        expect(dummyDispatch).toHaveBeenCalled()

    })

})