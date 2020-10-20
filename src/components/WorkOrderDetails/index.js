import React from 'react'
import moment from 'moment';
import _ from 'lodash';
import { useParams } from "react-router-dom";
import { showStatus } from '../../common.js';
import './styles.css'

export default function WorkOrderDetails({ data, handleCloseDetails }) {
  const { workOrderId } = useParams();
  const item = data.workOrders.find((a) => a.id === workOrderId);

  const getAssignedTo = () => {
    const obj = _.get(item.assignedTo)
    const str = (_.get(obj, 'firstName') || '') + '' + (_.get(obj, 'lastName') || '')
    return str.trim() || 'N/A'
  }

  const getAssets = () => {
    if (!_.isEmpty(item, 'asset')) return null
    return (
      <div>Assets: {item.asset.map((a, idx) => (
        <div key={idx}>- {a.name}</div>
      ))}
      </div>
    );
  }

  const renderLocation = () => {
    const location = _.first(item.location);
    if (!location) return null;
    const mapUrl = 'https://www.google.com/maps?q='+ location.address.split(' ').join('+');
    return (
      <div>
        Location: <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          {location.name} ({location.address})
        </a>
      </div>
    );
  }

  const renderParts = () => {
    if (!_.isEmpty(item, 'parts')) return null;
    return (
        <div>Parts: {item.parts.map((a, idx) => (
          <div key={idx}>{a.part.quantity} - {a.part.name} @ ${a.part.cost}</div>
          ))}
        </div>
      );
  }

  const renderFormItems = () => {
    if (!_.isEmpty(item, 'formItems')) return null;
    return (
        <div>Form Items: {item.formItems.map((a, idx) => (
          <div key={idx}>- {a.name}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="modal-background" onClick={handleCloseDetails}>
      <div className="modal-container">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button onClick={handleCloseDetails}>X</button>
          <h2>Work Order ID: {workOrderId}</h2>
          <div>Due Date: {moment(item.dueDate).format('LLL')}</div>
          <div>Work Order: {_.get(item, 'number')}</div>
          <div>Status: {showStatus(_.get(item, 'status'))}</div>
          <div>Priority: {_.get(item, 'priority')}</div>
          <div>Updated: {moment(item.updatedAt).format('LLL')}</div>
          <div>Title: {_.get(item, 'title')}</div>
          <div>Description: {_.get(item, 'description') || '(empty)'}</div>
          <div>Duration: {_.get(item, 'duration') || 'N/A'}</div>
          <div>Category: {_.get(item, 'category') || '(empty)'}</div>
          <div>Schedule: {_.get(item, 'schedule.value') || 'N/A'}</div>
          <div>Created: {moment(item.createdAt).format('LLL')}</div>
          <div>Assigned To: {getAssignedTo()}</div>
          {getAssets()}
          {renderLocation()}
          {renderParts()}
          {renderFormItems()}
        </div>
      </div>

    </div>
  );
}