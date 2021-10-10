import './contact.css';
import LineGraph from './graph';
import Contact from './contact';

const ContactDetail = (props) => {
  return (<div><div>
    <Contact {...props.contact} totalViews={props.totalViews} showButton={false} showTotalViews={true} dateAdded={true} />
    <LineGraph sevenDaysViews={props.sevenDaysViews} />
  </div>
    <button onClick={() => props.onClick(-1)}>X</button>
  </div>);
};

export default ContactDetail;