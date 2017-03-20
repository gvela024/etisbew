import React from 'react';

class SensorsView extends React.Component {
  constructor(props) {
    super(props);

    // this.headers = {
    //   { name: 'ID', width: 5 },
    //   { name: 'Description', width: 10 },
    //   { name: 'Latitude', width: 5 },
    //   { name: 'Longitude', width: 5 },
    //   { name: 'Soil State', width: 5 }
    // };
  }

  render() {
    return (<p>hello world</p>);
  }

  // render() {
  //   return (
  //     <div class='container-fluid'>
  //       <div class='row'>
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>ID</span>
  //             <input type='number' id='id' class='form-control' value='1234'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>Description</span>
  //             <input type='text' id='description' class='form-control' value='A description'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>ID</span>
  //             <input type='number' id='latitude' class='form-control' value='12.34'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>ID</span>
  //             <input type='number' id='longitude' class='form-control' value='12.34'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>ID</span>
  //             <input type='number' id='temperature' class='form-control' value='12.34'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-2'>
  //           <div class='input-group'>
  //             <span class='input-group-addon'>ID</span>
  //             <input type='number' id='relativeHumidity' class='form-control' value='12.34'>
  //           </div>
  //         </div>
  //
  //         <div class='col-lg-1'>
  //           <button type='submit' class='btn btn-primary'>Create</button>
  //         </div>
  //       </div>
  //     </div>
  //
  //     <scrip type='text/javascript'>
  //       let socket = io('/sensors');
  //
  //       $('button[type=submit]').click(function(event) {
  //         event.preventDefault();
  //
  //         let id = $('#id').val();
  //         let description = $('description').val();
  //         let longitude = $('longitude').val();
  //         let latitude = $('latitude').val();
  //         let temperature = $('temperature').val();
  //         let relativeHumidity = $('relativeHumidity').val();
  //
  //         socket.emit('newSensorCreated', {
  //           id: id,
  //           description: description,
  //           location: {
  //             longitude: longitude,
  //             latitude: latitude
  //           },
  //           readings: [{
  //             temperature: temperature,
  //             relativeHumidity: relativeHumidity
  //           }]
  //         });
  //       });
  //     </script>
  //   );
  // }
}

export default SensorView;
