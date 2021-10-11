import LineGraph from './graph';
import Contact from './contact';

// contact detail view with all properties in contact 
// as well including totalViews and last 7 days graph
const ContactDetail = (props) => {
  return (<div>
    <Contact {...props.contact} totalViews={props.totalViews} showButton={false} showTotalViews={true} dateAdded={true} />
    {props.contact.notes &&
      <div style={{ marginLeft: '5%', textAlign: 'start', fontSize: '15px' }}>
        notes: {props.contact.notes}
      </div>
    }
    <LineGraph sevenDaysViews={props.sevenDaysViews} />
    <i className="bi-x-circle" style={{ fontSize: '2rem', color: 'cornflowerblue' }} onClick={() => props.onClick(-1)}></i>
  </div>);
};

export default ContactDetail;