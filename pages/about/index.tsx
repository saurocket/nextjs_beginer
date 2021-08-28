import React from 'react'
import Router from 'next/router'
import {MainLayout} from "../../components/MainLayout";
import {MyAbout} from "../../interfaces/about";

interface AboutProps {
    title: MyAbout
}

const About  = ({title}:AboutProps) => {


    const linkClickHandler  = (path: '/' | '/posts') => {
        Router.push(path)
    }

    return (
        <MainLayout title={'Index Page'}>
            <h2>{title}</h2>
            <button onClick={()=> linkClickHandler('/')}>Got back to home</button>
            <button onClick={()=> linkClickHandler('/posts')}>Got to post page</button>
        </MainLayout>
    )
}
export default About


About.getInitialProps = async () => {
    const response = await fetch(`${process.env.API_URL}/about`)
    const data:MyAbout = await response.json().then(r => r.title)
    return {title:data}
}