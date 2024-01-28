import React from 'react';

export default function About() {
  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-4">Benefits of the Case Management System</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Centralized Case Management</h5>
            <hr />
            <p className="card-text">
              The system allows users to store and manage all their legal cases in one place. Users can easily add new cases, track case progress, and access case details whenever needed. This centralization eliminates the need for manual record-keeping and improves organization and efficiency.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Efficient Document Management</h5>
            <hr />
            <p className="card-text">
              Users can upload and associate relevant documents with each case. This feature enables easy access to case-related documents, eliminating the hassle of physical paperwork and simplifying document retrieval. It enhances collaboration as multiple users can access and review documents simultaneously.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Reminders and Deadlines</h5>
            <hr />
            <p className="card-text">
              The system facilitates setting reminders for important dates and deadlines associated with each case. Users can ensure they stay on top of critical tasks, such as court appearances, filing deadlines, or client meetings. Reminders help prevent missed deadlines, reducing the risk of negative consequences and improving overall case management efficiency.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Track Case Progress</h5>
            <hr />
            <p className="card-text">
              The system provides a clear overview of the progress of each case, including key milestones, tasks completed, upcoming events, and pending actions. This feature enables users to monitor the status of their cases, identify bottlenecks, and allocate resources effectively.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Enhanced Collaboration</h5>
            <hr />
            <p className="card-text">
              The Case Management System supports collaboration among legal professionals. Multiple lawyers can be associated with a case, facilitating teamwork and shared responsibility. Users can communicate, share case updates, and collaborate on documents within the system, streamlining communication and improving collaboration efficiency.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 p-4">
            <h5 className="card-title fw-bold">Analytics and Reporting</h5>
            <hr />
            <p className="card-text">
              The system can incorporate analytics and reporting capabilities. It can generate reports on case statistics, lawyer performance, case outcomes, or any other custom metrics. These insights can aid in decision-making, resource allocation, and identifying areas for improvement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
