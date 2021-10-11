# Phone Directory App

### Installation

* Clone this project.

> git clone https://github.com/Solid129/phone-directory-app

* Install dependencies of the project

> npm i

* Run the project using

> npm start

### Introduction

* a phone directory application to add, view and edit contacts with username and password authentication.
* features include sorting by name, date and searching on mobile/landline number, name.

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
