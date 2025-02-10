# Vegetables

REST API for vegetables

## REST API Specification

| Endpoint          | HTTP Method | Description                                       |
| ----------------- | ----------- | ------------------------------------------------- |
| `/vegetables`     | `GET`       | Get all vegetables                                |
| `/vegetables/:id` | `GET`       | Get a specific vegetable                          |
| `/vegetables`     | `POST`      | Create a new vegetable                            |
| `/vegetables`     | `DELETE`    | Delete all vegetable                              |
| `/vegetables/:id` | `DELETE`    | Delete a specific vegetable                       |
| `/vegetables/:id` | `PATCH`     | Update a specific vegetable                       |
| `/vegetables/:id` | `PUT`       | Update a specific vegetable, create if not exists |

## Getting Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun dev
```

Open http://localhost:3000
