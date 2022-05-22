const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');


//assertions:
//create - a book is added to our database with a title, an author, a genre and an ISBN. then we check that the title and author exists.
//read - you can retrieve all records with get, or retrieve one record by its id. it will give you 404 & a message if the book doesn't exist. maybe it would also be good to search by other fields.
//update - you can update a record by id and it gives a 404 if it doesn't exist
// delete - you can delete a record by id and it gives 404 if it doesn't exist.

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('creating records', () => {

        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'The best book ever',
                    author: 'First Author',
                    genre: 'Fact',
                    ISBN: '123'
                });

                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('The best book ever');
                expect(newBookRecord.title).to.equal('The best book ever');
                expect(newBookRecord.author).to.equal('First Author');
                expect(newBookRecord.genre).to.equal('Fact');
                expect(newBookRecord.ISBN).to.equal('123');
            })
        })
    })

    describe('with records in the database', () => {

        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'The best book ever',
                    author: 'First Author',
                    genre: 'Fact',
                    ISBN: '123'
                }),
                Book.create({
                    title: 'The second best book',
                    author: 'Second Author',
                    genre: 'Autobiography',
                    ISBN: '456'
                }),
                Book.create({
                    title: 'Not such a great book',
                    author: 'Slight Disappointment',
                    genre: 'Fiction',
                    ISBN: '789'
                }),
            ]);
        });
        describe('GET /books', () => {
            it('retrieves all the book records', async () => {
                const response = await request(app).get('/books')
                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((returnedBook) => {
                    const comparison = books.find((book) => book.id === returnedBook.id)
                    expect(returnedBook.title).to.equal(comparison.title);
                    expect(returnedBook.author).to.equal(comparison.author);
                    expect(returnedBook.genre).to.equal(comparison.genre);
                    expect(returnedBook.ISBN).to.equal(comparison.ISBN)
                })
            });
        })
        describe('GET /books/:id', () => {
            it('retrieves a single book record by id', async () => {
                const book = books[0]
                const response = await request(app).get(`/books/${book.id}`)


                expect(response.status).to.equal(200)

                expect(response.body.title).to.equal('The best book ever');
                expect(response.body.author).to.equal('First Author');
                expect(response.body.genre).to.equal('Fact');
                expect(response.body.ISBN).to.equal('123');

            })
            it('returns 404 if the book is not in the database', async () => {
                const noBook = await request(app).get('/books/20000000')
                expect(noBook.status).to.equal(404);
                expect(noBook.body.error).to.equal('No such book in the database')
            })
        })
        describe('PATCH /books/:id', () => {

        })
        describe('DELETE /books/:id', () => {

        })
    })
})