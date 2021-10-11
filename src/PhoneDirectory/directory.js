import Contact from './contact';
import ContactDetail from './contact-detail-view';
import axios from 'axios';
import React from 'react';
import NewContact from './new-contact';

const baseUrl = 'https://phone-directory-service.herokuapp.com';
// directory for displaying contacts with search,sort and new contact adding functionality
class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      contactView: null,
      newContactTab: false,
      sortBy: {
        key: 'name',
        ascending: true
      },
      search: '',
      editRequest: ''
    }
  }

  // initialize state with user contacts on component mount
  componentDidMount() {
    axios.get(`${baseUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then(res => this.setState({ contacts: res.data }))
  }

  // update state with user contacts on component update
  // while checking if contacts updated
  componentDidUpdate() {
    axios.get(`${baseUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then(res => {
      if (this.state.contacts.length !== res.data.length) {
        this.setState({ contacts: res.data })
      }
    })
  }

  // on contact details view click handler
  onContactView = (id) => {
    if (id === -1) {
      this.setState({ contactView: null })
    } else {
      axios.get(`${baseUrl}/contacts/${id}`, {
        headers: {
          Authorization: 'Bearer ' + this.props.token
        }
      }).then(res => {
        this.setState({ contactView: res.data })
      });
    }
  }

  // toggle to show new contact addition form
  onToggleFormButton = () => {
    this.setState({ newContactTab: true, contactView: null })
  }

  // toggle to hide contact addition form
  onToggleViewButton = () => {
    this.setState({ newContactTab: false, contactView: null, editRequest: '' })
  }

  // send contact data to server to save contact
  onNewContactSubmit = (contact) => {
    delete contact._id;
    axios.post(`${baseUrl}/contacts/add`, contact, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(res => this.setState({ newContactTab: false }))
  }

  // on edit button click handler 
  onEditContact = (id) => {
    this.setState({ editRequest: id })
  }


  // send contact data to server to update contact
  onEditContactSubmit = (contact) => {
    const id = contact._id;
    delete contact._id;
    axios.patch(`${baseUrl}/contacts/${id}/update`, contact, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(res => {
      this.setState({ newContactTab: false, editRequest: '' })
      axios.get(`${baseUrl}/contacts`, {
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      }).then(res => this.setState({ contacts: res.data }))
    })
  }

  // sort toggle state handler
  onSortToggle = (key) => {
    const sortBy = this.state.sortBy;
    sortBy.key = key
    sortBy.ascending = !sortBy.ascending;
    this.setState({ sortBy })
  }

  // delete contact handler
  deleteContact = (id) => {
    axios.delete(`${baseUrl}/contacts/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(res => this.setState({ newContactTab: false, contactView: null }))
  }

  // set input search word
  setSearchKeyWord = (event) => {
    this.setState({ search: String(event.target.value).toLowerCase() });
  }

  render() {
    let contacts = JSON.parse(JSON.stringify(this.state.contacts));
    const searchKeyword = this.state.search;

    // filter contacts based on search keyword
    if (searchKeyword.length > 0) {
      contacts = contacts.filter(c => String(c.firstName + " " + c.middleName + " " + c.lastName).toLowerCase().includes(searchKeyword) || String(c.mobileNumber)?.toLowerCase().includes(searchKeyword))
    }
    // sort the contacts based on sortBy key
    if (this.state.sortBy.key === 'name') {
      if (this.state.sortBy.ascending) {
        contacts.sort((a, b) => String(a.firstName + a.middleName + a.lastName).localeCompare(b.firstName + b.middleName + b.lastName));
      } else {
        contacts.sort((b, a) => String(a.firstName + a.middleName + a.lastName).localeCompare(b.firstName + b.middleName + b.lastName));
      }
    } else {
      if (this.state.sortBy.ascending) {
        contacts.sort((a, b) => String(a.createdAt).localeCompare(b.createdAt));
      } else {
        contacts.sort((b, a) => String(a.createdAt).localeCompare(b.createdAt));
      }
    }

    // contact component build from contacts array
    const mapped = contacts.map((c, i) => <Contact {...c} key={i} onView={this.onContactView} onDelete={this.deleteContact} onEdit={this.onEditContact} showButton={true} showTotalViews={false} />)
    const res = this.state.contactView !== null
      ? <ContactDetail {...this.state.contactView} onClick={this.onContactView} />
      : this.state.newContactTab === true
        ? <NewContact onSubmit={this.onNewContactSubmit} onCancel={this.onToggleViewButton} />
        : this.state.editRequest.length > 0 ? <NewContact onSubmit={this.onEditContactSubmit} onCancel={this.onToggleViewButton} {...this.state.contacts.filter(c => c._id === this.state.editRequest)[0]} />
          : mapped;
    return (<div>
      <div>
        <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <div className="container-fluid">
            <a className="navbar-brand">My Contacts</a>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" ref={this.searchRef} onChange={this.setSearchKeyWord} />
              <button className="btn btn-outline-danger" onClick={this.props.onLogout}>Logout</button>
            </form>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <button className="col btn btn-outline-success" onClick={() => this.onSortToggle('name')}>Sort By Name</button>
            <button className="col btn btn-outline-success" onClick={() => this.onSortToggle('date')}>Sort By Date</button>
            <button className="col btn btn-outline-success" onClick={this.onToggleFormButton}>Add New Contact</button>
          </div>
        </div>
      </div>
      {res}
    </div>)
  }
}

export default Directory;