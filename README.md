### Live Link: https://book-catalog-prisma-postgres-orpin.vercel.app

### Application Routes:

#### User

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/auth/signup (POST)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/users (GET) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/users/9065f695-4cd8-445a-a393-5271dc4aa4f7 (Single GET) Only Allowed For Admin

- ahttps://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/users/9065f695-4cd8-445a-a393-5271dc4aa4f7 (PATCH) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/users/72d26c4a-09f2-4644-852c-d804bc7cb673 (DELETE) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/auth/profile (GET) Only Allowed For Login user

### Category

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/categories/create-category (POST) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/categories (GET)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/categories/a1dec8bd-8e99-4f8c-ac1a-531494777aed (Single GET)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/categories/a1dec8bd-8e99-4f8c-ac1a-531494777aed (PATCH) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/categories/a1dec8bd-8e99-4f8c-ac1a-531494777aed (DELETE) Only Allowed For Admin

### Books

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books/create-book (POST) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books (GET)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books/0b831bf7-5fd0-4c31-bfa5-3aeaf430b2fd/category (GET)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books/09d0c346-40ea-4d6b-91fa-88d373b759d4 (GET)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books/09d0c346-40ea-4d6b-91fa-88d373b759d4 (PATCH)
- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/books/09d0c346-40ea-4d6b-91fa-88d373b759d4 (DELETE) Only Allowed For Admin

### Reviews

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/reviews/create-review (POST) Only Allowed For Customer

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/reviews (GET) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/reviews/f2f227e1-8a46-4611-b1f5-d8cd2dca554d (GET) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/reviews/f2f227e1-8a46-4611-b1f5-d8cd2dca554d (PATCH) Only Allowed For Admin

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/reviews/f2f227e1-8a46-4611-b1f5-d8cd2dca554d (DELETE) Only Allowed For Admin

### Orders

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/orders/create-order (POST)

- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/orders (GET) Only Allowed For Admin (Get All Orders) -https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/orders (GET) Only Allowed For Customer (Get Customer Orders)
- https://book-catalog-prisma-postgres-orpin.vercel.app/api/v1/orders/5565b88a-9fbe-42ca-8e10-1624d368bf86 (GET) Allowed For Admin and customer (Get Single Order)
