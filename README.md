# Phone Directory App

### Commands to Run

* Clone this project.
* Install dependencies of the project

> npm i

* Run the project using

> npm start

### Introduction

  + phone directory app to add, view and edit contacts.
  + username and password to authenticate for viewing contacts.
  + Included sort by name, sort by date and searching on mobile/landline number and name

Model used for Contact is:

```javascript
{
    _id: String,
    firstName: String,
    middleName: String | null,
    lastName: String,
    photo: String | null,
    email: String | null,
    mobileNumber: String | null,
    landlineNumber: String | null,
    notes: String | null
}
```

## currently also live on [https://phonedirectory-api.herokuapp.com/](https://phonedirectory-api.herokuapp.com/)
