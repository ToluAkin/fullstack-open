import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import AddBlog from '../components/AddBlog'
import helperBlog from '../utils/blogListHelper'

describe('submit form', () => {
    test('should submit handler be triggered', () => {
        const mockHandler = jest.fn()
        const blog = helperBlog.defaultBlog
        const { container, getByLabelText } = render(<AddBlog handleCreate={ mockHandler } />)

        fireEvent.change(getByLabelText('title:'), { target: { value: blog.title }})
        fireEvent.change(getByLabelText('author:'), { target: { value: blog.author }})
        fireEvent.change(getByLabelText('url:'), { target: { value: blog.url }})
        fireEvent.submit(container.querySelector('button'))

        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})