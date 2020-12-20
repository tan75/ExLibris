# ExLibris

ExLibris is a reading list app that allows you to log books you have read and track your reading progress.

The current app is deployed to Digital Ocaen and running on Nginx.

## Stack

Web App: html/CSS, JavaScript, NodeJS

Testing: Jest

## How to install

Download the code from this repo and open it as a NodeJS project.

## How to run

Run the below code in your terminal:
`npm start`

## How to test

Run the below code in your terminal:
`npm test`

## How to use:

- Add a book here:
  [Add Book](http://localhost:8000/admin/add-book)
- Add a book to the 'Finished Books' collection here:
  [Library](http://localhost:8000/)
- Access your report here:
  [Report](http://localhost:8000/report)

## API reference

The ExLibris API is organozed around REST.
This API accepts JSON request bodies, returns JSON-encoded responses and uses standard HTTP response codes.

### HTTP status codes summary

**200** - OK. All is working as expected.

**201** - OK. Item has beed added/modified successfully.

**400** - NOT OK. Bad request.

### Request formats

**Method** : GET

**URL Structure example**: https://gobananas.work/books/5f97477af8cb963cd355519b

**Response Example**:

```
{ "book":
  { "_id": "5f97477af8cb963cd355519b",
  "title": "JavaScript: Good Parts1. ",
  "pages": "1",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Noo00",
  "imageUrl": "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.hellogiggles.com%2Fuploads%2F2016%2F12%2F18043538%2Fshutterstock_91553819.jpg&f=1&nofb=1",
  "userId": null
}
```

**Request Example**

`curl 'https://gobananas.work/books' \ --header 'Content-Type: application/json' \ --compressed`
