import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import moment from 'moment';
import _ from 'lodash';
import workOrdersData from '../../stubs/workOrders.json';
import { showStatus } from '../../common.js';
import WorkOrderDetails from '../WorkOrderDetails/';
import './styles.css';

export default function WorkOrders() {
  const match = useRouteMatch();
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ data, setData ] = useState({});

  useEffect(() => {
    // Similate fetching the data remotely with a setTimeout
    setTimeout(() => {
      setData(workOrdersData.data)
      setIsLoading(false)
    }, 3000);
  }, []);

  const handleWorkOrderClick = (id) => {
    history.push(`/work-orders/${id}`);
  }

  const handleCloseDetails = () => {
    history.goBack();
  }

  const renderWorkOrders = () => {
    if (_.isEmpty(data, 'workOrders')) {
      return isLoading ? (
        <div className="data-status">Fetching Data...</div>
      ) : (
        <div className="data-status">No Work Orders Exist</div>
      );
    }
    
    return (
      <div className="table">
        <div className="header">
          <div className="col">Due Date</div>
          <div className="col">WO #</div>
          <div className="col">Status</div>
          <div className="col">Work Order Title</div>
          <div className="col">Priority</div>
          <div className="col">Last Updated</div>
          <div className="col">Created On</div>
        </div>
        {data.workOrders.map((item) => (
          <div className="row"
            data-testid="work-order-row"
            key={item.id}
            onClick={() => handleWorkOrderClick(item.id)}>
            <div className="col">{moment(item.dueDate).format('MM/DD/YYYY')}</div>
            <div className="col">{_.get(item, 'number')}</div>
            <div className="col">{showStatus(_.get(item, 'status'))}</div>
            <div className="col">{_.get(item, 'title')}</div>
            <div className="col">{_.get(item, 'priority')}</div>
            <div className="col">{moment(item.updatedAt).format('MM/DD/YYYY')}</div>
            <div className="col">{moment(item.createdAt).format('MM/DD/YYYY')}</div>
          </div>
        ))}
    </div>
    );
  }

  return (
    <div className="container">
      <h2>Work Orders</h2>
      {renderWorkOrders()}
      <Switch>
        <Route path={`${match.path}/:workOrderId`}>
          <WorkOrderDetails data={data} handleCloseDetails={handleCloseDetails} />
        </Route>
      </Switch>
    </div>
  );
}
