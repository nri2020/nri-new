import React, { useEffect, useState } from 'react';
import './pending-table.css';

function PendingTable(props) {
  const { title, colorCode, data } = props;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(data);
  }, [data]);

  return (
    <div className="pending-table">
      <div className="title">
        <h5>{title || 'Title Here'}</h5>
      </div>
      <div className="table">
        <div className={`header ${colorCode || 'yellow'}`}>
          <div className="p-title">S.no</div>
          <div className="p-title">Name</div>
          <div className="p-title">Email</div>
          <div className="p-title">File no.</div>
          <div className="p-title">Status</div>
        </div>
        <div className="body">
          {students.length !== 0 ? (
            students.map((student, key) => (
              <div className="item" key={key}>
                <div className="subItem">{key + 1}</div>
                <div className="subItem">{student.name}</div>
                <div className="subItem">{student.email}</div>
                <div className="subItem">{student.file_no}</div>
                <div className="subItem pending">{student.updated_count != 0 ? 'Complete' :'Pending'}</div>
              </div>
            ))
          ) : (
            <div className="item last">No records found...!</div>
          )}
          {students.length !== 0 ? (<div className="item last">Load More</div>):''}
        </div>
      </div>
    </div>
  );
}

export default PendingTable;
