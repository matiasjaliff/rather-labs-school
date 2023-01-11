# **Rather Labs School**

My solution for a tech challenge for a **Full Stack Developer** position in **Rather Labs**. It's deployed in [**Vercel**](https://vercel.com/) and you can check it out here:

https://rather-school.vercel.app/

---

## **The Challenge**

A school wants software that allows them to create rooms/courses. They need a screen with a form to create the room and another screen where they can view the details of the room and the people who are part of it. The school's second requirement is the ability to add students to the system, specifying which room they belong to, their age, gender, and any other relevant data. Finally, the school expects to be able to view a student's page by clicking on it, to see their personal information, including whether the student has a sibling in another course and who this sibling is. A student may have one or more siblings, and this information would be used to
apply a discount on the fee if applicable.

They need an admin section to make the Create and Edit operations onrooms and students, it will be a plus if you make user authentication to this section.

More details in [**this document**](/documents/Challenge%20Tanzania%20JS.pdf).

---

## **My Solution**

### **Backend**

I've chosen [**Supabase**](https://supabase.com/), an open source alternative to **Firebase**, which uses a **Postgres** database in **AWS**. This database has two tables: **_courses_** and **_students_**. **Supabase** provides APIs to manage the data.

### **Frontend**

#### **Tech stack**

I've chosen to build the **React** app with [**Vite**](https://vitejs.dev/) + [**SWC**](https://swc.rs/) instead of **CRA**, because it's faster.

For client side routing I use the last version of [**React Router**](https://reactrouter.com/en/main).

I use **TypeScript** and **ESLint** + **Prettier**, and [**lint-staged**](https://github.com/okonet/lint-staged#readme) and [**Husky**](https://typicode.github.io/husky/#/) to ensure a clean and consistent code during coding and before commiting.

I use [**Javascript Client Library**](https://supabase.com/docs/reference/javascript/introduction) to stablish communication with the **Supabase REST API** to CRUD.

Finally, I use [**Ant Design**](https://ant.design/) UI components in the whole app.

#### **Code folder structure**

I leverage the **Vite** boilerplate, which provides an `index.html` and a `main.tsx` as entry points to the app.

All React function components are inside the `src` folder. The entries for every route are in the `routes` folder. If any of those routes need to use a component (e.g. tables, forms), these are in the `components` folder. In the `providers` folder you can find the `session` and the `selections` context providers.

Outside `src` there are two important folders:

- `config` : here is the Supabase client file and types definition for the used schema.
- `lib` : here is the loaders file, where are all the data loaders needed in the app. These loaders are used before loading the route components that need to fetch information in advance. It's a React Router feature that prevents using data fetching inside useEffect hooks.

---

## **To Dos**

- Visualize siblings in the student information view.
- Create, edit and delete courses.
- Authenticated sessions.
- Clean CSS.

---

## **Local dev build**

In case you wanted to try this project locally, please clone this repository and create a `.env` file in the root directory with these two keys:

`VITE_SUPABASE_URL=https://kkotckxbfxzxbwpfwvis.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrb3Rja3hiZnh6eGJ3cGZ3dmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI2NjE2NTQsImV4cCI6MTk4ODIzNzY1NH0.rJ7-CfCk6P4U9hPfwcDqzd35cUSnM3HWE-9j9ebLN9A`

Install dependecies with `npm install`.

Run development build with `npm run dev` and open localhost.
