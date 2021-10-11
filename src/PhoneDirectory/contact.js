// Single contact view component

const Contact = (props) => {
  return (
    <div className="card mb-2">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.photo} className="img-fluid rounded-start" alt="" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{(props.firstName ?? "") + " " + (props.middleName ?? "") + " " + (props.lastName ?? "")}</h5>
            <p className="card-text">{props.email}</p>
            <p className="card-text">Mobile: {props.mobileNumber}</p>
            <p className="card-text">LandLine: {props.landlineNumber}</p>
            {props.dateAdded && <p className="card-text">Date Added: {new Date(props.createdAt).toDateString()}</p>}
            {props.showTotalViews && <p className="card-text">Total Views: {props.totalViews}</p>}
            {props.showButton && <div className="col justify-content-evenly">
              <i className="bi-trash" style={{ fontSize: '2rem', color: 'cornflowerblue', marginRight: '50px' }} onClick={() => props.onDelete(props._id)}></i>
              <i className="bi-info-square-fill" style={{ fontSize: '2rem', color: 'cornflowerblue', marginRight: '50px' }} onClick={() => props.onView(props._id)}></i>
              <i className="bi-pencil-fill" style={{ fontSize: '2rem', color: 'cornflowerblue' }} onClick={() => props.onEdit(props._id)}></i>
            </div>}
          </div>
        </div>
      </div>
    </div>);
};

export default Contact;