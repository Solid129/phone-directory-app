import './contact.css';

const Contact = (props) => {
  return (<div className="Contact">
    <img className="ContactPhoto" src={props.photo}></img>
    <div className="ContactDetails">
      <p className="ContactDetailsBody">Name: {(props.firstName ?? "") + " " + (props.middleName ?? "") + " " + (props.lastName ?? "")}</p>
      <p className="ContactDetailsBody">Email: {props.email}</p>
      <p className="ContactDetailsBody">Mobile: {props.mobileNumber}</p>
      <p className="ContactDetailsBody">LandLine: {props.landlineNumber}</p>
      {props.dateAdded && <p className="ContactDetailsBody">DateAdded: {new Date(props.createdAt).toDateString()}</p>}
      {props.showTotalViews && <p className="ContactDetailsBody">TotalViews: {props.totalViews}</p>}
    </div>
    {props.showButton && <button style={{ marginLeft: '20%' }} onClick={() => props.onDelete(props._id)} title='Detail View'>d</button>}
    {props.showButton && <button style={{ marginLeft: '20%' }} onClick={() => props.onContactView(props._id)} title='Detail View'>i</button>}
  </div>);
};

export default Contact;