import * as React from 'react';
import Paper from '@mui/material/Paper';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  Toolbar,
  DateNavigator,
  TodayButton,
  MonthView,
  DayView,
  ViewSwitcher,
  AllDayPanel
} from '@devexpress/dx-react-scheduler-material-ui';
import Grid from '@mui/material/Grid';

import jwt_decode from "jwt-decode";
import { apiUrl, doApiGet } from '../services/apiService';
import { addAppointment, addNewAppointment, delAppointment, editAppointment } from '../js/data';
import swal from 'sweetalert';
import "../css/CalendarDate.css";

const PREFIX = 'Demo';
// #FOLD_BLOCK
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};

const currentDate = moment().format("YYYY-MM-DD");



function CalendarDate(){
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);
  const [currentViewName, setCurrentViewName] = React.useState('Week');
  const [userT , setUserT] = React.useState([]);
  const navi = useNavigate();
  const {
    allowAdding, allowDeleting, allowUpdating
  } = editingOptions;


  React.useEffect(()=>{  
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
              navi("/");
    }
    else{
    let userToken = jwt_decode(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setUserT(userToken);
    let allAppointments = apiUrl + "appointments";
    doApiGet(allAppointments)
    .then(data => {
      let arr = data.filter(item => item.user_id === userToken._id);
      if(arr.length > 0){
        setAllData(arr);
        if(arr[0].user_appointments.length > 0){
          setData(arr[0].user_appointments);
        }
       
      }
      else{
        newUser(userToken);
      }
   })  
  }  
  },[])

  const newUser = React.useCallback((userToken)=> {
    let newUserA = {user_id: userToken._id,
    "user_appointments": []}
    setData(newUserA.user_appointments)
    addNewAppointment(newUserA);

  })

   const onCommitChanges  = React.useCallback(({ added, changed, deleted }) =>  {
   if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      setData([...data, { id: startingAddedId, ...added }]);
      let appData = {
        title: added.title,
        startDate: added.startDate,
        endDate: added.endDate,
        id: startingAddedId,
        allDay: added.allDay,
        rRule: added.rRule
      }
      addAppointment(appData, userT)
    }
    if (changed) {
      setData(data.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));

     let newAppoint = data.map(appointment => {
          if(changed[appointment.id]){
            return { ...appointment, ...changed[appointment.id] }
          }
          else{
            return appointment
          }
          })

            editAppointment(newAppoint, userT._id)
        

    }
    if (deleted !== undefined) {
      let arr = data.filter(appointment => appointment.id !== deleted);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this appointment!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your appointment has been deleted!", {
            icon: "success",
          }).then(()=>{
             delAppointment(arr, allData);
             setData(data.filter(appointment => appointment.id !== deleted));
          })
        }else{
          swal("Your appointment not deleted!");
        }
      });
    
    }
    setIsAppointmentBeingCreated(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, setIsAppointmentBeingCreated, data]);
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  const TimeTableCell = React.useCallback(React.memo(({ onDoubleClick, ...restProps }) => (
    <WeekView.TimeTableCell
      {...restProps}
      onDoubleClick={allowAdding ? onDoubleClick : undefined}
    />
  )), [allowAdding]);

  const CommandButton = React.useCallback(({ id, ...restProps }) => {
    if (id === 'deleteButton') {
      return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
    }
    return <AppointmentForm.CommandButton id={id} {...restProps} />;
  }, [allowDeleting]);


  const Content = (({
    children, appointmentData, ...restProps
  }) => (
    <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
      {appointmentData.notes ? 
        <Grid item xs={10}>
        <div class="MuiGrid-root MuiGrid-container Content-titleContainer css-u9p4s6-MuiGrid-root"><div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-2 css-1o7apob-MuiGrid-root"><div class="Content-relativeContainer"></div></div><div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 css-17p3wh3-MuiGrid-root"><div><div class="More Content-title Content-dateAndTitle">More Info:</div><div class="Content-text Content-dateAndTitle">notes: {appointmentData.notes}</div></div></div></div>      
        </Grid>
        : ""}
    </AppointmentTooltip.Content>
  ));

  return (
    <React.Fragment >
      <Paper >
        <Scheduler
          data={data}
          height={600}
          color={"red"}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            defaultCurrentViewName={currentViewName}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />

          <IntegratedEditing />
        
          <WeekView
            startDayHour={7}
            endDayHour={23}
            timeTableCellComponent={TimeTableCell}/>

          <MonthView />
          <DayView  />
          <Toolbar />
          <ViewSwitcher/>
          <DateNavigator />
          <TodayButton />
          <Appointments/>
          <AllDayPanel />

          <AppointmentTooltip
            showOpenButton
            showDeleteButton={allowDeleting}
            contentComponent={Content}
            showCloseButton/>

          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}/>
      
        </Scheduler>
      </Paper>
    </React.Fragment>
  );
};

export default CalendarDate;  