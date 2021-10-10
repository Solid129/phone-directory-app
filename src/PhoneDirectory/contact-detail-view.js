import './contact.css';
import LineGraph from './graph';
import Contact from './contact';

const ContactDetail = (props) => {
  return (<div><div>
    <Contact {...props.contact} totalViews={props.totalViews} showButton={false} showTotalViews={true} dateAdded={true} />
    <LineGraph sevenDaysViews={props.sevenDaysViews} />
  </div>
    <i className="bi-x-circle" style={{ fontSize: '2rem', color: 'cornflowerblue' }} onClick={() => props.onClick(-1)}></i>
  </div>);
};

export default ContactDetail;