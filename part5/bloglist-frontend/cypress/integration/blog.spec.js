const { _, $ } = Cypress
const userPass = 'medium'

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then(({ body }) => {
            localStorage.setItem('loggedUser', JSON.stringify(body))
            cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('create', (blog) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { ...blog },
        headers: {
            'Authorization': `bearer ${ JSON.parse(localStorage.getItem('loggedUser')).token }`
        }
    })

    cy.visit('http://localhost:3000')
})

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/reset')
        const user = { name: 'Medium', username: 'medium', password: 'medium' }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('Login to application')
        cy.contains('Username')
        cy.contains('Password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type(userPass)
            cy.get('#pswd').type(userPass)
            cy.get('#loginButton').click()

            cy.contains('Medium logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type(userPass)
            cy.get('#pswd').type('media')
            cy.get('#loginButton').click()

            cy.get('.error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: userPass, password:userPass })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()

            cy.get('#title').type('fullstack')
            cy.get('#author').type('mluukkai')
            cy.get('#url').type('https://medium.com')
            cy.get('#create').click()

            cy.contains('view')
            cy.get('.success')
                .should('contain','a new blog fullstack by mluukkai added')
        })
    })

    describe('Creating a blog', function () {
        beforeEach(function () {
            cy.login({ username: userPass, password: userPass })
            cy.create({ title: 'new note 1', author: 'i am', url: 'https://googlefirst.com' })
        })

        it('user can delete blog', function () {
            cy.get('#viewDetail').click()
            cy.get('#deleteBlog')
                .should('contain', 'remove')
                .click()
                .should('not.exist')
        })

        it('user can like a blog', function () {
            cy.contains('new note 1 i am').parent()
                .contains('view')
                .click()
            cy.contains('likes 0')
            cy.get('#addLike').click()
            cy.contains('likes 1')
        })
    })

    describe('Order blogs by likes', function () {
        beforeEach(function () {
            cy.login({ username: 'medium', password: 'medium' })
            cy.create({ title: 'new note 1', author: 'i am', url: 'https://googlefirst.com', likes: 2 })
            cy.create({ title: 'new note 2', author: 'i am me', url: 'https://googlesecond.com', likes: 3 })
            cy.create({ title: 'new note 3', author: 'i am me of me', url: 'https://googlethird.com', likes: 14 })
        })

        it('order by most likes', function () {
            cy.get('article')
                .find('#viewDetail')
                .click({ multiple: true })
                .get('article')
                .find('#likes')
                .then(($allBlogs) => {
                expect($allBlogs).to.have.length(3)

                    let figures = []
                    for (let i = 0; i < $allBlogs.length; i++) {
                        figures.push($allBlogs[i].textContent.substring(6))
                    }
                    const sortedLikes = figures.sort()
                    expect(figures).to.eq(sortedLikes)
            })
        })
    })
})