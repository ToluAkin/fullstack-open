import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'
import BlogHelper from '../utils/blogListHelper'

describe('blog actions', () => {
    let component
    const mockHandler = jest.fn()

    beforeEach(() => {
        const blog = BlogHelper.defaultBlog
        component = render(<Blog blog={ blog } user={ blog.user }
            handleDelete={ mockHandler } />)
    })

    test('blog initial display', () => {
        const blog = BlogHelper.defaultBlog

        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container.querySelector('button')).toHaveTextContent('view')
    })

    test('should the view the view button be clicked', () => {
        const blog = BlogHelper.defaultBlog
        const viewButton = component.getByText('view')
        userEvent.click(viewButton)

        expect(component.container).toHaveTextContent(blog.url)
        expect(component.container).toHaveTextContent(`likes ${ blog.likes }`)
    })

    test('should the like button be clicked twice', () => {
        const viewButton = component.getByText('view')
        userEvent.click(viewButton)

        const likeButton = component.container.querySelector('#addLike')
        userEvent.dblClick(likeButton)

        expect(mockHandler).toHaveBeenCalledTimes(2)
    })
})

