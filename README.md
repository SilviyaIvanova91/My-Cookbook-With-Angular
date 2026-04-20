<h1> My Cookbook Project with Angular </h1>


This is my project for Angular course in SoftUni. 
The goal of this recipe site is to help people discover, learn, and successfully prepare delicious food and give useful advice to other users.

---
<h3> User Roles </h3>
- Guest (Not Authenticated User)
  - Can view the home page
  - Can view the catalog
  - Can view details of the recipes
  - Can register
  - Can login
  - Can comment recipe, in recipe details, as Anonymous
 
- Authenticated User
  - Can create new recipe (this function is in catalog page)
  - Can edit their own recipe record
  - Can delete their own recipe records
  - Can post comment with their username
  - Can view their own Profile Page
  - Can edit their own Profile Page

---
<h3> Public Features </h3>
  - Home page 
  - Catalog page -> Show all recipes
  - Details page -> Show information for recipe - name, description, ingredients, instruction and picture. 
                 -> Here is comment section, where everyone can post.
  - Login page
  - Register page

- Authenticated User Features
  - Create new recipe records -> In Catalog Page have button for Create Recipe
  - Edit own recipe records -> In Details Page, ONLY owner, can see Edit and Delete button 
  - Delete own recipe records -> In Details Page, ONLY owner, can see Edit and Delete button 
  - View personal dashboard -> My Profile
  - Edit personal dashboard

---
<h3> Application Flow </h3>
  1. User opens the Home Page
  2. User navigate to the catalog Page
  3. User select a recipe and open Details Page
  4. User can post comment under every recipe as Anonymous or with Username (when user is Authenticated)
  5. User logs in or register
  6. Authenticated user creates new records -> button for Create Recipe is in Catalog Page
  7. The records appears in the catalog
  8. Authenticated user, who create recipe, can make changes or delete a recipe records
  9. User navigate to personal dashboard
  10. User can update his personal information

---
<h3> Data Structure </h3>
- Recipe
   - _id
   - name
   - description
   - ingredients
   - instructions
   - image
   - owner
   - comments

- User
   - _id
   - username
   - email
   - tel
   - recipes
   - created_at

- Comment
   - _id
   - username
   - text
   - createdAt

- Notification
   - message
   - type

- Recipe State
   - recipes
   - isLoading
   - error

---
<h3> Project Architecture </h3>
- core/guards
- core/interceptors
- core/services
- core/store
- features/auth/login component
- features/auth/register component
- features/home component
- features/my-profile component
- features/not-found component
- features/recipes component
- features/recipes/delete-recipe component
- features/recipes/edit-recipe component
- features/recipes/new-recipe component
- features/recipes/recipe-detail component
- features/recipes/recipes-list component
- layout/foother component
- layout/header component
- shared/components
- shared/directives
- shared/interfaces
- shared/pipes
- shared/validators

---
<h3> Technologies Used </h3>
- Angular
- TypeScript
- RxJs
- REST API
- CSS

---
<h3> How to Run the Project </h3>
1. Clone the repository
2. cd My-Cookbook
3. npm install
4. npm install @ngrx/store 
5. npm start
6. Open new terminal
7. cd Rest-api
8. npm install
9. npm start
10. Open the application
    -> http://localhost:4200

---
<h3> Preview: </h3>

### Home Page
![Home](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/homePageNotAuth.jpg)

### Login Page
![Login](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/loginPage.jpg)

### Register Page
![Register](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/registerPage.jpg)

### Catalog Page - Not Authenticated User
![Catalog-Not-Auth](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/recipeCatalog.jpg)

### Catalog Page - Authenticated User
![Catalog-Auth](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/catalogPageAuth.jpg)

### Details Page - Not Authenticated User
![Details-Not-Auth](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/detailsPageNotAuth.jpg)

### Details Page - Only for Owner of recipe
![Details-Owner](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/DetailsPageAuthOwner.jpg)

### Create Page - Only for Authenticated Users
![Create](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/addNewRecipePage.jpg)

### Edit Page - Only for Owner of recipes
![Edit](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/editRecipePage.jpg)

### Delete Page - Only for Owner of recipes
![Edit](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/deletePage.jpg)

### My Profile Page
![MyProfile](https://raw.githubusercontent.com/SilviyaIvanova91/My-Cookbook-With-Angular/main/cookbook-site-in-picture/myProfilePage.jpg)

### Upload My Profile Page
![MyProfile-Upload](https://github.com/SilviyaIvanova91/My-Cookbook-With-Angular/raw/main/cookbook-site-in-picture/editMyProfilePage.jpg)
