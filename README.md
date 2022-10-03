# Nestjs API

RESTful API for a simple mobile app and an admin dashboard built with Nestjs and PostgreSQL.

## Authors

- [@i-zokirov](https://github.com/i-zokirov)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`POSTGRES_HOST`
`POSTGRES_PORT`
`POSTGRES_USER`
`POSTGRES_PASSWORD`
`POSTGRES_DB`

## Features

There are 2 user roles: a regular user and an admin.
Users can do:

- On the mobile app:
  o Login / register (username, password)
  o View a list of articles (sorted by the creation date)
  o Read a single article
  Admins can do:
- On the mobile app:
  o Login / register (username, password)
  o View a list of articles (sorted by the creation date)
  o Read a single article
- On the admin dashboard:
  o Manage users (view the list of users, create, update, delete)
  o Manage articles (view the list of articles, create, update, delete)

## License

[MIT](https://choosealicense.com/licenses/mit/)
