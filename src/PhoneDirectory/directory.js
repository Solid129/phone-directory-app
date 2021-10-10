import Contact from './contact';
import ContactDetail from './contact-detail-view';
import './contact.css';
import axios from 'axios';
import React from 'react';
import NewContact from './new-contact';

const baseUrl = 'https://phone-directory-service.herokuapp.com';
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
      search: ''
    }
  }



  componentDidMount() {
    axios.get(`${baseUrl}/contacts`, {
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    }).then(res => this.setState({ contacts: res.data }))
  }

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

  onToggleButton = () => {
    this.setState({ newContactTab: !this.state.newContactTab, contactView: null })
  }

  onNewContactSubmit = (contact) => {
    axios.post(`${baseUrl}/contacts/add`, contact, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(res => this.setState({ newContactTab: !this.state.newContactTab }))
  }

  onSortToggle = (key) => {
    const sortBy = this.state.sortBy;
    sortBy.key = key
    sortBy.ascending = !sortBy.ascending;
    this.setState({ sortBy })
  }

  deleteContact = (id) => {
    axios.delete(`${baseUrl}/contacts/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    }).then(res => this.setState({ newContactTab: false, contactView: null }))
  }

  setSearchKeyWord = (event) => {
    this.setState({ search: String(event.target.value).toLowerCase() });
  }

  render() {
    let contacts = JSON.parse(JSON.stringify(this.state.contacts));
    const searchKeyword = this.state.search;

    if (searchKeyword.length > 0) {
      contacts = contacts.filter(c => String(c.firstName).toLowerCase().includes(searchKeyword) || String(c.middleName)?.toLowerCase().includes(searchKeyword) || String(c.lastName).toLowerCase().includes(searchKeyword) || String(c.mobileNumber)?.toLowerCase().includes(searchKeyword))
    }
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
    const mapped = contacts.map((c, i) => <Contact {...c} key={i} onContactView={this.onContactView} onDelete={this.deleteContact} showButton={true} showTotalViews={false} />)
    const res = this.state.contactView !== null
      ? <ContactDetail {...this.state.contactView} onClick={this.onContactView} />
      : this.state.newContactTab === true
        ? <NewContact onSubmit={this.onNewContactSubmit} />
        : mapped
    return (<div>
      <div>
        <button style={{ height: 60, width: 60, textAlign: 'center', display: 'inline-block', marginRight: '10%' }} onClick={this.props.onLogout}>{"Logout"}</button>
        <input type="text" id="search" ref={this.searchRef} onChange={this.setSearchKeyWord} />
        <button style={{ height: 60, width: 60, display: 'inline-block', marginLeft: '10%' }} onClick={this.onToggleButton} title='Add New Contact'>{this.state.newContactTab ? 'Close' : 'New'}</button>
        <button onClick={() => this.onSortToggle('name')}>Sort By Name</button>
        <button onClick={() => this.onSortToggle('date')}>Sort By Date</button>
      </div>
      {res}
    </div>)
  }
}

export default Directory;